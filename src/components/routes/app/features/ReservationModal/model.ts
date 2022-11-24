import moment from 'moment';
import * as Yup from 'yup';
import menu from '../../../../../constants/menu';

export const reservationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  time: Yup.string().required('Date is required'),
  start: Yup.string().required('Start time is required'),
  attendees: Yup.array().of(Yup.string()),
  description: Yup.string(),
  end: Yup.string()
    .required('End time is required')
    .test(
      'start',
      'End time must be bigger than start time',
      function isBigger() {
        let startTime = this.parent?.start as string;
        let endTime = this.parent?.end as string;
        if (this.parent.end?.length > 5) {
          endTime = moment(this.parent.end).format(
            menu.DATE_FORMATS.HOUR_MINUTE,
          );
        }
        if (this.parent.start?.length > 5) {
          startTime = moment(this.parent.start).format(
            menu.DATE_FORMATS.HOUR_MINUTE,
          );
        }

        return startTime < endTime;
      },
    ),
});
