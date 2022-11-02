import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Divider, List, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FcInfo } from 'react-icons/fc';
import { MdDeleteForever, MdOutlineEditCalendar } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.scss';
import { DailyHistoryPropsType } from './types';
import { eventData } from './data';

const DailyHistory = ({
  showReservationModal,
  showDetailsModal,
}: DailyHistoryPropsType): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  console.log(data);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setData(eventData);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const handleOnEdit = () => {
    showReservationModal(true);
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
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 1}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>That&apos;s all, nothing more 🙅🏻‍♂️</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tooltip
                    placement="topLeft"
                    color="#1890ff"
                    title="Reserved Booth info"
                  >
                    <Button key="info" onClick={() => showDetailsModal(true)}>
                      <FcInfo className={styles.iconStyles} />
                    </Button>
                  </Tooltip>,
                  <Tooltip
                    placement="top"
                    color="#1890ff"
                    title="Edit reserved Booth"
                  >
                    <Button key="edit" onClick={handleOnEdit}>
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
                      <Button danger key="delete">
                        <MdDeleteForever className={styles.iconDeleteStyles} />
                      </Button>
                    </Popconfirm>
                  </Tooltip>,
                ]}
              >
                <Skeleton title={false} loading={false} active>
                  <List.Item.Meta
                    title={item.attendees[0].displayName}
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
