import { ReactNode, ReactElement } from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';

type CustomModalProps = {
  wrapClassName?: string;
  title: string;
  visible: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  onCancel: () => void;
  centered?: boolean;
  content: ReactElement;
  style?: any;
  width?: number;
  footer?: ReactNode;
};

const CustomModal = (props: CustomModalProps) => {
  const commonProps = {
    wrapClassName: props.wrapClassName,
    title: props.title,
    visible: props.visible,
    maskClosable: props.maskClosable,
    destroyOnClose: props.destroyOnClose,
    onCancel: props.onCancel,
    centered: props.centered,
    footer: props.footer,
    style: props.style,
    width: props.width,
  };

  return (
    <Modal
      {...commonProps}
      bodyStyle={{ maxHeight: '80vh', overflow: 'scroll' }}
    >
      {props.content}
    </Modal>
  );
};

CustomModal.defaultProps = {
  wrapClassName: styles.Modal,
  maskClosable: false,
  destroyOnClose: false,
  centered: false,
  style: undefined,
  width: undefined,
  footer: null,
};

export default CustomModal;
