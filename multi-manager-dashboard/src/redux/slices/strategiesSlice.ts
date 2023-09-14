import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strategy, StrategyReport } from '../../gql/graphql';

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
