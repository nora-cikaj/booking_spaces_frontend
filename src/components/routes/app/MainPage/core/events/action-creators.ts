import moment from 'moment';
import menu from '../../../../../../constants/menu';
import { AppDispatch } from '../../../../../../redux/store';
import {
  Event,
  EventPostRequestType,
  EventUpdateRequestType,
} from '../../../../../../types/event';
import {
  addEventToBelongingUser,
  deleteEventFromBelongingUser,
} from '../../../../auth/LogIn/core/auth-reducer';
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
  hasSuccess,
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
      throw new Error(e);
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
      const eventIsHappeningToday = moment(response.start.dateTime).isSame(
        new Date(),
        'day',
      );
      if (eventIsHappeningToday) {
        dispatch(addEvent(response));
        if (response.id) {
          dispatch(addEventToBelongingUser(response.id));
        }
      }
      dispatch(hasSuccess(menu.SUCCESS.CREATED_SUCCESSFULLY));
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
      dispatch(hasSuccess(menu.SUCCESS.UPDATED_SUCCESSFULLY));
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
      dispatch(deleteEventFromBelongingUser(eventId));
    } catch (e: any) {
      dispatch(hasError(e.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
