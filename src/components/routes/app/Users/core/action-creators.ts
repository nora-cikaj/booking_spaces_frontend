import {
  isLoading,
  hasError,
  users,
  updateUser,
  deleteUser,
} from './user-reducer';
import { AppDispatch } from '../../../../../redux/store';
import { fetchUsers, updatePermissions, delUser } from './user-api';
import { DeleteUserPayload, UpdateUserPayload } from './types';

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    dispatch(hasError(undefined));
    try {
      const usersList = await fetchUsers();
      dispatch(users(usersList));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const updateUserPermissions = (data: UpdateUserPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    dispatch(hasError(undefined));
    try {
      await updatePermissions(data);
      dispatch(updateUser(data));
    } catch (e: any) {
      dispatch(hasError(e.response.data.details || e.response.data.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const deleteSingleUser = (data: DeleteUserPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    dispatch(hasError(undefined));
    try {
      await delUser(data);
      dispatch(deleteUser(data));
    } catch (e: any) {
      console.log(e);
      dispatch(hasError(e.response.data.details || e.response.data.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
