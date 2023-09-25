import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ReaperToken {
  _id: string;
  chainId: number;
  name: string;
  address: string;
  image: string;
  coinId: string;
  usd: number;
}

const initialState: {
  tokens: ReaperToken[];
} = {
  tokens: []
};

const reaperSlice = createSlice({
  name: 'reaper',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<ReaperToken[]>) => {
      state.tokens = action.payload;
    }
  }
});

export const { setTokens } = reaperSlice.actions;
export default reaperSlice.reducer;
