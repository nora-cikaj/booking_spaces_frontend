import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import momentTZ from 'moment-timezone';
import AppHeader from '../features/AppHeader';
import FloorMap from '../features/FloorMap';
import ReservationModal from '../features/ReservationModal';
import BoothHistory from '../features/BoothHistory';
import styles from './index.module.scss';
import DetailsModal from '../features/DetailsModal';
import { AppDispatch, RootState } from '../../../../redux/store';
import { fetchAllRooms } from './core/resources/actions-creators';
import {
  fetchAllActiveUsers,
  fetchAllUsers,
} from './core/users/action-creators';
import { listEvents } from './core/events/action-creators';
import User from '../../../../types/user';
import { getUser } from '../../auth/LogIn/core/auth-api';
import { user } from '../../auth/LogIn/core/auth-reducer';
import { openNotification } from '../../../common/Notify';
import menu from '../../../../constants/menu';
import { removeError, removeSuccess } from './core/events/event-reducer';
import { getCurrentTime } from '../../../../helpers/timeFunctionalities';

const MainPage: React.FC = () => {
  const [isReservationModalShown, showReservationModal] = useState(false);
  const [isDetailsModalShown, showDetailsModal] = useState(false);
  const [selectedSpace, changeSelectedSpace] = useState({ id: '', alt: '' });
  const [resetted, setResetted] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const [selectedResource, setSelectedResource] = useState('');

  const eventError = useSelector((state: RootState) => state.events.error);
  const eventSuccess = useSelector((state: RootState) => state.events.success);
  let events = useSelector((state: RootState) => state.events.eventList) || [];

  if (selectedResource && !resetted) {
    events = events.filter((e) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      e.location?.toLowerCase().includes(selectedResource.toLowerCase()),
    );
  }
  const dispatch = useDispatch<AppDispatch>();

  const throwNotification = () => {
    if (eventError) {
      openNotification('topRight', menu.ERROR.BAD_REQUEST, 'Error', 'error');
    }
    if (eventSuccess?.create) {
      openNotification('topRight', eventSuccess.create, 'Success', 'success');
    }
    if (eventSuccess?.update) {
      openNotification('topRight', eventSuccess.update, 'Success', 'success');
    }
  };
  useEffect(() => {
    const date = filterDate || getCurrentTime();
    const timeMin = moment(momentTZ(date).format())
      .utc()
      .startOf('day')
      .toISOString();
    const timeMax = moment(momentTZ(date).format())
      .utc()
      .endOf('day')
      .toISOString();

    const getLoggedInUser = async () => {
      const currendUser: User = await getUser();
      dispatch(user(currendUser));
    };
    getLoggedInUser();
    dispatch(listEvents({ timeMin, timeMax }));
    dispatch(fetchAllActiveUsers());
    dispatch(fetchAllRooms());
    dispatch(fetchAllUsers());
    throwNotification();
    dispatch(removeError());
    dispatch(removeSuccess());
  }, [eventError, eventSuccess, filterDate, resetted]);

  return (
    <div>
      <AppHeader />
      <div className={styles.mainContainer}>
        <FloorMap
          changeSelectedSpace={changeSelectedSpace}
          showReservationModal={showReservationModal}
        />
        <BoothHistory
          events={events}
          showReservationModal={showReservationModal}
          showDetailsModal={showDetailsModal}
          filterDate={filterDate}
          selectedFilterResource={selectedResource}
          setFilterDate={setFilterDate}
          setResetted={setResetted}
          changeSelectedSpace={changeSelectedSpace}
          setSelectedResource={setSelectedResource}
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
