/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: { input: any; output: any; }
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: { input: any; output: any; }
};

export type ArkiverMetadata = {
  __typename?: 'ArkiverMetadata';
  _id: Scalars['MongoID']['output'];
  arkiveId?: Maybe<Scalars['Float']['output']>;
  arkiveMajorVersion?: Maybe<Scalars['Float']['output']>;
  arkiveMinorVersion?: Maybe<Scalars['Float']['output']>;
  blockHandlerCalls?: Maybe<Scalars['Float']['output']>;
  chain?: Maybe<Scalars['String']['output']>;
  errors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  eventHandlerCalls?: Maybe<Scalars['Float']['output']>;
  processedBlockHeight?: Maybe<Scalars['Float']['output']>;
};

export type Chain = {
  __typename?: 'Chain';
  _id: Scalars['MongoID']['output'];
  chainId?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type FilterCountArkiverMetadataChainOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

export type FilterCountArkiverMetadataInput = {
  AND?: InputMaybe<Array<FilterCountArkiverMetadataInput>>;
  OR?: InputMaybe<Array<FilterCountArkiverMetadataInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountArkiverMetadataOperatorsInput>;
  arkiveId?: InputMaybe<Scalars['Float']['input']>;
  arkiveMajorVersion?: InputMaybe<Scalars['Float']['input']>;
  arkiveMinorVersion?: InputMaybe<Scalars['Float']['input']>;
  blockHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  errors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  processedBlockHeight?: InputMaybe<Scalars['Float']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountArkiverMetadataOperatorsInput = {
  _id?: InputMaybe<FilterCountArkiverMetadata_IdOperatorsInput>;
  chain?: InputMaybe<FilterCountArkiverMetadataChainOperatorsInput>;
  processedBlockHeight?: InputMaybe<FilterCountArkiverMetadataProcessedBlockHeightOperatorsInput>;
};

export type FilterCountArkiverMetadataProcessedBlockHeightOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterCountArkiverMetadata_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountChainInput = {
  AND?: InputMaybe<Array<FilterCountChainInput>>;
  OR?: InputMaybe<Array<FilterCountChainInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountChainOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountChainOperatorsInput = {
  _id?: InputMaybe<FilterCountChain_IdOperatorsInput>;
};

export type FilterCountChain_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountStrategyBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterCountStrategyInput = {
  AND?: InputMaybe<Array<FilterCountStrategyInput>>;
  OR?: InputMaybe<Array<FilterCountStrategyInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountStrategyOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  dateRevoked?: InputMaybe<Scalars['Float']['input']>;
  feeBPS?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  reports?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountStrategyOperatorsInput = {
  _id?: InputMaybe<FilterCountStrategy_IdOperatorsInput>;
  block?: InputMaybe<FilterCountStrategyBlockOperatorsInput>;
};

export type FilterCountStrategyReportBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterCountStrategyReportInput = {
  AND?: InputMaybe<Array<FilterCountStrategyReportInput>>;
  OR?: InputMaybe<Array<FilterCountStrategyReportInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountStrategyReportOperatorsInput>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  allocated?: InputMaybe<Scalars['String']['input']>;
  allocationAdded?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  debtPaid?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  gain?: InputMaybe<Scalars['String']['input']>;
  gains?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  loss?: InputMaybe<Scalars['String']['input']>;
  losses?: InputMaybe<Scalars['String']['input']>;
  reportDate?: InputMaybe<Scalars['Float']['input']>;
  strategy?: InputMaybe<Scalars['MongoID']['input']>;
  strategyAddress?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountStrategyReportOperatorsInput = {
  _id?: InputMaybe<FilterCountStrategyReport_IdOperatorsInput>;
  block?: InputMaybe<FilterCountStrategyReportBlockOperatorsInput>;
};

export type FilterCountStrategyReport_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountStrategy_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountVaultInput = {
  AND?: InputMaybe<Array<FilterCountVaultInput>>;
  OR?: InputMaybe<Array<FilterCountVaultInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountVaultOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  asset?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  lastSnapShot?: InputMaybe<Scalars['MongoID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountVaultOperatorsInput = {
  _id?: InputMaybe<FilterCountVault_IdOperatorsInput>;
};

export type FilterCountVaultSnapshotInput = {
  AND?: InputMaybe<Array<FilterCountVaultSnapshotInput>>;
  OR?: InputMaybe<Array<FilterCountVaultSnapshotInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountVaultSnapshotOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  depositCount?: InputMaybe<Scalars['Float']['input']>;
  deposits?: InputMaybe<Scalars['String']['input']>;
  lockedProfit?: InputMaybe<Scalars['String']['input']>;
  pricePerFullShare?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Float']['input']>;
  totalAllocated?: InputMaybe<Scalars['String']['input']>;
  totalAssets?: InputMaybe<Scalars['String']['input']>;
  totalIdle?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
  withdrawCount?: InputMaybe<Scalars['Float']['input']>;
  withdrawals?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountVaultSnapshotOperatorsInput = {
  _id?: InputMaybe<FilterCountVaultSnapshot_IdOperatorsInput>;
  timestamp?: InputMaybe<FilterCountVaultSnapshotTimestampOperatorsInput>;
};

export type FilterCountVaultSnapshotTimestampOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterCountVaultSnapshot_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountVaultTransactionBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterCountVaultTransactionInput = {
  AND?: InputMaybe<Array<FilterCountVaultTransactionInput>>;
  OR?: InputMaybe<Array<FilterCountVaultTransactionInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterCountVaultTransactionOperatorsInput>;
  assets?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateExecuted?: InputMaybe<Scalars['Float']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['String']['input']>;
  transactionType?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterCountVaultTransactionOperatorsInput = {
  _id?: InputMaybe<FilterCountVaultTransaction_IdOperatorsInput>;
  block?: InputMaybe<FilterCountVaultTransactionBlockOperatorsInput>;
};

export type FilterCountVaultTransaction_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterCountVault_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyArkiverMetadataChainOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

export type FilterFindManyArkiverMetadataInput = {
  AND?: InputMaybe<Array<FilterFindManyArkiverMetadataInput>>;
  OR?: InputMaybe<Array<FilterFindManyArkiverMetadataInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyArkiverMetadataOperatorsInput>;
  arkiveId?: InputMaybe<Scalars['Float']['input']>;
  arkiveMajorVersion?: InputMaybe<Scalars['Float']['input']>;
  arkiveMinorVersion?: InputMaybe<Scalars['Float']['input']>;
  blockHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  errors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  processedBlockHeight?: InputMaybe<Scalars['Float']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyArkiverMetadataOperatorsInput = {
  _id?: InputMaybe<FilterFindManyArkiverMetadata_IdOperatorsInput>;
  chain?: InputMaybe<FilterFindManyArkiverMetadataChainOperatorsInput>;
  processedBlockHeight?: InputMaybe<FilterFindManyArkiverMetadataProcessedBlockHeightOperatorsInput>;
};

export type FilterFindManyArkiverMetadataProcessedBlockHeightOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindManyArkiverMetadata_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyChainInput = {
  AND?: InputMaybe<Array<FilterFindManyChainInput>>;
  OR?: InputMaybe<Array<FilterFindManyChainInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyChainOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyChainOperatorsInput = {
  _id?: InputMaybe<FilterFindManyChain_IdOperatorsInput>;
};

export type FilterFindManyChain_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyStrategyBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindManyStrategyInput = {
  AND?: InputMaybe<Array<FilterFindManyStrategyInput>>;
  OR?: InputMaybe<Array<FilterFindManyStrategyInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyStrategyOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  dateRevoked?: InputMaybe<Scalars['Float']['input']>;
  feeBPS?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  reports?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyStrategyOperatorsInput = {
  _id?: InputMaybe<FilterFindManyStrategy_IdOperatorsInput>;
  block?: InputMaybe<FilterFindManyStrategyBlockOperatorsInput>;
};

export type FilterFindManyStrategyReportBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindManyStrategyReportInput = {
  AND?: InputMaybe<Array<FilterFindManyStrategyReportInput>>;
  OR?: InputMaybe<Array<FilterFindManyStrategyReportInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyStrategyReportOperatorsInput>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  allocated?: InputMaybe<Scalars['String']['input']>;
  allocationAdded?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  debtPaid?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  gain?: InputMaybe<Scalars['String']['input']>;
  gains?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  loss?: InputMaybe<Scalars['String']['input']>;
  losses?: InputMaybe<Scalars['String']['input']>;
  reportDate?: InputMaybe<Scalars['Float']['input']>;
  strategy?: InputMaybe<Scalars['MongoID']['input']>;
  strategyAddress?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyStrategyReportOperatorsInput = {
  _id?: InputMaybe<FilterFindManyStrategyReport_IdOperatorsInput>;
  block?: InputMaybe<FilterFindManyStrategyReportBlockOperatorsInput>;
};

export type FilterFindManyStrategyReport_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyStrategy_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyVaultInput = {
  AND?: InputMaybe<Array<FilterFindManyVaultInput>>;
  OR?: InputMaybe<Array<FilterFindManyVaultInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyVaultOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  asset?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  lastSnapShot?: InputMaybe<Scalars['MongoID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyVaultOperatorsInput = {
  _id?: InputMaybe<FilterFindManyVault_IdOperatorsInput>;
};

export type FilterFindManyVaultSnapshotInput = {
  AND?: InputMaybe<Array<FilterFindManyVaultSnapshotInput>>;
  OR?: InputMaybe<Array<FilterFindManyVaultSnapshotInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyVaultSnapshotOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  depositCount?: InputMaybe<Scalars['Float']['input']>;
  deposits?: InputMaybe<Scalars['String']['input']>;
  lockedProfit?: InputMaybe<Scalars['String']['input']>;
  pricePerFullShare?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Float']['input']>;
  totalAllocated?: InputMaybe<Scalars['String']['input']>;
  totalAssets?: InputMaybe<Scalars['String']['input']>;
  totalIdle?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
  withdrawCount?: InputMaybe<Scalars['Float']['input']>;
  withdrawals?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyVaultSnapshotOperatorsInput = {
  _id?: InputMaybe<FilterFindManyVaultSnapshot_IdOperatorsInput>;
  timestamp?: InputMaybe<FilterFindManyVaultSnapshotTimestampOperatorsInput>;
};

export type FilterFindManyVaultSnapshotTimestampOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindManyVaultSnapshot_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyVaultTransactionBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindManyVaultTransactionInput = {
  AND?: InputMaybe<Array<FilterFindManyVaultTransactionInput>>;
  OR?: InputMaybe<Array<FilterFindManyVaultTransactionInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindManyVaultTransactionOperatorsInput>;
  assets?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateExecuted?: InputMaybe<Scalars['Float']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['String']['input']>;
  transactionType?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyVaultTransactionOperatorsInput = {
  _id?: InputMaybe<FilterFindManyVaultTransaction_IdOperatorsInput>;
  block?: InputMaybe<FilterFindManyVaultTransactionBlockOperatorsInput>;
};

export type FilterFindManyVaultTransaction_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindManyVault_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneArkiverMetadataChainOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regex?: InputMaybe<Scalars['RegExpAsString']['input']>;
};

export type FilterFindOneArkiverMetadataInput = {
  AND?: InputMaybe<Array<FilterFindOneArkiverMetadataInput>>;
  OR?: InputMaybe<Array<FilterFindOneArkiverMetadataInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneArkiverMetadataOperatorsInput>;
  arkiveId?: InputMaybe<Scalars['Float']['input']>;
  arkiveMajorVersion?: InputMaybe<Scalars['Float']['input']>;
  arkiveMinorVersion?: InputMaybe<Scalars['Float']['input']>;
  blockHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['String']['input']>;
  errors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  eventHandlerCalls?: InputMaybe<Scalars['Float']['input']>;
  processedBlockHeight?: InputMaybe<Scalars['Float']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneArkiverMetadataOperatorsInput = {
  _id?: InputMaybe<FilterFindOneArkiverMetadata_IdOperatorsInput>;
  chain?: InputMaybe<FilterFindOneArkiverMetadataChainOperatorsInput>;
  processedBlockHeight?: InputMaybe<FilterFindOneArkiverMetadataProcessedBlockHeightOperatorsInput>;
};

export type FilterFindOneArkiverMetadataProcessedBlockHeightOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindOneArkiverMetadata_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneChainInput = {
  AND?: InputMaybe<Array<FilterFindOneChainInput>>;
  OR?: InputMaybe<Array<FilterFindOneChainInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneChainOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneChainOperatorsInput = {
  _id?: InputMaybe<FilterFindOneChain_IdOperatorsInput>;
};

export type FilterFindOneChain_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneStrategyBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindOneStrategyInput = {
  AND?: InputMaybe<Array<FilterFindOneStrategyInput>>;
  OR?: InputMaybe<Array<FilterFindOneStrategyInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneStrategyOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  dateRevoked?: InputMaybe<Scalars['Float']['input']>;
  feeBPS?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  reports?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneStrategyOperatorsInput = {
  _id?: InputMaybe<FilterFindOneStrategy_IdOperatorsInput>;
  block?: InputMaybe<FilterFindOneStrategyBlockOperatorsInput>;
};

export type FilterFindOneStrategyReportBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindOneStrategyReportInput = {
  AND?: InputMaybe<Array<FilterFindOneStrategyReportInput>>;
  OR?: InputMaybe<Array<FilterFindOneStrategyReportInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneStrategyReportOperatorsInput>;
  allocBPS?: InputMaybe<Scalars['String']['input']>;
  allocated?: InputMaybe<Scalars['String']['input']>;
  allocationAdded?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  debtPaid?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  gain?: InputMaybe<Scalars['String']['input']>;
  gains?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  loss?: InputMaybe<Scalars['String']['input']>;
  losses?: InputMaybe<Scalars['String']['input']>;
  reportDate?: InputMaybe<Scalars['Float']['input']>;
  strategy?: InputMaybe<Scalars['MongoID']['input']>;
  strategyAddress?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneStrategyReportOperatorsInput = {
  _id?: InputMaybe<FilterFindOneStrategyReport_IdOperatorsInput>;
  block?: InputMaybe<FilterFindOneStrategyReportBlockOperatorsInput>;
};

export type FilterFindOneStrategyReport_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneStrategy_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneVaultInput = {
  AND?: InputMaybe<Array<FilterFindOneVaultInput>>;
  OR?: InputMaybe<Array<FilterFindOneVaultInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneVaultOperatorsInput>;
  address?: InputMaybe<Scalars['String']['input']>;
  asset?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateAdded?: InputMaybe<Scalars['Float']['input']>;
  lastSnapShot?: InputMaybe<Scalars['MongoID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneVaultOperatorsInput = {
  _id?: InputMaybe<FilterFindOneVault_IdOperatorsInput>;
};

export type FilterFindOneVaultSnapshotInput = {
  AND?: InputMaybe<Array<FilterFindOneVaultSnapshotInput>>;
  OR?: InputMaybe<Array<FilterFindOneVaultSnapshotInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneVaultSnapshotOperatorsInput>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  depositCount?: InputMaybe<Scalars['Float']['input']>;
  deposits?: InputMaybe<Scalars['String']['input']>;
  lockedProfit?: InputMaybe<Scalars['String']['input']>;
  pricePerFullShare?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['Float']['input']>;
  totalAllocated?: InputMaybe<Scalars['String']['input']>;
  totalAssets?: InputMaybe<Scalars['String']['input']>;
  totalIdle?: InputMaybe<Scalars['String']['input']>;
  totalSupply?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
  withdrawCount?: InputMaybe<Scalars['Float']['input']>;
  withdrawals?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneVaultSnapshotOperatorsInput = {
  _id?: InputMaybe<FilterFindOneVaultSnapshot_IdOperatorsInput>;
  timestamp?: InputMaybe<FilterFindOneVaultSnapshotTimestampOperatorsInput>;
};

export type FilterFindOneVaultSnapshotTimestampOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindOneVaultSnapshot_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneVaultTransactionBlockOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export type FilterFindOneVaultTransactionInput = {
  AND?: InputMaybe<Array<FilterFindOneVaultTransactionInput>>;
  OR?: InputMaybe<Array<FilterFindOneVaultTransactionInput>>;
  _id?: InputMaybe<Scalars['MongoID']['input']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: InputMaybe<FilterFindOneVaultTransactionOperatorsInput>;
  assets?: InputMaybe<Scalars['String']['input']>;
  block?: InputMaybe<Scalars['Float']['input']>;
  chain?: InputMaybe<Scalars['MongoID']['input']>;
  chainId?: InputMaybe<Scalars['Float']['input']>;
  dateExecuted?: InputMaybe<Scalars['Float']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<Scalars['String']['input']>;
  shares?: InputMaybe<Scalars['String']['input']>;
  transactionType?: InputMaybe<Scalars['String']['input']>;
  vault?: InputMaybe<Scalars['MongoID']['input']>;
  vaultAddress?: InputMaybe<Scalars['String']['input']>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindOneVaultTransactionOperatorsInput = {
  _id?: InputMaybe<FilterFindOneVaultTransaction_IdOperatorsInput>;
  block?: InputMaybe<FilterFindOneVaultTransactionBlockOperatorsInput>;
};

export type FilterFindOneVaultTransaction_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type FilterFindOneVault_IdOperatorsInput = {
  exists?: InputMaybe<Scalars['Boolean']['input']>;
  gt?: InputMaybe<Scalars['MongoID']['input']>;
  gte?: InputMaybe<Scalars['MongoID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
  lt?: InputMaybe<Scalars['MongoID']['input']>;
  lte?: InputMaybe<Scalars['MongoID']['input']>;
  ne?: InputMaybe<Scalars['MongoID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['MongoID']['input']>>>;
};

export type Query = {
  __typename?: 'Query';
  ArkiverMetadata?: Maybe<ArkiverMetadata>;
  ArkiverMetadatas: Array<ArkiverMetadata>;
  ArkiverMetadatasCount?: Maybe<Scalars['Int']['output']>;
  Chain?: Maybe<Chain>;
  Chains: Array<Chain>;
  ChainsCount?: Maybe<Scalars['Int']['output']>;
  Strategy?: Maybe<Strategy>;
  StrategyReport?: Maybe<StrategyReport>;
  StrategyReports: Array<StrategyReport>;
  StrategyReportsCount?: Maybe<Scalars['Int']['output']>;
  Strategys: Array<Strategy>;
  StrategysCount?: Maybe<Scalars['Int']['output']>;
  Vault?: Maybe<Vault>;
  VaultSnapshot?: Maybe<VaultSnapshot>;
  VaultSnapshots: Array<VaultSnapshot>;
  VaultSnapshotsCount?: Maybe<Scalars['Int']['output']>;
  VaultTransaction?: Maybe<VaultTransaction>;
  VaultTransactions: Array<VaultTransaction>;
  VaultTransactionsCount?: Maybe<Scalars['Int']['output']>;
  Vaults: Array<Vault>;
  VaultsCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryArkiverMetadataArgs = {
  filter?: InputMaybe<FilterFindOneArkiverMetadataInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneArkiverMetadataInput>;
};


export type QueryArkiverMetadatasArgs = {
  filter?: InputMaybe<FilterFindManyArkiverMetadataInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyArkiverMetadataInput>;
};


export type QueryArkiverMetadatasCountArgs = {
  filter?: InputMaybe<FilterCountArkiverMetadataInput>;
};


export type QueryChainArgs = {
  filter?: InputMaybe<FilterFindOneChainInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneChainInput>;
};


export type QueryChainsArgs = {
  filter?: InputMaybe<FilterFindManyChainInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyChainInput>;
};


export type QueryChainsCountArgs = {
  filter?: InputMaybe<FilterCountChainInput>;
};


export type QueryStrategyArgs = {
  filter?: InputMaybe<FilterFindOneStrategyInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneStrategyInput>;
};


export type QueryStrategyReportArgs = {
  filter?: InputMaybe<FilterFindOneStrategyReportInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneStrategyReportInput>;
};


export type QueryStrategyReportsArgs = {
  filter?: InputMaybe<FilterFindManyStrategyReportInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyStrategyReportInput>;
};


export type QueryStrategyReportsCountArgs = {
  filter?: InputMaybe<FilterCountStrategyReportInput>;
};


export type QueryStrategysArgs = {
  filter?: InputMaybe<FilterFindManyStrategyInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyStrategyInput>;
};


export type QueryStrategysCountArgs = {
  filter?: InputMaybe<FilterCountStrategyInput>;
};


export type QueryVaultArgs = {
  filter?: InputMaybe<FilterFindOneVaultInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneVaultInput>;
};


export type QueryVaultSnapshotArgs = {
  filter?: InputMaybe<FilterFindOneVaultSnapshotInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneVaultSnapshotInput>;
};


export type QueryVaultSnapshotsArgs = {
  filter?: InputMaybe<FilterFindManyVaultSnapshotInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyVaultSnapshotInput>;
};


export type QueryVaultSnapshotsCountArgs = {
  filter?: InputMaybe<FilterCountVaultSnapshotInput>;
};


export type QueryVaultTransactionArgs = {
  filter?: InputMaybe<FilterFindOneVaultTransactionInput>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindOneVaultTransactionInput>;
};


export type QueryVaultTransactionsArgs = {
  filter?: InputMaybe<FilterFindManyVaultTransactionInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyVaultTransactionInput>;
};


export type QueryVaultTransactionsCountArgs = {
  filter?: InputMaybe<FilterCountVaultTransactionInput>;
};


export type QueryVaultsArgs = {
  filter?: InputMaybe<FilterFindManyVaultInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SortFindManyVaultInput>;
};


export type QueryVaultsCountArgs = {
  filter?: InputMaybe<FilterCountVaultInput>;
};

export enum SortFindManyArkiverMetadataInput {
  ChainAsc = 'CHAIN_ASC',
  ChainDesc = 'CHAIN_DESC',
  ProcessedblockheightAsc = 'PROCESSEDBLOCKHEIGHT_ASC',
  ProcessedblockheightDesc = 'PROCESSEDBLOCKHEIGHT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyChainInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyStrategyInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyStrategyReportInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyVaultInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyVaultSnapshotInput {
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyVaultTransactionInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneArkiverMetadataInput {
  ChainAsc = 'CHAIN_ASC',
  ChainDesc = 'CHAIN_DESC',
  ProcessedblockheightAsc = 'PROCESSEDBLOCKHEIGHT_ASC',
  ProcessedblockheightDesc = 'PROCESSEDBLOCKHEIGHT_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneChainInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneStrategyInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneStrategyReportInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneVaultInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneVaultSnapshotInput {
  TimestampAsc = 'TIMESTAMP_ASC',
  TimestampDesc = 'TIMESTAMP_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindOneVaultTransactionInput {
  BlockAsc = 'BLOCK_ASC',
  BlockDesc = 'BLOCK_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export type Strategy = {
  __typename?: 'Strategy';
  _id: Scalars['MongoID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  allocBPS?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chain?: Maybe<Chain>;
  chainId?: Maybe<Scalars['Float']['output']>;
  dateAdded?: Maybe<Scalars['Float']['output']>;
  dateRevoked?: Maybe<Scalars['Float']['output']>;
  feeBPS?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  reports: Array<Maybe<StrategyReport>>;
  vault?: Maybe<Vault>;
  vaultAddress?: Maybe<Scalars['String']['output']>;
};

export type StrategyReport = {
  __typename?: 'StrategyReport';
  _id: Scalars['MongoID']['output'];
  allocBPS?: Maybe<Scalars['String']['output']>;
  allocated?: Maybe<Scalars['String']['output']>;
  allocationAdded?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  debtPaid?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  gain?: Maybe<Scalars['String']['output']>;
  gains?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  loss?: Maybe<Scalars['String']['output']>;
  losses?: Maybe<Scalars['String']['output']>;
  reportDate?: Maybe<Scalars['Float']['output']>;
  strategy?: Maybe<Strategy>;
  strategyAddress?: Maybe<Scalars['String']['output']>;
  vault?: Maybe<Vault>;
  vaultAddress?: Maybe<Scalars['String']['output']>;
};

export type Vault = {
  __typename?: 'Vault';
  _id: Scalars['MongoID']['output'];
  address?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<Scalars['String']['output']>;
  chain?: Maybe<Chain>;
  chainId?: Maybe<Scalars['Float']['output']>;
  dateAdded?: Maybe<Scalars['Float']['output']>;
  lastSnapShot?: Maybe<VaultSnapshot>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type VaultSnapshot = {
  __typename?: 'VaultSnapshot';
  _id: Scalars['MongoID']['output'];
  chainId?: Maybe<Scalars['Float']['output']>;
  depositCount?: Maybe<Scalars['Float']['output']>;
  deposits?: Maybe<Scalars['String']['output']>;
  lockedProfit?: Maybe<Scalars['String']['output']>;
  pricePerFullShare?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
  totalAllocated?: Maybe<Scalars['String']['output']>;
  totalAssets?: Maybe<Scalars['String']['output']>;
  totalIdle?: Maybe<Scalars['String']['output']>;
  totalSupply?: Maybe<Scalars['String']['output']>;
  vault?: Maybe<Vault>;
  vaultAddress?: Maybe<Scalars['String']['output']>;
  withdrawCount?: Maybe<Scalars['Float']['output']>;
  withdrawals?: Maybe<Scalars['String']['output']>;
};

export type VaultTransaction = {
  __typename?: 'VaultTransaction';
  _id: Scalars['MongoID']['output'];
  assets?: Maybe<Scalars['String']['output']>;
  block?: Maybe<Scalars['Float']['output']>;
  chain?: Maybe<Chain>;
  chainId?: Maybe<Scalars['Float']['output']>;
  dateExecuted?: Maybe<Scalars['Float']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  receiver?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<Scalars['String']['output']>;
  shares?: Maybe<Scalars['String']['output']>;
  transactionType?: Maybe<Scalars['String']['output']>;
  vault?: Maybe<Vault>;
  vaultAddress?: Maybe<Scalars['String']['output']>;
};

export type ChainListQueryVariables = Exact<{ [key: string]: never; }>;


export type ChainListQuery = { __typename?: 'Query', Chains: Array<{ __typename?: 'Chain', _id: any, chainId?: number | null, name?: string | null }> };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'Query', StrategyReports: Array<{ __typename?: 'StrategyReport', _id: any, allocBPS?: string | null, allocated?: string | null, allocationAdded?: string | null, block?: number | null, debtPaid?: string | null, duration?: number | null, gain?: string | null, gains?: string | null, hash?: string | null, loss?: string | null, losses?: string | null, reportDate?: number | null, strategyAddress?: string | null, vaultAddress?: string | null }> };

export type StrategysQueryVariables = Exact<{ [key: string]: never; }>;


export type StrategysQuery = { __typename?: 'Query', Strategys: Array<{ __typename?: 'Strategy', _id: any, address?: string | null, allocBPS?: string | null, block?: number | null, chainId?: number | null, dateAdded?: number | null, dateRevoked?: number | null, feeBPS?: string | null, hash?: string | null, isActive?: boolean | null, vaultAddress?: string | null }> };

export type VaultListQueryVariables = Exact<{ [key: string]: never; }>;


export type VaultListQuery = { __typename?: 'Query', Vaults: Array<{ __typename?: 'Vault', _id: any, address?: string | null, asset?: string | null, dateAdded?: number | null, name?: string | null, symbol?: string | null, chain?: { __typename?: 'Chain', _id: any, chainId?: number | null, name?: string | null } | null, lastSnapShot?: { __typename?: 'VaultSnapshot', _id: any, depositCount?: number | null, deposits?: string | null, lockedProfit?: string | null, pricePerFullShare?: string | null, timestamp?: number | null, totalAllocated?: string | null, totalAssets?: string | null, totalIdle?: string | null, totalSupply?: string | null, vaultAddress?: string | null, withdrawCount?: number | null, withdrawals?: string | null } | null }> };

export type VaultSnapshotsQueryVariables = Exact<{ [key: string]: never; }>;


export type VaultSnapshotsQuery = { __typename?: 'Query', VaultSnapshots: Array<{ __typename?: 'VaultSnapshot', _id: any, depositCount?: number | null, deposits?: string | null, lockedProfit?: string | null, pricePerFullShare?: string | null, timestamp?: number | null, totalAllocated?: string | null, totalAssets?: string | null, totalIdle?: string | null, totalSupply?: string | null, vaultAddress?: string | null, withdrawCount?: number | null, withdrawals?: string | null, vault?: { __typename?: 'Vault', _id: any, chainId?: number | null } | null }> };

export type VaultTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type VaultTransactionsQuery = { __typename?: 'Query', VaultTransactions: Array<{ __typename?: 'VaultTransaction', _id: any, assets?: string | null, block?: number | null, chainId?: number | null, dateExecuted?: number | null, hash?: string | null, owner?: string | null, receiver?: string | null, sender?: string | null, shares?: string | null, transactionType?: string | null, vaultAddress?: string | null }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ChainListDocument = new TypedDocumentString(`
    query ChainList {
  Chains {
    _id
    chainId
    name
  }
}
    `) as unknown as TypedDocumentString<ChainListQuery, ChainListQueryVariables>;
export const MyQueryDocument = new TypedDocumentString(`
    query MyQuery {
  StrategyReports(sort: BLOCK_DESC) {
    _id
    allocBPS
    allocated
    allocationAdded
    block
    debtPaid
    duration
    gain
    gains
    hash
    loss
    losses
    reportDate
    strategyAddress
    vaultAddress
  }
}
    `) as unknown as TypedDocumentString<MyQueryQuery, MyQueryQueryVariables>;
export const StrategysDocument = new TypedDocumentString(`
    query Strategys {
  Strategys {
    _id
    address
    allocBPS
    block
    chainId
    dateAdded
    dateRevoked
    feeBPS
    hash
    isActive
    vaultAddress
  }
}
    `) as unknown as TypedDocumentString<StrategysQuery, StrategysQueryVariables>;
export const VaultListDocument = new TypedDocumentString(`
    query VaultList {
  Vaults {
    _id
    address
    asset
    chain {
      _id
      chainId
      name
    }
    dateAdded
    name
    symbol
    lastSnapShot {
      _id
      depositCount
      deposits
      lockedProfit
      pricePerFullShare
      timestamp
      totalAllocated
      totalAssets
      totalIdle
      totalSupply
      vaultAddress
      withdrawCount
      withdrawals
    }
  }
}
    `) as unknown as TypedDocumentString<VaultListQuery, VaultListQueryVariables>;
export const VaultSnapshotsDocument = new TypedDocumentString(`
    query VaultSnapshots {
  VaultSnapshots(sort: TIMESTAMP_DESC, limit: 0) {
    _id
    depositCount
    deposits
    lockedProfit
    pricePerFullShare
    timestamp
    totalAllocated
    totalAssets
    totalIdle
    totalSupply
    vault {
      _id
      chainId
    }
    vaultAddress
    withdrawCount
    withdrawals
  }
}
    `) as unknown as TypedDocumentString<VaultSnapshotsQuery, VaultSnapshotsQueryVariables>;
export const VaultTransactionsDocument = new TypedDocumentString(`
    query VaultTransactions {
  VaultTransactions(sort: BLOCK_DESC, limit: 0) {
    _id
    assets
    block
    chainId
    dateExecuted
    hash
    owner
    receiver
    sender
    shares
    transactionType
    vaultAddress
  }
}
    `) as unknown as TypedDocumentString<VaultTransactionsQuery, VaultTransactionsQueryVariables>;