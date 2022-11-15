import * as Yup from 'yup';

export const reservationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  time: Yup.string().required('Date is required'),
  start: Yup.string().required('Start time is required'),
  end: Yup.string().required('End time is required'),
  description: Yup.string(),
});
