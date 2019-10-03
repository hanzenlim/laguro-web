import { message } from 'antd';
import cookies from 'browser-cookies';
import Router, { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';

import request from './fetchUtil';
import {
    hasSkippedMedicalHistoryFormCookieVariableName,
    LAGURO_AUTH_TOKEN,
} from './strings';
import { KIOSK_REG_PAGE_URL } from './urls';
import { AppContext } from '../appContext';

const domain = process.env.REACT_APP_DOMAIN_NAME_FOR_COOKIE;

export const getUser = () => {
    if (typeof window !== 'undefined') {
        let user = cookies.get('user');
        if (user) {
            user = JSON.parse(user);
            return user;
        }

        return null;
    }

    return null;
};

export const setUser = newUser => {
    delete newUser.appointments;
    let user = cookies.get('user');

    try {
        if (user) {
            user = JSON.parse(user);
        }
    } catch (e) {
        user = {};
    }

    cookies.set(
        'user',
        JSON.stringify({
            ...user,
            ...newUser,
        }),
        {
            domain,
        }
    );
};

export const eraseCookieSession = () => {
    cookies.erase(hasSkippedMedicalHistoryFormCookieVariableName);
    cookies.erase('user', { domain });

    // Temporary putting this to remove old user cookie.
    cookies.erase('user');
    cookies.erase(LAGURO_AUTH_TOKEN, { domain });
};

export const setAuthToken = token => {
    cookies.set(LAGURO_AUTH_TOKEN, token, { domain });
};

export const onLogin = values =>
    request('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...values }),
    }).then(res => {
        if (res.status !== 200) {
            message.error(res.message);
        }
    });

export const onSignup = values =>
    request('/api/signup', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...values }),
    }).then(res => {
        if (res.status !== 200) {
            message.error(res.message);
        }
    });

export const sendPassResetLink = (values, onSuccess) =>
    request('/api/forgot-password', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...values }),
    }).then(res => {
        if (res.status === 200) {
            onSuccess();
        } else {
            message.error(res.message);
        }
    });

export const onLogout = () => {
    // eslint-disable-next-line
    window.localStorage && window.localStorage.clear();

    eraseCookieSession();
    Router.push('/');
};

export const onTokenExpiryLogout = () => {
    typeof window !== 'undefined' &&
        window.localStorage &&
        window.localStorage.clear();

    eraseCookieSession();
    window.location.href = '/?reason=token-expiry';
};

export const onLogoutWithoutRedirect = () => {
    // eslint-disable-next-line
    window.localStorage && window.localStorage.clear();

    eraseCookieSession();
};

export const onKioskLogout = async () => {
    eraseCookieSession();
    Router.push(KIOSK_REG_PAGE_URL);
};

export const usePrivateApp = () => {
    const router = useRouter();
    const { isAuth, mounted } = useContext(AppContext);

    useEffect(() => {
        if (!isAuth) {
            router.push({
                pathname: '/login',
                query: { redirectTo: router.asPath },
            });
        }
    }, [isAuth, router]);

    return { isRouteAccessible: mounted && isAuth };
};
