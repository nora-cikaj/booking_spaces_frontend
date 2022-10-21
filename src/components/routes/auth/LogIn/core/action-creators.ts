import { NavigateFunction } from 'react-router-dom';
import routes from '../../../../../constants/routes';
import { isLoading, hasError, user } from './auth-reducer';
import { AppDispatch } from '../../../../../redux/store';
import User from '../../../../../types/user';
import { getUser, logoutUser } from './auth-api';

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

export const logout = (navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      await logoutUser();
      navigate(`${routes.LOG_IN}`);
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
