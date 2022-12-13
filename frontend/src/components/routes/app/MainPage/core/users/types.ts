import User from '../../../../../../types/user';
import { WorkspaceUser } from '../../../../../../types/users';

export type UsersState = {
  usersList: undefined | WorkspaceUser[];
  activeUsers: undefined | User[];
  isLoading: boolean;
  error: any;
};
