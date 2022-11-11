import { AppDispatch } from '../../../../../../redux/store';
import { Event } from '../../../../../../types/event';
import { deleteAnEvent, getDailyEvents, updateAnEvent } from './app-api';
import {
  addEvents,
  isLoading,
  hasError,
  updateTheEvent,
  deleteTheEvent,
} from './app-reducer';

export const listEvents = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      const events: Event[] = await getDailyEvents();
      dispatch(addEvents(events));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const updateEvent = (event: Event) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      await updateAnEvent(event);
      dispatch(updateTheEvent(event));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};

export const deleteEvent = (eventId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(isLoading(true));
      await deleteAnEvent(eventId);
      dispatch(deleteTheEvent(eventId));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
