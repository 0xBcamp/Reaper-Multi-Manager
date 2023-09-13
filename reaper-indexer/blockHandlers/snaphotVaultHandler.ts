import { BlockHandler, Store } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import {
  type Block,
  type PublicClient,
  Hex
} from "npm:viem";

import { Logger } from "https://deno.land/std@0.181.0/log/mod.ts";
import { VAULT_V2_ABI } from "../abi/vaultV2Abi.ts";
import { Vault } from "../entities/Vault.ts";
import { VaultSnapshot } from "../entities/VaultSnapshot.ts";
import { VaultTransaction, VaultTransactionEnum } from "../entities/VaultTransaction.ts";

const DAY = 60 * 60 * 24;
const nearestDay = (now: number) => {
  return Math.floor(now / DAY) * DAY;
};

function sleepSecs(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

  const vaultTransactions = await VaultTransaction.find();

  try {
    await Promise.all(vaults.map(async (vault) => {
      try {
        const [
          totalIdleResult, 
          totalAllocatedResult,
          pricePerFullShareResult,
          lockedProfitResult,
          totalAssetsResult,
          totalSupplyResult,
        ] = await client.multicall({
          contracts: [
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalIdle" },
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalAllocated" },
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "getPricePerFullShare" },
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "lockedProfit" },
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalAssets" },
            { abi: VAULT_V2_ABI, address: vault.address as Hex, functionName: "totalSupply" },
          ],
          blockNumber: block.number!
        });
  
        // Filter transactions for the given vault
        const deposits = vaultTransactions.filter(tx => tx.vaultAddress.toLowerCase() === vault.address.toLowerCase() && tx.transactionType === VaultTransactionEnum.Deposit);
        const withdrawals = vaultTransactions.filter(tx => tx.vaultAddress.toLowerCase() === vault.address.toLowerCase() && tx.transactionType === VaultTransactionEnum.Withdraw);
  
        // Sum up assets
        const totalDeposits = deposits.reduce((sum, tx) => {
          return sum + BigInt(tx.assets);
        }, BigInt(0));
  
        const totalWithdrawals = withdrawals.reduce((sum, tx) => {
          return sum + BigInt(tx.assets);
        }, BigInt(0));
  
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
            pricePerFullShare: pricePerFullShareResult.status === "success" ? pricePerFullShareResult.result.toString() : "0",
            lockedProfit: lockedProfitResult.status === "success" ? lockedProfitResult.result.toString() : "0",
            totalAssets: totalAssetsResult.status === "success" ? totalAssetsResult.result.toString() : "0",
            totalSupply: totalSupplyResult.status === "success" ? totalSupplyResult.result.toString() : "0",
            deposits: totalDeposits.toString(),
            withdrawals: totalWithdrawals.toString(),
            depositCount: deposits?.length,
            withdrawCount: withdrawals?.length,
          });
  
          const snap = await snapshot.save();
  
          vault.lastSnapShot = snap;
          await vault.save();
  
        } else {
          currentSnapshot.totalIdle = totalIdleResult.status === "success" ? totalIdleResult.result.toString() : currentSnapshot.totalIdle;
          currentSnapshot.totalAllocated = totalAllocatedResult.status === "success" ? totalAllocatedResult.result.toString() : currentSnapshot.totalAllocated;
          currentSnapshot.pricePerFullShare = pricePerFullShareResult.status === "success" ? pricePerFullShareResult.result.toString() : currentSnapshot.pricePerFullShare,
          currentSnapshot.lockedProfit = lockedProfitResult.status === "success" ? lockedProfitResult.result.toString() : currentSnapshot.lockedProfit,
          currentSnapshot.totalAssets = totalAssetsResult.status === "success" ? totalAssetsResult.result.toString() : currentSnapshot.totalAssets,
          currentSnapshot.totalSupply = totalSupplyResult.status === "success" ? totalSupplyResult.result.toString() : currentSnapshot.totalSupply,
          currentSnapshot.deposits = totalDeposits.toString();
          currentSnapshot.withdrawals = totalWithdrawals.toString();
          currentSnapshot.depositCount = deposits?.length;
          currentSnapshot.withdrawCount = withdrawals?.length;

          const snap = await currentSnapshot.save();
          vault.lastSnapShot = snap;
          await vault.save();
        }
      } catch (error) {
        sleepSecs(60000);
        logger.error(error);
      }
    }));
  } catch (error) {
    sleepSecs(60000);
    logger.error(error);
  }
};
