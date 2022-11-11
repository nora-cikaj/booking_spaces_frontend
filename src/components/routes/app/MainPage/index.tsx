import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import ReservationModal from '../features/ReservationModal';
import DailyHistory from '../features/DailyHistory';
import styles from './index.module.scss';
import DetailsModal from '../features/DetailsModal';
import { AppDispatch } from '../../../../redux/store';
import { fetchAllRooms } from './core/resources/actions-creators';
import { fetchAllUsers } from './core/users/action-creators';
import { AppDispatch, RootState } from '../../../../redux/store';
import { listEvents } from './core/events/action-creators';

const MainPage: React.FC = () => {
  const [isReservationModalShown, showReservationModal] = useState(false);
  const [isDetailsModalShown, showDetailsModal] = useState(false);
  const [selectedSpace, changeSelectedSpace] = useState({ id: '', alt: '' });

  const dispatch = useDispatch<AppDispatch>();
  dispatch(fetchAllRooms());
  dispatch(fetchAllUsers());

  const events =
    useSelector((state: RootState) => state.events.eventList) || [];

  // const error = useSelector((state: RootState) => state.events.error);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listEvents());
  }, []);

  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap
          changeSelectedSpace={changeSelectedSpace}
          showReservationModal={showReservationModal}
        />
        <DailyHistory
          events={events}
          showReservationModal={showReservationModal}
          showDetailsModal={showDetailsModal}
        />
        {isDetailsModalShown ? (
          <DetailsModal showDetailsModal={showDetailsModal} />
        ) : null}
        {isReservationModalShown ? (
          <ReservationModal
            showReservationModal={showReservationModal}
            resource={selectedSpace}
          />
        ) : null}
      </div>
    </div>
  );
};
export default MainPage;
