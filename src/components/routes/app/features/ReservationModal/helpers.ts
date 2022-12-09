import moment, { Moment } from 'moment';
import React from 'react';
import menu from '../../../../../constants/menu';
import {
  AttendantType,
  Event,
  EventPostRequestType,
  EventUpdateRequestType,
} from '../../../../../types/event';
import { getAllEvents } from '../../MainPage/core/events/event-api';
import { Attendees, FormValues } from './types';
import { Resource } from '../../../../../types/resources';
import User from '../../../../../types/user';
import {
  getBeginningOfDay,
  getEndOfDay,
  getEndTime,
  getStartTime,
} from '../../../../../helpers/timeFunctionalities';

// getEventAttendeesEmails
export const getEventAttendeesEmails = (attendees: Attendees) => {
  let eventAttendees = [...attendees];
  eventAttendees = eventAttendees.slice(1, -1);
  return eventAttendees.map((attendant) => attendant.email);
};

function isInBreak(time: Moment, breakTimes: string[][]) {
  return breakTimes.some(
    (br) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      time > moment(br[0], menu.DATE_FORMATS.HOUR_MINUTE) &&
      time < moment(br[1], menu.DATE_FORMATS.HOUR_MINUTE),
  );
}

// generateStartTimeSchedules
export const generateStartTimeSchedules = (events: Event[]) => {
  const breakTime = events.map((event) => {
    return [
      moment(event.start.dateTime).format(menu.DATE_FORMATS.HOUR_MINUTE),
      moment(event.end.dateTime).format(menu.DATE_FORMATS.HOUR_MINUTE),
    ];
  });

  const timeData = {
    nextSlot: 30,
    breakTime,
    startTime: '09:00',
    endTime: '21:00',
  };

  let slotTime = moment(timeData.startTime, menu.DATE_FORMATS.HOUR_MINUTE);
  const endTime = moment(timeData.endTime, menu.DATE_FORMATS.HOUR_MINUTE);

  const startTimes = [];
  let index = 0;
  while (slotTime < endTime) {
    if (!isInBreak(slotTime, timeData.breakTime)) {
      const time = slotTime.format(menu.DATE_FORMATS.HOUR_MINUTE);
      startTimes.push({
        key: index,
        label: time,
        value: time,
      });
    }
    // eslint-disable-next-line no-plusplus
    index++;
    slotTime = slotTime.add(timeData.nextSlot, 'minutes');
  }
  return startTimes;
};

// generateEndTimeSchedules
export const generateEndTimeSchedules = (
  currentEventEndTime?: string,
  nextResourceEventStartTime?: string,
  events?: Event[],
) => {
  const breakTime = events
    ? events?.map((event) => {
        return [
          moment(event.start.dateTime).format(menu.DATE_FORMATS.HOUR_MINUTE),
          moment(event.end.dateTime).format(menu.DATE_FORMATS.HOUR_MINUTE),
        ];
      })
    : [[]];

  let endTimeData = '';
  if (nextResourceEventStartTime) {
    endTimeData = moment(nextResourceEventStartTime)
      .add(30, 'minutes')
      .format(menu.DATE_FORMATS.HOUR_MINUTE);
  } else {
    endTimeData = '21:30';
  }

  const timeData = {
    nextSlot: 30,
    breakTime,
    startTime: currentEventEndTime
      ? moment(currentEventEndTime)
          .add(30, 'minutes')
          .format(menu.DATE_FORMATS.HOUR_MINUTE)
      : '08:30',
    endTime: endTimeData,
  };

  let slotTime = moment(timeData.startTime, menu.DATE_FORMATS.HOUR_MINUTE);
  const endTime = moment(timeData.endTime, menu.DATE_FORMATS.HOUR_MINUTE);

  const startTimes = [];
  let index = 0;
  while (slotTime < endTime) {
    if (nextResourceEventStartTime) {
      if (
        moment(nextResourceEventStartTime, menu.DATE_FORMATS.HOUR_MINUTE) ===
        slotTime
      ) {
        break;
      }
    }
    if (!isInBreak(slotTime, timeData.breakTime)) {
      const time = slotTime.format(menu.DATE_FORMATS.HOUR_MINUTE);

      startTimes.push({
        key: index,
        label: time,
        value: time,
      });
    }
    // eslint-disable-next-line no-plusplus
    index++;
    slotTime = slotTime.add(timeData.nextSlot, 'minutes');
  }

  return startTimes;
};

