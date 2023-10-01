
import { Strategy } from "../redux/slices/strategiesSlice";

export function getLastStrategyHarvest(strategy: Strategy) {
    return strategy.aprReports?.length > 0 ? strategy.aprReports[strategy.aprReports?.length - 1] : undefined;
}

export function getLastStrategyAllocated(strategy: Strategy) {
    return strategy.aprReports?.[strategy.aprReports.length - 1]?.allocated;
}

export function getStrategyAPRValues(strategies: Strategy[]) {
    return strategies.map((strategy) => strategy.APR);
}

export function getStrategyAllocatedValues(strategies: Strategy[]) {
    return strategies.map((strat) => parseFloat(strat.lastReport?.allocated || "0"));
}

export function calculateStrategyProductValues(aprValues: number[], allocatedValues: number[]) {
    return aprValues.map((aprValue, index) => allocatedValues[index] * aprValue);
}

export function calculateVaultAllocatedAPR(strategyProductValues: number[], lastVaultAllocated: number) {
    return strategyProductValues.reduce((total, productValue) => total + productValue, 0) / lastVaultAllocated;
}

export function calculateVaultTotalAPR(strategyProductValues: number[], lastVaultTotalAssets: number) {
    return strategyProductValues.reduce((total, productValue) => total + productValue, 0) / lastVaultTotalAssets;
}

export function calculateActualAllocatedBPS(lastStrategyAllocated: number, lastVaultAllocated: number) {
    return (lastStrategyAllocated / lastVaultAllocated * 10000).toFixed(2);
}

export function calculateOptimumAllocation(lastStrategyAllocated: number, strategyAPR: number, vaultAllocatedAPR: number) {
    return (lastStrategyAllocated * strategyAPR / vaultAllocatedAPR).toFixed(0);
}

export function calculateOptimumAllocationBPS(lastStrategyAllocated: number, strategyAPR: number, vaultAllocatedAPR: number, lastVaultAllocated: number) {
    return (lastStrategyAllocated * strategyAPR / vaultAllocatedAPR / lastVaultAllocated * 10000).toFixed(2);
}
