import { Popconfirm } from 'antd';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import { ReactElement } from 'react';
import styles from './index.module.scss';

interface PopConfirmProps {
  icon?: FontAwesomeIconProps['icon'],
  placement?: 'top' | 'left' | 'right' | 'bottom',
  disabled?: boolean,
  cancelText?: string,
  okText?: string,
  title:string,
  onCancel?: () => void,
  onConfirm: () => void,
  children: ReactElement
}

const CustomPopConfirm = (props: PopConfirmProps) => {
  const customIcon = props.icon
    ? (
      <FontAwesomeIcon icon={props.icon} className={styles.PrefixIcon} />
    ) : (
      <FontAwesomeIcon icon={faCircleQuestion} className={styles.PrefixIcon} />
    );
  const commonProps = {
    icon: customIcon,
    placement: props.placement,
    disabled: props.disabled,
    cancelText: props.cancelText || 'No',
    okText: props.okText || 'Yes',
    title: props.title || 'Are you sure?',
    onCancel: props.onCancel,
    onConfirm: props.onConfirm,
  };

  return (
    <Popconfirm overlayClassName={styles.PopConfirm} {...commonProps}>
      {props.children}
    </Popconfirm>
  );
};

CustomPopConfirm.defaultProps = {
  icon: undefined,
  placement: 'top',
  disabled: false,
  cancelText: undefined,
  okText: undefined,
  onCancel: () => {},
};

export default CustomPopConfirm;
