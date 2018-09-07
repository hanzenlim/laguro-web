import React from 'react';
import { Modal, message } from 'antd';
import queryString from 'query-string';

import ResetPassView from './view';
import history from '../../history';
import request from '../../util/fetchUtil';

const resetPassword = values => {
    this.urlParams = queryString.parse(history.location.search);
    const { id, token } = this.urlParams;

    const params = { ...values };
    params.id = id;
    params.token = token;

    request('/api/reset-password', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': '*',
        },
        body: JSON.stringify({ ...params }),
    }).then(res => {
        if (res.status === 200) {
            Modal.success({
                title: 'Success!',
                content:
                    'Your password has been changed. You can now log in with your new credentials.',
                onOk() {
                    history.push('/');
                },
            });
        } else {
            message.error(res.message);
        }
    });
};

const ResetPassContainer = () => (
    <ResetPassView resetPassword={resetPassword} />
);

export default ResetPassContainer;
