import Web3 from 'web3';
import RNS from '@rsksmart/rns';

import { rns } from './configAdapter';

export default () => {
  const web3 = new Web3(process.env.REACT_APP_NODE);
  let options = {};

  if (process.env.REACT_APP_ENVIRONMENT === 'local') {
    options = {
      contractAddresses: {
        registry: rns,
      },
    };
  }

  return new RNS(web3, options);
};
