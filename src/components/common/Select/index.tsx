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
  options?: OptionProps[];
  error?: string;
  value?: string | number;
  style?: any;
  allowClear?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  defaultValue?: string | number;
  onChange?: (e?: any) => void;
  suffixIcon?: ReactNode;
  touched?: boolean;
};

const CustomSelect = (props: SelectPropsType): ReactElement => {
  const getPrefixIcon = (error?: string, touched?: boolean) => {
    if (!touched) {
      return null;
    }
    return error ? (
      <Tooltip title={error}>
        <FontAwesomeIcon
          className={styles.PrefixIcon}
          icon={faXmark}
          color={colors.danger}
        />
      </Tooltip>
    ) : (
      <FontAwesomeIcon
        className={styles.PrefixIcon}
        icon={faCheck}
        color={colors.success}
      />
    );
  };
  // const prefix = <>{getSuffixIcon(props.error, props.touched)}</>;
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

  return <Select options={props?.options} {...commonProps} />;
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
  options: undefined,
  touched: false,
};

export default CustomSelect;
