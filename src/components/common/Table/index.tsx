import { Table, TableProps } from 'antd';
import { ReactElement } from 'react';

import styles from './index.module.scss';

type CustomTableProps = {
  columns: TableProps<any>['columns'],
  data: TableProps<any>['dataSource'],
  bordered?: boolean,
  loading?: boolean,
  title?: () => ReactElement,
  footer?: () => ReactElement,
};

const CustomTable = (props: CustomTableProps) => (
  <Table
    className={styles.Table}
    rowKey={(record) => record.id}
    columns={props.columns}
    dataSource={props.data}
    bordered={props.bordered}
    loading={props.loading}
    scroll={{ x: true }}
    title={props.title}
    footer={props.footer}
  />
);

CustomTable.defaultProps = {
  bordered: false,
  loading: false,
  title: undefined,
  footer: undefined,
};

export default CustomTable;
