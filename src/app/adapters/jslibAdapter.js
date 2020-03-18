import { rns as rnsAddress } from './configAdapter';

export default () => {
  if (process.env.REACT_APP_ENVIRONMENT === 'local') {
    return {
      contractAddresses: {
        registry: rnsAddress,
      },
    };
  }
  return {};
};
