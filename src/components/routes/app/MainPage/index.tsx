import React, { useState } from 'react';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import ReservationModal from '../features/ReservationModal';
import DailyHistory from '../features/DailyHistory';
import styles from './index.module.scss';
import DetailsModal from '../features/DetailsModal';

const MainPage: React.FC = () => {
  const [isReservationModalShown, showReservationModal] = useState(false);
  const [isDetailsModalShown, showDetailsModal] = useState(false);
  const [selectedSpace, changeSelectedSpace] = useState('');
  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap
          changeSelectedSpace={changeSelectedSpace}
          showReservationModal={showReservationModal}
        />
        <DailyHistory
          showReservationModal={showReservationModal}
          showDetailsModal={showDetailsModal}
        />
        {isDetailsModalShown ? (
          <DetailsModal showDetailsModal={showDetailsModal} />
        ) : null}
        {isReservationModalShown ? (
          <ReservationModal
            showReservationModal={showReservationModal}
            title={selectedSpace}
          />
        ) : null}
        {isDetailsModalShown ? (
          <DetailsModal showDetailsModal={showDetailsModal} />
        ) : null}
      </div>
    </div>
  );
};
export default MainPage;
