import React, { useState, Fragment } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import Head from 'next/head';

import DentistDashboardView from './view';
import { Loading } from '~/components';
import GeneralErrorPage from '~/routes/GeneralErrorPage';
import { getUserQuery } from './queries';
import { getUser } from '~/util/authUtils';
import { getTextFromKey } from '../Dashboard/utils';

const DentistDashboardPage = ({ location }) => {
    const [hasPreferredDays, setHasPreferredDays] = useState(false);
    const [hasPreferredDaysFromAPI, setHasPreferredDaysFromAPI] = useState(
        false
    );
    const user = getUser();
    const id = get(user, 'id');
    const params = queryString.parse(location.search);

    return (
        <Query query={getUserQuery} variables={{ id }}>
            {({
                loading: loadingUserQuery,
                error: errorUserQuery,
                data: dataUserQuery,
                refetch,
            }) => {
                if (_isEmpty(dataUserQuery) && loadingUserQuery) {
                    return <Loading />;
                }

                if (errorUserQuery) {
                    return <GeneralErrorPage />;
                }

                const dentistId = get(dataUserQuery, 'getUser.dentistId');
                const dentist = get(dataUserQuery, 'getUser.dentist');
                const offices = get(dataUserQuery, 'getUser.dentist.offices');
                const preferredLocations = get(
                    dataUserQuery,
                    'getUser.dentist.preferredLocations'
                );
                const serializedPreferredLocations = get(
                    dataUserQuery,
                    'getUser.dentist.serializedPreferredLocations'
                );
                const zipCode = get(
                    dataUserQuery,
                    'getUser.address.zipCode',
                    ''
                );
                const userLanguages = get(dataUserQuery, 'getUser.languages', [
                    'ENGLISH',
                ]);

                return (
                    <Fragment>
                        <Head>
                            <title>Laguro Dentist</title>
                        </Head>
                        <DentistDashboardView
                            dentistId={dentistId}
                            dentalGroups={get(
                                dataUserQuery,
                                'getUser.dentalGroups',
                                []
                            )}
                            isDentist={get(dataUserQuery, 'getUser.isDentist')}
                            dentist={dentist}
                            isHost={get(dataUserQuery, 'getUser.isHost')}
                            offices={offices}
                            userId={id}
                            panel={getTextFromKey(params.selectedTab)}
                            preferredLocations={preferredLocations}
                            serializedPreferredLocations={
                                serializedPreferredLocations
                            }
                            zipCode={zipCode}
                            refetch={refetch}
                            userLanguages={userLanguages}
                            refetchUser={refetch}
                            hasPreferredDays={hasPreferredDays}
                            hasPreferredDaysFromAPI={hasPreferredDaysFromAPI}
                            setHasPreferredDays={status => {
                                setHasPreferredDays(status);
                            }}
                            setHasPreferredDaysFromAPI={status => {
                                setHasPreferredDaysFromAPI(status);
                            }}
                        />
                    </Fragment>
                );
            }}
        </Query>
    );
};

export default DentistDashboardPage;
