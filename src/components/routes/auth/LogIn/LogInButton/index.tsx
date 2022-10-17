import { ReactElement } from 'react';
import GoogleIcon from '../../../../../assets/images/google-icon.svg';
import routes from '../../../../../constants/routes';
import styles from './index.module.scss';

const LogInButton = (): ReactElement => {
  return (
    <div>
      <a href={routes.API.LOGIN_API}>
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

export default LogInButton;
