import React, { PureComponent, Fragment } from 'react';

import DentistAppointments from './view';
import CancelReservationModal from '../Modals/CancelReservationModal';

class DentistAppointmentsContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModalState = () =>
        this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

    onSubmit = () => {
        // Do ok logic here
        this.toggleModalState();
    };

    onCancel = () => {
        // Do cancel logic here
        this.toggleModalState();
    };
    render() {
        return (
            <Fragment>
                <DentistAppointments toggleModalState={this.toggleModalState} />
                <CancelReservationModal
                    visible={this.state.isModalOpen}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </Fragment>
        );
    }
}

export default DentistAppointmentsContainer;
