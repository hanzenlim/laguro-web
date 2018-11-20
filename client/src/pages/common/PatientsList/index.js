import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import moment from 'moment';

import PatientsList from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import {
    getDentistIdQueryClient,
    getPatientsQuery,
    getFileStackPolicySignatureQuery,
} from './queries';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';

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
            imageUrl: imageUrl || defaultUserImage,
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
            patient.name.includes(searchString)
        );
        return this.setState({ filteredPatients });
    };

    render() {
        return (
            <Query
                query={getFileStackPolicySignatureQuery}
                variables={{
                    type: 'upload',
                }}
            >
                {({ data: filestackData }) => (
                    <Query query={getDentistIdQueryClient}>
                        {({ data: clientData }) => (
                            <Query
                                query={getPatientsQuery}
                                variables={{
                                    id: clientData.activeUser.dentistId,
                                }}
                            >
                                {({ loading, error, data }) => {
                                    if (error) return <RedirectErrorPage />;
                                    if (loading) return <Loading />;

                                    const { patients } = get(
                                        data,
                                        'getDentist'
                                    );
                                    const mappedPatients = mapPatients(
                                        patients
                                    );

                                    const { filteredPatients } = this.state;
                                    const uploadPolicySignature =
                                        filestackData.getFileStackPolicySignature;

                                    return (
                                        <PatientsList
                                            uploadPolicySignature={
                                                uploadPolicySignature
                                            }
                                            dentistId={
                                                clientData.activeUser.dentistId
                                            }
                                            patients={
                                                filteredPatients ||
                                                mappedPatients
                                            }
                                            onFilterPatients={
                                                this.onFilterPatients
                                            }
                                        />
                                    );
                                }}
                            </Query>
                        )}
                    </Query>
                )}
            </Query>
        );
    }
}

export default PatientsListContainer;
