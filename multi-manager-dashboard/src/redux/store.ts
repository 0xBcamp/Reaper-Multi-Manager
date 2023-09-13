import { configureStore } from '@reduxjs/toolkit';
import blockchainReducer from './slices/blockchainSlice';
import vaultsReducer from './slices/vaultsSlice';
import strategiesReducer from './slices/strategiesSlice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
    strategies: strategiesReducer,
    vaults: vaultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
