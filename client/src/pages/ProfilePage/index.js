import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import ProfileView from './view';
import { Loading } from '../../components';
import GeneralErrorPage from '../../pages/GeneralErrorPage';
import { getUserQuery } from './queries';
import { getUser } from '../../util/authUtils';

const ProfileContainer = () => {
    const user = getUser();
    const id = get(user, 'id');

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
                    return <GeneralErrorPage />;
                }

                const dentistId = get(dataUserQuery, 'getUser.dentistId');
                const dentist = get(dataUserQuery, 'getUser.dentist');
                const offices = get(dataUserQuery, 'getUser.dentist.offices');

                return (
                    <ProfileView
                        dentistId={dentistId}
                        isDentist={get(dataUserQuery, 'getUser.isDentist')}
                        dentist={dentist}
                        isHost={get(dataUserQuery, 'getUser.isHost')}
                        offices={offices}
                        userId={id}
                    />
                );
            }}
        </Query>
    );
};

export default ProfileContainer;
