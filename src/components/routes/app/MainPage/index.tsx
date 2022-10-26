import React from 'react';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import DailyHistory from '../features/DailyHistory';
import styles from './index.module.scss';

const MainPage: React.FC = () => {
  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap />
        <DailyHistory />
      </div>
    </div>
  );
};
export default MainPage;
