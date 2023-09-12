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
    "query MyQuery {\n  StrategyReports(sort: BLOCK_DESC) {\n    _id\n    allocBPS\n    allocated\n    allocationAdded\n    block\n    debtPaid\n    duration\n    gain\n    gains\n    hash\n    loss\n    losses\n    reportDate\n    strategyAddress\n    vaultAddress\n  }\n}": types.MyQueryDocument,
    "query Strategys {\n  Strategys {\n    _id\n    address\n    allocBPS\n    block\n    chainId\n    dateAdded\n    dateRevoked\n    feeBPS\n    hash\n    isActive\n    vaultAddress\n  }\n}": types.StrategysDocument,
    "query VaultList {\n  Vaults {\n    _id\n    address\n    asset\n    chain {\n      _id\n      chainId\n      name\n    }\n    dateAdded\n    name\n    symbol\n    lastSnapShot {\n      _id\n      depositCount\n      deposits\n      lockedProfit\n      pricePerFullShare\n      timestamp\n      totalAllocated\n      totalAssets\n      totalIdle\n      totalSupply\n      vaultAddress\n      withdrawCount\n      withdrawals\n    }\n  }\n}": types.VaultListDocument,
    "query VaultSnapshots {\n  VaultSnapshots(sort: TIMESTAMP_DESC, limit: 0) {\n    _id\n    depositCount\n    deposits\n    lockedProfit\n    pricePerFullShare\n    timestamp\n    totalAllocated\n    totalAssets\n    totalIdle\n    totalSupply\n    vault {\n      _id\n      chainId\n    }\n    vaultAddress\n    withdrawCount\n    withdrawals\n  }\n}": types.VaultSnapshotsDocument,
    "query VaultTransactions {\n  VaultTransactions(sort: BLOCK_DESC, limit: 0) {\n    _id\n    assets\n    block\n    chainId\n    dateExecuted\n    hash\n    owner\n    receiver\n    sender\n    shares\n    transactionType\n    vaultAddress\n  }\n}": types.VaultTransactionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ChainList {\n  Chains {\n    _id\n    chainId\n    name\n  }\n}"): typeof import('./graphql').ChainListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MyQuery {\n  StrategyReports(sort: BLOCK_DESC) {\n    _id\n    allocBPS\n    allocated\n    allocationAdded\n    block\n    debtPaid\n    duration\n    gain\n    gains\n    hash\n    loss\n    losses\n    reportDate\n    strategyAddress\n    vaultAddress\n  }\n}"): typeof import('./graphql').MyQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Strategys {\n  Strategys {\n    _id\n    address\n    allocBPS\n    block\n    chainId\n    dateAdded\n    dateRevoked\n    feeBPS\n    hash\n    isActive\n    vaultAddress\n  }\n}"): typeof import('./graphql').StrategysDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VaultList {\n  Vaults {\n    _id\n    address\n    asset\n    chain {\n      _id\n      chainId\n      name\n    }\n    dateAdded\n    name\n    symbol\n    lastSnapShot {\n      _id\n      depositCount\n      deposits\n      lockedProfit\n      pricePerFullShare\n      timestamp\n      totalAllocated\n      totalAssets\n      totalIdle\n      totalSupply\n      vaultAddress\n      withdrawCount\n      withdrawals\n    }\n  }\n}"): typeof import('./graphql').VaultListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VaultSnapshots {\n  VaultSnapshots(sort: TIMESTAMP_DESC, limit: 0) {\n    _id\n    depositCount\n    deposits\n    lockedProfit\n    pricePerFullShare\n    timestamp\n    totalAllocated\n    totalAssets\n    totalIdle\n    totalSupply\n    vault {\n      _id\n      chainId\n    }\n    vaultAddress\n    withdrawCount\n    withdrawals\n  }\n}"): typeof import('./graphql').VaultSnapshotsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VaultTransactions {\n  VaultTransactions(sort: BLOCK_DESC, limit: 0) {\n    _id\n    assets\n    block\n    chainId\n    dateExecuted\n    hash\n    owner\n    receiver\n    sender\n    shares\n    transactionType\n    vaultAddress\n  }\n}"): typeof import('./graphql').VaultTransactionsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
