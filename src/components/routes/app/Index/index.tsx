import { ReactElement } from 'react';
import CustomModal from '../../../common/Modal';
import ReservationModal from '../features/ReservationModal';

const AppIndex = (): ReactElement => {
  return (
    <div>
      <ReservationModal />
    </div>
  );
};

export default AppIndex;
