import { rns as registry } from './configAdapter';

export const getOptions = () => {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
    case 'testing':
      return {
        contractAddresses: {
          registry,
        },
      };
    default: return {};
  }
};
