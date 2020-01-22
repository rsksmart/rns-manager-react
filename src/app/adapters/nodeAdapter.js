import Nodes from '../../config/nodes.json';

const env = process.env.REACT_APP_ENVIRONMENT ? process.env.REACT_APP_ENVIRONMENT : 'rskMain';

export const getNode = () => {
  console.log(`getting node envrionment ${Nodes[env]}`);
  return Nodes[env];
};

export const rskNode = getNode();
