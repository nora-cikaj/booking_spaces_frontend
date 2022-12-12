import { Spin } from 'antd';
import { number } from 'yup/lib/locale';

import styles from './index.module.scss';

type SpinnerProps = {
  loading?: boolean;
  tip?: string;
};

const CustomSpinner = (props: SpinnerProps) => (
  <div className={styles.SpinnerContainer}>
    <Spin size="large" spinning={props.loading} tip={props.tip} />
  </div>
);

CustomSpinner.defaultProps = {
  loading: true,
  tip: '',
};

export default CustomSpinner;
