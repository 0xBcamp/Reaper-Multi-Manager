import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IVault } from "./Vault.ts";
import { IChain } from "./Chain.ts";

export enum VaultTransactionEnum {
  Deposit = "Deposit",
  Withdraw = "Withdraw"
}

export interface IVaultTransaction {
  block: number;
  hash: string;
  transactionType: VaultTransactionEnum;
  assets: string;
  shares: string;
  vaultAddress: string; 
  vault: IVault;
  chainId: number;
  chain: IChain;
  sender: string;
  owner: string;
  receiver: string;
  dateExecuted: number;
}

export const VaultTransaction = createEntity<IVaultTransaction>("VaultTransaction", {
  block: {
    type: Number,
    index: true,
  },
  hash: String,
  transactionType: String,
  assets: String,
  shares: String,
  vaultAddress: String, 
  vault: { type: Types.ObjectId, ref: 'Vault' },
  chainId: Number,
  chain: { type: Types.ObjectId, ref: 'Chain'},
  sender: String,
  owner: String,
  receiver: String,
  dateExecuted: { type: Number, index: true },
});
