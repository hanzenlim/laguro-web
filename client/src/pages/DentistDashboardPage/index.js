import React, { Component } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import DentistDashboardView from './view';
import { Loading } from '../../components';
import GeneralErrorPage from '../../pages/GeneralErrorPage';
import { getUserQuery } from './queries';
import { getUser } from '../../util/authUtils';
import { dentistDashboardMenuTexts } from '../../util/menuItems';
import { addSearchParams } from '../../history';
import { PROFILE_SETTINGS_MENU_TEXT } from '../../util/strings';
import { getKeyFromText, getTextFromKey } from '../Dashboard/utils';
import { defaultClient } from '../../util/apolloClients';

class DentistDashboardPage extends Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(window.location.search);

        // if selectedTab is not for dentist dashboard, change selectedTab to PROFILE_SETTINGS_MENU_TEXT
        if (
            !dentistDashboardMenuTexts.includes(
                getTextFromKey(params.selectedTab)
            )
        ) {
            addSearchParams({
                selectedTab: getKeyFromText(PROFILE_SETTINGS_MENU_TEXT),
            });
        }

        this.state = {
            hasPreferredDays: false,
        };
    }

    render() {
        const user = getUser();
        const id = get(user, 'id');
        const params = queryString.parse(window.location.search);

        return (
            <Query
                query={getUserQuery}
                variables={{ id }}
                client={defaultClient}
            >
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
                    const offices = get(
                        dataUserQuery,
                        'getUser.dentist.offices'
                    );
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
                    const userLanguages = get(
                        dataUserQuery,
                        'getUser.languages',
                        ['ENGLISH']
                    );

                    const { hasPreferredDays } = this.state;

                    return (
                        <DentistDashboardView
                            dentistId={dentistId}
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
                            setHasPreferredDays={status => {
                                this.setState({ hasPreferredDays: status });
                            }}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default DentistDashboardPage;
