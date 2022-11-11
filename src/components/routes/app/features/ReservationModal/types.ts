export type FormValues = {
  title: string;
  time: string;
  start: string;
  end: string;
  guests: {
    email: string;
    displayName?: string | undefined;
    organizer?: boolean | undefined;
    self?: boolean | undefined;
    responseStatus?: string | undefined;
  }[];
  description: string;
};

export type ReservationModalPropsType = {
  showReservationModal: (a: boolean) => void;
  title: string;
};
