import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import moment from 'moment';

import PatientsList from './view';
import { Loading } from '~/components';
import RedirectErrorPage from '~/routes/GeneralErrorPage';
import { getPatientsQuery, getFileStackPolicySignatureQuery } from './queries';
import { getUser } from '~/util/authUtils';

const mapPatients = patients =>
    patients.map(
        ({
            id,
            firstName,
            lastName,
            imageUrl,
            appointments,
            patientImages,
        }) => ({
            id,
            name: `${firstName} ${lastName}`,
            visitDate: moment(
                appointments[appointments.length - 1].localStartTime
            ).format('hA MMM. D, YYYY'),
            imageUrl: imageUrl || '/static/images/defaultUserImage.svg',
            patientImages,
            hasNextAppointment: moment(
                appointments[appointments.length - 1].localStartTime
            ).isAfter(moment()),
        })
    );

class PatientsListContainer extends PureComponent {
    state = {
        filteredPatients: null,
    };

    onFilterPatients = patients => e => {
        const searchString = e.target.value;

        if (searchString === '')
            return this.setState({ filteredPatients: null });

        const filteredPatients = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchString.toLowerCase())
        );
        return this.setState({ filteredPatients });
    };

    render() {
        const user = getUser();

        return (
            <Query
                query={getFileStackPolicySignatureQuery}
                variables={{
                    type: 'upload',
                }}
            >
                {({ data: filestackData }) => (
                    <Query
                        query={getPatientsQuery}
                        variables={{
                            id: _get(user, 'dentistId'),
                        }}
                    >
                        {({ loading, error, data }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loading) return <Loading />;

                            const { patients } = _get(data, 'getDentist');
                            const mappedPatients = mapPatients(patients);

                            const { filteredPatients } = this.state;
                            const uploadPolicySignature =
                                filestackData.getFileStackPolicySignature;

                            return (
                                <PatientsList
                                    uploadPolicySignature={
                                        uploadPolicySignature
                                    }
                                    dentistId={user.dentistId}
                                    patients={
                                        filteredPatients || mappedPatients
                                    }
                                    onFilterPatients={this.onFilterPatients}
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default PatientsListContainer;
