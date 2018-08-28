import React from 'react';
import { Query } from 'react-apollo';
import cookies from 'browser-cookies';
import { message } from 'antd';

import Header from './view';
import { getUserQuery } from './queries';
import request from '../../../util/fetchUtil';
import { ACTIVE_USER } from '../../../util/strings';

const HeaderContainer = () => (
    <Query query={getUserQuery}>
        {({ loading, error, data, client }) => {
            if (loading) {
                return '';
            }

            if (error) {
                return <div>error...</div>;
            }
            const onLandingPage = window.location.pathname === '/';

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
            const logout = () => {
                client.writeData({ data: { activeUser: null } });
                cookies.erase('user');
            };
            const openLoginModal = () => {
                client.writeData({ data: { visibleModal: 'login' } });
            };
            const closeModal = () => {
                client.writeData({ data: { visibleModal: null } });
            };

            return (
                <Header
                    auth={data.activeUser}
                    visibleModal={data.visibleModal}
                    login={login}
                    logout={logout}
                    openLoginModal={openLoginModal}
                    closeModal={closeModal}
                    onLandingPage={onLandingPage}
                />
            );
        }}
    </Query>
);

export default HeaderContainer;
