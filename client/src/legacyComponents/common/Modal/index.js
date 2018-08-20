import React from 'react';
import PropTypes from 'prop-types';
import { Modal as MaterialUIModal } from '@material-ui/core';
import styled from 'styled-components';
import { fade } from '../../../util/styleUtil';

import exitSVG from '../../icons/exit.svg';

const StyledModal = styled(MaterialUIModal)`
    ${props => props.fade && fade(props.fade)};
`;

export const StyledModalContent = styled.div`
    background: white;
    margin: auto;
    overflow-y: auto;
    max-height: calc(100vh - 30px);
    padding: 44px;
    max-width: 768px;
    width: calc(100vw - 30px);
    position: relative;
    outline: none;
    overflow: auto;
`;

const StyledCloseButton = styled.button`
    border: none;
    background: none;
    position: absolute;
    right: 23px;
    padding: 0;
    cursor: pointer;
    top: 21px;

    &:active {
        background: none;
    }
`;

const Modal = props => {
    const { children, closable, closeModal, ...customProps } = props;

    return (
        <StyledModal onBackdropClick={closeModal} {...customProps}>
            <StyledModalContent>
                {closable && (
                    <StyledCloseButton
                        type="button"
                        title="Close modal"
                        onClick={closeModal}
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
    closable: PropTypes.bool
};

export default Modal;