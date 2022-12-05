import React, { ReactElement } from 'react';
import { Row, Col } from 'antd';

import styles from './index.module.scss';

type CustomInputProps = {
  label: React.ReactNode | string,
  input: React.ReactNode,
  labelColSpan?: number,
};

const FormItem = (props: CustomInputProps): ReactElement => {
  return (
    <Row className={styles.formItem}>
      <Col span={props.labelColSpan}>
        {props.label}
      </Col>
      <Col span={23 - props.labelColSpan!} offset={1}>
        {props.input}
      </Col>
    </Row>
  );
};

FormItem.defaultProps = {
  labelColSpan: 8,
};

export default FormItem;
