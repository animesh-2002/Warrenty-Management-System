require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/d-yzortyRcKbZBz9UWR5q3uLMk39oz6K",
      chainId: 80001,
      gas: 6000000,
      gasPrice: 10000000000,
      accounts: [
        "df338747cd314cd64589d9bfec4ce67fc147f97533ae2cbf0243bdd1bff87b93",
      ],
    },
  },
  solidity: "0.8.3",
};
