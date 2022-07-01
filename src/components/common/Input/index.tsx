import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Input, Tooltip } from 'antd';
import { colors } from '../../../styles/abstracts/variables';
import styles from './index.module.scss';

type CustomInputProps = {
  type: 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week',
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  touched?: boolean,
  style?: any,
  value?: any,
  placeholder?: string,
  onFocus?: (event?: React.FormEvent<HTMLInputElement>) => void,
  onBlur?: (event?: React.FormEvent<HTMLInputElement>) => void,
  onChange?: (event?: React.FormEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  error?: string,
  name?: string,
  className?: string,
};
const CustomInput = (props: CustomInputProps): ReactElement => {
  const getSuffixIcon = (error?: string, touched?: boolean) => {
    if (!touched) {
      return null;
    }
    return error
      ? (
        <Tooltip title={error}>
          <FontAwesomeIcon
            className={styles.SuffixIcon}
            icon={faXmark}
            color={colors.danger}
          />
        </Tooltip>
      )
      : (
        <FontAwesomeIcon
          className={styles.SuffixIcon}
          icon={faCheck}
          color={colors.success}
        />
      );
  };
  const suffix = <>{props.suffix}{getSuffixIcon(props.error, props.touched)}</>;
  const costumProps = {
    style: props.style,
    type: props.type,
    placeholder: props.placeholder,
    prefix: props.prefix,
    suffix,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onChange: props.onChange,
    disabled: props.disabled,
    name: props.name,
    value: props.value,
  };
  return (
    <Input
      className={`${styles.InputContainer} ${((props.error || props.value === '') && props.touched) && styles.InputError}`}
      {...costumProps}
      spellCheck={false}
    />
  );
};
CustomInput.defaultProps = {
  placeholder: '',
  error: undefined,
  touched: false,
  value: '',
  disabled: false,
  prefix: null,
  suffix: null,
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {},
  name: '',
  className: '',
  style: undefined,
};
export default CustomInput;
