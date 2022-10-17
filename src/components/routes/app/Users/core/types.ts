import User from '../../../../../types/user';

export type UserState = {
  users: [] | User[],
  isLoading: boolean,
  error: any,
};

export type UpdateUserPayload = {
  id: string,
  admin: boolean
};

export type DeleteUserPayload = {
  id: string,
}
