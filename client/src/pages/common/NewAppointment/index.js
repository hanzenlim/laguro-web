import React, { PureComponent } from 'react';
import moment from 'moment';
import { message } from 'antd';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import NewAppointmentView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { appointmentClient } from '../../../util/apolloClients';

import { getDentistQuery, createAppointmentMutation } from './queries';
import { getUser } from '../../../util/authUtils';

class NewAppointment extends PureComponent {
    state = {
        showConfirmationMessage: false,
    };

    onSubmit = async (values, dentistId) => {
        const localStartTimeHour = moment(values.selectedStartTime).format(
            'HH'
        );
        const localStartTimeMinutes = moment(values.selectedStartTime).format(
            'mm'
        );
        const localEndTimeHour = moment(values.selectedEndTime).format('HH');
        const localEndTimeMinutes = moment(values.selectedEndTime).format('mm');

        try {
            const result = await appointmentClient.mutate({
                mutation: createAppointmentMutation,
                variables: {
                    input: {
                        officeId: values.dentalOfficeId,
                        dentistId,
                        patientId: values.selectedPatientId,
                        localStartTime: moment(values.selectedDate)
                            .hour(localStartTimeHour)
                            .minute(localStartTimeMinutes)
                            .format(),
                        localEndTime: moment(values.selectedDate)
                            .hour(localEndTimeHour)
                            .minute(localEndTimeMinutes)
                            .format(),
                    },
                },
            });

            if (result) {
                this.setState({
                    showConfirmationMessage: true,
                });

                window.scrollTo(0, 0);
            }
        } catch (error) {
            const errorMessage = error.graphQLErrors[0].message;

            message.error(errorMessage);
        }
    };

    render() {
        const user = getUser();
        return (
            <Query
                query={getDentistQuery}
                variables={{
                    id: _get(user, 'dentistId'),
                }}
            >
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const { patients } = _get(data, 'getDentist');
                    const dentistId = _get(data, 'getDentist.id');

                    const patientsNameMap = patients.map(value => {
                        const key = value.id;
                        const fullName = `${value.firstName} ${value.lastName}`;

                        return {
                            key,
                            fullName,
                        };
                    });

                    return (
                        <NewAppointmentView
                            preferredLocations={_get(
                                data,
                                'getDentist.preferredLocations'
                            )}
                            data={_get(data, 'getDentist')}
                            firstAppointmentDuration={_get(
                                data,
                                'getDentist.firstAppointmentDuration'
                            )}
                            showConfirmationMessage={
                                this.state.showConfirmationMessage
                            }
                            onMakeAnotherAppt={() => {
                                this.setState({
                                    showConfirmationMessage: false,
                                });
                            }}
                            patientsName={patientsNameMap}
                            onSubmit={values => {
                                this.onSubmit(values, dentistId);
                            }}
                            onClose={this.props.onClose}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default NewAppointment;
