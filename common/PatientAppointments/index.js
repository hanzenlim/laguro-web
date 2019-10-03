import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import moment from 'moment';
import get from 'lodash/get';

import PatientAppoinments from './view';
import { Loading } from '~/components';
import CancelAppoinmentModal from '../Modals/CancelAppointmentModal';
import RedirectErrorPage from '~routes//GeneralErrorPage';

import { getAppointmentsQuery } from './queries';
import { getUser } from '~/util/authUtils';

const PatientAppoinmentsContainer = props => {
    const user = props.user || getUser();
    return (
        <Query
            query={getAppointmentsQuery}
            fetchPolicy="cache-and-network"
            variables={{
                id: get(user, 'id'),
            }}
        >
            {({ loading, error, data, refetch }) => {
                if (error) return <RedirectErrorPage />;
                if (loading) return <Loading />;

                const members = get(data, 'getUser.family.members', []);

                const appointments = members
                    .reduce(
                        (mergedAppointments, currentMember) => [
                            ...mergedAppointments,
                            ...currentMember.appointments,
                        ],
                        []
                    )
                    .sort((a, b) => {
                        const startTimeA = moment(a.startTime);
                        const startTimeB = moment(b.startTime);

                        return startTimeB.diff(startTimeA);
                    });

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
                    refetch={this.props.refetch}
                />
            </Fragment>
        );
    }
}

PatientAppoinmentsContainer.propTypes = {
    user: PropTypes.shape({}),
};

PatientAppoinmentsView.propTypes = {
    refetch: PropTypes.func.isRequired,
    appointments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            patient: PropTypes.shape({
                id: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                imageUrl: PropTypes.string,
            }),
            dentist: PropTypes.shape({
                id: PropTypes.string,
                user: PropTypes.shape({
                    id: PropTypes.string,
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                    imageUrl: PropTypes.string,
                }),
            }),
            office: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                location: PropTypes.shape({
                    name: PropTypes.string,
                }),
            }),
            startTime: PropTypes.string,
            endTime: PropTypes.string,
            localStartTime: PropTypes.string,
            localEndTime: PropTypes.string,
            status: PropTypes.string,
        })
    ),
};

export default PatientAppoinmentsContainer;
