/* eslint-disable max-len */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../routes/app/Index';
import LogInPage from '../routes/auth/LogIn';
import AuthenticatePage from '../routes/auth/Authenticate';
import ProtectedRoute from '../common/ProtectedRoute';
import UsersPage from '../routes/app/Users/components';
import routes from '../../constants/routes';
import styles from './index.module.scss';

function AppIndex() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path={routes.LOG_IN} element={<LogInPage />} />
        <Route path={routes.AUTHENTICATE} element={<AuthenticatePage />} />
        {/* <Route path={routes.APP} element={<App />}> */}
        <Route path={routes.APP} element={<ProtectedRoute><App /></ProtectedRoute>}>
          {/* <Route path={routes.USERS} element={<UsersPage />} /> */}
          <Route path={routes.USERS} element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppIndex;
