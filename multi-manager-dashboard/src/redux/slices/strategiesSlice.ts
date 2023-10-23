import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StrategyReport {
  _id: string;
  allocBPS: string;
  allocated: string;
  allocationAdded: string;
  block: number;
  debtPaid: string;
  duration: number;
  gain: string;
  gains: string;
  hash: string;
  loss: string;
  losses: string;
  reportDate: number;
  strategyAddress: string;
  vaultAddress: string;
  apr: number;
  chainId: number;
}

export interface Strategy {
  _id: string;
  address: string;
  allocBPS: string;
  block: number;
  chainId: number;
  dateAdded: number;
  dateRevoked: number;
  feeBPS: string;
  hash: string;
  isActive: boolean;
  vaultAddress: string;
  lastReport: StrategyReport | null;
  APR: number;
  aprReports: StrategyReport[];
  reports: StrategyReport[];
  vault: {
    name: string
  };
  actualAllocatedBPS: string;
  optimumAllocation: string;
  optimumAllocationBPS: string;
  isStale: boolean;
}


const initialState: {
  strategies: Strategy[];
  selectedStrategyAddress: string;
  strategyReports: StrategyReport[];
} = {
  strategies: [],
  selectedStrategyAddress: "",
  strategyReports: []
};

const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    setStrategies: (state, action: PayloadAction<Strategy[]>) => {
      state.strategies = action.payload;
    },
    setSelectedStrategyAddress: (state, action: PayloadAction<string>) => {
      state.selectedStrategyAddress = action.payload;
    },
    setStrategyReports: (state, action: PayloadAction<StrategyReport[]>) => {
      state.strategyReports = action.payload;
    }
  }
});

export const { setStrategies, setSelectedStrategyAddress, setStrategyReports } = strategiesSlice.actions;
export default strategiesSlice.reducer;
