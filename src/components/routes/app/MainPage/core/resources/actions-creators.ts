import { AppDispatch } from '../../../../../../redux/store';
import { getResourcesList } from './resources-api';
import { getAllRooms, hasError, isLoading } from './resources.reducer';

export const fetchAllRooms = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const allRooms = await getResourcesList();
      dispatch(getAllRooms(allRooms.items));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
