import React, { ReactElement, useEffect } from 'react';
import ProgressiveImage from 'react-progressive-image-loading';
import { CgScrollV } from 'react-icons/cg';
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
    alt: string,
  ) => {
    e.preventDefault();
    showReservationModal(true);
    changeSelectedSpace({ id, alt });
  };

  const floorPlanUrl = '/images/softup_plan.png';
  const blurFloorPlanUrl = '/images/softup_plan_blur.png';

  return (
    <div className={styles.mainFloorContainer}>
      <h1 className={styles.ribbonTop}>
        <span className={styles.spanRibbonTop} />
        Softup Floor Map
      </h1>
      <ProgressiveImage
        src={floorPlanUrl}
        preview={blurFloorPlanUrl}
        render={(src) => (
          <img src={src} alt="SoftupFloor" useMap="#softupFloor" width="700" />
        )}
      />
      <h1 className={styles.ribbonBottom}>
        <span className={styles.spanRibbonBottom} />
        Scroll to see full map
        <CgScrollV className={styles.iconRibbonBottom} />
      </h1>
      <map name="softupFloor">
        {areasData.map((area) => {
          return (
            <area
              href=""
              key={area.id}
              shape={area.shape}
              coords={area.coords}
              alt={area.alt}
              onClick={(e) => onAreaClick(e, area.id, area.alt)}
            />
          );
        })}
      </map>
    </div>
  );
};
export default FloorMap;
