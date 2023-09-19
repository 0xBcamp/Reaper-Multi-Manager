import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isInitialized: boolean;
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
  }
});

export const { setInitialized } = appSlice.actions;
export default appSlice.reducer;
