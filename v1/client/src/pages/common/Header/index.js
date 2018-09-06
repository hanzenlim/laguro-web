import React from 'react';
import { Query } from 'react-apollo';
import cookies from 'browser-cookies';
import { message } from 'antd';

import HeaderView from './view';
import { getUserQuery } from './queries';
import request from '../../../util/fetchUtil';
import { ACTIVE_USER } from '../../../util/strings';

const HeaderContainer = () => (
    <Query query={getUserQuery}>
        {({ loading, error, data, client }) => {
            const onLandingPage = window.location.pathname === '/';

            if (loading) {
                return <HeaderView onLandingPage={onLandingPage} />;
            }

            if (error) {
                return <div>error...</div>;
            }

            const login = values => {
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
                        client.writeData({
                            data: {
                                activeUser: {
                                    ...res.user,
                                    __typename: ACTIVE_USER,
                                },
                                visibleModal: null,
                            },
                        });
                    } else {
                        message.error(res.info.message);
                    }
                });
            };
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
                        client.writeData({
                            data: {
                                activeUser: {
                                    ...res.user,
                                    __typename: ACTIVE_USER,
                                },
                                visibleModal: null,
                            },
                        });
                    } else {
                        message.error(res.info.message);
                    }
                });
            };
            const logout = () => {
                client.writeData({ data: { activeUser: null } });
                cookies.erase('user');
            };
            const openLoginModal = () => {
                client.writeData({ data: { visibleModal: 'login' } });
            };
            const openRegistrationModal = () => {
                client.writeData({ data: { visibleModal: 'register' } });
            };
            const closeModal = () => {
                client.writeData({ data: { visibleModal: null } });
            };

            return (
                <HeaderView
                    auth={data.activeUser}
                    visibleModal={data.visibleModal}
                    login={login}
                    logout={logout}
                    signup={signup}
                    openLoginModal={openLoginModal}
                    openRegistrationModal={openRegistrationModal}
                    closeModal={closeModal}
                    onLandingPage={onLandingPage}
                />
            );
        }}
    </Query>
);

export default HeaderContainer;
