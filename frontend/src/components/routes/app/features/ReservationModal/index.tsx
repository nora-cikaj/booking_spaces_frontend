import { Field, Form, Formik, FormikProps } from 'formik';
import momentTZ from 'moment-timezone';
import { ReactElement, useEffect, useState } from 'react';
import {
  Space,
  DatePicker,
  Divider,
  Row,
  Col,
  Alert,
  Button,
  Select,
} from 'antd';
import moment from 'moment';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../redux/store';
import CustomModal from '../../../../common/Modal';
import CustomInput from '../../../../common/Input';
import CustomSelect from '../../../../common/Select';
import { FormValues, ReservationModalPropsType } from './types';
import { DescriptionItem } from '../../../../common/DescriptionItem';
import menu from '../../../../../constants/menu';
import {
  getStartTimeOptions,
  getEndTimeOptions,
  getEventsOfSelectedDay,
  getAttendeesEmails,
  getEventForPostRequest,
  getEventForUpdateRequest,
} from './helpers';
import { Event } from '../../../../../types/event';
import {
  postEvent,
  updateEvent,
} from '../../MainPage/core/events/action-creators';
import { openNotification } from '../../../../common/Notify';
import { reservationSchema } from './model';
import styles from './index.module.scss';
import { getCurrentTime } from '../../../../../helpers/timeFunctionalities';

const { Option, OptGroup } = Select;

