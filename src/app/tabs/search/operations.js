import { BigNumber } from 'ethers';
import {
  requestDomainState, receiveDomainState,
  blockedDomain,
  requestDomainOwner, requestDomainCost, receiveDomainCost,
  setValidationMessage, setMinMaxDuration, setMinMaxLength,
  /* receiveDomainOwner */
} from './actions';
import {
  getCurrentPartnerAddresses,
} from '../../adapters/configAdapter';
import { notifyError } from '../../notifications';
import { registrar, partnerConfiguration } from '../../rns-sdk';

export default (domain, partnerId) => async (dispatch) => {
  const partnerAddresses = await getCurrentPartnerAddresses(partnerId);
  const Registrar = registrar(partnerAddresses.account);
  const PartnerConfiguration = partnerConfiguration(partnerAddresses.config);
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }
  dispatch(requestDomainState(domain));

  let available = false;
  try {
    available = await Registrar.available(domain);
  } catch (error) {
    dispatch(notifyError(error.message));
  }

  if (!available) {
    dispatch(receiveDomainState(false));
    dispatch(requestDomainOwner());

    // N.B: Previously the Auction registrar and the deed
    // contract are called (investigate more details why)
  }

  dispatch(requestDomainCost());

  try {
    const fetchMinDuration = PartnerConfiguration.getMinDuration();
    const fetchMaxDuration = PartnerConfiguration.getMaxDuration();
    const fetchMinLength = PartnerConfiguration.getMinLength();
    const fetchMaxLength = PartnerConfiguration.getMaxLength();

    const [minDuration, maxDuration, minLength, maxLength] = await Promise.all([
      fetchMinDuration, fetchMaxDuration, fetchMinLength, fetchMaxLength,
    ]);

    if (domain.length < minLength || domain.length > maxLength) {
      let errorMsg;
      if (partnerId === 'default') {
        errorMsg = 'default';
      } else {
        errorMsg = 'partner';
      }
      dispatch(setValidationMessage(errorMsg));
      return dispatch(blockedDomain());
    }

    dispatch(setMinMaxDuration(minDuration.toNumber(), maxDuration.toNumber()));
    dispatch(setMinMaxLength(minLength.toNumber(), maxLength.toNumber()));

    const price = await Registrar.price(domain, minDuration.toNumber());
    const rifCost = price.div(BigNumber.from(10).pow(18));
    dispatch(receiveDomainCost(rifCost.toNumber()));
    dispatch(receiveDomainState(available));
  } catch (error) {
    dispatch(notifyError(error.message));
  }
  return available;
};
