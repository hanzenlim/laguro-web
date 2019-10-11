import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import _get from 'lodash/get';

import LoginPageView from './view';
import { getUser } from '~/util/authUtils';

const LoginPage = props => {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
    const toggleLoginModal = () => {
        if (this.props.toggleModal) {
            this.props.toggleModal();
        }

        setIsLoginModalOpen(!isLoginModalOpen);
    };
    const { location, mode } = props;

    const user = getUser();

    useEffect(() => {
        // Check if user is logged in or not.
        if (_get(user, 'id')) {
            router.replace(_get(router, 'query.redirectTo', '/'));
        }
        window.scrollTo(0, 0);
    }, []);

    if (!isLoginModalOpen) {
        router.replace('/login');
    }

    return (
        <LoginPageView
            isLoginModalOpen={isLoginModalOpen}
            toggleLoginModal={toggleLoginModal}
            message={_get(location, 'state.message')}
            mode={mode}
        />
    );
};

export default LoginPage;
