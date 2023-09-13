import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Strategy, StrategyReport } from "../gql/graphql";
import { calculateStrategyAPR } from "../lib/calculateStrategyAPR";
import { filterLastXDays } from "../utils/data/filterLastXDays";
import { sortTimestampByProp } from "../utils/data/sortByProp";

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

export const selectVaultsByChain = createSelector(
    [selectSelectedChain, selectAllVaults],
    (selectedChain, vaults) => vaults.filter(x => x.chain.chainId === selectedChain.chainId)
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