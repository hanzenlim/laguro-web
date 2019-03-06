import { message } from 'antd';
import cookies from 'browser-cookies';

import history from '../history';
import request from './fetchUtil';
import {
    hasSkippedMedicalHistoryFormCookieVariableName,
    LAGURO_AUTH_TOKEN,
} from './strings';

const domain = process.env.REACT_APP_DOMAIN_NAME_FOR_COOKIE;

export const getUser = () => {
    let user = cookies.get('user');
    if (user) {
        user = JSON.parse(user);
        return user;
    }

    return null;
};

export const setUser = newUser => {
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
    window && window.Intercom('shutdown');
    // eslint-disable-next-line
    window.localStorage && window.localStorage.clear();

    eraseCookieSession();
    history.push('/');
};

export const onKioskLogout = async () => {
    eraseCookieSession();
    history.push('/kiosk/registration');
};

export const openLoginModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: 'login' } });
};

export const closeModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: null } });
};
