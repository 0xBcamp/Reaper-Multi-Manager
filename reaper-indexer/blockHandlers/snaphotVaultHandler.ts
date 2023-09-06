import {
  BlockHandler,
  Store,
} from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import {
  type Block,
  type PublicClient,
  Hex
} from "npm:viem";

import { Logger } from "https://deno.land/std@0.181.0/log/mod.ts";
import { VAULT_V2_ABI } from "../abi/vaultV2Abi.ts";
import { Vault } from "../entities/Vault.ts";
import { VaultSnapshot } from "../entities/VaultSnapshot.ts";

const DAY = 60 * 60 * 24;
const nearestDay = (now: number) => {
  return Math.floor(now / DAY) * DAY;
};

export const snaphotVaultHandler: BlockHandler = async (
  { block, client, store, logger }: {
    block: Block;
    client: PublicClient;
    store: Store;
    logger: Logger;
  },
) => {
  const now = Number(block.timestamp);
  const nowDay = nearestDay(Number(now));

  const vaults = await Vault.find();
  logger.info(`Vaults found: ${vaults.length}`)
  await Promise.all(vaults.map(async (vault) => {
    try {
      const [totalIdleResult, totalAllocatedResult] = await client.multicall({
        contracts: [
          { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalIdle" },
          { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalAllocated" },
        ],
        blockNumber: block.number!
      });

      const currentSnapshot = await VaultSnapshot.findOne({
        timestamp: nowDay,
        vaultAddress: vault.address.toString(),
      });

      if (!currentSnapshot) {
        const snapshot = new VaultSnapshot({
          timestamp: nowDay,
          vault: vault,
          vaultAddress: vault.address.toString(),
          totalIdle: totalIdleResult.status === "success" ? totalIdleResult.result.toString() : "0",
          totalAllocated: totalAllocatedResult.status === "success" ? totalAllocatedResult.result.toString() : "0",
          chainId: vault.chainId
        });

        snapshot.save();
      } else {
        currentSnapshot.totalIdle = totalIdleResult.status === "success" ? totalIdleResult.result.toString() : "0";
        currentSnapshot.totalAllocated = totalAllocatedResult.status === "success" ? totalAllocatedResult.result.toString() : "0";

        currentSnapshot.save();
      }
    } catch (error) {
      logger.error(error);
    }
  }));


  // const trans = block.transactions as `0x${string}`[];

  // //trans.filter;
  // const deploymentTransactions =
  //   (block.transactions as Transaction<bigint, number, boolean>[]).filter((x) =>
  //     x.from === "0x6539519e69343535a2af6583d9bae3ad74c6a293"
  //   );

  // await Promise.all(deploymentTransactions.map(async (tx) => {
  //   //console.log(tx);
  //   const contractAddress = getContractAddress({
  //     from: tx.from,
  //     nonce: BigInt(tx.nonce),
  //   });

  //   console.log("deployed contract address", contractAddress);

  // const bytecode = await client.getBytecode({
  //   address: contractAddress,
  // });


  // try {
  //   const vault = await client.readContract({
  //     abi: VAULT_V2_ABI,
  //     address: contractAddress,
  //     functionName: "totalIdle",
  //     blockNumber: block.number!,
  //   })

  //   const [nameResult, symbolResult ] = await client.multicall({
  //     contracts: [
  //       { abi: VAULT_V2_ABI, address: contractAddress, functionName: "name" },
  //       { abi: VAULT_V2_ABI, address: contractAddress, functionName: "symbol" },
  //     ],
  //     blockNumber: block.number!,
  //   })


  //   const newVault = new Vault({
  //     address: contractAddress,
  //     name: nameResult.status === "success" ? nameResult.result : "",
  //     symbol: symbolResult.status === "success" ? symbolResult.result : "",
  //   })

  //   newVault.save();

  //   console.log("vault saved", newVault)

  // } catch (error) {
  //   console.log("strategy found")
  // }

  //}));

  //const
};
