import { Store } from "https://deno.land/x/robo_arkiver@v0.4.21/mod.ts";
import { PublicClient } from "https://deno.land/x/robo_arkiver@v0.4.21/src/deps.ts";
import { Chain, IChain } from "../entities/Chain.ts";
import { CHAINS } from "../utils/chains.ts";
import { Vault } from "../entities/Vault.ts";
import { VAULT_V2_ABI } from "../abi/vaultV2Abi.ts";
import { Hex } from "npm:viem";
import { Strategy } from "../entities/Strategy.ts";
import { User } from "../entities/User.ts";


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

export const getChainOrCreate = async (store: Store, chainId: number) => {
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

    chainDB = await chainDB.save();
    store.set(`${chainId}:chain`, chainDB);
  }

  return chainDB;
}

// deno-lint-ignore no-explicit-any
export const getVaultOrCreate = async (client: PublicClient, event: any, contractAddress: string, chain: IChain) => {
  let vault = await Vault.findOne({ address: contractAddress, chainId: chain.chainId });

  if (!vault) {
    const [nameResult, symbolResult, assetRes, constructionTimeRes, tokenRes, decimalsRes] = await client.multicall({
      contracts: [
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "name" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "symbol" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "asset" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "constructionTime" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "token" },
        { abi: VAULT_V2_ABI, address: contractAddress as Hex, functionName: "decimals" },
      ],
      blockNumber: event.blockNumber!,
    });

    vault = new Vault({
      address: contractAddress,
      name: nameResult.status === "success" ? nameResult.result : "",
      symbol: symbolResult.status === "success" ? symbolResult.result : "",
      asset: assetRes.status === "success" ? assetRes.result : "",
      chainId: chain.chainId,
      chain,
      constructionTime: constructionTimeRes.status === "success" ? Number(constructionTimeRes.result) : 0,
      token: tokenRes.status === "success" ? tokenRes.result : "",
      decimals: decimalsRes.status === "success" ? decimalsRes.result : 0,
    });

    vault = await vault.save();
  }

  return vault;
}

export const getUserOrCreate = async (store: Store, address: string, timestamp: number) => {
  let userDB = await store.retrieve(
    `${address}:user`,
    async () => {
      const user = await User.findOne({ address });
      store.set(`${address}:user`, user);
      return user;
    },
  );


  if (!userDB) {
    userDB = new User({
      address,
      dateAdded: timestamp
    });

    userDB = await userDB.save();
    store.set(`${address}:user`, userDB);
  }

  return userDB;
}

export const getStrategy = async (vaultAddress: string, strategyAddress: string) => {
  return await Strategy.findOne({ address: strategyAddress, vaultAddress });
}

export const isVaultWhitelisted = async (store: Store, vaultAddress: string, chainId: number) => {
  const response = await fetch("https://reaper-api.onrender.com/api/vaults");
  if (!response.ok) {
    return []
  }

  const dbVaults: DBVault[] = await response.json();

  return dbVaults.some(vault => vault.address.toLowerCase() === vaultAddress.toLowerCase() && vault.chainId === chainId);
}