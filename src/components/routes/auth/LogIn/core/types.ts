import User from '../../../../../types/user';

export type AuthState = {
  user: undefined | User,
  isLoading: boolean,
  error: any,
};
