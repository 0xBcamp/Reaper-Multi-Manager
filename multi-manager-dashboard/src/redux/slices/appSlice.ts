import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isInitialized: boolean;
  lastRefetch?: number;
} = {
  isInitialized: false
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setLastRefetch: (state) => {
      state.lastRefetch = new Date().getTime();
    },
  }
});

export const { setInitialized, setLastRefetch } = appSlice.actions;
export default appSlice.reducer;
