import { ethers } from 'ethers';
import {
  requestDomainState, receiveDomainState,
  blockedDomain,
  requestDomainOwner, requestDomainCost, receiveDomainCost,
  setValidationMessage, setMinMaxDuration, setMinMaxLength,
  /* receiveDomainOwner */
} from './actions';
import { notifyError } from '../../notifications';
import { registrar, partnerConfiguration, getCurrentPartner } from '../../rns-sdk';


export default domain => async (dispatch) => {
  const Registrar = await registrar();
  const PartnerConfiguration = await partnerConfiguration();
  if (!domain) {
    return dispatch(receiveDomainState(''));
  }
  dispatch(requestDomainState(domain));

  try {
    const available = await Registrar.available(domain);
    if (!available) {
      dispatch(receiveDomainState(false));
      dispatch(requestDomainOwner());

    // N.B: Previously the Auction registrar and the deed
    // contract are called (investigate more details why)
    }

    dispatch(requestDomainCost());

    const fetchMinDuration = PartnerConfiguration.getMinDuration();
    const fetchMaxDuration = PartnerConfiguration.getMaxDuration();
    const fetchMinLength = PartnerConfiguration.getMinLength();
    const fetchMaxLength = PartnerConfiguration.getMaxLength();

    const [minDuration, maxDuration, minLength, maxLength] = await Promise.all([
      fetchMinDuration, fetchMaxDuration, fetchMinLength, fetchMaxLength,
    ]);

    if (domain.length < minLength.toNumber() || domain.length > maxLength.toNumber()) {
      let errorMsg;
      const partnerId = getCurrentPartner();

      if (partnerId === 'default') {
        errorMsg = 'default';
      } else {
        errorMsg = 'partner';
      }
      dispatch(setMinMaxLength(minLength.toNumber(), maxLength.toNumber()));
      dispatch(setValidationMessage(errorMsg));
      return dispatch(blockedDomain());
    }

    dispatch(setMinMaxDuration(minDuration.toNumber(), maxDuration.toNumber()));
    dispatch(setMinMaxLength(minLength.toNumber(), maxLength.toNumber()));

    const price = await Registrar.price(domain, minDuration.toNumber());
    const rifCost = ethers.utils.formatUnits(price, 18);
    dispatch(receiveDomainCost(rifCost));
    dispatch(receiveDomainState(available));
  } catch (error) {
    dispatch(notifyError(error.message));
  }

  return true;
};
