import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IVault } from "./Vault.ts";
import { IChain } from "./Chain.ts";
import { IStrategyReport } from "./StrategyReport.ts";

export interface IStrategy {
  block: number;
  hash: string;
  address: string;
  vaultAddress: string;
  vault: IVault;
  feeBPS: string;
  allocBPS: string;
  dateAdded?: number;
  dateRevoked?: number;
  isActive: boolean;
  chainId: number;
  chain: IChain;
  reports: IStrategyReport[];
}

export const Strategy = createEntity<IStrategy>("Strategy", {
  block: {
    type: Number,
    index: true,
  },
  hash: String,
  address: String,
  vaultAddress: String,
  feeBPS: String,
  allocBPS: String,
  dateAdded: Number,
  dateRevoked: Number,
  isActive: Boolean,
  vault: { type: Types.ObjectId, ref: 'Vault'},
  chainId: Number,
  chain: { type: Types.ObjectId, ref: 'Chain'},
  reports: [{ type: Types.ObjectId, ref: 'StrategyReport'}],
});
