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
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  strategies: Array<Strategy>;
  strategy?: Maybe<Strategy>;
  strategyReport?: Maybe<StrategyReport>;
  strategyReportInVaultAPRReport?: Maybe<StrategyReportInVaultAprReport>;
  strategyReportInVaultAPRReports: Array<StrategyReportInVaultAprReport>;
  strategyReportResult?: Maybe<StrategyReportResult>;
  strategyReportResults: Array<StrategyReportResult>;
  strategyReports: Array<StrategyReport>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultAPRReport?: Maybe<VaultAprReport>;
  vaultAPRReports: Array<VaultAprReport>;
  vaults: Array<Vault>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryStrategiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Strategy_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Strategy_Filter>;
};


export type QueryStrategyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStrategyReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStrategyReportInVaultAprReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStrategyReportInVaultAprReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportInVaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
};


export type QueryStrategyReportResultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStrategyReportResultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportResult_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReportResult_Filter>;
};


export type QueryStrategyReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReport_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultAprReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultAprReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAprReport_Filter>;
};


export type QueryVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Strategy = {
  __typename?: 'Strategy';
  /** Strategy address */
  id: Scalars['ID']['output'];
  /** The latest report for this Strategy */
  latestReport?: Maybe<StrategyReport>;
  /** The reports created by this strategy. */
  reports: Array<StrategyReport>;
  /** The Vault */
  vault: Vault;
};


export type StrategyReportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StrategyReport_Filter>;
};

export type StrategyReport = {
  __typename?: 'StrategyReport';
  /** The relative strategy allocation in basis points */
  allocBPS: Scalars['BigInt']['output'];
  /** How much is allocated to the strategy */
  allocated: Scalars['BigInt']['output'];
  /** Amount added to Allocation */
  allocationAdded: Scalars['BigInt']['output'];
  /** The repayment amount */
  debtPaid: Scalars['BigInt']['output'];
  /** Amount Gained in harvest */
  gain: Scalars['BigInt']['output'];
  /** The reported total gain amount for the strategy. */
  gains: Scalars['BigInt']['output'];
  /** The Strategy Report ID. */
  id: Scalars['ID']['output'];
  /** Amount Lost in harvest */
  loss: Scalars['BigInt']['output'];
  /** The reported total loss amount for the strategy. */
  losses: Scalars['BigInt']['output'];
  /** The results created by this report. They are generated comparing the previous report and the current one. */
  results?: Maybe<StrategyReportResult>;
  /** The Strategy reference. */
  strategy: Strategy;
  /** Timestamp the strategy report was most recently updated. */
  timestamp: Scalars['BigInt']['output'];
  /** List of APR reports where this report was used in deriving vault APR */
  vaultAPRReports: Array<StrategyReportInVaultAprReport>;
};


export type StrategyReportVaultAprReportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportInVaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
};

export type StrategyReportInVaultAprReport = {
  __typename?: 'StrategyReportInVaultAPRReport';
  id: Scalars['ID']['output'];
  strategyReport: StrategyReport;
  vaultAPRReport: VaultAprReport;
};

export type StrategyReportInVaultAprReport_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StrategyReportInVaultAprReport_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StrategyReportInVaultAprReport_Filter>>>;
  strategyReport?: InputMaybe<Scalars['String']['input']>;
  strategyReport_?: InputMaybe<StrategyReport_Filter>;
  strategyReport_contains?: InputMaybe<Scalars['String']['input']>;
  strategyReport_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReport_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyReport_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReport_gt?: InputMaybe<Scalars['String']['input']>;
  strategyReport_gte?: InputMaybe<Scalars['String']['input']>;
  strategyReport_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyReport_lt?: InputMaybe<Scalars['String']['input']>;
  strategyReport_lte?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategyReport_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyReport_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategyReport_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategyReport_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_?: InputMaybe<VaultAprReport_Filter>;
  vaultAPRReport_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_gt?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_gte?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAPRReport_lt?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_lte?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_contains?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vaultAPRReport_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_starts_with?: InputMaybe<Scalars['String']['input']>;
  vaultAPRReport_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum StrategyReportInVaultAprReport_OrderBy {
  Id = 'id',
  StrategyReport = 'strategyReport',
  StrategyReportAllocBps = 'strategyReport__allocBPS',
  StrategyReportAllocated = 'strategyReport__allocated',
  StrategyReportAllocationAdded = 'strategyReport__allocationAdded',
  StrategyReportDebtPaid = 'strategyReport__debtPaid',
  StrategyReportGain = 'strategyReport__gain',
  StrategyReportGains = 'strategyReport__gains',
  StrategyReportId = 'strategyReport__id',
  StrategyReportLoss = 'strategyReport__loss',
  StrategyReportLosses = 'strategyReport__losses',
  StrategyReportTimestamp = 'strategyReport__timestamp',
  VaultAprReport = 'vaultAPRReport',
  VaultAprReportApr = 'vaultAPRReport__apr',
  VaultAprReportId = 'vaultAPRReport__id',
  VaultAprReportPricePerFullShare = 'vaultAPRReport__pricePerFullShare',
  VaultAprReportTimestamp = 'vaultAPRReport__timestamp'
}

