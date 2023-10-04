import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://mainnet.optimism.io",
        blockNumber: 110402510
      }
    }
  },
  solidity: "0.8.4",
};

export default config;
