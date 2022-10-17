import { ReactElement } from 'react';
import { Avatar } from 'antd';

type CustomProps = {
  src: string | undefined;
  style?: any;
  className?: string;
}
const CustomAvatar = (props: CustomProps): ReactElement => {
  return (
    <Avatar
      style={props.style}
      src={props.src}
      className={props.className}
    />
  );
};

CustomAvatar.defaultProps = {
  style: undefined,
  className: '',
};

export default CustomAvatar;
