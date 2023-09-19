import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";
import { IChain } from "./Chain.ts";

export interface IVault {
  address: string;
  name: string;
  symbol: string;
  asset: string;
  chainId: number;
  chain: IChain;
  constructionTime: number;
  token: string;
  decimals: number;
}

export const Vault = createEntity<IVault>("Vault", {
  address: String,
  name: String,
  symbol: String,
  asset: String,
  chainId: Number,
  chain: { type: Types.ObjectId, ref: 'Chain'},
  constructionTime: Number,
  token: String,
  decimals: Number,
});