export type StrategyReportResult = {
  __typename?: 'StrategyReportResult';
  /** Annual Percentage Rate. */
  apr: Scalars['BigInt']['output'];
  /** Blocknumber the strategy report was most recently updated. */
  blockNumber: Scalars['BigInt']['output'];
  /** The current strategy report. */
  currentReport: StrategyReport;
  /** The duration (in days) from the previous report. */
  duration: Scalars['BigInt']['output'];
  endTimestamp: Scalars['BigInt']['output'];
  /** The Strategy Report Result ID. */
  id: Scalars['ID']['output'];
  /** The previous strategy report. */
  previousReport: StrategyReport;
  startTimestamp: Scalars['BigInt']['output'];
  /** Timestamp the strategy report was most recently updated. */
  timestamp: Scalars['BigInt']['output'];
  /** Vault address report is intended for */
  vault: Scalars['String']['output'];
};

export type StrategyReportResult_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StrategyReportResult_Filter>>>;
  apr?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  apr_lt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_lte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentReport?: InputMaybe<Scalars['String']['input']>;
  currentReport_?: InputMaybe<StrategyReport_Filter>;
  currentReport_contains?: InputMaybe<Scalars['String']['input']>;
  currentReport_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentReport_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentReport_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentReport_gt?: InputMaybe<Scalars['String']['input']>;
  currentReport_gte?: InputMaybe<Scalars['String']['input']>;
  currentReport_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentReport_lt?: InputMaybe<Scalars['String']['input']>;
  currentReport_lte?: InputMaybe<Scalars['String']['input']>;
  currentReport_not?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentReport_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentReport_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentReport_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentReport_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StrategyReportResult_Filter>>>;
  previousReport?: InputMaybe<Scalars['String']['input']>;
  previousReport_?: InputMaybe<StrategyReport_Filter>;
  previousReport_contains?: InputMaybe<Scalars['String']['input']>;
  previousReport_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousReport_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousReport_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousReport_gt?: InputMaybe<Scalars['String']['input']>;
  previousReport_gte?: InputMaybe<Scalars['String']['input']>;
  previousReport_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousReport_lt?: InputMaybe<Scalars['String']['input']>;
  previousReport_lte?: InputMaybe<Scalars['String']['input']>;
  previousReport_not?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousReport_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousReport_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  previousReport_starts_with?: InputMaybe<Scalars['String']['input']>;
  previousReport_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  startTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum StrategyReportResult_OrderBy {
  Apr = 'apr',
  BlockNumber = 'blockNumber',
  CurrentReport = 'currentReport',
  CurrentReportAllocBps = 'currentReport__allocBPS',
  CurrentReportAllocated = 'currentReport__allocated',
  CurrentReportAllocationAdded = 'currentReport__allocationAdded',
  CurrentReportDebtPaid = 'currentReport__debtPaid',
  CurrentReportGain = 'currentReport__gain',
  CurrentReportGains = 'currentReport__gains',
  CurrentReportId = 'currentReport__id',
  CurrentReportLoss = 'currentReport__loss',
  CurrentReportLosses = 'currentReport__losses',
  CurrentReportTimestamp = 'currentReport__timestamp',
  Duration = 'duration',
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  PreviousReport = 'previousReport',
  PreviousReportAllocBps = 'previousReport__allocBPS',
  PreviousReportAllocated = 'previousReport__allocated',
  PreviousReportAllocationAdded = 'previousReport__allocationAdded',
  PreviousReportDebtPaid = 'previousReport__debtPaid',
  PreviousReportGain = 'previousReport__gain',
  PreviousReportGains = 'previousReport__gains',
  PreviousReportId = 'previousReport__id',
  PreviousReportLoss = 'previousReport__loss',
  PreviousReportLosses = 'previousReport__losses',
  PreviousReportTimestamp = 'previousReport__timestamp',
  StartTimestamp = 'startTimestamp',
  Timestamp = 'timestamp',
  Vault = 'vault'
}

