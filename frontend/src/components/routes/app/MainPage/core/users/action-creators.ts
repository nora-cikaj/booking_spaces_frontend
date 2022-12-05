import { AppDispatch } from '../../../../../../redux/store';
import { getAllActiveUsers, getUsersList } from './users-api';
import {
  getActiveUsers,
  getAllUsers,
  hasError,
  isLoading,
} from './users-reducer';

export const fetchAllUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const allUsers = await getUsersList();
      dispatch(getAllUsers(allUsers));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const fetchAllActiveUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const allUsersLoggedAtLeastOnce = await getAllActiveUsers();
      dispatch(getActiveUsers(allUsersLoggedAtLeastOnce));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
