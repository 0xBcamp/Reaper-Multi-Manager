import { calculateOptimumAllocation, calculateOptimumAllocationBPS, calculateStrategyProductValues, calculateVaultAllocatedAPR, calculateVaultTotalAPR, getStrategyAPRValues, getStrategyAllocatedValues } from "./calculateStrategyAllocations";
import { Strategy, StrategyReport } from "../redux/slices/strategiesSlice";
import { Vault } from "../redux/slices/vaultsSlice";
import { DEFAULT_STD_DEV_THRESHOLD } from "./constants";
import { calculateDataWithThreshold, calculateStrategyAPR } from "./calculateStrategyAPR";

export const calculateVaultHealthScore = (vaultStrategies: Strategy[]) => {
  try {
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
  } catch (error) {
    console.log(error)
  }

  return 0;
};

export const processVaults = (vaultsData: Vault[]) => {
  return vaultsData.map(vault => {
      const strategiesWithUpdatedApr = processStrategies(vault.strategies || []);
      const vaultAPRValues = calculateVaultAPRValues(vault, strategiesWithUpdatedApr);

      return {
          ...vault,
          ...vaultAPRValues,
          healthScore: calculateVaultHealthScore(vaultAPRValues.strategies)
      };
  });
};

const processStrategies = (strategies: Strategy[]) => {
  return strategies.map(strategy => {
      const updatedAprReports = strategy.aprReports.map(report => ({
          ...report,
          apr: calculateStrategyReportApr(report)
      }));

      const strategyAPR = calculateStrategyAPR(updatedAprReports);

      const strategyWithOptimumValues = {
          ...strategy,
          APR: strategyAPR,
          ...strategy.lastReport && {
              lastReport: {
                  ...strategy.lastReport,
                  apr: calculateStrategyReportApr(strategy.lastReport)
              }
          },
          aprReports: updatedAprReports
      }

      return strategyWithOptimumValues;
  });
};

const calculateStrategyReportApr = (report: StrategyReport) => {
  const strategyAprValue = calculateDataWithThreshold([report], DEFAULT_STD_DEV_THRESHOLD);
  return strategyAprValue.yData[0] || 0;
};

const calculateVaultAPRValues = (vault: Vault, strategies: Strategy[]) => {
  let lastVaultAllocated: number;
  let lastVaultTotalAssets: number;
  let strategyAPRValues: number[];
  let strategyAllocatedValues: number[];
  let actualAllocated: number;

  if (vault.lastSnapShot) {
      lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");
      lastVaultTotalAssets = parseFloat(vault.lastSnapShot?.totalAssets || "0");
      strategyAPRValues = getStrategyAPRValues(strategies);
      strategyAllocatedValues = getStrategyAllocatedValues(vault.strategies);

      actualAllocated = lastVaultTotalAssets !== 0 ? lastVaultAllocated / lastVaultTotalAssets : 0;

      const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);

      const vaultTotalAPR = calculateVaultTotalAPR(strategyProductValues, lastVaultTotalAssets);
      vault.totalAPR = vaultTotalAPR && !isNaN(vaultTotalAPR) ? vaultTotalAPR : 0

      const vaultAllocatedAPR = calculateVaultAllocatedAPR(strategyProductValues, lastVaultAllocated);
      vault.allocatedAPR = vaultAllocatedAPR && !isNaN(vaultAllocatedAPR) ? vaultAllocatedAPR : 0
  }

  const strategiesWithOptimumValues = strategies?.map(strategy => {

      lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");

      const actualAllocatedBPS = (parseFloat(strategy.lastReport?.allocated || "0") / lastVaultAllocated * 10000)?.toFixed(2);
      const optimumAllocation = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, vault.allocatedAPR);
      const optimumAllocationBPS = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, vault.allocatedAPR, lastVaultAllocated);

      const updatedStrategy: Strategy = {
          ...strategy,
          actualAllocatedBPS,
          optimumAllocation,
          optimumAllocationBPS
      }

      return updatedStrategy;
  });

  return {
      ...vault,
      strategies: strategiesWithOptimumValues,
      actualAllocated,
      healthScore: calculateVaultHealthScore(strategiesWithOptimumValues)
  };
};