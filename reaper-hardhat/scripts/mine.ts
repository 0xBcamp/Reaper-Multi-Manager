const { ethers, network } = require("hardhat");

async function main() {
  for (let i = 0; i < 10; i++) {
    await network.provider.send("evm_mine");
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
