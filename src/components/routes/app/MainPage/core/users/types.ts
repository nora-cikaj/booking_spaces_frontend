import { WorkspaceUser } from '../../../../../../types/users';

export type UsersState = {
  usersList: undefined | WorkspaceUser[];
  isLoading: boolean;
  error: any;
};
