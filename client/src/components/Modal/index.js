import React from 'react';
import { Modal as AntdModal } from 'antd';

const Modal = props => {
    const { children, footer = null, visible, ...rest } = props;

    return (
        <AntdModal
            footer={footer}
            visible={visible}
            children={children}
            {...rest}
        />
    );
};

export default Modal;
