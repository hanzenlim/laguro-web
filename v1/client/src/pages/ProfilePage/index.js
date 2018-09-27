import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import ProfileView from './view';
import { Loading } from '../../components';
import { getUserQuery, getIdQueryClient } from './queries';

const ProfileContainer = () => (
    <Query query={getIdQueryClient}>
        {({
            loading: loadingUserQueryClient,
            error: errorUserQueryClient,
            data: dataIdQueryClient,
        }) => {
            if (loadingUserQueryClient) {
                return <Loading />;
            }

            if (errorUserQueryClient) {
                return <div>error...</div>;
            }
            const id = get(dataIdQueryClient, 'activeUser.id');
            return (
                <Query query={getUserQuery} variables={{ id }}>
                    {({
                        loading: loadingUserQuery,
                        error: errorUserQuery,
                        data: dataUserQuery,
                    }) => {
                        if (loadingUserQuery) {
                            return <Loading />;
                        }

                        if (errorUserQuery) {
                            return <div>error...</div>;
                        }

                        const dentistId = get(
                            dataUserQuery,
                            'getUser.dentistId'
                        );
                        const offices = get(
                            dataUserQuery,
                            'getUser.dentist.offices'
                        );

                        return (
                            <ProfileView
                                dentistId={dentistId}
                                isDentist={get(
                                    dataUserQuery,
                                    'getUser.isDentist'
                                )}
                                isHost={get(dataUserQuery, 'getUser.isHost')}
                                offices={offices}
                                userId={id}
                            />
                        );
                    }}
                </Query>
            );
        }}
    </Query>
);

export default ProfileContainer;
