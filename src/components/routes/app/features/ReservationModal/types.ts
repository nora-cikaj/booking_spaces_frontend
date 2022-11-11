export type FormValues = {
  title: string;
  time: string;
  start: string;
  end: string;
  guests: string;
  description: string;
};

export type ReservationModalPropsType = {
  showReservationModal: (a: boolean) => void;
  resource: { id: string; alt: string };
};
