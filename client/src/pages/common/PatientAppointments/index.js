import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import get from 'lodash/get';

import PatientAppoinments from './view';
import { Loading } from '../../../components';
import CancelAppoinmentModal from '../Modals/CancelAppointmentModal';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

import { getAppointmentsQuery } from './queries';
import {
    PATIENT_ID,
    END_TIME,
    STATUS,
    PENDING_PATIENT_APPROVAL,
    ACTIVE,
} from '../../../util/strings';
import { getUser } from '../../../util/authUtils';

const PatientAppoinmentsContainer = () => {
    const user = getUser();
    return (
        <Query
            query={getAppointmentsQuery}
            fetchPolicy="cache-and-network"
            variables={{
                input: {
                    partitionKey: PATIENT_ID,
                    partitionValue: get(user, 'id'),
                    options: {
                        sortKey: `${END_TIME}`,
                        rangeStart: `${moment()
                            .startOf('days')
                            .format()}`,
                        filters: [
                            {
                                filterKey: `${STATUS}`,
                                filterValues: [
                                    `${PENDING_PATIENT_APPROVAL}`,
                                    `${ACTIVE}`,
                                ],
                            },
                        ],
                    },
                },
            }}
        >
            {({ loading, error, data, refetch }) => {
                if (error) return <RedirectErrorPage />;
                if (loading) return <Loading />;

                const appointments = get(data, 'queryAppointments');
                return (
                    <PatientAppoinmentsView
                        appointments={appointments}
                        refetch={refetch}
                    />
                );
            }}
        </Query>
    );
};

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
                    sideEffect={this.props.refetch}
                />
            </Fragment>
        );
    }
}

export default PatientAppoinmentsContainer;
