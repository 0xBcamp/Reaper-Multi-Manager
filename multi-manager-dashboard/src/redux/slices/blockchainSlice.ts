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

export interface Wallet {
  status?: string,
  address?: string;
  chainId?: number;
}

const initialState: {
  chains: Chain[];
  selectedChain: Chain | null;
  wallet?: Wallet
} = {
  chains: [],
  selectedChain: null,
  wallet: {
    status: "disconnected",
    address: "",
  }
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
    },
    setWalletStatus: (state, action: PayloadAction<string>) => {
      state.wallet.status = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.wallet.address = action.payload;
    },
    setWalletChainId: (state, action: PayloadAction<number>) => {
      state.wallet.chainId = action.payload;
    },
    disconnectWallet: (state) => {
      state.wallet = initialState.wallet
    }
  }
});

export const { setChains, setSelectedChain, setWalletStatus, setWalletAddress, disconnectWallet, setWalletChainId } = blockchainSlice.actions;
export default blockchainSlice.reducer;
