import React, { useState } from 'react';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import DailyHistory from '../features/DailyHistory';
import styles from './index.module.scss';
import DetailsModal from '../features/DetailsModal';

const MainPage: React.FC = () => {
  const [isDetailsModalShown, showDetailsModal] = useState(false);
  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap />
        <DailyHistory showDetailsModal={showDetailsModal} />
        {isDetailsModalShown && (
          <DetailsModal showDetailsModal={showDetailsModal} />
        )}
      </div>
    </div>
  );
};
export default MainPage;
