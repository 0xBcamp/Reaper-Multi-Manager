import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://mainnet.optimism.io",
        blockNumber: 110453430
      },
      mining: {
        auto: true
      }
    }
  },
  solidity: "0.8.9",
};

export default config;
