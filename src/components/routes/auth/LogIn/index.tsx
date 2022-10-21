import { ReactElement } from 'react';
import LogInButton from './LogInButton';
import styles from './index.module.scss';

const LogIn = (): ReactElement => {
  return (
    <div className={styles.container}>
      <LogInButton />
    </div>
  );
};

export default LogIn;
