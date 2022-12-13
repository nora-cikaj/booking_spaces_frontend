import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';
import { ReactNode } from 'react';

type NotificationProps = {
  message: string,
  description: string,
  icon?: ReactNode,
}

const openNotification = (props: NotificationProps) => {
  notification.info({
    message: props.message,
    description: props.description,
    icon: props.icon,
  });
};

function CustomNotification(props: NotificationProps) {
  return openNotification({
    message: props.message,
    description: props.description,
    icon: props.icon || <FontAwesomeIcon icon={faXmark} />,
  });
}

export default CustomNotification;
