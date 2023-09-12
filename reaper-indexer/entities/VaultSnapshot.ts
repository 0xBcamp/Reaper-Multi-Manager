import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IVault } from "./Vault.ts";

export interface IVaultSnapshot {
  timestamp: number,
  vaultAddress: string;
  vault: IVault;
  totalIdle: string;
  totalAllocated: string;
  chainId: number;
  deposits: string;
  withdrawals: string;
  depositCount: number;
  withdrawCount: number;
  // addresses: {
  //   admin: string;
  //   gaurdian: string;
  //   strategist: string;
  //   treasury: string;
  // };
  // asset: string;
  // availableCapital: string;
  // balance: string;
  pricePerFullShare: string;
  lockedProfit: string;
  // lockedProfitDegradation: string;
  // token: string;
  // totalAllocBPS: string;
  totalAssets: string;
  totalSupply: string;
  // tvlCap: string;
  // withdrawalQue: string[];
}



export const VaultSnapshot = createEntity<IVaultSnapshot>("VaultSnapshot", {
  timestamp: { type: Number, index: true },
  vault: { type: Types.ObjectId, ref: 'Vault' },
  vaultAddress: String,
  totalIdle: String,
  totalAllocated: String,
  chainId: Number,
  deposits: String,
  withdrawals: String,
  depositCount: Number,
  withdrawCount: Number,
  // addresses: {
  //   admin: String,
  //   gaurdian: String,
  //   strategist: String,
  //   treasury: String,
  // },
  // asset: String,
  // availableCapital: String,
  // balance: String,
  pricePerFullShare: String,
  lockedProfit: String,
  // lockedProfitDegradation: String,
  // token: String,
  // totalAllocBPS: String,
  totalAssets: String,
  totalSupply: String,
  // tvlCap: String,
  // withdrawalQue: [String],
});
