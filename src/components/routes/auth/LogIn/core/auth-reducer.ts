import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../../../../types/user';
import { AuthState } from './types';

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    user: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const {
  isLoading,
  hasError,
  user,
} = authSlice.actions;

export default authSlice.reducer;
