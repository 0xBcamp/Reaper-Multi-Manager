import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import blockchainReducer from './slices/blockchainSlice';
import vaultsReducer from './slices/vaultsSlice';
import strategiesReducer from './slices/strategiesSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    blockchain: blockchainReducer,
    strategies: strategiesReducer,
    vaults: vaultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
