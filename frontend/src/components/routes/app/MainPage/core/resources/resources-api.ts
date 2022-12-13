import Axios from 'axios';
import routes from '../../../../../../constants/routes';

export const getResourcesList = async (): Promise<any> => {
  const url = `${routes.API.BASE}${routes.API.RESOURCES}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data;
};
