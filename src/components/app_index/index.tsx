import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../routes/app/Index';
import styles from './index.module.scss';

function AppIndex() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/1" element={<App />} />
        <Route path="/2" element={<App />} />
        <Route path="/3" element={<App />} />
      </Routes>

    </div>
  );
}

export default AppIndex;
