import { message } from 'antd';
import cookies from 'browser-cookies';

import history from '../history';
import request from './fetchUtil';
import { hasSkippedMedicalHistoryFormCookieVariableName } from './strings';

export const getUser = () => {
    let user = cookies.get('user');
    if (user) {
        user = JSON.parse(user);
        return user;
    }

    return null;
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
    cookies.erase(hasSkippedMedicalHistoryFormCookieVariableName);
    request('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: '{}',
    }).then(() => {
        window.location.href = '/';
    });
};

export const onKioskLogout = async () => {
    cookies.erase('user');
    history.push('/kiosk/registration');
};

export const openLoginModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: 'login' } });
};

export const closeModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: null } });
};
