import Nodes from '../../config/nodes.json';

const env = process.env.REACT_APP_ENVIRONMENT ? process.env.REACT_APP_ENVIRONMENT : 'production';

export const getNode = () => {
  switch (env) {
    case 'local':
      return Nodes.local;
    case 'test':
      return Nodes.rskTest;
    case 'production':
    default:
      return Nodes.rskMain;
  }
};

export const rskNode = getNode();
