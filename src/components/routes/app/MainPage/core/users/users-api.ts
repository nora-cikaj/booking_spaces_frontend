import Axios from 'axios';
import routes from '../../../../../../constants/routes';
import User from '../../../../../../types/user';

export const getUsersList = async (): Promise<any> => {
  const url = `${routes.API.BASE}${routes.API.USERS}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data.users;
};

export const getAllActiveUsers = async (): Promise<User[]> => {
  const url = `${routes.API.BASE}${routes.API.USER}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data;
};
