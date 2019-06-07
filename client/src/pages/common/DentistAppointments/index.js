import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import DentistAppointments from './view';
import CancelReservationModal from '../Modals/CancelReservationModal';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { getDentistQuery } from './queries';
import { getUser } from '../../../util/authUtils';

const DentistAppointmentsContainer = () => (
    <Query
        query={getDentistQuery}
        fetchPolicy="cache-and-network"
        variables={{ id: get(getUser(), 'dentistId') }}
    >
        {({ loading, error, data }) => {
            if (error) return <RedirectErrorPage />;
            if (loading) return <Loading />;

            const { reservations } = get(data, 'getDentist');
            return <DentistAppointmentsView reservations={reservations} />;
        }}
    </Query>
);

class DentistAppointmentsView extends PureComponent {
    state = {
        isModalOpen: false,
        reservationId: null,
    };

    toggleModalState = reservationId => () =>
        this.setState(({ isModalOpen }) => ({
            isModalOpen: !isModalOpen,
            reservationId,
        }));

    render() {
        const { reservationId, isModalOpen } = this.state;
        return (
            <Fragment>
                <DentistAppointments
                    reservations={this.props.reservations}
                    toggleModalState={this.toggleModalState}
                />
                <CancelReservationModal
                    reservationId={reservationId}
                    visible={isModalOpen}
                    toggleModalState={this.toggleModalState(reservationId)}
                />
            </Fragment>
        );
    }
}

export default DentistAppointmentsContainer;
