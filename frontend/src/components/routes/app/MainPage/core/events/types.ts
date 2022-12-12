import { Event } from '../../../../../../types/event';

export type Success =
  | {
      create?: string;
      update?: string;
    }
  | undefined;

export type EventState = {
  eventList: undefined | Event[];
  isLoading: boolean;
  error: any;
  success: Success;
  eventSelected: undefined | Event;
};
