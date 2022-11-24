import { Moment } from 'moment';
import { Button, Col, DatePicker, Row, Select } from 'antd';
import { EventFilterProps } from './types';
import styles from './index.module.scss';

const EventFilter = ({ setFilterDate, setIsToday }: EventFilterProps) => {
  const onDatePickerChange = (value: Moment | null) => {
    if (value) {
      setFilterDate(value?.format());
      setIsToday(false);
    }
  };

  const onTodayButtonClick = () => {
    setIsToday(true);
  };

  return (
    <div className={styles.filterContainer}>
      <Row>
        <Col span={5}>
          <Button className={styles.todayButton} onClick={onTodayButtonClick}>
            Today
          </Button>
        </Col>
        <Col span={9}>
          <DatePicker
            onChange={(value) => onDatePickerChange(value)}
            className={styles.outlined}
          />
        </Col>
      </Row>
    </div>
  );
};
export default EventFilter;
