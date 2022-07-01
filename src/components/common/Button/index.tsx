import { ReactElement } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import styles from './index.module.scss';

type CustomButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset' | undefined,
  buttonType: 'default' | 'primary' | 'info' | 'success' | 'danger' | 'warning',
  onClick?: () => void,
  label?: string,
  loading?: boolean,
  style?: any,
  disabled?: boolean,
  danger?:boolean,
  block?: boolean
  icon?: IconProp,
  role?: any;
};

const CustomButton = (props: CustomButtonProps): ReactElement => {
  const btnType = props.buttonType;
  return (
    <Button
      role={props.role}
      data-testid="button"
      style={props.style}
      className={`${styles.ButtonContainer} ${styles[btnType]}`}
      htmlType={props.htmlType}
      onClick={props.onClick}
      loading={props.loading}
      disabled={props.disabled}
      danger={props.danger}
      block={props.block}
      icon={props.icon ? <FontAwesomeIcon icon={props.icon} /> : null}
    >
      {props.label}
    </Button>
  );
};

CustomButton.defaultProps = {
  htmlType: undefined,
  label: undefined,
  onClick: undefined,
  loading: false,
  style: undefined,
  disabled: false,
  danger: false,
  block: false,
  icon: undefined,
  role: undefined,
};

export default CustomButton;
