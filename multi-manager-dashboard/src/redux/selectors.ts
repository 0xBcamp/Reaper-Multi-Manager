import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Strategy } from "./slices/strategiesSlice";
import { Vault, VaultSnapshot } from "./slices/vaultsSlice";
import { Chain } from "./slices/blockchainSlice";

const selectSelectedChain = (state: RootState) => state.blockchain.selectedChain;
const selectAllVaults = (state: RootState) => state.vaults.vaults;
const selectSelectedVaultAddress = (state: RootState) => state.vaults.selectedVaultAddress;
// const selectAllVaultSnapshots = (state: RootState) => state.vaults.snapshots;
const selectSelectedStrategyAddress = (state: RootState) => state.strategies.selectedStrategyAddress;
// const selectAllStrategies = (state: RootState) => state.strategies.strategies;
const selectAllTokens = (state: RootState) => state.reaper.tokens;

export const selectVaultsByChain: (state: RootState) => Vault[] = createSelector(
    [selectSelectedChain, selectAllVaults],
    (selectedChain, vaults) => {
        return vaults?.filter(x => x.chainId === selectedChain?.chainId).map(vault => {
            return {
                ...vault,
            }
        })
    }
);

export const selectChain: (state: RootState) => Chain = createSelector([selectSelectedChain], (selectedChain) => selectedChain);

// export const selectStrategiesByChain = createSelector(
//     [selectSelectedChain, selectAllStrategies],
//     (selectedChain, strategies) => {
//         return strategies?.filter(x => x.chainId === selectedChain?.chainId && x.isActive).map(strategy => {
//             return {
//                 ...strategy,
//             };
//         });
//     }
// );

// export const selectStrategiesByVault: (state: RootState) => Strategy[] = createSelector(
//     [selectSelectedVaultAddress, selectAllStrategies],
//     (selectedVaultAddress, strategies) => {
//         return strategies?.filter(x => x.vaultAddress.toLowerCase() === selectedVaultAddress?.toLowerCase() && x.isActive).map(strategy => {
//             return {
//                 ...strategy
//             };
//         });
//     }
// );

export const selectVault: (state: RootState) => Vault = createSelector(
    [selectSelectedVaultAddress, selectVaultsByChain],
    (selectedVaultAddress, vaults) => {
        return vaults?.find(vault => vault.address?.toLowerCase() === selectedVaultAddress?.toLowerCase())
    }
);

// export const selectVaultSnapshotsByVault: (state: RootState) => VaultSnapshot[] = createSelector(
//     [selectSelectedVaultAddress, selectAllVaultSnapshots],
//     (selectedVaultAddress, snapshots) => {
//         return snapshots?.filter(x => x.vaultAddress.toLowerCase() === selectedVaultAddress?.toLowerCase());
//     }
// );

// export const selectVaultSnapshotsByChain: (state: RootState) => VaultSnapshot[] = createSelector(
//     [selectSelectedChain, selectAllVaultSnapshots],
//     (selectedChain, snapshots) => {
//         return snapshots?.filter(x => x.vault.chainId === selectedChain.chainId);
//     }
// );

export const selectStrategy = createSelector(
    [selectVault, selectSelectedStrategyAddress],
    (vault, selectedStrategyAddress) => {
        return vault?.strategies.find(strategy =>
            strategy.address?.toLowerCase() === selectedStrategyAddress?.toLowerCase()
        );
    }
);

export const selectTokensByChain = createSelector(
    [selectSelectedChain, selectAllTokens],
    (selectedChain, tokens) => {
        return tokens?.filter(x => x.chainId === selectedChain?.chainId);
    }
);