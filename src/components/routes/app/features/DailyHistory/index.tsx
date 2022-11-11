import moment from 'moment';
import React, { ReactElement, useState } from 'react';
import { Button, Divider, List, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FcInfo } from 'react-icons/fc';
import { MdDeleteForever, MdOutlineEditCalendar } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.scss';
import { DailyHistoryPropsType } from './types';
import { AppDispatch } from '../../../../../redux/store';
import { deleteEvent } from '../../MainPage/core/events/action-creators';
import { Event } from '../../../../../types/event';
import { selectTheEvent } from '../../MainPage/core/events/app-reducer';
import { modifyResourceName } from '../../../../../helpers/modifyResourceName';

const DailyHistory = ({
  showReservationModal,
  showDetailsModal,
  events,
}: DailyHistoryPropsType): ReactElement => {
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  // const [data, setData] = useState<any[]>([]);
  // const loadMoreData = () => {
  //   if (loading) {
  //     return;
  //   }
  //   setLoading(true);
  //   setData(eventData);
  // };

  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  const handleOnEdit = (item: Event) => {
    dispatch(selectTheEvent(item));
    showReservationModal(true);
  };

  const handleOnDelete = (id: string) => {
    dispatch(deleteEvent(id));
  };

  const handleOnInfo = (item: Event) => {
    showDetailsModal(true);
    dispatch(selectTheEvent(item));
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
          // we need a function that will add more
          // events at the bottom if we have more events than the height of scroll
          next={() => {
            console.log('to be handled');
          }}
          hasMore={events.length < 1}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
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
                    title="Reserved Booth info"
                  >
                    <Button key="info" onClick={() => handleOnInfo(item)}>
                      <FcInfo className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="top"
                    color="#1890ff"
                    title="Edit reserved Booth"
                  >
                    <Button key="edit" onClick={() => handleOnEdit(item)}>
                      <MdOutlineEditCalendar className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="topLeft"
                    color="#ff3b4f"
                    title="Delete reserved Booth"
                  >
                    <Popconfirm
                      placement="left"
                      title="Are you sure you want to delete reserved Booth?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        danger
                        key="delete"
                        onClick={() => handleOnDelete(item.id)}
                      >
                        <MdDeleteForever className={styles.iconDeleteStyles} />
                      </Button>
                    </Popconfirm>
                  </Tooltip>,
                ]}
              >
                <Skeleton title={false} loading={false} active>
                  <List.Item.Meta
                    title={modifyResourceName(item.attendees[0].displayName)}
                    description={`${moment(item.start.dateTime).format(
                      'LT',
                    )} - ${moment(item.end.dateTime).format('LT')}`}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
export default DailyHistory;
