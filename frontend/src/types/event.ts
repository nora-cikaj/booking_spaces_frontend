export type AttendantType = {
  email: string;
  displayName?: string;
  organizer?: boolean;
  self?: boolean;
  responseStatus?: string;
  resource?: boolean;
};

export type Event = {
  kind?: string;
  etag?: string;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: string;
  updated?: string;
  summary: string;
  description?: string;
  location?: string;
  creator?: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self?: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID?: string;
  sequence?: number;
  attendees: AttendantType[];
  hangoutLink?: string;
};

export type EventPostRequestType = {
  event: Event;
};

export type EventUpdateRequestType = {
  event: Event;
  email: string;
};
