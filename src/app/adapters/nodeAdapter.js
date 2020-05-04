export const getNode = () => {
  if (process.env.CIRCLECI) {
    return 'http://0.0.0.0:8545';
  }
  return process.env.REACT_APP_NODE;
};

export const rskNode = getNode();
