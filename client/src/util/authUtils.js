import { message } from 'antd';
import cookies from 'browser-cookies';
import history from '../history';
import request from './fetchUtil';
import { ACTIVE_USER } from './strings';

export const onLogin = (clientCache, values) =>
    request('/api/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...values }),
    }).then(res => {
        if (res.status === 200) {
            clientCache.writeData({
                data: {
                    activeUser: {
                        ...res.user,
                        __typename: ACTIVE_USER,
                    },
                    visibleModal: null,
                },
            });
        } else {
            message.error(res.message);
        }
    });

export const onSignup = (clientCache, values) =>
    request('/api/signup', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...values }),
    }).then(res => {
        if (res.status === 200) {
            clientCache.writeData({
                data: {
                    activeUser: {
                        ...res.user,
                        __typename: ACTIVE_USER,
                    },
                    visibleModal: null,
                },
            });
        } else {
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

export const onLogout = clientCache => {
    // eslint-disable-next-line
    window && window.Intercom('shutdown');
    // eslint-disable-next-line
    window.localStorage && window.localStorage.clear();
    clientCache.writeData({ data: { activeUser: null } });
    cookies.erase('user');
    history.push('/');
};

export const openLoginModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: 'login' } });
};

export const openRegistrationModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: 'register' } });
};

export const openForgotPassModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: 'forgotPass' } });
};
export const closeModal = clientCache => {
    clientCache.writeData({ data: { visibleModal: null } });
};
