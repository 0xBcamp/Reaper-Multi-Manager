import { Strategy } from "../redux/slices/strategiesSlice";

export const calculateVaultHealthScore = (vaultStrategies: Strategy[]) => {
  const maxAllocationError = vaultStrategies.reduce((maxError, strat) => {
    if (strat.actualAllocatedBPS && strat.optimumAllocationBPS) {
      const allocationError = Math.abs(
        Number(strat.actualAllocatedBPS) - Number(strat.optimumAllocationBPS)
      );

      return Math.max(maxError, allocationError);
    }
    return maxError;
  }, 0);

  const allocationHealthFactor = 1 - maxAllocationError / 10000;

  let healthScore = 100 * allocationHealthFactor;

  healthScore = Math.max(0, Math.min(100, healthScore));

  return Number(healthScore.toFixed(2));
};
