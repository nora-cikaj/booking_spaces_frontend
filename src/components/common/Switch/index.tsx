import { Switch } from 'antd';

import styles from './index.module.scss';

type SwitchProps = {
  name: string,
  value: boolean,
  onChange: (checked: boolean) => void;
  disabled?: boolean
  style?: any,
  setFieldValue?: (name: string, checked: boolean) => void,
  setFieldTouched?: (name: string) => void,
};

const CustomSwitch = (props: SwitchProps) => (
  <Switch
    className={styles.Switch}
    style={props.style}
    checked={props.value}
    disabled={props.disabled}
    onChange={(checked) => {
      if (props.setFieldValue && props.setFieldTouched) {
        props.setFieldTouched(props.name);
        props.setFieldValue(props.name, checked);
      } else {
        props.onChange(checked);
      }
    }}
  />
);

CustomSwitch.defaultProps = {
  style: {},
  disabled: false,
  setFieldValue: undefined,
  setFieldTouched: undefined,
};

export default CustomSwitch;
