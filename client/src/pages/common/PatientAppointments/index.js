import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import get from 'lodash/get';

import PatientAppoinments from './view';
import { Loading } from '../../../components';
import CancelAppoinmentModal from '../Modals/CancelAppointmentModal';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { getAppointmentsQuery, getPatientIdQueryClient } from './queries';
import { PATIENT_ID, END_TIME, STATUS, ACTIVE } from '../../../util/strings';

const PatientAppoinmentsContainer = () => (
    <Query query={getPatientIdQueryClient}>
        {({ data: clientData }) => (
            <Query
                query={getAppointmentsQuery}
                fetchPolicy="cache-and-network"
                variables={{
                    input: {
                        partitionKey: PATIENT_ID,
                        partitionValue: clientData.activeUser.id,
                        options: {
                            sortKey: `${END_TIME}`,
                            rangeStart: `${moment()
                                .startOf('days')
                                .format()}`,
                            filters: [
                                {
                                    filterKey: `${STATUS}`,
                                    filterValues: [`${ACTIVE}`],
                                },
                            ],
                        },
                    },
                }}
            >
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const appointments = get(data, 'queryAppointments');
                    return (
                        <PatientAppoinmentsView appointments={appointments} />
                    );
                }}
            </Query>
        )}
    </Query>
);

class PatientAppoinmentsView extends PureComponent {
    state = {
        isModalOpen: false,
        appointmentId: null,
    };

    toggleModalState = appointmentId => () =>
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen,
            appointmentId,
        }));

    render() {
        const { appointmentId, isModalOpen } = this.state;
        return (
            <Fragment>
                <PatientAppoinments
                    appointments={this.props.appointments}
                    toggleModalState={this.toggleModalState}
                />
                <CancelAppoinmentModal
                    id={appointmentId}
                    visible={isModalOpen}
                    toggleModalState={this.toggleModalState(appointmentId)}
                />
            </Fragment>
        );
    }
}

export default PatientAppoinmentsContainer;
