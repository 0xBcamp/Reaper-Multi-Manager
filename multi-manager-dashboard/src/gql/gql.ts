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
    "query Vault($vaultId: ID!) {\n  vault(id: $vaultId) {\n    nrOfStrategies\n    id\n    lastUpdated\n    strategies {\n      id\n      reports(orderBy: timestamp, orderDirection: desc, first: 30) {\n        results {\n          apr\n          blockNumber\n          duration\n          endTimestamp\n          startTimestamp\n          timestamp\n          id\n        }\n        allocBPS\n        allocated\n        allocationAdded\n        debtPaid\n        gain\n        gains\n        id\n        loss\n        losses\n      }\n    }\n  }\n}": types.VaultDocument,
    "query VaultList {\n  vaults {\n    id\n    apr\n    nrOfStrategies\n    pricePerFullShare\n    lastUpdated\n  }\n}": types.VaultListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Vault($vaultId: ID!) {\n  vault(id: $vaultId) {\n    nrOfStrategies\n    id\n    lastUpdated\n    strategies {\n      id\n      reports(orderBy: timestamp, orderDirection: desc, first: 30) {\n        results {\n          apr\n          blockNumber\n          duration\n          endTimestamp\n          startTimestamp\n          timestamp\n          id\n        }\n        allocBPS\n        allocated\n        allocationAdded\n        debtPaid\n        gain\n        gains\n        id\n        loss\n        losses\n      }\n    }\n  }\n}"): typeof import('./graphql').VaultDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query VaultList {\n  vaults {\n    id\n    apr\n    nrOfStrategies\n    pricePerFullShare\n    lastUpdated\n  }\n}"): typeof import('./graphql').VaultListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
