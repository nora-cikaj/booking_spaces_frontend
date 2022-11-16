import { Event } from '../../../../../../types/event';

export type EventState = {
  eventList: undefined | Event[];
  isLoading: boolean;
  error: any;
  eventSelected: undefined | Event;
};
