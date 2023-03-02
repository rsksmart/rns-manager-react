import { rns as registry } from './configAdapter';

// eslint-disable-next-line import/prefer-default-export
export const getOptions = () => {
  switch (process.env.REACT_APP_ENVIRONMENT) {
    case 'local':
    case 'testing':
      return {
        contractAddresses: {
          registry,
        },
      };
    default: return {
      contractAddresses: {
        registry,
      },
    };
  }
};
