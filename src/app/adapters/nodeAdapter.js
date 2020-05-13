export const getNode = () => (process.env.CIRCLECI ? 'http://0.0.0.0:8545' : process.env.REACT_APP_NODE);

export const rskNode = getNode();
