/* eslint-disable max-len */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../routes/app/Index';
import LogInPage from '../routes/auth/LogIn';
import AuthenticatePage from '../routes/auth/Authenticate';
import ProtectedRoute from '../common/ProtectedRoute';
import routes from '../../constants/routes';
import styles from './index.module.scss';
import NotFound from '../routes/not_found';

function AppIndex() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path={routes.AUTHENTICATE} element={<AuthenticatePage />} />
        <Route path={routes.AUTH.LOG_IN} element={<LogInPage />} />
        <Route path={routes.AUTH.LOG_OUT} element={<h1>Logout</h1>} />
        <Route path="/" element={<AuthenticatePage />} />
        <Route
          path={routes.APP.DASHBOARD}
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppIndex;
