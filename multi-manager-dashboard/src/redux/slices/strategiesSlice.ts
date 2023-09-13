import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strategy, StrategyReport, Vault, VaultListQuery, VaultSnapshot, VaultTransaction } from '../../gql/graphql';

const initialState: {
  strategies: Strategy[];
  strategyReports: StrategyReport[];
} = {
  strategies: [],
  strategyReports: []
};

const strategiesSlice = createSlice({
  name: 'strategies',
  initialState,
  reducers: {
    setStrategies: (state, action: PayloadAction<Strategy[]>) => {
      state.strategies = action.payload;
    },
    setStrategyReports: (state, action: PayloadAction<StrategyReport[]>) => {
      state.strategyReports = action.payload;
    }
  }
});

export const { setStrategies, setStrategyReports } = strategiesSlice.actions;
export default strategiesSlice.reducer;
