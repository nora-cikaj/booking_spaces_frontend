import { AppDispatch } from '../../../../../../redux/store';
import { getUsersList } from './users-api';
import { getAllUsers, hasError, isLoading } from './users-reducer';

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
