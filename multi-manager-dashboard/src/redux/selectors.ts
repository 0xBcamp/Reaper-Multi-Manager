import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Strategy, StrategyReport, Vault, VaultSnapshot } from "../gql/graphql";
import { calculateStrategyAPR } from "../lib/calculateStrategyAPR";
import { filterLastXDays } from "../utils/data/filterLastXDays";
import { sortTimestampByProp } from "../utils/data/sortByProp";

export type VaultSelector = Vault & {
    snapshots: VaultSnapshot[]
};

export type StrategySelector = Strategy & {
    APR: number;
    aprReports: StrategyReport[];
    reports: StrategyReport[];
};

const selectSelectedChain = (state: RootState) => state.blockchain.selectedChain;
const selectAllVaults = (state: RootState) => state.vaults.vaults;
const selectSelectedVault = (state: RootState) => state.vaults.selectedVault;
const selectAllStrategies = (state: RootState) => state.strategies.strategies;
const selectAllStrategyReports = (state: RootState) => state.strategies.strategyReports;
const selectAllVaultSnapshots = (state: RootState) => state.vaults.snapshots;

export const selectVaultsByChain: (state: RootState) => VaultSelector[]  = createSelector(
    [selectSelectedChain, selectAllVaults, selectAllVaultSnapshots],
    (selectedChain, vaults, vaultSnapshot) => {
        return vaults.filter(x => x.chain.chainId === selectedChain.chainId).map(vault => {
            let currentVaultSnapshots = vaultSnapshot.filter(snapshot =>
                snapshot.vaultAddress.toLowerCase() === vault.address.toLowerCase()
            );

            currentVaultSnapshots = sortTimestampByProp(currentVaultSnapshots, "timestamp");

            return {
                ...vault,
                lastSnapShot: currentVaultSnapshots?.length > 0 ? currentVaultSnapshots[currentVaultSnapshots.length - 1]: undefined,
                snapshots: currentVaultSnapshots
            }
        })
    }
);

export const selectStrategiesByChain = createSelector(
    [selectSelectedChain, selectAllStrategies, selectAllStrategyReports],
    (selectedChain, strategies, strategyReports) => {
        return strategies.filter(x => x.chainId === selectedChain.chainId && x.isActive).map(strategy => {
            let currentStrategyReports = strategyReports.filter(report =>
                report.strategyAddress.toLowerCase() === strategy.address.toLowerCase()
            );

            currentStrategyReports = sortTimestampByProp(currentStrategyReports, "reportDate");

            const inDateRangeReports = filterLastXDays(currentStrategyReports, "reportDate", new Date().getTime(), 30) as StrategyReport[];

            const APR = calculateStrategyAPR(inDateRangeReports);
            return {
                ...strategy,
                APR: APR,
                aprReports: inDateRangeReports,
                reports: currentStrategyReports
            };
        });
    }
);

export const selectStrategiesByVault: (state: RootState) => StrategySelector[]  = createSelector(
    [selectSelectedVault, selectAllStrategies, selectAllStrategyReports],
    (selectedVault, strategies, strategyReports) => {
        return strategies.filter(x => x.vaultAddress.toLowerCase() === selectedVault?.address.toLowerCase() && x.isActive).map(strategy => {
            let currentStrategyReports = strategyReports.filter(report =>
                report.strategyAddress.toLowerCase() === strategy.address.toLowerCase()
            );

            currentStrategyReports = sortTimestampByProp(currentStrategyReports, "reportDate");

            const inDateRangeReports = filterLastXDays(currentStrategyReports, "reportDate", new Date().getTime(), 30) as StrategyReport[];

            const APR = calculateStrategyAPR(inDateRangeReports);
            return {
                ...strategy,
                APR: APR,
                aprReports: inDateRangeReports,
                reports: currentStrategyReports
            };
        });
    }
);

export const selectVault = createSelector([selectSelectedVault], (selectedVault) => selectedVault
);