const ReservationModal = ({
  showReservationModal,
  resource,
}: ReservationModalPropsType): ReactElement => {
  const eventSelected = useSelector(
    (state: RootState) => state.events.eventSelected,
  );
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const users = useSelector((state: RootState) => state.users.usersList) || [];
  const resources =
    useSelector((state: RootState) => state.resources.resourcesList) || [];

  const [startTime, setStartTime] = useState(eventSelected?.start.dateTime);
  const [selectedDay, setSelectedDay] = useState(getCurrentTime());
  const [events, setEvents] = useState<Event[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getEventsOfSelectedDay(selectedDay, setEvents);
  }, [selectedDay]);

  const selectedResource = resources.find(
    (room) => room.resourceId === resource.id,
  );

  const onDatePickerChange = (
    date: momentTZ.Moment | null,
    props: FormikProps<FormValues>,
  ) => {
    props.setFieldTouched('time', true);
    props.setFieldValue('time', date);
    if (date) {
      setSelectedDay(date.format());
    }
  };
  const onStartSelectChange = (
    value: string,
    props: FormikProps<FormValues>,
  ) => {
    const hourAndMinute = value.split(':');
    const hour = hourAndMinute[0];
    const minute = hourAndMinute[1];
    setStartTime(
      moment(selectedDay)
        .set('hour', +hour)
        .set('minute', +minute)
        .set('second', 0)
        .format(),
    );
    props.setFieldTouched('start', true);
    props.setFieldValue('start', value);
  };

  const areErrors = (props: FormikProps<FormValues>) => {
    if (
      props.errors.time ||
      props.errors.title ||
      props.errors.attendees ||
      props.errors.start ||
      props.errors.end ||
      props.errors.description
    ) {
      return true;
    }

    return false;
  };

  const showTimeErrorMessage = (props: FormikProps<FormValues>) => {
    if (props.errors.time && props.touched.time) {
      return props.errors.time;
    }
    if (props.errors.start && props.touched.start) {
      return props.errors.start;
    }
    if (props.errors.end && props.touched.start) {
      return props.errors.end;
    }
    return null;
  };

  const attendeesEmails = getAttendeesEmails(eventSelected);

  return (
    <CustomModal
      visible
      title={`${resource.alt}`}
      onCancel={() => showReservationModal(false)}
      content={
        <div>
          <Formik
            initialValues={{
              title: eventSelected?.summary || '',
              time: eventSelected?.start.dateTime || '',
              start: eventSelected?.start.dateTime || '',
              end: eventSelected?.end.dateTime || '',
              attendees: attendeesEmails,
              description: eventSelected?.description || '',
            }}
            validationSchema={reservationSchema}
            onSubmit={(values, actions) => {
              try {
                if (!eventSelected) {
                  const event = getEventForPostRequest(
                    resources,
                    resource,
                    values,
                    loggedInUser,
                  );
                  dispatch(postEvent(event));
                } else if (eventSelected) {
                  const updatedEvent = getEventForUpdateRequest(
                    resources,
                    resource,
                    values,
                    loggedInUser,
                    eventSelected,
                  );
                  if (eventSelected.id) {
                    dispatch(updateEvent(eventSelected.id, updatedEvent));
                  }
                }
              } catch (error) {
                openNotification(
                  'topRight',
                  menu.ERROR.BAD_REQUEST,
                  'Error',
                  'error',
                );
              } finally {
                showReservationModal(false);
                actions.resetForm();
                actions.setSubmitting(false);
              }
            }}
          >
            {(props: FormikProps<FormValues>) => (
              <Form className={styles.modalContainer}>
                <div className={styles.modalRow}>
                  <Field
                    suffix={
                      <VerticalAlignTopOutlined
                        className={styles.iconModalStyle}
                      />
                    }
                    className={styles.placeholderError}
                    name="title"
                    as={CustomInput}
                    placeholder="Add title"
                  />
                  {props.errors.title ? <p>{props.errors.title}</p> : null}
                </div>
                <div className={styles.modalRow}>
                  <div>
                    <Space direction="horizontal">
                      <DatePicker
                        onChange={(date) => onDatePickerChange(date, props)}
                        {...(eventSelected
                          ? {
                              defaultValue: moment(
                                eventSelected?.start.dateTime,
                                'YYYY-MM-DD',
                              ),
                            }
                          : null)}
                      />

                      <CustomSelect
                        name="start"
                        placeholder="Start time"
                        suffixIcon={<ClockCircleOutlined />}
                        options={getStartTimeOptions(
                          events,
                          resource,
                          loggedInUser,
                          props.values.time,
                          eventSelected,
                        )}
                        onChange={(value) => onStartSelectChange(value, props)}
                        {...(eventSelected
                          ? {
                              defaultValue: `${moment(
                                eventSelected?.start.dateTime,
                              ).format(menu.DATE_FORMATS.HOUR_MINUTE)}`,
                            }
                          : null)}
                      />
                      <CustomSelect
                        name="end"
                        touched={props.touched.end}
                        placeholder="End time"
                        suffixIcon={<ClockCircleOutlined />}
                        options={getEndTimeOptions(
                          events,
                          eventSelected,
                          resource,
                          startTime,
                        )}
                        onChange={(value) => {
                          props.setFieldTouched('end', true);
                          props.setFieldValue('end', value);
                        }}
                        {...(eventSelected
                          ? {
                              defaultValue: `${moment(
                                eventSelected?.end.dateTime,
                              ).format(menu.DATE_FORMATS.HOUR_MINUTE)}`,
                            }
                          : null)}
                      />
                    </Space>
                  </div>
                  {showTimeErrorMessage(props) ? (
                    <p>{showTimeErrorMessage(props)}</p>
                  ) : null}
                </div>
                <div className={styles.modalRow}>
                  <Select
                    mode="multiple"
                    showArrow
                    style={{ width: '100%' }}
                    placeholder="Add attendees (optional)"
                    onChange={(value) => {
                      props.setFieldValue('attendees', value);
                    }}
                    {...(eventSelected
                      ? {
                          defaultValue: attendeesEmails,
                        }
                      : null)}
                  >
                    <OptGroup label="Softup workspace">
                      <Option value="team@softup.co">team@softup.co</Option>
                    </OptGroup>
                    <OptGroup label="Softup employees">
                      {users.map((user) => {
                        return (
                          <Option key={user.id} value={user.primaryEmail}>
                            {user.primaryEmail}
                          </Option>
                        );
                      })}
                    </OptGroup>
                  </Select>
                  {props.errors.attendees ? (
                    <p>{props.errors.attendees}</p>
                  ) : null}
                </div>
                <div className={styles.modalRow}>
                  <Field
                    name="description"
                    suffix={
                      <FileTextOutlined className={styles.iconModalStyle} />
                    }
                    as={CustomInput}
                    placeholder="Add description (optional)"
                  />
                  {props.errors.description ? (
                    <p>{props.errors.description}</p>
                  ) : null}
                </div>
                <div className={styles.buttonModalWrapper}>
                  {eventSelected ? null : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.modalFooterButtonStyle}
                      disabled={areErrors(props)}
                    >
                      Book event
                    </Button>
                  )}
                  {eventSelected ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.modalFooterButtonStyle}
                      disabled={areErrors(props)}
                    >
                      Update event
                    </Button>
                  ) : null}
                  <Button
                    type="ghost"
                    className={styles.modalFooterButtonStyle}
                    onClick={() => showReservationModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Divider className={styles.modalDividerStyle}>Booth details</Divider>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Capacity"
                content={`${selectedResource?.capacity} person${
                  selectedResource?.capacity! > 1 ? 's' : ''
                }`}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Type"
                content={`${selectedResource?.resourceName}`}
              />
            </Col>
            <Alert
              message={`Available for booking only for events with up to ${
                selectedResource?.capacity
              } person${selectedResource?.capacity! > 1 ? 's' : ''}.`}
              type="info"
              showIcon
            />
          </Row>
        </div>
      }
    />
  );
};

export default ReservationModal;
