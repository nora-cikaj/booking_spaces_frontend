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
import { BoothHistoryPropsType } from './types';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { deleteEvent } from '../../MainPage/core/events/action-creators';
import { Event } from '../../../../../types/event';
import { selectTheEvent } from '../../MainPage/core/events/event-reducer';
import menu from '../../../../../constants/menu';
import { openNotification } from '../../../../common/Notify';
import { modifyResourceName } from '../../../../../helpers/modifyResourceName';
import EventFilter from '../EventFilter';

const BoothHistory = ({
  showReservationModal,
  showDetailsModal,
  setFilterDate,
  setResetted,
  filterDate,
  selectedFilterResource,
  setSelectedResource,
  events,
  changeSelectedSpace,
}: BoothHistoryPropsType): ReactElement => {
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
          <BsFillCalendarCheckFill className={styles.titleIconStyles} /> Booth
          reservations
        </h1>
      </div>
      <EventFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        setResetted={setResetted}
        setSelectedResource={setSelectedResource}
        selectedFilterResource={selectedFilterResource}
      />
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
                  <Button key="info" onClick={() => handleOnInfo(item)}>
                    <FcInfo className={styles.iconStyles} />
                  </Button>,
                  <Tooltip
                    placement="top"
                    color="#ff3b4f"
                    title={
                      !isUserOrganizerOfEvent(item) ? 'No edit access' : ''
                    }
                  >
                    <Button
                      data-testid="editButton"
                      disabled={!isUserOrganizerOfEvent(item)}
                      key="edit"
                      style={{ pointerEvents: 'painted' }}
                      onClick={() => handleOnEdit(item)}
                    >
                      <MdOutlineEditCalendar className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="topLeft"
                    color="#ff3b4f"
                    title={
                      !isUserOrganizerOfEvent(item) ? 'No delete access' : ''
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
export default BoothHistory;
