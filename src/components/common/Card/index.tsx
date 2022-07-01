import { ReactElement, ReactNode } from 'react';
import styles from './index.module.scss';

type CardProps = {
  style?: any,
  className?: string,
  title?: string,
  actions?: ReactElement,
  children: ReactElement | ReactNode,
};

const CustomCard = (props: CardProps): ReactElement => {
  return (
    <div
      style={props.style}
      className={`${props.className} ${styles.CardContainer}`}
    >
      <div className={styles.TitleContainer}>
        <span className={styles.Title}>{props.title}</span>
        {
          props.actions
            ? <div className={styles.Actions}>{props.actions}</div>
            : null
        }
      </div>
      <div className={styles.ContentContainer}>
        {props.children}
      </div>
    </div>
  );
};

CustomCard.defaultProps = {
  className: '',
  style: {},
  actions: undefined,
  title: '',
};

export default CustomCard;
