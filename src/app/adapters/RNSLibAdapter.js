import { rns as registry } from './configAdapter';

// eslint-disable-next-line import/prefer-default-export
export const getOptions = () => {
  switch (import.meta.env.VITE_ENVIRONMENT) {
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
