import { Button, Col, DatePicker, Row, Select } from 'antd';
import styles from './index.module.scss';

const EventFilter = () => {
  return (
    <div className={styles.filterContainer}>
      <Row>
        <Col span={5}>
          <Button className={styles.todayButton}>Today</Button>
        </Col>
        <Col span={9}>
          <DatePicker className={styles.outlined} />
        </Col>
      </Row>
    </div>
  );
};
export default EventFilter;
