import Axios from 'axios';
import routes from '../../../../../../constants/routes';

export const getUsersList = async (): Promise<any> => {
  const url = `${routes.API.BASE}${routes.API.USERS}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data.users;
};
