import Axios, { AxiosResponse } from 'axios';
import routes from '../../../../../../constants/routes';
import {
  Event,
  EventPostRequestType,
  EventUpdateRequestType,
} from '../../../../../../types/event';

export const getAllEvents = async (
  timeMin?: string,
  timeMax?: string,
): Promise<Event[]> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}`;
  const response: AxiosResponse<Event[]> = await Axios({
    method: 'GET',
    url,
    params: { timeMin, timeMax },
  });
  return response?.data;
};

export const postAnEvent = async (
  event: EventPostRequestType,
): Promise<Event> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}`;
  const response = await Axios({
    method: 'POST',
    url,
    data: event,
  });
  return response?.data;
};

export const updateAnEvent = async (
  eventId: string,
  event: EventUpdateRequestType,
): Promise<Event> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}/${eventId}`;
  const response = await Axios({
    method: 'PUT',
    url,
    data: event,
  });
  return response?.data;
};

export const deleteAnEvent = async (
  eventId: string,
  userEmail: string,
): Promise<Event> => {
  const url = `${routes.API.BASE}${routes.API.EVENTS}/${eventId}`;
  const response = await Axios({
    method: 'DELETE',
    url,
    data: { email: userEmail },
  });
  return response?.data;
};
