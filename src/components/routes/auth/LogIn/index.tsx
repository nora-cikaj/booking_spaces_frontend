import axios from 'axios';
import { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
