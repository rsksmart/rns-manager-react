export const networkSelector = network => {
  switch (network) {
    case '30': return 'RSK MainNet'
    case '31': return 'RSK TestNet'
    default: return 'Invalid'
  }
};
