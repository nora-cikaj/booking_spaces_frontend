export type FormValues = {
  title: string;
  time: string;
  start: string;
  end: string;
  attendees: string[];
  description: string;
};

export type ReservationModalPropsType = {
  showReservationModal: (a: boolean) => void;
  resource: { id: string; alt: string };
};

export type Attendees = {
  email: string;
  displayName?: string | undefined;
  organizer?: boolean | undefined;
  self?: boolean | undefined;
  responseStatus?: string | undefined;
}[];
