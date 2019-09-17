import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import moment from 'moment';
import get from 'lodash/get';

import DentistDashboard from './view';
import { Loading } from '../../../components';
import CancelAppoinmentModal from '../Modals/CancelAppointmentModal';
import { RedirectErrorPage } from '../../GeneralErrorPage';

import { getAppointmentsQuery } from './queries';
import { DENTIST_ID } from '../../../util/strings';
import { getUser } from '../../../util/authUtils';

const DentistDashboardContainer = () => {
    const user = getUser();
    return (
        <Query
            query={getAppointmentsQuery}
            fetchPolicy="cache-and-network"
            variables={{
                input: {
                    partitionKey: DENTIST_ID,
                    partitionValue: get(user, 'dentistId'),
                },
            }}
        >
            {({ loading, error, data, refetch }) => {
                if (error) return <RedirectErrorPage />;
                if (loading) return <Loading />;

                const appointments = get(data, 'queryAppointments').sort(
                    (a, b) => {
                        const startTimeA = moment(a.startTime);
                        const startTimeB = moment(b.startTime);

                        return startTimeB.diff(startTimeA);
                    }
                );

                return (
                    <DentistDashboardView
                        appointments={appointments}
                        refetch={refetch}
                    />
                );
            }}
        </Query>
    );
};

class DentistDashboardView extends PureComponent {
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
                <DentistDashboard
                    appointments={this.props.appointments}
                    toggleModalState={this.toggleModalState}
                />
                <CancelAppoinmentModal
                    id={appointmentId}
                    visible={isModalOpen}
                    toggleModalState={this.toggleModalState(appointmentId)}
                    refetch={this.props.refetch}
                />
            </Fragment>
        );
    }
}

export default DentistDashboardContainer;
