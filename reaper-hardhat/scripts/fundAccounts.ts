const { ethers, network } = require("hardhat");
import OPAbi from '../abi/op_abi.json';
import wBTCAbi from '../abi/wbtc_abi.json';

async function main() {
  const TOKEN_ADDRESS_OP = "0x4200000000000000000000000000000000000042";
  const TOKEN_ADDRESS_WBTC = "0x68f180fcCe6836688e9084f035309E29Bf0A2095";
  const TOKEN_ADDRESS_WETH = "0x4200000000000000000000000000000000000006";

  const WHALE_OP_ADDRESS = "0xEbe80f029b1c02862B9E8a70a7e5317C06F62Cae"
  const WHALE_WBTC_ADDRESS = "0x69bAdF095B03d62e97445EB0142e6488d19fF38B"
  const WHALE_WETH_ADDRESS = "0x7E6BEE8157aCeB2CBAaa74868f99a369f9E5d4c1"

  const [account1, account2] = await ethers.getSigners();

  const opWhale = await ethers.getImpersonatedSigner(WHALE_OP_ADDRESS);
  const wbtcWhale = await ethers.getImpersonatedSigner(WHALE_WBTC_ADDRESS);
  const wethWhale = await ethers.getImpersonatedSigner(WHALE_WETH_ADDRESS);

  let op = new ethers.Contract(TOKEN_ADDRESS_OP, OPAbi, account1);
  let wbtc = new ethers.Contract(TOKEN_ADDRESS_WBTC, wBTCAbi, account1);
  let weth = new ethers.Contract(TOKEN_ADDRESS_WETH, wBTCAbi, account1);

  const balance = await weth.balanceOf(account1.address);
  console.log("balance", balance)

  await account1.sendTransaction({
    to: WHALE_WBTC_ADDRESS,
    value: ethers.parseEther('1')
  });

  await account1.sendTransaction({
    to: WHALE_WETH_ADDRESS,
    value: ethers.parseEther('1')
  });

  // await wbtc.connect(wbtcWhale).approve(wbtcWhale.address, "10000000");
  // await wbtc.connect(wbtcWhale).transfer(account1.address, "10000000");

  await op.connect(opWhale).approve(opWhale.address, "50000000000000000000000");
  await op.connect(opWhale).transfer(account1.address, "50000000000000000000000");

  await weth.connect(wethWhale).approve(wethWhale.address, "4000000000000000000");
  await weth.connect(wethWhale).transfer(account1.address, "4000000000000000000");

  await weth.connect(wethWhale).approve(wethWhale.address, "1000000000000000000");
  await weth.connect(wethWhale).transfer(account2.address, "1000000000000000000");

  const newbalance = await wbtc.balanceOf(account1.address);
  const newbalanceop = await op.balanceOf(account1.address);
  const newbalanceweth = await weth.balanceOf(account1.address);
  const newbalanceweth2 = await weth.balanceOf(account2.address);
  console.log("newbalance", newbalance)
  console.log("newbalanceop", newbalanceop)
  console.log("newbalanceweth", newbalanceweth)
  console.log("newbalanceweth2", newbalanceweth2)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
