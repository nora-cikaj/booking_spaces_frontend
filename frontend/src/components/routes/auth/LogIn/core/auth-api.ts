import Axios from 'axios';
import routes from '../../../../../constants/routes';

export const getUser = async (): Promise<any> => {
  const url = `${routes.API.BASE}${routes.API.LOGGED_IN_USER}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data;
};

export const logoutUser = async (): Promise<any> => {
  const url = `${routes.API.BASE}/auth/logout`;
  await Axios({
    method: 'GET',
    url,
  });
};
