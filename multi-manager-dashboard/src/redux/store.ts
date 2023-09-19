import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';
import blockchainReducer from './slices/blockchainSlice';
import vaultsReducer from './slices/vaultsSlice';
import reapersReducer from './slices/reaperSlice';
import strategiesReducer from './slices/strategiesSlice';

const store = configureStore({
  reducer: {
    app: appSlice,
    blockchain: blockchainReducer,
    reaper: reapersReducer,
    strategies: strategiesReducer,
    vaults: vaultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
