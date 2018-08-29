import React from 'react';
import { Mutation } from 'react-apollo';
import { message } from 'antd';

import request from '../../../../util/fetchUtil';
import { ACTIVE_USER } from '../../../../util/strings';

import RegistionModalView from './view';
import { CREATE_LOCAL_USER } from './queries';

const RegistrationModal = ({ visible, closeModal }) => (
    <Mutation
        mutation={CREATE_LOCAL_USER}
        update={(cache, { data: { createLocalUser } }) => {
            cache.writeData({
                data: {
                    activeUser: {
                        ...createLocalUser,
                        __typename: ACTIVE_USER,
                    },
                    visibleModal: null,
                },
            });
        }}
    >
        {createLocalUser => {
            const signup = values => {
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
                        createLocalUser({
                            variables: { input: { ...res.user } },
                        });
                    } else {
                        message.error(res.info.message);
                    }
                });
            };
            return (
                <RegistionModalView
                    visible={visible}
                    closeModal={closeModal}
                    signup={signup}
                />
            );
        }}
    </Mutation>
);

export default RegistrationModal;
