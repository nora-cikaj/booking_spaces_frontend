import { ReactElement, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Select } from 'antd';
import { colors } from '../../../styles/abstracts/variables';

import styles from './index.module.scss';

const { Option } = Select;

type OptionProps = {
  label: string | ReactElement;
  value: string | number;
  key: number;
};

type SelectPropsType = {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  options: OptionProps[];
  error?: string;
  value?: string | number;
  style?: any;
  allowClear?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  defaultValue?: string | number;
  onChange?: (e?: any) => void;
  suffixIcon?: ReactNode;
};

const CustomSelect = (props: SelectPropsType): ReactElement => {
  const getSuffixIcon = (error?: string, touched?: boolean) => {
    if (!touched) {
      return null;
    }
    return error ? (
      <Tooltip title={error}>
        <FontAwesomeIcon
          className={styles.SuffixIcon}
          icon={faXmark}
          color={colors.danger}
        />
      </Tooltip>
    ) : (
      <FontAwesomeIcon
        className={styles.SuffixIcon}
        icon={faCheck}
        color={colors.success}
      />
    );
  };
  // const suffix = <>{getSuffixIcon(props.error, props.touched)}</>;
  const commonProps = {
    placeholder: props.placeholder,
    disabled: props.disabled,
    style: props.style,
    value: props.value,
    allowClear: props.allowClear,
    mode: props.mode,
    name: props.name,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
    suffixIcon: props.suffixIcon,
  };

  return <Select {...commonProps} />;
};

CustomSelect.defaultProps = {
  style: {},
  placeholder: '',
  defaultValue: undefined,
  error: undefined,
  value: undefined,
  disabled: false,
  allowClear: false,
  mode: 'single',
  onChange: () => {},
  suffixIcon: undefined,
};

export default CustomSelect;
