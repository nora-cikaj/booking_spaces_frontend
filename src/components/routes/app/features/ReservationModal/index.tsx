// eslint-disable-next-line object-curly-newline
import { Field, Form, Formik, FormikProps } from 'formik';
import { ReactElement } from 'react';
// eslint-disable-next-line object-curly-newline
import {
  Space,
  DatePicker,
  Divider,
  Row,
  Col,
  Alert,
  Button,
  Select,
} from 'antd';
import {
  ClockCircleOutlined,
  FileTextOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import CustomModal from '../../../../common/Modal';
import CustomInput from '../../../../common/Input';
import CustomSelect from '../../../../common/Select';
import styles from './index.module.scss';
import { FormValues, ReservationModalPropsType } from './types';
import { DescriptionItem } from '../../../../common/DescriptionItem';

const ReservationModal = ({
  showReservationModal,
  resource,
}: ReservationModalPropsType): ReactElement => {
  const users = useSelector((state: RootState) => state.users.usersList) || [];
  const resources =
    useSelector((state: RootState) => state.resources.resourcesList) || [];

  const selectedResource = resources.find(
    (room) => room.resourceId === resource.id,
  );

  const { Option, OptGroup } = Select;
  return (
    <CustomModal
      visible
      title={`${resource.alt}`}
      onCancel={() => showReservationModal(false)}
      content={
        <div>
          <Formik
            initialValues={{
              title: '',
              time: '',
              start: '',
              end: '',
              guests: '',
              description: '',
            }}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                console.log(JSON.stringify(values));
                actions.resetForm();
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(props: FormikProps<FormValues>) => (
              <Form className={styles.modalContainer}>
                <Field
                  suffix={
                    <VerticalAlignTopOutlined
                      className={styles.iconModalStyle}
                    />
                  }
                  name="title"
                  as={CustomInput}
                  placeholder="Add title"
                />
                <Space direction="horizontal">
                  <DatePicker
                    onChange={(date) => props.setFieldValue('time', date)}
                  />

                  <CustomSelect
                    name="start"
                    placeholder="Start time"
                    suffixIcon={<ClockCircleOutlined />}
                    options={[{ key: 1, label: 'Start', value: 'Start' }]}
                    onChange={(value) => {
                      props.setFieldValue('start', value);
                    }}
                  />
                  <CustomSelect
                    name="start"
                    placeholder="End time"
                    suffixIcon={<ClockCircleOutlined />}
                    options={[{ key: 1, label: 'End', value: 'End' }]}
                    onChange={(value) => {
                      props.setFieldValue('end', value);
                    }}
                  />
                </Space>
                <Select
                  mode="multiple"
                  showArrow
                  style={{ width: '100%' }}
                  placeholder="Add attendees"
                  onChange={(value) => {
                    props.setFieldValue('guests', value);
                  }}
                >
                  <OptGroup label="Softup workspace">
                    <Option value="team@softup.co">team@softup.co</Option>
                  </OptGroup>
                  <OptGroup label="Softup employees">
                    {users.map((user) => {
                      return (
                        <Option key={user.id} value={user.primaryEmail}>
                          {user.primaryEmail}
                        </Option>
                      );
                    })}
                  </OptGroup>
                </Select>
                <Field
                  name="description"
                  suffix={
                    <FileTextOutlined className={styles.iconModalStyle} />
                  }
                  as={CustomInput}
                  placeholder="Add description"
                />
                <div className={styles.buttonModalWrapper}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.modalFooterButtonStyle}
                  >
                    Book event
                  </Button>
                  <Button
                    type="ghost"
                    className={styles.modalFooterButtonStyle}
                    onClick={() => showReservationModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Divider className={styles.modalDividerStyle}>Booth details</Divider>
          <Row>
            <Col span={12}>
              <DescriptionItem
                title="Capacity"
                content={`${selectedResource?.capacity} person${
                  selectedResource?.capacity! > 1 ? 's' : ''
                }`}
              />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Type"
                content={`${selectedResource?.resourceName}`}
              />
            </Col>
            <Alert
              message={`Available for booking only for events with up to ${
                selectedResource?.capacity
              } person${selectedResource?.capacity! > 1 ? 's' : ''}.`}
              type="info"
              showIcon
            />
          </Row>
        </div>
      }
    />
  );
};

export default ReservationModal;
