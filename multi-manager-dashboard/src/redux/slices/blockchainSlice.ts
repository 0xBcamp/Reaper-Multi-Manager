import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chain } from '../../gql/graphql';

const initialState: {
  chains: Chain[];
  selectedChain: Chain | null;
} = {
  chains: [],
  selectedChain: null
};

const blockchainSlice = createSlice({
  name: 'chains',
  initialState,
  reducers: {
    setChains: (state, action: PayloadAction<Chain[]>) => {
      state.chains = action.payload;
    },
    setSelectedChain: (state, action: PayloadAction<Chain>) => {
      state.selectedChain = action.payload;
    }
  }
});

export const { setChains, setSelectedChain } = blockchainSlice.actions;
export default blockchainSlice.reducer;
