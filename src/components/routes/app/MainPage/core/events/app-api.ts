import Axios from 'axios';
import routes from '../../../../../../constants/routes';
import { Event } from '../../../../../../types/event';

export const getDailyEvents = async (): Promise<Event[]> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}`;
  const response = await Axios({
    method: 'GET',
    url,
  });
  return response.data;
};

export const updateAnEvent = async (event: Event): Promise<Event> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}/${event.id}`;
  const response = await Axios({
    method: 'PUT',
    url,
    data: event,
  });
  return response.data;
};

export const deleteAnEvent = async (eventId: string): Promise<Event> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}/${eventId}`;
  const response = await Axios({
    method: 'PUT',
    url,
  });
  return response.data;
};
