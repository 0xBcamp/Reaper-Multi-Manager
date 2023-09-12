import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IChain } from "./Chain.ts";
import { IVaultSnapshot } from "./VaultSnapshot.ts";
import { IStrategy } from "./Strategy.ts";
import { IVaultTransaction } from "./VaultTransaction.ts";

export interface IVault {
  address: string;
  name: string;
  symbol: string;
  asset: string;
  chainId: number;
  chain: IChain;
  dateAdded: number;
  lastSnapShot: IVaultSnapshot;
}

export const Vault = createEntity<IVault>("Vault", {
  address: String,
  name: String,
  symbol: String,
  asset: String,
  chainId: Number,
  chain: { type: Types.ObjectId, ref: 'Chain'},
  dateAdded: Number,
  lastSnapShot: { type: Types.ObjectId, ref: 'VaultSnapshot'},
});