export type StrategyReport_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocBPS?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocBPS_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocBPS_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocated?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocationAdded?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_gt?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_gte?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allocationAdded_lt?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_lte?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_not?: InputMaybe<Scalars['BigInt']['input']>;
  allocationAdded_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<StrategyReport_Filter>>>;
  debtPaid?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  debtPaid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_not?: InputMaybe<Scalars['BigInt']['input']>;
  debtPaid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gain?: InputMaybe<Scalars['BigInt']['input']>;
  gain_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gain_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gain_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gain_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gain_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gain_not?: InputMaybe<Scalars['BigInt']['input']>;
  gain_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gains?: InputMaybe<Scalars['BigInt']['input']>;
  gains_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gains_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gains_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gains_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gains_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gains_not?: InputMaybe<Scalars['BigInt']['input']>;
  gains_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  loss?: InputMaybe<Scalars['BigInt']['input']>;
  loss_gt?: InputMaybe<Scalars['BigInt']['input']>;
  loss_gte?: InputMaybe<Scalars['BigInt']['input']>;
  loss_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  loss_lt?: InputMaybe<Scalars['BigInt']['input']>;
  loss_lte?: InputMaybe<Scalars['BigInt']['input']>;
  loss_not?: InputMaybe<Scalars['BigInt']['input']>;
  loss_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  losses?: InputMaybe<Scalars['BigInt']['input']>;
  losses_gt?: InputMaybe<Scalars['BigInt']['input']>;
  losses_gte?: InputMaybe<Scalars['BigInt']['input']>;
  losses_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  losses_lt?: InputMaybe<Scalars['BigInt']['input']>;
  losses_lte?: InputMaybe<Scalars['BigInt']['input']>;
  losses_not?: InputMaybe<Scalars['BigInt']['input']>;
  losses_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StrategyReport_Filter>>>;
  results?: InputMaybe<Scalars['String']['input']>;
  results_?: InputMaybe<StrategyReportResult_Filter>;
  results_contains?: InputMaybe<Scalars['String']['input']>;
  results_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  results_ends_with?: InputMaybe<Scalars['String']['input']>;
  results_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  results_gt?: InputMaybe<Scalars['String']['input']>;
  results_gte?: InputMaybe<Scalars['String']['input']>;
  results_in?: InputMaybe<Array<Scalars['String']['input']>>;
  results_lt?: InputMaybe<Scalars['String']['input']>;
  results_lte?: InputMaybe<Scalars['String']['input']>;
  results_not?: InputMaybe<Scalars['String']['input']>;
  results_not_contains?: InputMaybe<Scalars['String']['input']>;
  results_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  results_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  results_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  results_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  results_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  results_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  results_starts_with?: InputMaybe<Scalars['String']['input']>;
  results_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy?: InputMaybe<Scalars['String']['input']>;
  strategy_?: InputMaybe<Strategy_Filter>;
  strategy_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategy_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy_gt?: InputMaybe<Scalars['String']['input']>;
  strategy_gte?: InputMaybe<Scalars['String']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_lt?: InputMaybe<Scalars['String']['input']>;
  strategy_lte?: InputMaybe<Scalars['String']['input']>;
  strategy_not?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  strategy_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategy_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  strategy_starts_with?: InputMaybe<Scalars['String']['input']>;
  strategy_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vaultAPRReports_?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
};

export enum StrategyReport_OrderBy {
  AllocBps = 'allocBPS',
  Allocated = 'allocated',
  AllocationAdded = 'allocationAdded',
  DebtPaid = 'debtPaid',
  Gain = 'gain',
  Gains = 'gains',
  Id = 'id',
  Loss = 'loss',
  Losses = 'losses',
  Results = 'results',
  ResultsApr = 'results__apr',
  ResultsBlockNumber = 'results__blockNumber',
  ResultsDuration = 'results__duration',
  ResultsEndTimestamp = 'results__endTimestamp',
  ResultsId = 'results__id',
  ResultsStartTimestamp = 'results__startTimestamp',
  ResultsTimestamp = 'results__timestamp',
  ResultsVault = 'results__vault',
  Strategy = 'strategy',
  StrategyId = 'strategy__id',
  Timestamp = 'timestamp',
  VaultAprReports = 'vaultAPRReports'
}

