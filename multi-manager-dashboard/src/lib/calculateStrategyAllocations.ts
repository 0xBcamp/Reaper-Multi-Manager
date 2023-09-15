// calculateStrategyAllocations.ts
import { StrategySelector } from "../redux/selectors";

export function getLastStrategyHarvest(strategy: StrategySelector) {
    return strategy.aprReports?.length > 0 ? strategy.aprReports[strategy.aprReports?.length - 1] : undefined;
}

export function getLastStrategyAllocated(strategy: StrategySelector) {
    return strategy.aprReports?.[strategy.aprReports.length - 1]?.allocated;
}

export function getStrategyAPRValues(strategies: StrategySelector[]) {
    return strategies.map((strategy) => strategy.APR);
}

export function getStrategyAllocatedValues(strategies: StrategySelector[]) {
    return strategies.map((strat) => parseFloat(strat.aprReports?.[strat.aprReports.length - 1]?.allocated || "0"));
}

export function calculateStrategyProductValues(aprValues: number[], allocatedValues: number[]) {
    return aprValues.map((aprValue, index) => allocatedValues[index] * aprValue);
}

export function calculateVaultAPR(strategyProductValues: number[], lastVaultAllocated: number) {
    return strategyProductValues.reduce((total, productValue) => total + productValue, 0) / lastVaultAllocated;
}

export function calculateActualAllocatedBPS(lastStrategyAllocated: number, lastVaultAllocated: number) {
    return (lastStrategyAllocated / lastVaultAllocated * 10000).toFixed(2);
}

export function calculateOptimumAllocation(lastStrategyAllocated: number, strategyAPR: number, vaultAPR: number) {
    return (lastStrategyAllocated * strategyAPR / vaultAPR).toFixed(0);
}

export function calculateOptimumAllocationBPS(lastStrategyAllocated: number, strategyAPR: number, vaultAPR: number, lastVaultAllocated: number) {
    return (lastStrategyAllocated * strategyAPR / vaultAPR / lastVaultAllocated * 10000).toFixed(2);
}
