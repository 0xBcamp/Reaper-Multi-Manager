import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vault, VaultSnapshot, VaultTransaction } from '../../gql/graphql';

const initialState: {
  vaults: Vault[];
  selectedVaultAddress: string;
  snapshots: VaultSnapshot[];
  vaultTransactions: VaultTransaction[];
} = {
  vaults: [],
  selectedVaultAddress: null,
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
    setSelectedVaultAddress: (state, action: PayloadAction<string>) => {
      state.selectedVaultAddress = action.payload;
    },
    setVaultSnapshots: (state, action: PayloadAction<VaultSnapshot[]>) => {
      state.snapshots = action.payload;
    },
    setVaultTransactions: (state, action: PayloadAction<VaultTransaction[]>) => {
      state.vaultTransactions = action.payload;
    },
  }
});

export const { setVaults, setSelectedVaultAddress, setVaultSnapshots, setVaultTransactions } = vaultsSlice.actions;
export default vaultsSlice.reducer;
