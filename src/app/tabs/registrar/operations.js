import { keccak_256 as sha3 } from 'js-sha3';
import { BigNumber, ethers } from 'ethers';
import {
  requestGetCost,
  receiveGetCost,
  requestCommitRegistrar,
  receiveCommitRegistrar,
  errorRegistrarCommit,
  requestRevealCommit,
  receiveRevealCommit,
  receiveCanRevealCommit,
  errorRevealCommit,
  optionsNotFound,
  commitTxMined,
  revealTxMined,
  requestConversionRate,
  recieveConversionRate,
  errorConversionRate,
  requestCheckCommitRegistrar,
  requestIsCommitmentRequired,
  receiveIsCommitmentRequired,
  requestHasEnoughRif,
  errorNotEnoughRIF,
} from './actions';
import {
  rif as rifAddress,
  getCurrentPartnerAddresses,
} from '../../adapters/configAdapter';
import { notifyError } from '../../notifications';
import {
  rifAbi,
} from './abis.json';
import { FIFS_REGISTRER, FIFS_ADDR_REGISTRER } from './types';
import { sendBrowserNotification } from '../../browerNotifications/operations';
import { start } from '../../auth/operations';
import {
  registrar, partnerConfiguration, getCurrentPartner, provider,
} from '../../rns-sdk';
import getSigner from '../../helpers/getSigner';

const makeCommitment = (domain, owner, secret, duration, addr) => {
  const hashLabel = `0x${sha3(domain)}`;

  try {
    const hash = ethers.utils.solidityKeccak256(
      ['bytes32', 'address', 'bytes32', 'uint256', 'address'],
      [hashLabel, owner, secret, duration, addr],
    );
    return hash;
  } catch (error) {
    throw error;
  }
};

/**
 * Get the cost for a domain
 * @param {string} domain domain to be registered
 * @param {number} duration number of years
 */
export const getCost = (domain, duration) => async (dispatch) => {
  const Registrar = await registrar();
  dispatch(requestGetCost(duration));

  const label = domain.split('.')[0];

  try {
    const cost = await Registrar.price(label, duration);
    dispatch(receiveGetCost(cost / (10 ** 18)));
    let options = localStorage.getItem(`${domain}-options`);

    options = JSON.parse(options);

    localStorage.setItem(
      `${domain}-options`,
      JSON.stringify({
        ...options,
        duration,
        rifCost: cost / (10 ** 18),
        setAtGetCost: true,
      }),
    );
  } catch (error) {
    dispatch(notifyError(error.message));
  }
};

/**
 * Get an account's RIF balance by their address, if rLogin is not set, promot first
 * @param {cost} price amount of RIF needed
 */
export const hasEnoughRif = cost => dispatch => new Promise((resolve, reject) => {
  const checkBalance = async () => {
    dispatch(requestHasEnoughRif());
    const signer = await getSigner();
    const currentUserAccount = await signer.getAddress();
    const rif = new ethers.Contract(rifAddress, rifAbi, signer);
    const balance = await rif.balanceOf(currentUserAccount);
    return resolve((balance / (10 ** 18)) >= cost);
  };

  // eslint-disable-next-line no-unused-expressions
  window.rLogin
    ? checkBalance()
    : dispatch(start(checkBalance, err => reject(err)));
});

export const getConversionRate = () => async (dispatch) => {
  dispatch(requestConversionRate());

  return new Promise((resolve) => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=rif-token&vs_currencies=usd',
    )
      .then(res => res.json())
      .then(data => resolve(
        dispatch(recieveConversionRate(parseFloat(data['rif-token'].usd))),
      ))
      .catch(() => dispatch(errorConversionRate()));
  });
};

/**
 * Commit to registering a domain, first step
 * @param {string} domain domain to be registered
 * @param {number} duration amount of time in years to register
 * @param {number} rifCost the cost for the duration
 * @param {bool} setupAddr should the domain setup the resolution for RSK
 */
export const commit = (domain, duration, rifCost, setupAddr) => async (dispatch) => {
  dispatch(requestCommitRegistrar());

  const signer = await getSigner();
  const currentUserAccount = await signer.getAddress();

  const Registrar = await registrar(signer);

  try {
    const hashCommit = await Registrar.commit(
      domain, currentUserAccount, duration, currentUserAccount,
    );
    const salt = hashCommit.secret;

    localStorage.setItem(
      `${domain}-options`,
      JSON.stringify({
        salt,
        duration,
        rifCost,
        contract: setupAddr ? FIFS_ADDR_REGISTRER : FIFS_REGISTRER,
      }),
    );

    dispatch(receiveCommitRegistrar(hashCommit.hash));

    return dispatch(commitTxMined());
  } catch (error) {
    return dispatch(errorRegistrarCommit(error.message));
  }
};

export const checkCanReveal = (hash, domain) => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  if (!options) {
    return dispatch(optionsNotFound());
  }
  const signer = await getSigner();
  // const currentUserAccount = await signer.getAddress();

  options = JSON.parse(options);
  const { notificationReady } = options;
  const Registrar = await registrar(signer);

  try {
    const canReveal = await Registrar.canReveal(hash);

    if (canReveal && !notificationReady) {
      sendBrowserNotification(
        `${domain}.rsk`,
        'notification_domain_ready_register',
      );
    }

    if (canReveal) {
      return dispatch(receiveCanRevealCommit(canReveal));
    }

    return null;
  } catch (error) {
    return dispatch(notifyError(error.message));
  }
};