export const getStartTimeOptions = (
  events: Event[],
  resource: {
    id: string;
    alt: string;
  },
  loggedInUser: User | undefined,
  time: string,
  eventSelected?: Event,
) => {
  if (!time) {
    return undefined;
  }
  if (events) {
    if (eventSelected) {
      let eventsOfResource = events?.filter(
        (event) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          event.location?.toLowerCase()?.includes(resource.alt.toLowerCase()),
        // eslint-disable-next-line function-paren-newline
      );
      let isUserOrganizerOfSelectedEvent = false;
      if (loggedInUser && eventSelected.id) {
        isUserOrganizerOfSelectedEvent = loggedInUser.myEvents.includes(
          eventSelected.id,
        );
      }

      if (isUserOrganizerOfSelectedEvent) {
        eventsOfResource = eventsOfResource.filter(
          (e) => e.id !== eventSelected.id,
        );
      }

      return generateStartTimeSchedules(eventsOfResource);
    }

    const eventsOfResource = events?.filter(
      (event) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        event.location?.toLowerCase()?.includes(resource.alt.toLowerCase()),
      // eslint-disable-next-line function-paren-newline
    );

    return generateStartTimeSchedules(eventsOfResource);
  }
  return generateStartTimeSchedules([]);
};

export const getEndTimeOptions = (
  events: Event[],
  eventSelected: Event | undefined,
  resource: {
    id: string;
    alt: string;
  },
  startTime?: string,
) => {
  if (!startTime) {
    return undefined;
  }

  if (events) {
    if (eventSelected) {
      const eventsOfResource = events.filter(
        (event) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          event.location === eventSelected.location,
      );
      const nextEvent = eventsOfResource?.find((event) => {
        // eslint-disable-next-line implicit-arrow-linebreak
        return startTime <= event.start.dateTime;
      });

      const nextEventStartTime = nextEvent
        ? nextEvent.start.dateTime
        : // eslint-disable-next-line no-octal
          moment().set('hour', 21).set('minute', 0).format();
      if (eventsOfResource?.length === 0) {
        return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
      }

      if (startTime > nextEventStartTime) {
        return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
      }

      return generateEndTimeSchedules(startTime, nextEventStartTime);
    }
  }
  const eventsOfResource = events?.filter(
    (event) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      event.location?.includes(resource?.alt),
    // eslint-disable-next-line function-paren-newline
  );

  const nextEvent = eventsOfResource?.find((event) => {
    // eslint-disable-next-line implicit-arrow-linebreak
    return startTime <= event.start.dateTime;
  });

  const nextEventStartTime = nextEvent
    ? nextEvent.start.dateTime
    : // eslint-disable-next-line no-octal
      moment().set('hour', 21).set('minute', 0).format();
  if (eventsOfResource?.length === 0) {
    return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
  }

  if (startTime > nextEventStartTime) {
    return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
  }
  return generateEndTimeSchedules(
    startTime,
    nextEventStartTime,
    eventsOfResource,
  );
};

export const getEventsOfSelectedDay = async (
  selectedDay: string,
  setEvents: (value: React.SetStateAction<Event[]>) => void,
) => {
  const timeMin = getBeginningOfDay(selectedDay);
  const timeMax = getEndOfDay(selectedDay);

  const allEventsOfDay = await getAllEvents(timeMin, timeMax);

  setEvents(allEventsOfDay);
};

