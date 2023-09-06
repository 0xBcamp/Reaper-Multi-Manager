import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IChain } from "./Chain.ts";

export interface IVault {
  address: string;
  name: string;
  symbol: string;
  chainId: number;
  chain: IChain;
  deposits: string;
  withdrawals: string;
  depositCount: string;
  withdrawCount: string;
}

export const Vault = createEntity<IVault>("Vault", {
  address: String,
  name: String,
  symbol: String,
  chainId: Number,
  chain: { type: Types.ObjectId, ref: 'Chain'},
  deposits: String,
  withdrawals: String,
  depositCount: String,
  withdrawCount: String
});
