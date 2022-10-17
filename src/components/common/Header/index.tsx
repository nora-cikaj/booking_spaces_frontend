import { ReactElement } from 'react';
import styles from './index.module.scss';

type CustomHeaderProps = {
  title: string,
}

const CustomHeader = (props: CustomHeaderProps): ReactElement => {
  return (
    <div className={styles.Header}>
      {props.title}
    </div>
  );
};

export default CustomHeader;
