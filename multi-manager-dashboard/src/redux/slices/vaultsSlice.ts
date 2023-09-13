import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vault, VaultSnapshot, VaultTransaction } from '../../gql/graphql';

const initialState: {
  vaults: Vault[];
  selectedVault: Vault;
  snapshots: VaultSnapshot[];
  vaultTransactions: VaultTransaction[];
} = {
  vaults: [],
  selectedVault: null,
  snapshots: [],
  vaultTransactions: []
};

const vaultsSlice = createSlice({
  name: 'vaults',
  initialState,
  reducers: {
    setVaults: (state, action: PayloadAction<Vault[]>) => {
      state.vaults = action.payload;
    },
    setSelectedVault: (state, action: PayloadAction<Vault>) => {
      state.selectedVault = action.payload;
    },
    setVaultSnapshots: (state, action: PayloadAction<VaultSnapshot[]>) => {
      state.snapshots = action.payload;
    },
    setVaultTransactions: (state, action: PayloadAction<VaultTransaction[]>) => {
      state.vaultTransactions = action.payload;
    },
  }
});

export const { setVaults, setSelectedVault, setVaultSnapshots, setVaultTransactions } = vaultsSlice.actions;
export default vaultsSlice.reducer;
