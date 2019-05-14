const RSK_MAINNET_CHAIN_ID = 30;
const RSK_TESTNET_CHAIN_ID = 31;

const RSK_MAINNET = {
  name: "RSK MainNet",
  rns: "0xcb868aeabd31e2b66f74e9a55cf064abb31a4ad5",
  registrar: "0x5269f5bc51cdd8aa62755c97229b7eeddd8e69a6",
  publicResolver: "0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a",
  multiChainResolver: "0x99a12be4c89cbf6cfd11d1f2c029904a7b644368",
  rif: "0x2acc95758f8b5f583470ba265eb685a8f45fc9d5",
  revealPeriod: 259200
};

const RSK_TESTNET = {
  name: "RSK TestNet",
  rns: "0x83355fcb41acbe3919e4ff73ecffc07a3147b7e8",
  registrar: "0xb0cf0517302acf52f967d0342827ff9c01d353f2",
  publicResolver: "0xf1143e2797bef4f8bd6059605e8134686efaa355",
  multiChainResolver: "0x0",
  rif: "0xd8c5adcac8d465c5a2d0772b86788e014ddec516",
  revealPeriod: 259200
};

export default (location) => {
  if (window && window.web3 && window.web3.version) {
    window.web3.version.getNetwork((err, netId) => {
      switch (Number(netId)) {
        case RSK_TESTNET_CHAIN_ID:
          console.log("testnet", location);
          return RSK_TESTNET;

        case RSK_MAINNET_CHAIN_ID:
          console.log("mainnet", location);
          return RSK_MAINNET;
        default:
          console.log("unknown", location);
          return { name: "UNKNOWN" };
      }
    });
  }
  console.log("notweb3", location);
  return { name: "NO WEB3" };
};
