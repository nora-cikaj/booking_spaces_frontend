import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ReactElement } from 'react';
import { Avatar, Col, Divider, Row, Tooltip } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { SiGooglecalendar } from 'react-icons/si';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { DescriptionItem } from '../../../../common/DescriptionItem';
import { DescriptionDetails } from '../../../../common/DescriptionDetails';
import CustomModal from '../../../../common/Modal';
import { DailyHistoryPropsType } from './types';
import styles from './index.module.scss';
import menu from '../../../../../constants/menu';
import { modifyResourceName } from '../../../../../helpers/modifyResourceName';
import { deselectEvent } from '../../MainPage/core/events/app-reducer';

const DetailsModal = ({
  showDetailsModal,
}: DailyHistoryPropsType): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();

  const eventSelected = useSelector(
    (state: RootState) => state.events.eventSelected,
  );
  const handleOnCancel = () => {
    showDetailsModal(false);
    dispatch(deselectEvent());
  };
  return (
    <CustomModal
      title={modifyResourceName(eventSelected?.attendees[0].displayName)}
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
                content={eventSelected?.organizer.email}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Creator"
                content={eventSelected?.creator.email}
              />
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
            <Avatar.Group style={{ marginTop: '-5px' }}>
              <Tooltip title="Ant User" placement="top">
                <Avatar src="https://joeschmoe.io/api/v1/random" />
              </Tooltip>
            </Avatar.Group>
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