export type Strategy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Strategy_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  latestReport?: InputMaybe<Scalars['String']['input']>;
  latestReport_?: InputMaybe<StrategyReport_Filter>;
  latestReport_contains?: InputMaybe<Scalars['String']['input']>;
  latestReport_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  latestReport_ends_with?: InputMaybe<Scalars['String']['input']>;
  latestReport_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  latestReport_gt?: InputMaybe<Scalars['String']['input']>;
  latestReport_gte?: InputMaybe<Scalars['String']['input']>;
  latestReport_in?: InputMaybe<Array<Scalars['String']['input']>>;
  latestReport_lt?: InputMaybe<Scalars['String']['input']>;
  latestReport_lte?: InputMaybe<Scalars['String']['input']>;
  latestReport_not?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_contains?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  latestReport_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  latestReport_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  latestReport_starts_with?: InputMaybe<Scalars['String']['input']>;
  latestReport_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Strategy_Filter>>>;
  reports_?: InputMaybe<StrategyReport_Filter>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Strategy_OrderBy {
  Id = 'id',
  LatestReport = 'latestReport',
  LatestReportAllocBps = 'latestReport__allocBPS',
  LatestReportAllocated = 'latestReport__allocated',
  LatestReportAllocationAdded = 'latestReport__allocationAdded',
  LatestReportDebtPaid = 'latestReport__debtPaid',
  LatestReportGain = 'latestReport__gain',
  LatestReportGains = 'latestReport__gains',
  LatestReportId = 'latestReport__id',
  LatestReportLoss = 'latestReport__loss',
  LatestReportLosses = 'latestReport__losses',
  LatestReportTimestamp = 'latestReport__timestamp',
  Reports = 'reports',
  Vault = 'vault',
  VaultApr = 'vault__apr',
  VaultId = 'vault__id',
  VaultLastUpdated = 'vault__lastUpdated',
  VaultNrOfStrategies = 'vault__nrOfStrategies',
  VaultPricePerFullShare = 'vault__pricePerFullShare'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  strategies: Array<Strategy>;
  strategy?: Maybe<Strategy>;
  strategyReport?: Maybe<StrategyReport>;
  strategyReportInVaultAPRReport?: Maybe<StrategyReportInVaultAprReport>;
  strategyReportInVaultAPRReports: Array<StrategyReportInVaultAprReport>;
  strategyReportResult?: Maybe<StrategyReportResult>;
  strategyReportResults: Array<StrategyReportResult>;
  strategyReports: Array<StrategyReport>;
  user?: Maybe<User>;
  users: Array<User>;
  vault?: Maybe<Vault>;
  vaultAPRReport?: Maybe<VaultAprReport>;
  vaultAPRReports: Array<VaultAprReport>;
  vaults: Array<Vault>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionStrategiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Strategy_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Strategy_Filter>;
};


export type SubscriptionStrategyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStrategyReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStrategyReportInVaultAprReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStrategyReportInVaultAprReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportInVaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
};


export type SubscriptionStrategyReportResultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStrategyReportResultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportResult_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReportResult_Filter>;
};


export type SubscriptionStrategyReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StrategyReport_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultAprReportArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultAprReportsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultAprReport_Filter>;
};


export type SubscriptionVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type User = {
  __typename?: 'User';
  /** Combination of wallet address and vault address */
  id: Scalars['ID']['output'];
  /** User's total deposits */
  totalDeposits: Scalars['BigInt']['output'];
  /** User's total withdrawals */
  totalWithdrawals: Scalars['BigInt']['output'];
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  totalDeposits?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalDeposits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalDeposits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawals?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalWithdrawals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalWithdrawals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum User_OrderBy {
  Id = 'id',
  TotalDeposits = 'totalDeposits',
  TotalWithdrawals = 'totalWithdrawals'
}

export type Vault = {
  __typename?: 'Vault';
  /** Annual Percentage Rate for the vault. */
  apr?: Maybe<Scalars['BigInt']['output']>;
  /** Vault address */
  id: Scalars['ID']['output'];
  lastUpdated: Scalars['BigInt']['output'];
  /** The nr of strategies currently in use */
  nrOfStrategies: Scalars['BigInt']['output'];
  /** Current price per full share at the time of this report */
  pricePerFullShare: Scalars['BigInt']['output'];
  /** One-to-Many relationship with VaultAPRReport */
  reports: Array<VaultAprReport>;
  /** Strategies for this Vault */
  strategies: Array<Strategy>;
};


export type VaultReportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<VaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VaultAprReport_Filter>;
};


export type VaultStrategiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Strategy_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Strategy_Filter>;
};

export type VaultAprReport = {
  __typename?: 'VaultAPRReport';
  apr?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  pricePerFullShare: Scalars['BigInt']['output'];
  /** List of strategy reports used to derive APR for this report */
  strategyReports: Array<StrategyReportInVaultAprReport>;
  timestamp: Scalars['BigInt']['output'];
  vault: Vault;
};


export type VaultAprReportStrategyReportsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StrategyReportInVaultAprReport_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
};

export type VaultAprReport_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VaultAprReport_Filter>>>;
  apr?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  apr_lt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_lte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<VaultAprReport_Filter>>>;
  pricePerFullShare?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerFullShare_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strategyReports_?: InputMaybe<StrategyReportInVaultAprReport_Filter>;
  timestamp?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vault?: InputMaybe<Scalars['String']['input']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']['input']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_gt?: InputMaybe<Scalars['String']['input']>;
  vault_gte?: InputMaybe<Scalars['String']['input']>;
  vault_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_lt?: InputMaybe<Scalars['String']['input']>;
  vault_lte?: InputMaybe<Scalars['String']['input']>;
  vault_not?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains?: InputMaybe<Scalars['String']['input']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with?: InputMaybe<Scalars['String']['input']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum VaultAprReport_OrderBy {
  Apr = 'apr',
  Id = 'id',
  PricePerFullShare = 'pricePerFullShare',
  StrategyReports = 'strategyReports',
  Timestamp = 'timestamp',
  Vault = 'vault',
  VaultApr = 'vault__apr',
  VaultId = 'vault__id',
  VaultLastUpdated = 'vault__lastUpdated',
  VaultNrOfStrategies = 'vault__nrOfStrategies',
  VaultPricePerFullShare = 'vault__pricePerFullShare'
}

export type Vault_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Vault_Filter>>>;
  apr?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_gte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  apr_lt?: InputMaybe<Scalars['BigInt']['input']>;
  apr_lte?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not?: InputMaybe<Scalars['BigInt']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lastUpdated?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nrOfStrategies?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nrOfStrategies_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_not?: InputMaybe<Scalars['BigInt']['input']>;
  nrOfStrategies_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Vault_Filter>>>;
  pricePerFullShare?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pricePerFullShare_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_not?: InputMaybe<Scalars['BigInt']['input']>;
  pricePerFullShare_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reports_?: InputMaybe<VaultAprReport_Filter>;
  strategies_?: InputMaybe<Strategy_Filter>;
};

export enum Vault_OrderBy {
  Apr = 'apr',
  Id = 'id',
  LastUpdated = 'lastUpdated',
  NrOfStrategies = 'nrOfStrategies',
  PricePerFullShare = 'pricePerFullShare',
  Reports = 'reports',
  Strategies = 'strategies'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type VaultQueryVariables = Exact<{
  vaultId: Scalars['ID']['input'];
  currentUnixTime: Scalars['BigInt']['input'];
  timestampOneMonthAgo: Scalars['BigInt']['input'];
}>;


export type VaultQuery = { __typename?: 'Query', vault?: { __typename?: 'Vault', nrOfStrategies: any, id: string, lastUpdated: any, strategies: Array<{ __typename?: 'Strategy', id: string, reports: Array<{ __typename?: 'StrategyReport', allocBPS: any, allocated: any, allocationAdded: any, debtPaid: any, gain: any, gains: any, id: string, loss: any, losses: any, results?: { __typename?: 'StrategyReportResult', apr: any, blockNumber: any, duration: any, endTimestamp: any, startTimestamp: any, timestamp: any, id: string } | null }> }> } | null };

export type VaultListQueryVariables = Exact<{ [key: string]: never; }>;


export type VaultListQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', id: string, apr?: any | null, nrOfStrategies: any, pricePerFullShare: any, lastUpdated: any }> };

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

export const VaultDocument = new TypedDocumentString(`
    query Vault($vaultId: ID!, $currentUnixTime: BigInt!, $timestampOneMonthAgo: BigInt!) {
  vault(id: $vaultId) {
    nrOfStrategies
    id
    lastUpdated
    strategies {
      id
      reports(
        orderBy: timestamp
        orderDirection: desc
        where: {timestamp_gte: $timestampOneMonthAgo, timestamp_lte: $currentUnixTime}
      ) {
        results {
          apr
          blockNumber
          duration
          endTimestamp
          startTimestamp
          timestamp
          id
        }
        allocBPS
        allocated
        allocationAdded
        debtPaid
        gain
        gains
        id
        loss
        losses
      }
    }
  }
}
    `) as unknown as TypedDocumentString<VaultQuery, VaultQueryVariables>;
export const VaultListDocument = new TypedDocumentString(`
    query VaultList {
  vaults {
    id
    apr
    nrOfStrategies
    pricePerFullShare
    lastUpdated
  }
}
    `) as unknown as TypedDocumentString<VaultListQuery, VaultListQueryVariables>;