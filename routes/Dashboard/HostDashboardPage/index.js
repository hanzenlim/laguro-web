import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import queryString from 'query-string';
import HostDashboardView from './view';
import { Loading } from '~/components';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import { getUserQuery } from './queries';
import { getUser } from '~/util/authUtils';
import { getTextFromKey } from '~/routes/Dashboard/Dashboard/utils';

const HostDashboardPage = ({ location }) => {
    const user = getUser();
    const id = get(user, 'id');
    const params = queryString.parse(location.search);

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
                    <HostDashboardView
                        dentistId={dentistId}
                        isDentist={get(dataUserQuery, 'getUser.isDentist')}
                        dentist={dentist}
                        isHost={get(dataUserQuery, 'getUser.isHost')}
                        offices={offices}
                        userId={id}
                        panel={getTextFromKey(params.selectedTab)}
                    />
                );
            }}
        </Query>
    );
};

export default HostDashboardPage;
