import React from 'react';
import { Query } from 'react-apollo';
import { isEmpty, get } from 'lodash';

import ProfileView from './view';
import { Loading } from '../../components';
import { getUserQuery, getUserQueryClient } from './queries';
import { DENTIST, HOST, PATIENT } from '../../util/strings';

const ProfileContainer = () => (
    <Query query={getUserQueryClient}>
        {({
            loading: loadingUserQueryClient,
            error: errorUserQueryClient,
            data,
        }) => {
            if (loadingUserQueryClient) {
                return <Loading />;
            }

            if (errorUserQueryClient) {
                return <div>error...</div>;
            }
            const dentistId = get(data, 'activeUser.dentistId');
            const id = get(data, 'activeUser.id');
            const { visibleModal } = data;
            let persona = dentistId ? DENTIST : PATIENT;
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

                        const offices = get(
                            dataUserQuery,
                            'getUser.dentist.offices'
                        );

                        if (!isEmpty(offices)) {
                            persona = HOST;
                        }

                        return (
                            <ProfileView
                                persona={persona}
                                visibleModal={visibleModal}
                            />
                        );
                    }}
                </Query>
            );
        }}
    </Query>
);

export default ProfileContainer;
