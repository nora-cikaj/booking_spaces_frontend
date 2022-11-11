// eslint-disable-next-line object-curly-newline
import { Field, Form, Formik, FormikProps } from 'formik';
import { ReactElement } from 'react';
import { Space, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import moment, { Moment } from 'moment';
import { FileTextOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import CustomModal from '../../../../common/Modal';
import CustomInput from '../../../../common/Input';
import CustomSelect from '../../../../common/Select';
import CustomButton from '../../../../common/Button';
import styles from './index.module.scss';
import { FormValues, ReservationModalPropsType } from './types';
import { RootState } from '../../../../../redux/store';
import { modifyResourceName } from '../../../../../helpers/modifyResourceName';
import menu from '../../../../../constants/menu';

const ReservationModal = ({
  showReservationModal,
  title,
}: ReservationModalPropsType): ReactElement => {
  const x = {
    nextSlot: 30,
    breakTime: [
      ['11:00', '14:00'],
      ['16:00', '18:00'],
    ],
    startTime: '10:00',
    endTime: '19:00',
  };

  let slotTime = moment(x.startTime, 'HH:mm');
  const endTime = moment(x.endTime, 'HH:mm');

  function isInBreak(time: Moment, breakTimes: string[][]) {
    return breakTimes.some(
      (br) => time >= moment(br[0], 'HH:mm') && time < moment(br[1], 'HH:mm'),
    );
  }

  const times = [];
  while (slotTime < endTime) {
    if (!isInBreak(slotTime, x.breakTime)) {
      times.push(slotTime.format('HH:mm'));
    }
    slotTime = slotTime.add(x.nextSlot, 'minutes');
  }

  console.log('Time slots: ', times);

  const eventSelected = useSelector(
    (state: RootState) => state.events.eventSelected,
  );
  return (
    <CustomModal
      visible
      title={
        modifyResourceName(eventSelected?.attendees[0].displayName) || title
      }
      onCancel={() => showReservationModal(false)}
      content={
        <div>
          <Formik
            initialValues={{
              title: eventSelected?.summary || '',
              time: eventSelected?.start.dateTime || '',
              start: eventSelected?.start.dateTime || '',
              end: eventSelected?.end.dateTime || '',
              guests: eventSelected?.attendees || [
                {
                  email: '',
                  displayName: '',
                  organizer: false,
                  self: false,
                  responseStatus: '',
                },
              ],
              description: eventSelected?.description || '',
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log(JSON.stringify(values));
                actions.resetForm();
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<FormValues>) => (
              <Form className={styles.modalContainer}>
                <Field
                  prefix={<VerticalAlignTopOutlined />}
                  name="title"
                  as={CustomInput}
                  placeholder="Add title"
                />
                <Space direction="horizontal">
                  <DatePicker
                    defaultValue={moment(eventSelected?.start.dateTime)}
                    onChange={(date) => props.setFieldValue('time', date)}
                  />
                </Space>
                <CustomSelect
                  name="start"
                  defaultValue={moment(eventSelected?.start.dateTime).format(
                    menu.DATE_FORMATS.HOUR_MINUTE,
                  )}
                  placeholder="Start time"
                  options={[{ key: 1, label: 'Start', value: 'Start' }]}
                  onChange={(value) => {
                    props.setFieldValue('start', value);
                  }}
                />
                <CustomSelect
                  name="end"
                  defaultValue={moment(eventSelected?.end.dateTime).format(
                    menu.DATE_FORMATS.HOUR_MINUTE,
                  )}
                  placeholder="End time"
                  options={[{ key: 1, label: 'End', value: 'End' }]}
                  onChange={(value) => {
                    props.setFieldValue('end', value);
                  }}
                />
                <CustomSelect
                  name="guests"
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Add guests"
                  options={[
                    { key: 1, label: <p>enri</p>, value: 'guest1' },
                    { key: 2, label: 'guest2', value: 'guest2' },
                    { key: 3, label: 'guest3', value: 'guest3' },
                  ]}
                  onChange={(value) => {
                    props.setFieldValue('guests', value);
                  }}
                />
                <Field
                  name="description"
                  prefix={<FileTextOutlined />}
                  as={CustomInput}
                  placeholder="Add description"
                />
                <div className={styles.buttonModalStyle}>
                  <CustomButton
                    buttonType="info"
                    label="Book now"
                    htmlType="submit"
                  />
                  <CustomButton
                    buttonType="ghost"
                    label="Cancel"
                    onClick={() => showReservationModal(false)}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      }
    />
  );
};

export default ReservationModal;
