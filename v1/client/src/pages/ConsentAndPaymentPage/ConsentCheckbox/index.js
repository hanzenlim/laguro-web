import React from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import { getDentistQuery } from './queries';
import ConsentCheckboxView from './view';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

const ConsentCheckbox = props => {
    const { dentistId, hasConsented, onClickCheckbox } = props;

    return (
        <Query query={getDentistQuery} variables={{ id: dentistId }}>
            {({ loading, error, data }) => {
                if (loading) return null;
                if (error) return <RedirectErrorPage />;

                const dentist = _get(data, 'getDentist.user');
                if (!dentist) return null;

                const dentistName = `Dr. ${dentist.firstName} ${
                    dentist.lastName
                }`;

                return (
                    <ConsentCheckboxView
                        onClickCheckbox={onClickCheckbox}
                        hasConsented={hasConsented}
                        dentistName={dentistName}
                    />
                );
            }}
        </Query>
    );
};

export default ConsentCheckbox;
