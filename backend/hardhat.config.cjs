require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_KEY}`,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
    },
  },
};