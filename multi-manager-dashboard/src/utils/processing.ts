import { Strategy } from "../redux/slices/strategiesSlice";

export const calculateVaultHealthScore = (vaultStrategies: Strategy[]) => {
    let allocationPercDiff = 0;

    vaultStrategies.forEach(strat => {
        if (strat.actualAllocatedBPS && strat.optimumAllocationBPS) {
            let diff = Math.abs(Number(strat.actualAllocatedBPS) - Number(strat.optimumAllocationBPS));
            allocationPercDiff += diff;
        }
    });

    let normalizedDiff = allocationPercDiff / 100;
    
    let healthScore = 100 - normalizedDiff;
    
    healthScore = Math.max(0, Math.min(100, healthScore));

    return healthScore;
}