import React, { PureComponent } from 'react';
import { compose, Query, withApollo, graphql } from 'react-apollo';
import { NewAppointment as NewAppointmentView } from '@laguro/the-bright-side-components';
import _get from 'lodash/get';

import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import {
    getDentistIdQueryClient,
    getDentistQuery,
    requestAppointmentMutation,
} from './queries';

class NewAppointment extends PureComponent {
    onSubmit = async (values, refetchFormData) => {
        const { reservationId } = values;
        const { patientId } = values;
        const localStartTime = values.startTime;
        const localEndTime = values.endTime;
        const { notes } = values;

        const result = await this.props.requestAppointment({
            variables: {
                input: {
                    reservationId,
                    patientId,
                    localStartTime,
                    localEndTime,
                    notes,
                },
            },
        });

        if (result) {
            // Closes the form
            if (this.props.onClose) {
                this.props.onClose();
            }

            window.scrollTo(0, 0);
        }

        // Refetch the form data
        refetchFormData();

        // Calls the refetch function to refetch the data for big calendar.
        if (this.props.refetch) {
            this.props.refetch();
        }
    };

    render() {
        return (
            <Query query={getDentistIdQueryClient}>
                {({ loading: loadingOne, data: clientData }) => (
                    <Query
                        query={getDentistQuery}
                        variables={{
                            id: clientData.activeUser.dentistId,
                        }}
                    >
                        {({ loading: loadingTwo, error, data, refetch }) => {
                            if (error) return <RedirectErrorPage />;
                            if (loadingOne || loadingTwo) return <Loading />;

                            const { patients } = _get(data, 'getDentist');

                            const patientsNameMap = patients.map(value => {
                                const key = value.id;
                                const fullName = `${value.firstName} ${
                                    value.lastName
                                }`;

                                return {
                                    key,
                                    fullName,
                                };
                            });

                            return (
                                <NewAppointmentView
                                    data={_get(data, 'getDentist.reservations')}
                                    firstAppointmentDuration={_get(
                                        data,
                                        'getDentist.firstAppointmentDuration'
                                    )}
                                    patientsName={patientsNameMap}
                                    onSubmit={values => {
                                        this.onSubmit(values, refetch);
                                    }}
                                    onClose={this.props.onClose}
                                />
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default compose(
    withApollo,
    graphql(requestAppointmentMutation, {
        name: 'requestAppointment',
    })
)(NewAppointment);
