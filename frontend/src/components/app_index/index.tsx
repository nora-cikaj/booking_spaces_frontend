/* eslint-disable max-len */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from '../routes/app/MainPage';
import LogInPage from '../routes/auth/LogIn';
import AuthenticatePage from '../routes/auth/Authenticate';
import ProtectedRoute from '../common/ProtectedRoute';
import routes from '../../constants/routes';
import styles from './index.module.scss';
import NotFound from '../routes/not_found';
import LogOut from '../routes/auth/Logout';

function AppIndex() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<Navigate to={routes.LOG_IN} />} />
        <Route path={routes.LOG_IN} element={<LogInPage />} />
        <Route path={routes.LOG_OUT} element={<LogOut />} />
        <Route path={routes.AUTHENTICATE} element={<AuthenticatePage />} />
        <Route
          path={routes.APP}
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default AppIndex;
