import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnapshot_Delta } from './vaultsSlice';

export interface Chain {
  _id: string;
  chainId: number;
  name: string;
  last30SnapShots?: { timestamp: number; tvl: number; totalUsers: number }[];
  lastSnapShotDelta?: {
    tvl?: ISnapshot_Delta;
    totalUsers?: ISnapshot_Delta;
  };
}

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
