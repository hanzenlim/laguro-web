import React from 'react';
import { Query } from 'react-apollo';
import { isEmpty, get } from 'lodash';

import ProfileView from './view';
import { Loading } from '../../components';
import { getUserQuery, getIdQueryClient } from './queries';
import { DENTIST, HOST, PATIENT } from '../../util/strings';

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

                        let persona;

                        if (!isEmpty(offices)) {
                            persona = HOST;
                        } else if (dentistId) {
                            persona = DENTIST;
                        } else {
                            persona = PATIENT;
                        }
                        return (
                            <ProfileView
                                persona={persona}
                                dentistId={dentistId}
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
