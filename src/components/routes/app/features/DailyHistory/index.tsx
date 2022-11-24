import moment from 'moment';
import _ from 'lodash';
import { ReactElement, useState } from 'react';
import { Button, Divider, List, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FcInfo } from 'react-icons/fc';
import { MdDeleteForever, MdOutlineEditCalendar } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.scss';
import { DailyHistoryPropsType } from './types';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { deleteEvent } from '../../MainPage/core/events/action-creators';
import { Event } from '../../../../../types/event';
import { selectTheEvent } from '../../MainPage/core/events/event-reducer';
import menu from '../../../../../constants/menu';
import { openNotification } from '../../../../common/Notify';
import { modifyResourceName } from '../../../../../helpers/modifyResourceName';

const DailyHistory = ({
  showReservationModal,
  showDetailsModal,
  events,
  changeSelectedSpace,
}: DailyHistoryPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const resources = useSelector(
    (state: RootState) => state.resources.resourcesList,
  );
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  const [noDataMsg, showNoDataMsg] = useState(false);

  const handleOnEdit = (item: Event) => {
    const selectedResource = resources?.find(
      (resource) => resource.generatedResourceName === item.location,
    );
    dispatch(selectTheEvent(item));
    changeSelectedSpace({
      id: selectedResource?.resourceId || '',
      alt: selectedResource?.resourceName || '',
    });
    showReservationModal(true);
  };

  const handleOnDelete = (id: string) => {
    dispatch(deleteEvent(id, loggedInUser?.email!));
    openNotification(
      'topRight',
      menu.SUCCESS.DELETED_SUCCESSFULLY,
      'Success',
      'success',
    );
  };

  const handleOnInfo = (item: Event) => {
    showDetailsModal(true);
    dispatch(selectTheEvent(item));
  };

  const isUserOrganizerOfEvent = (item: Event) => {
    if (item.id) {
      return _.includes(loggedInUser?.myEvents, item.id);
    }
    return false;
  };

  return (
    <div className={styles.dailyHistoryContainer}>
      <div>
        <h1 className={styles.dailyHistoryTitleStyle}>
          <BsFillCalendarCheckFill className={styles.titleIconStyles} /> Daily
          reservations
        </h1>
      </div>
      <div
        id="scrollableDiv"
        style={{
          justifyContent: 'start',
          height: '70vh',
          overflow: 'auto',
          padding: '0 16px',
        }}
      >
        <InfiniteScroll
          dataLength={events.length}
          next={() => {
            if (!events.length) {
              showNoDataMsg(true);
            }
          }}
          hasMore={events.length < 1}
          loader={<Skeleton paragraph={{ rows: 1 }} />}
          endMessage={<Divider plain>That&apos;s all, nothing more 🙅🏻‍♂️</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={events}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip
                    placement="topLeft"
                    color="#1890ff"
                    title="Reserved event info"
                  >
                    <Button key="info" onClick={() => handleOnInfo(item)}>
                      <FcInfo className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="top"
                    color="#1890ff"
                    title={
                      !isUserOrganizerOfEvent(item)
                        ? 'No edit access'
                        : 'Edit reserved Booth'
                    }
                  >
                    <Button
                      disabled={!isUserOrganizerOfEvent(item)}
                      key="edit"
                      onClick={() => handleOnEdit(item)}
                    >
                      <MdOutlineEditCalendar className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="topLeft"
                    color="#ff3b4f"
                    title={
                      !isUserOrganizerOfEvent(item)
                        ? 'No delete access'
                        : 'Delete reserved booth'
                    }
                  >
                    <Popconfirm
                      placement="left"
                      disabled={!isUserOrganizerOfEvent(item)}
                      title="Are you sure you want to delete this event?"
                      okText="Yes"
                      onConfirm={() => handleOnDelete(item.id!)}
                      cancelText="No"
                    >
                      <Button
                        danger
                        key="delete"
                        disabled={!isUserOrganizerOfEvent(item)}
                      >
                        <MdDeleteForever className={styles.iconDeleteStyles} />
                      </Button>
                    </Popconfirm>
                  </Tooltip>,
                ]}
              >
                <List.Item.Meta
                  title={modifyResourceName(item.location)}
                  description={`${moment(item.start.dateTime).format(
                    menu.DATE_FORMATS.HOUR_MINUTE,
                  )} - ${moment(item.end.dateTime).format(
                    menu.DATE_FORMATS.HOUR_MINUTE,
                  )}`}
                />
              </List.Item>
            )}
          />
          {noDataMsg ? <p>No found</p> : null}
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default DailyHistory;
