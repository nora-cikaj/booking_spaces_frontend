import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UpdateUserPayload, DeleteUserPayload } from './types';
import User from '../../../../../types/user';

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: undefined,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    users: (state, action: PayloadAction<User[] | []>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      const { users } = state;
      const updatedUsers = users.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            admin: action.payload.admin,
          };
        }
        return user;
      });
      state.users = updatedUsers;
    },
    deleteUser: (state, action: PayloadAction<DeleteUserPayload>) => {
      const { users } = state;
      const newUsersList = users.filter((user) => user.id !== action.payload.id);
      state.users = newUsersList;
    },
  },
});

export const {
  isLoading,
  hasError,
  users,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
