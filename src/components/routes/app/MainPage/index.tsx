import React from 'react';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import Reservations from '../features/Reservations';
import styles from './index.module.scss';

const MainPage: React.FC = () => {
  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap />
        <Reservations />
      </div>
    </div>
  );
};
export default MainPage;
