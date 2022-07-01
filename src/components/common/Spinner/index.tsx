import { Spin } from 'antd';

import styles from './index.module.scss';

type SpinnerProps = {
  loading?: boolean,
};

const CustomSpinner = (props: SpinnerProps) => (
  <div className={styles.SpinnerContainer}>
    <Spin
      size="large"
      spinning={props.loading}
    />
  </div>
);

CustomSpinner.defaultProps = {
  loading: true,
};

export default CustomSpinner;
