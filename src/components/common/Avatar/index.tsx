import { ReactElement, ReactNode } from 'react';
import { Avatar } from 'antd';

type CustomProps = {
  src: ReactNode | string;
  style?: any;
  className?: string;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
};
const CustomAvatar = (props: CustomProps): ReactElement => {
  return (
    <Avatar
      style={props.style}
      src={props.src}
      className={props.className}
      crossOrigin={props.crossOrigin}
    />
  );
};

CustomAvatar.defaultProps = {
  style: undefined,
  className: '',
  crossOrigin: '',
};

export default CustomAvatar;
