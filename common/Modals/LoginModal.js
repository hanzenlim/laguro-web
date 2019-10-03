import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Modal } from '~/components';
import { withScreenSizes } from '~/components/Responsive';
import Login from '../Login';
import { AppContext } from '../../appContext';

const StyledModal = styled(Modal)`
    &.ant-modal {
        top: 0;
        margin: 0 auto;
        padding: 0;
        max-width: 100%;

        @media (min-width: ${props => props.theme.breakpoints[0]}) {
            top: 100px;
        }
    }
`;

const LoginModal = ({
    isLoginModalOpen,
    toggleLoginModal,
    closeLoginModal,
    message,
    customRedirect,
    sideEffect,
    mode,
    mobileOnly,
}) => {
    const { mounted } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        if (isLoginModalOpen && mobileOnly) {
            router.push({
                pathname: '/login',
                query: { redirectTo: router.asPath, mode },
            });
            closeLoginModal();
        }
    }, [isLoginModalOpen, closeLoginModal, router, mobileOnly, mode]);

    const login = (
        <Login
            closeModal={toggleLoginModal}
            message={message}
            customRedirect={customRedirect}
            sideEffect={sideEffect}
            mode={mode}
        />
    );

    if (!mounted) return null;

    return (
        <StyledModal
            onCancel={closeLoginModal}
            destroyOnClose
            visible={isLoginModalOpen}
            width={mobileOnly ? '100%' : 600}
            bodyStyle={{
                height: mobileOnly ? window.innerHeight : 600,
                padding: 0,
                overFlow: 'auto',
            }}
            getContainer={() => document.querySelector('header')}
        >
            {login}
        </StyledModal>
    );
};

LoginModal.propTypes = {
    isLoginModalOpen: PropTypes.bool.isRequired,
    toggleLoginModal: PropTypes.func.isRequired,
    closeLoginModal: PropTypes.func.isRequired,
    customRedirect: PropTypes.string.isRequired,
    sideEffect: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
};

export default withScreenSizes(LoginModal);
