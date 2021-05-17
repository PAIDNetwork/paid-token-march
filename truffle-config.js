const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infuraKey = process.env.INFURA_KEY;

module.exports = {
  plugins: [
    'truffle-contract-size'
  ],

  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none),
      from: '0x67F5B9e57EaE4f5f32E98BB7D7D1fb8F90AcFb45'
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraKey, 0),
      network_id: 4,
      gas: 8000000,
      gasPrice: 18000000000,
      timeoutBlocks: 5000000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      confirmations: 2    // # of confs to wait between deployments. (default: 0)
    },
     mainnet: {
      provider: () => new HDWalletProvider(mnemonic, infuraKey, 0),
      network_id: 1,
      gas: 2500000,
      gasPrice: 150e9,
      // confirmations: 2    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
		testnet: {
      provider: () => new HDWalletProvider(mnemonic, process.env.URL_TESTNET_BSC),
      network_id: 97,
			gas: 2500000,
      gasPrice: 60e9,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, process.env.URL_BSC),
      network_id: 56,
			gas: 2500000,
      gasPrice: 135e9,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  //
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      //  evmVersion: "byzantium"
      }
    }
  }
};
