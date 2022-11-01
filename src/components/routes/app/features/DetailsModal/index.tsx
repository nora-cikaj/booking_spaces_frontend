import { ReactElement } from 'react';
import { Avatar, Col, Divider, Row, Tooltip } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { SiGooglecalendar } from 'react-icons/si';
import { DescriptionItem } from '../../../../common/DescriptionItem';
import { DescriptionDetails } from '../../../../common/DescriptionDetails';
import CustomModal from '../../../../common/Modal';
import { DailyHistoryPropsType } from './types';
import styles from './index.module.scss';

const DetailsModal = ({
  showDetailsModal,
}: DailyHistoryPropsType): ReactElement => {
  return (
    <CustomModal
      title="Amphitheatre - Details"
      onCancel={() => showDetailsModal(false)}
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
              <DescriptionItem title="Organizer" content="boothup@softup.co" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Creator"
                content="dionis.uliu@softup.co"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Start" content="2022-10-27 | 17:00:00" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="End" content="2022-10-27 | 18:30:00" />
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <DescriptionItem title="Attendees" content />
            </Col>
            <Avatar.Group style={{ marginTop: '-5px' }}>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: '#1890ff' }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionDetails
                title="Description"
                content="Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
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
                content="2022-10-03 | 12:31:47"
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Updated"
                content="2022-10-27 | 08:38:17"
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
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.google.com/calendar/event?eid=NHNicjBuYm8wMWtxdXFqOGd2ZHNpZ3AzNGEgZW5yaS5yYW5lQHNvZnR1cC5jbw&ctz=GMT+02:00"
            >
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
