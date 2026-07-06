export const getNode = () => (process.env.CIRCLECI ? 'http://0.0.0.0:8545' : import.meta.env.VITE_NODE);

export const rskNode = getNode();
