import React from 'react';
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';

const StyledModal = styled(AntdModal)`
    && {
        font-family: ${props => props.theme.fontFamily};
    }
`;

const Modal = props => {
    const { children, footer = null, visible, ...rest } = props;

    return (
        <StyledModal
            footer={footer}
            visible={visible}
            children={children}
            {...rest}
        />
    );
};

export default Modal;
