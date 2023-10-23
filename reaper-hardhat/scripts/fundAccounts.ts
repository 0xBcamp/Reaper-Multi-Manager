const { ethers, network } = require("hardhat");
import OPAbi from '../abi/op_abi.json';
import wBTCAbi from '../abi/wbtc_abi.json';

async function main() {
  const TOKEN_ADDRESS_OP = "0x4200000000000000000000000000000000000042";
  const TOKEN_ADDRESS_WBTC = "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
  const TOKEN_ADDRESS_WETH = "";

  const WHALE_OP_ADDRESS = "0xEbe80f029b1c02862B9E8a70a7e5317C06F62Cae"
  const WHALE_WBTC_ADDRESS = "0x69bAdF095B03d62e97445EB0142e6488d19fF38B"

  const [account1] = await ethers.getSigners();

  const opWhale = await ethers.getImpersonatedSigner(WHALE_OP_ADDRESS);
  const wbtcWhale = await ethers.getImpersonatedSigner(WHALE_WBTC_ADDRESS);

  let op = new ethers.Contract(TOKEN_ADDRESS_OP, OPAbi, account1);
  let wbtc = new ethers.Contract(TOKEN_ADDRESS_WBTC, wBTCAbi, account1);

  const balance = await wbtc.balanceOf(account1.address);
  console.log("balance", balance)

  await account1.sendTransaction({
    to: WHALE_WBTC_ADDRESS,
    value: ethers.parseEther('1')
  });

  // await wbtc.connect(wbtcWhale).approve(wbtcWhale.address, "10000000");
  // await wbtc.connect(wbtcWhale).transfer(account1.address, "10000000");

  await op.connect(opWhale).approve(opWhale.address, "50000000000000000000000");
  await op.connect(opWhale).transfer(account1.address, "50000000000000000000000");

  const newbalance = await wbtc.balanceOf(account1.address);
  const newbalanceop = await op.balanceOf(account1.address);
  console.log("newbalance", newbalance)
  console.log("newbalanceop", newbalanceop)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
