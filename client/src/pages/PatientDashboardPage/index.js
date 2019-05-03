import React, { Component } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import queryString from 'query-string';
import PatientDashboardView from './view';
import { Loading } from '../../components';
import GeneralErrorPage from '../../pages/GeneralErrorPage';
import { getUserQuery } from './queries';
import { getUser } from '../../util/authUtils';
import { profileMenuTexts } from '../../util/menuItems';
import { addSearchParams } from '../../history';
import { ACCOUNT_SETTINGS_MENU_TEXT } from '../../util/strings';
import { getKeyFromText, getTextFromKey } from '../Dashboard/utils';

class PatientDashboardPage extends Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(window.location.search);

        // if selectedTab is not for dentist dashboard, change selectedTab to ACCOUNT_SETTINGS_MENU_TEXT
        if (!profileMenuTexts.includes(getTextFromKey(params.selectedTab))) {
            addSearchParams({
                selectedTab: getKeyFromText(ACCOUNT_SETTINGS_MENU_TEXT),
            });
        }
    }

    render() {
        const user = getUser();
        const id = get(user, 'id');
        const params = queryString.parse(window.location.search);

        return (
            <Query query={getUserQuery} variables={{ id }}>
                {({
                    loading: loadingUserQuery,
                    error: errorUserQuery,
                    data: dataUserQuery,
                    refetch,
                }) => {
                    if (loadingUserQuery) {
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

                    return (
                        <PatientDashboardView
                            dentistId={dentistId}
                            isDentist={get(dataUserQuery, 'getUser.isDentist')}
                            dentist={dentist}
                            isHost={get(dataUserQuery, 'getUser.isHost')}
                            offices={offices}
                            userId={id}
                            panel={getTextFromKey(params.selectedTab)}
                            refetch={refetch}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default PatientDashboardPage;
