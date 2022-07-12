import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../routes/app/Index';
import LogInPage from '../routes/auth/LogIn';
import routes from '../../constants/routes';
import styles from './index.module.scss';

function AppIndex() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path={routes.LOG_IN} element={<LogInPage />} />
        <Route path="/app" element={<App />} />
      </Routes>

    </div>
  );
}

export default AppIndex;
