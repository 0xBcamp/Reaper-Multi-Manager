import { configureStore } from '@reduxjs/toolkit';
import blockchainReducer from './slices/blockchainSlice';
import vaultsReducer from './slices/vaultsSlice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
    vaults: vaultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
