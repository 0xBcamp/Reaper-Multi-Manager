import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IStrategy } from "./Strategy.ts";
import { IVaultTransaction } from "./VaultTransaction.ts";
import { IVault } from "./Vault.ts";
import { IChain } from "./Chain.ts";

export interface IVaultSnapshot {
  timestamp: number,
  vaultAddress: string;
  vault: IVault;
  totalIdle: string;
  totalAllocated: string;
  chainId: number;
}

export const VaultSnapshot = createEntity<IVaultSnapshot>("VaultSnapshot", {
  timestamp: { type: Number, index: true },
  vault: { type: Types.ObjectId, ref: 'Vault' },
  vaultAddress: String,
  totalIdle: String,
  totalAllocated: String,
  chainId: Number,
});
