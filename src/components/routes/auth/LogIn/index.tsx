import axios from 'axios';
import { ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoogleIcon from '../../../../assets/images/google-icon.svg';
import routes from '../../../../constants/routes';
import styles from './index.module.scss';

const LogIn = (): ReactElement => {
  useEffect(() => {
    const getUsers = async () => {
      const users = await axios.get('/api/v1/users');
      console.log(users);
    };
    getUsers();
  }, []);
  return (
    <div>
      <a href={routes.LOGIN_API} target="_self">
        <div className={styles.googleLoginButton}>
          <div className={styles.googleLogo}>
            <img src={GoogleIcon} alt="google icon" />
          </div>
          <span className={styles.googleLoginText}>
            Login with Google
          </span>
        </div>
      </a>
    </div>
  );
};

export default LogIn;
