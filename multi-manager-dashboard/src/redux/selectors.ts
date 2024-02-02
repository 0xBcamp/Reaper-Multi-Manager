import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Vault } from "./slices/vaultsSlice";
import { Chain, Wallet } from "./slices/blockchainSlice";
import { Strategy } from "./slices/strategiesSlice";

const selectSelectedChain = (state: RootState) => state.blockchain.selectedChain;
const selectBlockchainWallet = (state: RootState) => state.blockchain.wallet;
const selectAllVaults = (state: RootState) => state.vaults.vaults;
const selectSelectedVaultAddress = (state: RootState) => state.vaults.selectedVaultAddress;
const selectSelectedStrategyAddress = (state: RootState) => state.strategies.selectedStrategyAddress;
const selectAllTokens = (state: RootState) => state.reaper.tokens;
const selectAllStrategies = (state: RootState) => state.strategies.strategies;

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

export const selectStrategiesByChain: (state: RootState) => Strategy[] = createSelector(
    [selectSelectedChain, selectAllStrategies],
    (selectedChain, strategies) => {
        return strategies?.filter(x => x.chainId === selectedChain?.chainId).map(strategy => {
            return {
                ...strategy,
            }
        })
    }
);

export const selectChain: (state: RootState) => Chain = createSelector([selectSelectedChain], (selectedChain) => selectedChain);
export const selectWallet: (state: RootState) => Wallet = createSelector([selectBlockchainWallet], (selectedwallet) => selectedwallet);

export const selectVault: (state: RootState) => Vault = createSelector(
    [selectSelectedVaultAddress, selectVaultsByChain],
    (selectedVaultAddress, vaults) => {
        return vaults?.find(vault => vault.address?.toLowerCase() === selectedVaultAddress?.toLowerCase())
    }
);


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