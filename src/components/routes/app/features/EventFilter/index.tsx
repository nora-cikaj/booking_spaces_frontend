import moment, { Moment } from 'moment';
import { Button, Col, DatePicker, Row } from 'antd';
import { useSelector } from 'react-redux';
import { BiReset } from 'react-icons/bi';
import { EventFilterProps } from './types';
import { RootState } from '../../../../../redux/store';
import CustomSelect from '../../../../common/Select';
import styles from './index.module.scss';

const EventFilter = ({
  selectedFilterResource,
  setFilterDate,
  setResetted,
  filterDate,
  setSelectedResource,
}: EventFilterProps) => {
  const resources = useSelector(
    (state: RootState) => state.resources.resourcesList,
  );
  const resourceOptions = resources?.map((resource) => {
    return {
      label: resource.resourceName,
      value: resource.resourceName,
      key: +resource.resourceId,
    };
  });
  const onDatePickerChange = (value: Moment | null) => {
    if (value) {
      setFilterDate(value?.format());
      setResetted(false);
    }
  };

  const onSelectResourceChange = (value: string) => {
    setSelectedResource(value);
    setResetted(false);
  };

  const onResetButtonClick = () => {
    setResetted(true);
    setSelectedResource('');
    setFilterDate('');
  };

  return (
    <div className={styles.filterContainer}>
      <Row className={styles.filterRow}>
        <Col span={5}>
          <Button className={styles.todayButton} onClick={onResetButtonClick}>
            <BiReset className={styles.resetButton} />
          </Button>
        </Col>
        <Col span={9}>
          <DatePicker
            value={filterDate ? moment(filterDate) : null}
            onChange={(value) => onDatePickerChange(value)}
            className={styles.outlined}
          />
        </Col>
        <Col span={9}>
          <CustomSelect
            name="filterEvents"
            style={{ width: '100%' }}
            value={selectedFilterResource || undefined}
            placeholder="Select booth"
            options={resourceOptions}
            onChange={(value) => {
              onSelectResourceChange(value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};
export default EventFilter;
