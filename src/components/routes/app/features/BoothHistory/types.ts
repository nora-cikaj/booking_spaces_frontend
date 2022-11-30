import { Event } from '../../../../../types/event';

export type BoothHistoryPropsType = {
  filterDate: string;
  selectedFilterResource: string;
  showReservationModal: (a: boolean) => void;
  setFilterDate: (a: string) => void;
  setResetted: (a: boolean) => void;
  showDetailsModal: (a: boolean) => void;
  setSelectedResource: (a: string) => void;
  changeSelectedSpace: (param: { id: string; alt: string }) => void;
  events: Event[];
};
