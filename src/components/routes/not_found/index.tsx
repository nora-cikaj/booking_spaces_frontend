import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../constants/routes';
import styles from './index.module.scss';

const NotFound = (): ReactElement => {
  return (
    <div className={styles.not_found_container}>
      <h1 className={styles.not_found_title}>404 Page not found</h1>
      <section className={styles.error_container}>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
        <span className={styles.zero}>
          <span className={styles.screen_reader_text}>0</span>
        </span>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
      </section>
      <div className={styles.link_container}>
        <Link to={routes.APP} className={styles.more_link}>
          Go to main page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
