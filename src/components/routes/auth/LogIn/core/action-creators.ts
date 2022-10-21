import { isLoading, hasError, user } from './auth-reducer';
import { AppDispatch } from '../../../../../redux/store';
import User from '../../../../../types/user';
import { getUser } from './auth-api';

export const login = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const currendUser: User = await getUser();
      dispatch(user(currendUser));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
