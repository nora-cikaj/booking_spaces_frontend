import React, { ReactElement, useEffect } from 'react';
import { addEffectOnAreaHover } from './effectOnAreaHover';
import styles from './index.module.scss';
import { FloorMapPropsType } from './types';
import { areasData } from './data';

const FloorMap = ({
  changeSelectedSpace,
  showReservationModal,
}: FloorMapPropsType): ReactElement => {
  useEffect(() => {
    addEffectOnAreaHover();
  }, []);

  const onAreaClick = (
    e: React.MouseEvent<HTMLAreaElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();
    showReservationModal(true);
    changeSelectedSpace(id);
  };

  return (
    <div className={styles.mainFloorContainer}>
      <img
        src="/images/softup_plan.png"
        alt="SoftupFloor"
        useMap="#softupFloor"
        width="700"
      />
      <map name="softupFloor">
        {areasData.map((area) => {
          return (
            <area
              href=""
              key={area.id}
              shape={area.shape}
              coords={area.coords}
              alt={area.alt}
              onClick={(e) => onAreaClick(e, area.id)}
            />
          );
        })}
      </map>
    </div>
  );
};
export default FloorMap;
