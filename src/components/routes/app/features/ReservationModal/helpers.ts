import moment, { Moment } from 'moment';
import React from 'react';
import momentTZ from 'moment-timezone';
import menu from '../../../../../constants/menu';
import { Event } from '../../../../../types/event';
import { getAllEvents } from '../../MainPage/core/events/event-api';
import { Attendees } from './types';

// getEventAttendeesEmails
export const getEventAttendeesEmails = (attendees: Attendees) => {
  attendees = attendees.slice(1, -1);
  return attendees.map((attendant) => attendant.email);
};

function isInBreak(time: Moment, breakTimes: string[][]) {
  return breakTimes.some(
    (br) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      time >= moment(br[0], menu.DATE_FORMATS.HOUR_MINUTE) &&
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
    startTime: '00:00',
    endTime: '24:00',
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
      .add('minutes', 30)
      .format(menu.DATE_FORMATS.HOUR_MINUTE);
  } else {
    endTimeData = '24:00';
  }

  const timeData = {
    nextSlot: 30,
    breakTime,
    startTime: currentEventEndTime
      ? moment(currentEventEndTime).format(menu.DATE_FORMATS.HOUR_MINUTE)
      : '00:30',
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
  selectedDay: string,
  events: Event[],
  resource: {
    id: string;
    alt: string;
  },
  eventSelected?: Event,
) => {
  if (!selectedDay) {
    return undefined;
  }
  if (events) {
    if (eventSelected) {
      const eventsOfResource = events?.filter(
        (event) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          event.location?.toLowerCase()?.includes(resource.alt.toLowerCase()),
        // eslint-disable-next-line function-paren-newline
      );
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

      const nextEvent = eventsOfResource.find((event) => {
        // eslint-disable-next-line implicit-arrow-linebreak
        return startTime < event.start.dateTime;
      });

      const nextEventStartTime = nextEvent
        ? nextEvent.start.dateTime
        : // eslint-disable-next-line no-octal
          moment().set('hour', 23).set('minute', 0).format();
      if (eventsOfResource.length === 0) {
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
  if (eventsOfResource.length === 0) {
    return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
  }
  if (startTime > eventsOfResource[0].start.dateTime) {
    return generateEndTimeSchedules(startTime, undefined, eventsOfResource);
  }
  return generateEndTimeSchedules(
    startTime,
    eventsOfResource[0].start.dateTime,
    eventsOfResource,
  );
};

export const getEventsOfSelectedDay = async (
  selectedDay: string,
  setEvents: (value: React.SetStateAction<Event[]>) => void,
) => {
  const timeMin = moment(momentTZ(selectedDay).tz('Europe/Berlin').format())
    .utc()
    .startOf('day')
    .toISOString();
  const timeMax = moment(momentTZ(selectedDay).tz('Europe/Berlin').format())
    .utc()
    .endOf('day')
    .toISOString();

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
  return attendees || [''];
};
