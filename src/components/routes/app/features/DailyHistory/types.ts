import { Event } from '../../../../../types/event';

export type DailyHistoryPropsType = {
  showReservationModal: (a: boolean) => void;
  showDetailsModal: (a: boolean) => void;
  changeSelectedSpace: (param: { id: string; alt: string }) => void;
  events: Event[];
};
