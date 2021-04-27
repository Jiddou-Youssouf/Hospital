const HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

// Truffle develop config
/* module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },    
    rinkeby:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.REMOTE_NODE),
      network_id: 4
    }  
  },

  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: { 
    }
  }
} */

// Ganache config
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "5777" // Match any network id
    },    
    rinkeby:{
      provider: () => new HDWalletProvider(process.env.MNEMONIC,process.env.REMOTE_NODE),
      network_id: 4
    }  
  },

  mocha: {
    // timeout: 100000
  },
  compilers: {
    solc: {
      
    }
  }
};