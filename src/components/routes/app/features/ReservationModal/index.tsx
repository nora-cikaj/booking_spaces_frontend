// eslint-disable-next-line object-curly-newline
import { Field, Form, Formik, FormikProps } from 'formik';
import { ReactElement } from 'react';
// eslint-disable-next-line object-curly-newline
import { Space, DatePicker } from 'antd';
import { FileTextOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import CustomModal from '../../../../common/Modal';
import CustomInput from '../../../../common/Input';
import CustomSelect from '../../../../common/Select';
import CustomButton from '../../../../common/Button';
import styles from './index.module.scss';
import { FormValues } from './types';

const ReservationModal = (): ReactElement => {
  return (
    <div>
      <CustomModal
        title="BoothUp"
        onCancel={() => console.log('Close')}
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
                    prefix={<VerticalAlignTopOutlined />}
                    name="title"
                    as={CustomInput}
                    placeholder="Add title"
                  />
                  <Space direction="horizontal">
                    <DatePicker
                      onChange={(date) => props.setFieldValue('time', date)}
                    />
                  </Space>
                  <CustomSelect
                    name="start"
                    placeholder="Start time"
                    options={[{ key: 1, label: 'Start', value: 'Start' }]}
                    onChange={(value) => {
                      props.setFieldValue('start', value);
                    }}
                  />
                  <CustomSelect
                    name="start"
                    placeholder="End time"
                    options={[{ key: 1, label: 'End', value: 'End' }]}
                    onChange={(value) => {
                      props.setFieldValue('end', value);
                    }}
                  />
                  <CustomSelect
                    name="guests"
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Add guests"
                    options={[
                      { key: 1, label: 'guest1', value: 'guest1' },
                      { key: 2, label: 'guest2', value: 'guest2' },
                      { key: 3, label: 'guest3', value: 'guest3' },
                    ]}
                    onChange={(value) => {
                      props.setFieldValue('guests', value);
                    }}
                  />
                  <Field
                    name="description"
                    prefix={<FileTextOutlined />}
                    as={CustomInput}
                    placeholder="Add description"
                  />
                  <div className={styles.buttonModalStyle}>
                    <CustomButton
                      buttonType="info"
                      label="Book now"
                      htmlType="submit"
                    />
                    <CustomButton buttonType="ghost" label="Cancel" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        }
        visible
      />
    </div>
  );
};

export default ReservationModal;
