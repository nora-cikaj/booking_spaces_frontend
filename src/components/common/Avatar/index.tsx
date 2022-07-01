import { ReactElement } from 'react';
import { Avatar } from 'antd';

type CustomProps = {
  avatar: string;
  style?: any;
  className?: string;
}
const CustomAvatar = (props: CustomProps): ReactElement => {
  return (
    <Avatar
      style={props.style}
      src={props.avatar}
      className={props.className}
    />
  );
};

CustomAvatar.defaultProps = {
  style: undefined,
  className: '',
};

export default CustomAvatar;
