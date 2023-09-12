import { configureStore } from '@reduxjs/toolkit';
import blockchainReducer from './slices/blockchainSlice';

const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
