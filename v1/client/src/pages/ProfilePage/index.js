import React from 'react';
import { Query } from 'react-apollo';
import { isEmpty, get } from 'lodash';

import ProfileView from './view';
import { getUserQuery, getUserQueryClient } from './queries';

const ProfileContainer = () => (
    <Query query={getUserQueryClient}>
        {({ loading: loadingOne, error: errorOne, data }) => {
            if (loadingOne) {
                return <div>loading...</div>;
            }

            if (errorOne) {
                return <div>error...</div>;
            }
            const dentistId = get(data, 'activeUser.dentistId');
            const id = get(data, 'activeUser.id');
            const { visibleModal } = data;
            let persona = dentistId ? 'dentist' : 'patient';
            return (
                <Query query={getUserQuery} variables={{ id }}>
                    {({
                        loading: loadingTwo,
                        error: errorTwo,
                        data: dataTwo,
                    }) => {
                        if (loadingTwo) {
                            return <div>loading...</div>;
                        }

                        if (errorTwo) {
                            return <div>error...</div>;
                        }

                        const offices = get(dataTwo, 'getUser.dentist.offices');

                        if (!isEmpty(offices)) {
                            persona = 'host';
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
