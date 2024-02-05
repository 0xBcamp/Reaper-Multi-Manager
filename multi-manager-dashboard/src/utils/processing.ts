import { calculateActualAllocatedBPS, calculateOptimumAllocation, calculateOptimumAllocationBPS, calculateStrategyProductValues, calculateVaultAllocatedAPR, calculateVaultTotalAPR, getStrategyAPRValues, getStrategyAllocatedValues } from "./calculateStrategyAllocations";
import { Strategy, StrategyReport } from "../redux/slices/strategiesSlice";
import { Vault } from "../redux/slices/vaultsSlice";
import { DEFAULT_STD_DEV_THRESHOLD, TWO_UNIX_DAYS } from "./constants";
import { calculateDataWithThreshold, calculateStrategyAPR } from "./calculateStrategyAPR";
import { ProtocolFork } from "../enums";
import { ethers } from "ethers";

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
    const strategiesWithUpdatedApr = processStrategies(vault, vault.strategies || []);
    const vaultAPRValues = calculateVaultAPRValues(vault, strategiesWithUpdatedApr);

    return {
      ...vault,
      ...vaultAPRValues,
      healthScore: calculateVaultHealthScore(vaultAPRValues.strategies)
    };
  });
};

const processStrategies = (vault: Vault, strategies: Strategy[]) => {
  return strategies.filter(x => x.isActive).map(strategy => {
    const updatedAprReports = strategy.aprReports.map(report => ({
      ...report,
      apr: calculateStrategyReportApr(report)
    }));

    const strategyAPR = calculateStrategyAPR(updatedAprReports);

    // Calculate the time since the last harvest with no decimals
    const timeSinceLastHarvest = strategy.lastReport ? Math.floor(new Date().getTime()/1000 - strategy.lastReport.reportDate) : 0;

    let supplied: string;
    let borrowed: string;
    if (strategy?.protocol?.fork === ProtocolFork.Granary) {
      supplied = strategy.granary?.userReserveData ? ethers.formatUnits(strategy.granary?.userReserveData.currentATokenBalance.toString(), vault.decimals).toString() : null;
      if (supplied) {
        supplied = parseFloat(supplied).toFixed(3).toString();
        if (supplied.startsWith("0")) {
          supplied = "0";
        }
      }

      borrowed = strategy.granary?.userReserveData ? ethers.formatUnits(strategy.granary?.userReserveData.currentVariableDebt.toString(), vault.decimals).toString() : null;
      if (borrowed) {
        borrowed = parseFloat(borrowed).toFixed(3).toString();
        if (borrowed.startsWith("0")) {
          borrowed = "0";
        }
      }
    }

    const strategyWithOptimumValues = {
      ...strategy,
      strategyName: strategy?.protocol ? strategy.protocol.name : "(no name)",
      APR: strategyAPR,
      ...strategy.lastReport && {
        lastReport: {
          ...strategy.lastReport,
          apr: calculateStrategyReportApr(strategy.lastReport)
        }
      },
      aprReports: updatedAprReports,
      timeSinceLastHarvest,
      supplied,
      borrowed,
      harvestCount: strategy.aprReports?.length > 0 ? strategy.aprReports?.length : 0
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
  let vaultAllocatedBPS: number;

  if (vault.lastSnapShot) {
    lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");
    lastVaultTotalAssets = parseFloat(vault.lastSnapShot?.totalAssets || "0");
    strategyAPRValues = getStrategyAPRValues(strategies);
    strategyAllocatedValues = getStrategyAllocatedValues(vault.strategies);

    vaultAllocatedBPS = lastVaultTotalAssets !== 0 ? lastVaultAllocated / lastVaultTotalAssets * 10000 : 0;

    const strategyProductValues = calculateStrategyProductValues(strategyAPRValues, strategyAllocatedValues);

    const vaultTotalAPR = calculateVaultTotalAPR(strategyProductValues, lastVaultTotalAssets);
    vault.totalAPR = vaultTotalAPR && !isNaN(vaultTotalAPR) ? vaultTotalAPR : 0

    const vaultAllocatedAPR = calculateVaultAllocatedAPR(strategyProductValues, lastVaultAllocated);
    vault.allocatedAPR = vaultAllocatedAPR && !isNaN(vaultAllocatedAPR) ? vaultAllocatedAPR : 0
  }

  const strategiesWithOptimumValues = strategies?.map(strategy => {

    lastVaultAllocated = parseFloat(vault.lastSnapShot?.totalAllocated || "0");

    const actualAllocatedBPS = calculateActualAllocatedBPS(parseFloat(strategy.lastReport?.allocated || "0"), lastVaultAllocated)
    let optimumAllocationValue = calculateOptimumAllocation(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, vault.allocatedAPR);
    let optimumAllocationBPSValue = calculateOptimumAllocationBPS(parseFloat(strategy.lastReport?.allocated || "0"), strategy.APR, vault.allocatedAPR, lastVaultAllocated);

    const optimumAllocation = isNaN(parseFloat(optimumAllocationValue)) ? "0" : optimumAllocationValue;
    const optimumAllocationBPS = isNaN(parseFloat(optimumAllocationBPSValue)) ? "0" : optimumAllocationBPSValue;

    //calculating % diff between actual and optimum allocations
    const actual = parseFloat(actualAllocatedBPS || "0");
    const optimum = parseFloat(optimumAllocationBPS || "0");

    const difference = Math.abs(actual - optimum) / 100;
    const actualOptimumPercDiff = parseFloat(difference.toFixed(2)); // rounded to 2 decimal places

    // Calculate whether the lastHarvest timestamp is more than 2 days old
    const isStale = strategy.lastReport ? Date.now()/1000 - strategy.lastReport?.reportDate > TWO_UNIX_DAYS : false;

    const updatedStrategy: Strategy = {
      ...strategy,
      actualAllocatedBPS,
      optimumAllocation,
      optimumAllocationBPS,
      isStale,
      actualOptimumPercDiff
    }

    return updatedStrategy;
  });

  return {
    ...vault,
    strategies: strategiesWithOptimumValues,
    vaultAllocatedBPS: vaultAllocatedBPS,
    healthScore: calculateVaultHealthScore(strategiesWithOptimumValues)
  };
};