import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceUser } from '../../../../../../types/users';
import { UsersState } from './types';

const initialState: UsersState = {
  usersList: undefined,
  isLoading: false,
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    getAllUsers: (
      state,
      action: PayloadAction<WorkspaceUser[] | undefined>,
    ) => {
      state.usersList = action.payload;
    },
  },
});

export const { isLoading, hasError, getAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
