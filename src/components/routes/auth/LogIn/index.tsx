import { ReactElement } from 'react';
import LogInButton from './LogInButton';
import styles from './index.module.scss';

const LogIn = (): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.splitScreenLeft}>
        <div className={styles.centered}>
          <img
            className={styles.logoStyle}
            src="/images/logo_softup.svg"
            alt="softup-logo"
          />
          <h1 className={styles.titleLoginStyle}>Welcome to BoothUp</h1>
          <p className={styles.descriptionLoginStyle}>
            Login with your Softup workspace account.
          </p>
          <LogInButton />
        </div>
      </div>

      <div className={styles.splitScreenRight}>
        <div className={styles.imgContainer}>
          <div className={styles.centered}>
            <img
              className={styles.gifStyle}
              src="/images/calendar_thin.gif"
              alt="gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
