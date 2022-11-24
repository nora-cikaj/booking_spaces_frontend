import { Event } from '../../../../../types/event';

export type BoothHistoryPropsType = {
  showReservationModal: (a: boolean) => void;
  setFilterDate: (a: string) => void;
  setIsToday: (a: boolean) => void;
  showDetailsModal: (a: boolean) => void;
  changeSelectedSpace: (param: { id: string; alt: string }) => void;
  events: Event[];
};
