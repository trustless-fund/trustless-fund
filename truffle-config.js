const path = require("path");
const keys = require('./keys');
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(keys.privKey, `https://ropsten.infura.io/v3/${keys.infura}`);
      },
      network_id: 3
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(keys.privKey, `https://rinkeby.infura.io/v3/${keys.infura}`);
      },
      network_id: 4
    },
    mainnet: {
      provider: () => {
        return new HDWalletProvider(keys.privKey, `https://mainnet.infura.io/v3/${keys.infura}`);
      },
      network_id: 1
    }
  }
};