export const getAttendeesEmails = (eventSelected?: Event): string[] => {
  const attendeesEmails = eventSelected?.attendees.map(
    (attendant) => attendant.email,
  );
  const attendees = attendeesEmails?.filter((attendant) => {
    return (
      attendant.includes('@softup.co') && attendant !== menu.EMAILS.BOOTHUP
    );
  });
  return attendees || [];
};

export const getEventForPostRequest = (
  resources: Resource[],
  resource: {
    id: string;
    alt: string;
  },
  values: FormValues,
  loggedInUser?: User,
) => {
  const foundResource = resources.find(
    (room) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      room.resourceName.toLowerCase() === resource.alt.toLowerCase(),
  );
  if (!foundResource) {
    throw new Error('A problem with resources');
  }
  let attendees: AttendantType[] = [];
  if (values.attendees.length) {
    attendees = values.attendees.map((attendant) => {
      return { email: attendant };
    });
  }
  attendees.push({
    email: foundResource?.resourceEmail,
    resource: true,
  });
  attendees.push({
    email: menu.EMAILS.BOOTHUP,
    organizer: true,
    self: true,
  });

  const event: EventPostRequestType = {
    event: {
      summary: values.title,
      start: {
        dateTime: getStartTime(values),
        timeZone: menu.TIME_ZONES.EUROPE_BERLIN,
      },
      end: {
        dateTime: getEndTime(values),
        timeZone: menu.TIME_ZONES.EUROPE_BERLIN,
      },
      organizer: {
        email: loggedInUser?.email || menu.EMAILS.BOOTHUP,
      },
      attendees,
    },
  };
  if (values.description) {
    event.event.description = values.description;
  }
  return event;
};

export const getEventForUpdateRequest = (
  resources: Resource[],
  resource: {
    id: string;
    alt: string;
  },
  values: FormValues,
  loggedInUser: User | undefined,
  eventSelected: Event,
) => {
  const foundResource = resources.find(
    (room) => room.resourceName === resource.alt,
  );
  if (!foundResource) {
    throw new Error('A problem with resources');
  }
  let attendees: AttendantType[] = [];

  if (values.attendees.length) {
    attendees = values.attendees.map((attendant) => {
      return { email: attendant };
    });
  }
  if (
    attendees.indexOf({
      email: foundResource?.resourceEmail,
      resource: true,
    }) < 0
  ) {
    attendees.push({
      email: foundResource?.resourceEmail,
      resource: true,
    });
  }
  if (
    attendees.indexOf({
      email: menu.EMAILS.BOOTHUP,
      organizer: true,
      self: true,
    }) < 0
  ) {
    attendees.push({
      email: menu.EMAILS.BOOTHUP,
      organizer: true,
      self: true,
    });
  }

  const startHour = values.start.split(':');
  const endHour = values.end.split(':');

  const startTime =
    values.start.length === 5
      ? moment(values.time)
          .set('hour', +startHour[0])
          .set('minute', +startHour[1])
          .set('second', 0)
          .format()
      : values.start;

  const endTime =
    values.end.length === 5
      ? moment(values.time)
          .set('hour', +endHour[0])
          .set('minute', +endHour[1])
          .set('second', 0)
          .format()
      : values.end;

  const updatedEvent: EventUpdateRequestType = {
    event: {
      summary: values.title,
      start: {
        dateTime: startTime,
        timeZone: menu.TIME_ZONES.EUROPE_BERLIN,
      },
      end: {
        dateTime: endTime,
        timeZone: menu.TIME_ZONES.EUROPE_BERLIN,
      },
      organizer: {
        email: loggedInUser?.email || menu.EMAILS.BOOTHUP,
      },
      location: eventSelected.location,
      attendees,
    },
    email: loggedInUser?.email || menu.EMAILS.BOOTHUP,
  };
  if (values.description) {
    updatedEvent.event.description = values.description;
  }
  return updatedEvent;
};
