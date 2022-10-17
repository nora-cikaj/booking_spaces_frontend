import Axios from 'axios';
import routes from '../../../../../constants/routes';
import { UpdateUserPayload } from './types';

export const fetchUsers = async (): Promise<any> => {
  const url = `${routes.API.BASE}${routes.API.USER}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data;
};

export const updatePermissions = async (
  { id, admin }: UpdateUserPayload,
): Promise<void> => {
  const url = `${routes.API.BASE}${routes.API.USER}/${id}?admin=${admin}`;
  await Axios({
    method: 'PATCH',
    url,
  });
};

export const delUser = async (
  { id }: { id: string },
): Promise<void> => {
  const url = `${routes.API.BASE}${routes.API.USER}/${id}`;
  await Axios({
    method: 'DELETE',
    url,
  });
};
