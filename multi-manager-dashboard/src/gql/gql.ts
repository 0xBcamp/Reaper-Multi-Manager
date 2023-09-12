/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query ChainList {\n  Chains {\n    _id\n    chainId\n    name\n  }\n}": types.ChainListDocument,
    "query VaultList {\n  Vaults {\n    address\n    asset\n    chain {\n      chainId\n      name\n    }\n    dateAdded\n    name\n    symbol\n    lastSnapShot {\n      depositCount\n      deposits\n      lockedProfit\n      pricePerFullShare\n      timestamp\n      totalAllocated\n      totalAssets\n      totalIdle\n      totalSupply\n      vaultAddress\n      withdrawCount\n      withdrawals\n    }\n  }\n}": types.VaultListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ChainList {\n  Chains {\n    _id\n    chainId\n    name\n  }\n}"): typeof import('./graphql').ChainListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VaultList {\n  Vaults {\n    address\n    asset\n    chain {\n      chainId\n      name\n    }\n    dateAdded\n    name\n    symbol\n    lastSnapShot {\n      depositCount\n      deposits\n      lockedProfit\n      pricePerFullShare\n      timestamp\n      totalAllocated\n      totalAssets\n      totalIdle\n      totalSupply\n      vaultAddress\n      withdrawCount\n      withdrawals\n    }\n  }\n}"): typeof import('./graphql').VaultListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
