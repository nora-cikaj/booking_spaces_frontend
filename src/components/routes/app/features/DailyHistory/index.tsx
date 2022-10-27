import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Divider, List, Popconfirm, Skeleton, Tooltip } from 'antd';
import { FcInfo } from 'react-icons/fc';
import { MdDeleteForever, MdOutlineEditCalendar } from 'react-icons/md';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './index.module.scss';
import { DailyHistoryPropsType } from '../DetailsModal/types';

interface DataType {
  loading: boolean | undefined;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const DailyHistory = ({
  showDetailsModal,
}: DailyHistoryPropsType): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={styles.dailyHistoryContainer}>
      <div>
        <h1 className={styles.dailyHistoryTitleStyle}>
          <BsFillCalendarCheckFill className={styles.titleIconStyles} /> Daily
          reservations
        </h1>
      </div>
      <hr className={styles.solidDevider} />
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
          hasMore={data.length < 50}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🫥</Divider>}
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
                    <Button key="edit">
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
                <Skeleton title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item.name?.last}</a>}
                    description="5:00 – 6:30pm"
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
