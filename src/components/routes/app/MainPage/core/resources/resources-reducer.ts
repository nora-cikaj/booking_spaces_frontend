import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource } from '../../../../../../types/resources';
import { ResourceState } from './types';

const initialState: ResourceState = {
  resourcesList: undefined,
  isLoading: false,
  error: undefined,
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    getAllRooms: (state, action: PayloadAction<Resource[] | undefined>) => {
      state.resourcesList = action.payload;
    },
  },
});

export const { isLoading, hasError, getAllRooms } = resourcesSlice.actions;

export default resourcesSlice.reducer;
