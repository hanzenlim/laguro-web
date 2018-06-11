import React from 'react';
import PropTypes from 'prop-types';
import { Modal as MaterialUIModal } from '@material-ui/core';
import styled from 'styled-components';

import exitSVG from '../../icons/exit.svg';

const StyledModal = styled(MaterialUIModal)``;

export const StyledModalContent = styled.div`
    background: white;
    margin: auto;
    max-height: calc(100vh - 30px);
    padding: 64px;
    max-width: 768px;
    width: calc(100vw - 30px);
    position: relative;
    outline: none;
`;

const StyledCloseButton = styled.button`
    border: none;
    background: none;
    position: absolute;
    right: 64px;
    padding: 0;
    cursor: pointer;

    &:active {
        background: none;
    }
`;

const Modal = props => {
    const { children, ...customProps } = props;

    return (
        <StyledModal {...customProps} onBackdropClick={customProps.onClose}>
            <StyledModalContent>
                {customProps.closable && (
                    <StyledCloseButton
                        type="button"
                        title="Close modal"
                        onClick={customProps.onClose}
                    >
                        <img src={exitSVG} alt="Close modal" />
                    </StyledCloseButton>
                )}

                {children}
            </StyledModalContent>
        </StyledModal>
    );
};

Modal.propTypes = {
    closable: PropTypes.bool.isRequired
};

export default Modal;
