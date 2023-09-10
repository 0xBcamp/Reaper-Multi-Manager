import { Store } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";
import { PublicClient } from "https://deno.land/x/robo_arkiver@v0.4.21/src/deps.ts";
import { Chain, IChain } from "../entities/Chain.ts";
import { CHAINS } from "../utils/chains.ts";
import { Vault } from "../entities/Vault.ts";
import { VAULT_V2_ABI } from "../abi/vaultV2Abi.ts";
import { Hex } from "npm:viem";
import { Strategy } from "../entities/Strategy.ts";

const env = await load();
const apiUrl = env["REAPER_API_URL"];

export type DBVault = {
  address: string;
  chainId: number;
  startingBlock: number;
}

export const getBlockTimestamp = async (client: PublicClient, store: Store, event: any) => {
  const timestamp = await store.retrieve(
    `${event.blockHash}:timestamp`,
    async () => {
      const block = await client.getBlock({ blockHash: event.blockHash })
      return Number(block.timestamp)
    },
  );

  return timestamp;
}

export const getChainOrCreate = async (store: Store, client: PublicClient) => {
  const chainId = await client.getChainId();

  let chainDB = await store.retrieve(
    `${chainId}:chain`,
    async () => {
      const chain = await Chain.findOne({ chainId });
      store.set(`${chainId}:chain`, chain);
      return chain;
    },
  );


  if (!chainDB) {
    const CHAIN = CHAINS.find(chain => chain.chainId === chainId);

    chainDB = new Chain({
      chainId: chainId,
      name: CHAIN ? CHAIN.name : "Unknown"
    });

    chainDB.save();
    store.set(`${chainId}:chain`, chainDB);
  }

  return chainDB;
}

// deno-lint-ignore no-explicit-any
export const getVaultOrCreate = async (client: PublicClient, event: any, contractAddress: string, chain: IChain, blockTimestamp: number) => {
  let vault = await Vault.findOne({ address: contractAddress, chainId: chain.chainId });

  if (!vault) {
    const [nameResult, symbolResult] = await client.multicall({
      contracts: [
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "name" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "symbol" },
      ],
      blockNumber: event.blockNumber!,
    });

    vault = new Vault({
      address: contractAddress,
      name: nameResult.status === "success" ? nameResult.result : "",
      symbol: symbolResult.status === "success" ? symbolResult.result : "",
      chainId: chain.chainId,
      chain,
      dateAdded: blockTimestamp
    });

    await vault.save();
  }

  return vault;
}

export const getStrategy = async (vaultAddress: string, strategyAddress: string) => {
  return await Strategy.findOne({ address: strategyAddress, vaultAddress });
}

export const isVaultWhitelisted = async(store: Store, vaultAddress: string) => {
  console.log("apiUrl", apiUrl)
  if (!apiUrl) {
    throw new Error("REAPER_API_URL environment variable is not set.");
  }

  const response = await fetch(apiUrl);
  if (!response.ok) {
    return []
  }

  const dbVaults: DBVault[] = await response.json();

  return dbVaults.some(vault => vault.address.toLowerCase() === vaultAddress.toLowerCase());
}