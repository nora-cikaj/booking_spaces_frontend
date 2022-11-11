import { Event } from '../../../../../types/event';

export type DailyHistoryPropsType = {
  showReservationModal: (a: boolean) => void;
  showDetailsModal: (a: boolean) => void;
  events: Event[];
};
