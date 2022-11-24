import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ReactElement } from 'react';
import { Avatar, Col, Divider, Row, Tooltip } from 'antd';
import { SiGooglecalendar } from 'react-icons/si';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { DescriptionItem } from '../../../../common/DescriptionItem';
import { DescriptionDetails } from '../../../../common/DescriptionDetails';
import CustomModal from '../../../../common/Modal';
import { DailyHistoryPropsType } from './types';
import styles from './index.module.scss';
import menu from '../../../../../constants/menu';
import { deselectEvent } from '../../MainPage/core/events/event-reducer';

const DetailsModal = ({
  showDetailsModal,
}: DailyHistoryPropsType): ReactElement => {
  const users = useSelector((state: RootState) => state.users.usersList);
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const activeUsers = useSelector(
    (state: RootState) => state.users.activeUsers,
  );

  const dispatch = useDispatch<AppDispatch>();

  const eventSelected = useSelector(
    (state: RootState) => state.events.eventSelected,
  );

  const attendees = eventSelected?.attendees.map(
    (attendant) => attendant.email,
  );

  const attendeesWithoutBoothupAndRom = attendees?.filter((attendant) => {
    // eslint-disable-next-line implicit-arrow-linebreak
    return (
      attendant.includes('@softup.co') && attendant !== menu.EMAILS.BOOTHUP
    );
  });

  const usersWithoutBoothupAndRoom = users?.filter((user) => {
    // eslint-disable-next-line implicit-arrow-linebreak
    if (attendeesWithoutBoothupAndRom?.includes(user.primaryEmail)) {
      return user;
    }
    return null;
  });

  const handleOnCancel = () => {
    showDetailsModal(false);
    dispatch(deselectEvent());
  };

  const getOrganizerEmail = () => {
    const organizer = activeUsers?.find((user) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      user.myEvents.includes(eventSelected?.id || ''),
    );
    return organizer?.email || loggedInUser?.email;
  };

  return (
    <CustomModal
      title={eventSelected?.location || ''}
      onCancel={handleOnCancel}
      style={{ width: '500px' }}
      content={
        <div>
          <p
            className={styles.site_description_item_profile_p}
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: '15px',
            }}
          >
            Overall Details
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Organizer"
                content={getOrganizerEmail()}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Creator" content="boothup@softup.co" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Start"
                content={moment(eventSelected?.start.dateTime).format(
                  menu.DATE_FORMATS.YEAR_DAY_MONTH_HOUR,
                )}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="End"
                content={moment(eventSelected?.end.dateTime).format(
                  menu.DATE_FORMATS.YEAR_DAY_MONTH_HOUR,
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <DescriptionItem title="Attendees" content />
            </Col>
            {usersWithoutBoothupAndRoom?.length ? (
              <Avatar.Group style={{ marginTop: '-5px' }}>
                {usersWithoutBoothupAndRoom?.map((user) => {
                  return (
                    <Tooltip
                      key={user.id}
                      title={user.name.fullName}
                      placement="top"
                    >
                      <Avatar src={user.thumbnailPhotoUrl} />
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
            ) : (
              <p className={styles.attendees}>No attendees are invited</p>
            )}
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Summary"
                content={eventSelected?.summary}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionDetails
                title="Description"
                content={
                  eventSelected?.description || 'No description provided'
                }
              />
            </Col>
          </Row>
          <Divider />
          <p
            className={styles.site_description_item_profile_p}
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: '15px',
            }}
          >
            Other Details
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Created"
                content={moment(eventSelected?.created).format(
                  menu.DATE_FORMATS.YEAR_DAY_MONTH_HOUR,
                )}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Updated"
                content={moment(eventSelected?.updated).format(
                  menu.DATE_FORMATS.YEAR_DAY_MONTH_HOUR,
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col span={13}>
              <DescriptionItem
                title="See reservation on Google Calendar"
                content
              />
            </Col>
            <a target="_blank" rel="noreferrer" href={eventSelected?.htmlLink}>
              <SiGooglecalendar className={styles.iconStyles} />
            </a>
          </Row>
        </div>
      }
      visible
    />
  );
};
export default DetailsModal;
