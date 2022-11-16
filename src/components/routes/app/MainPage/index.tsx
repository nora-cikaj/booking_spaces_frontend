import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import ReservationModal from '../features/ReservationModal';
import DailyHistory from '../features/DailyHistory';
import styles from './index.module.scss';
import DetailsModal from '../features/DetailsModal';
import { AppDispatch, RootState } from '../../../../redux/store';
import { fetchAllRooms } from './core/resources/actions-creators';
import { fetchAllUsers } from './core/users/action-creators';
import { listEvents } from './core/events/action-creators';

const MainPage: React.FC = () => {
  const [isReservationModalShown, showReservationModal] = useState(false);
  const [isDetailsModalShown, showDetailsModal] = useState(false);
  const [selectedSpace, changeSelectedSpace] = useState({ id: '', alt: '' });

  const events =
    useSelector((state: RootState) => state.events.eventList) || [];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const timeMin = moment(momentTZ().tz('Europe/Berlin').format())
      .utc()
      .startOf('day')
      .toISOString();
    const timeMax = moment(momentTZ().tz('Europe/Berlin').format())
      .utc()
      .endOf('day')
      .toISOString();
    dispatch(listEvents({ timeMin, timeMax }));
    dispatch(fetchAllRooms());
    dispatch(fetchAllUsers());
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
          changeSelectedSpace={changeSelectedSpace}
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