export const checkIfAlreadyCommitted = domain => async (dispatch) => {
  let options = localStorage.getItem(`${domain}-options`);
  if (!options) {
    return dispatch(optionsNotFound());
  }

  options = JSON.parse(options);
  const { salt, duration } = options;

  dispatch(requestCheckCommitRegistrar());

  const signer = await getSigner();
  const currentUserAccount = await signer.getAddress();

  try {
    const hashCommit = makeCommitment(
      domain, currentUserAccount, salt, duration, currentUserAccount,
    );

    dispatch(receiveCommitRegistrar(hashCommit, true));

    return dispatch(checkCanReveal(hashCommit, domain));
  } catch (error) {
    return dispatch(notifyError(error.message));
  }
};

export const revealCommit = domain => async (dispatch, getState) => {
  const { rifCost: cost } = getState().registrar;

  const hasEnough = await dispatch(hasEnoughRif(cost));
  if (!hasEnough) return dispatch(errorNotEnoughRIF());

  const callback = async () => {
    let options = localStorage.getItem(`${domain}-options`);
    if (!options) {
      return dispatch(optionsNotFound());
    }

    options = JSON.parse(options);
    const {
      salt, duration, rifCost,
    } = options;

    dispatch(requestRevealCommit());

    const signer = await getSigner();
    const currentUserAccount = await signer.getAddress();

    const Registrar = await registrar(signer);
    const durationBN = BigNumber.from(duration);
    const rifCostBN = ethers.utils.parseEther(rifCost.toString());

    try {
      const txHash = await Registrar.register(
        domain, currentUserAccount, salt, durationBN, rifCostBN,
      );

      localStorage.setItem(
        `${domain}-options`,
        JSON.stringify({
          ...options,
          registerHash: txHash,
        }),
      );

      dispatch(receiveRevealCommit());
      dispatch(revealTxMined(txHash));
      sendBrowserNotification(
        `${domain}.rsk`,
        'notifications_registrar_revealed',
      );

      localStorage.setItem('name', `${domain}.rsk`);
      localStorage.removeItem(`${domain}-options`);

      return true;
    } catch (error) {
      return dispatch(errorRevealCommit(error.message));
    }
  };

  return window.rLogin ? callback() : dispatch(start(callback));
};

export const checkIfAlreadyRegistered = (domain, intId) => async (dispatch) => {
  const options = JSON.parse(localStorage.getItem(`${domain}-options`));

  try {
    const txnResult = await provider.getTransactionReceipt(options.registerHash);
    let intervalId = intId;
    if (txnResult && txnResult.status) {
      clearInterval(intId);
      dispatch(revealTxMined());
      sendBrowserNotification(
        `${domain}.rsk`,
        'notifications_registrar_revealed',
      );
      localStorage.setItem('name', `${domain}.rsk`);
      localStorage.removeItem(`${domain}-options`);
    }
    if (!intervalId) {
      const checkAgain = () => dispatch(checkIfAlreadyRegistered(domain, intervalId));
      intervalId = setInterval(checkAgain, 5000);
    }
    return dispatch(requestRevealCommit());
  } catch (error) {
    return dispatch(notifyError(error.message));
  }
};

/**
 * All in one function to check if registration is in progress. If so, check if rLogin exists first!
 * This function is only continued if the browser was refreshed.
 * @param {string} domain Domain to be registered
 */
export const checkIfInProgress = domain => (dispatch) => {
  const options = localStorage.getItem(`${domain}-options`);
  const parsed = JSON.parse(options);

  // no domain registration is in process
  if (!options || parsed.setAtGetCost) {
    return dispatch(optionsNotFound());
  }

  const callback = () => {
    const parsedOptions = JSON.parse(options);

    // step 2, registering domain:
    if (parsedOptions.registerHash) {
      dispatch(receiveCommitRegistrar(parsedOptions.registerHash, true));
      dispatch(receiveCanRevealCommit(true));
      return dispatch(checkIfAlreadyRegistered(domain));
    }

    // Step 1, requesting domain:
    return dispatch(checkIfAlreadyCommitted(domain));
  };

  // if rLogin does not exist, start with the modal:
  return window.rLogin ? callback() : dispatch(start(callback));
};

export const checkIfRequiresCommitment = domain => async (dispatch, getState) => {
  dispatch(requestIsCommitmentRequired());

  const currentPartner = await getCurrentPartnerAddresses(getCurrentPartner());

  if (!currentPartner.config) {
    return dispatch(receiveIsCommitmentRequired(true));
  }

  const PartnerConfiguration = await partnerConfiguration();

  try {
    let minCommitmentAge = await PartnerConfiguration.getMinCommitmentAge();
    minCommitmentAge = minCommitmentAge.toNumber();

    const isCommitmentRequired = minCommitmentAge !== 0;

    if (!isCommitmentRequired) {
      const randomBytes = window.crypto.getRandomValues(new Uint8Array(32));
      const strSalt = Array.from(randomBytes)
        .map(byte => byte.toString(16))
        .join('');
      const salt = `0x${strSalt.padEnd(64, '0')}`;

      const { rifCost, duration } = getState().registrar;

      localStorage.setItem(
        `${domain}-options`,
        JSON.stringify({
          salt,
          duration,
          rifCost,
          contract: FIFS_ADDR_REGISTRER,
        }),
      );
    }

    return dispatch(receiveIsCommitmentRequired(isCommitmentRequired));
  } catch (error) {
    return dispatch(notifyError(error.message));
  }
};
