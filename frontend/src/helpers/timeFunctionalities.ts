import moment from 'moment';
import { FormValues } from '../components/routes/app/features/ReservationModal/types';

export const getBeginningOfDay = (selectedDay: string) => {
  return moment(selectedDay)
    .startOf('day')
    .tz('Europe/Berlin')
    .add(1, 'hour')
    .toISOString();
};

export const getEndOfDay = (selectedDay: string) => {
  return moment(selectedDay)
    .endOf('day')
    .add(1, 'hour')
    .tz('Europe/Berlin')
    .toISOString();
};

export const getStartTime = (values: FormValues) => {
  const startHour = values.start.split(':');
  return moment(values.time)
    .set('hour', +startHour[0])
    .set('minute', +startHour[1])
    .set('second', 0)
    .format();
};

export const getEndTime = (values: FormValues) => {
  const endHour = values.end.split(':');
  return moment(values.time)
    .set('hour', +endHour[0])
    .set('minute', +endHour[1])
    .set('second', 0)
    .format();
};

export const getCurrentTime = () => {
  return moment().format();
};
