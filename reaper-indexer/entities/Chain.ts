import { createEntity } from "../deps.ts";

export interface IChain {
  chainId: number;
  name: string;
}

export const Chain = createEntity<IChain>("Chain", {
  chainId: Number,
  name: String,
});
