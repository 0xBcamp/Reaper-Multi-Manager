import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IVault } from "./Vault.ts";
import { IStrategy } from "./Strategy.ts";

export interface IStrategyReport {
  block: number;
  hash: string;
  reportDate: number;
  strategyAddress: string;
  strategy: IStrategy;
  vaultAddress: string; 
  vault: IVault;
  gain: string;
  loss: string;
  debtPaid: string;
  gains: string;
  losses: string;
  allocated: string;
  allocationAdded: string;
  allocBPS: string;
  duration: number;
}

export const StrategyReport = createEntity<IStrategyReport>("StrategyReport", {
  block: {
    type: Number,
    index: true,
  },
  hash: String,
  reportDate: Number,
  strategyAddress: String, 
  strategy: { type: Types.ObjectId, ref: 'Strategy' },
  vaultAddress: String, 
  vault: { type: Types.ObjectId, ref: 'Vault' },
  gain: String,
  loss: String,
  debtPaid: String,
  gains: String,
  losses: String,
  allocated: String,
  allocationAdded: String,
  allocBPS: String,
  duration: Number
});
