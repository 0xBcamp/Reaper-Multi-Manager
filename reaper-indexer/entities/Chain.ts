import { Types } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { createEntity } from "../deps.ts";

export interface IChain {
  chainId: number;
  name: string;
}

export const Chain = createEntity<IChain>("Chain", {
  chainId: Number,
  name: String,
});
