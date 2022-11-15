import notification, { NotificationPlacement } from 'antd/lib/notification';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import classes from './index.module.scss';

const getIcon = (icon: string) => {
  if (icon === 'error') {
    return <FaRegTimesCircle className={classes.Error} />;
  }

  return <FaRegCheckCircle className={classes.Success} />;
};

export const openNotification = (
  placement: NotificationPlacement,
  description: string,
  message: string,
  icon: 'error' | 'success',
) => {
  notification.info({
    message: `${message}`,
    description: `${description}`,
    placement,
    icon: getIcon(icon),
  });
};
