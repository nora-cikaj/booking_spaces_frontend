import { AppDispatch } from '../../../../../../redux/store';
import {
  Event,
  EventPostRequestType,
  EventUpdateRequestType,
} from '../../../../../../types/event';
import {
  getAllEvents,
  deleteAnEvent,
  postAnEvent,
  updateAnEvent,
} from './event-api';
import {
  addEvents,
  addEvent,
  isLoading,
  hasError,
  updateTheEvent,
  deleteTheEvent,
} from './event-reducer';

export const listEvents = (times: { timeMin?: string; timeMax?: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      const events: Event[] = await getAllEvents(times.timeMin, times.timeMax);
      dispatch(addEvents(events));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const postEvent = (event: EventPostRequestType) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      const response = await postAnEvent(event);
      dispatch(addEvent(response));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const updateEvent = (eventId: string, event: EventUpdateRequestType) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      await updateAnEvent(eventId, event);
      dispatch(updateTheEvent({ eventId, event }));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const deleteEvent = (eventId: string, userEmail: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      await deleteAnEvent(eventId, userEmail);
      dispatch(deleteTheEvent(eventId));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
