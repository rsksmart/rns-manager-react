const estimateGas = async (contractMethod) => {
  const estimated = await contractMethod.estimateGas();
  return Math.floor(estimated * 1.1);
};

export default estimateGas;
