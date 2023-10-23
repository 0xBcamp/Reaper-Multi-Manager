const { ethers, network } = require("hardhat");
import { ReaperBaseStrategyV4 } from '../abi/ReaperBaseStrategyV4';
import OPAbi from '../abi/op_abi.json';
import { VAULT_V2_ABI } from '../abi/vaultV2Abi';
import wBTCAbi from '../abi/wbtc_abi.json';

async function main() {


  const ETHOS_WBTC_VAULT = "0xef82200DC96a14af76f5fB7f27DbaDB5228f6A0C"
  const ETHOS_WBTC_VAULT_STRAT2 = "0x10eAC0A3579a482B1B4Fb9eedd16a7E0a19dCB07"

  const ETHOS_ADMIN_ADDRESS = "0x9BC776dBb134Ef9D7014dB1823Cd755Ac5015203";
  const ETHOS_WBTC_VAULT_STRAT2_ADMIN_ADDRESS = "0x9BC776dBb134Ef9D7014dB1823Cd755Ac5015203";

  const [account1] = await ethers.getSigners();

  console.log("account1", account1.address)

  const ethosAdmin = await ethers.getImpersonatedSigner(ETHOS_ADMIN_ADDRESS);
  const ethosStratAdmin = await ethers.getImpersonatedSigner(ETHOS_ADMIN_ADDRESS);

  await account1.sendTransaction({
    to: ETHOS_ADMIN_ADDRESS,
    value: ethers.parseEther('1')
  });

  await account1.sendTransaction({
    to: ETHOS_WBTC_VAULT_STRAT2_ADMIN_ADDRESS,
    value: ethers.parseEther('1')
  });

  let vaultContract = new ethers.Contract(ETHOS_WBTC_VAULT, VAULT_V2_ABI, ethosAdmin);
  let stratContract = new ethers.Contract(ETHOS_WBTC_VAULT_STRAT2, ReaperBaseStrategyV4, ethosStratAdmin);


  const role = "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42"
  const strat_keeper_role = "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42"

  // console.log("ADMIN_ROLE", ADMIN_ROLE)

  await vaultContract.connect(ethosAdmin).grantRole(role, account1);
  console.log(`Granted ADMIN role to ${account1.address}`);

  await stratContract.connect(ethosStratAdmin).grantRole(strat_keeper_role, account1);
  console.log(`Granted KEEPER role to ${account1.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
