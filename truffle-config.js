const HDWalletProvider = require('@truffle/hdwallet-provider');
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
    advenced: {
      from: '',
    },
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none),
      from: '0x1191bcd21C66E37BC9d3a5545678717bDCa394EA'
     },
     ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`, 0),
      network_id: 3,
      gas: 8000000,
      gasPrice: 18000000000,
      timeoutBlocks: 5000000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  //  development: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  },
  //  test: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  }
  },
  //
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.11",    // Fetch exact version from solc-bin (default: truffle's version)
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
