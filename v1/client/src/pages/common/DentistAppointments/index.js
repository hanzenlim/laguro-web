import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';

import DentistAppointments from './view';
import CancelReservationModal from '../Modals/CancelReservationModal';
import { Loading } from '../../../components';

import { getDentistIdQueryClient, getDentistQuery } from './queries';

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
            <Query query={getDentistIdQueryClient}>
                {({ data: clientData }) => (
                    <Query
                        query={getDentistQuery}
                        variables={{ id: clientData.activeUser.dentistId }}
                    >
                        {({ loading, error, data }) => {
                            if (error) return <div>Error</div>;
                            if (loading) return <Loading />;
                            return (
                                <Fragment>
                                    <DentistAppointments
                                        reservations={
                                            data.getDentist.reservations
                                        }
                                        toggleModalState={this.toggleModalState}
                                    />
                                    <CancelReservationModal
                                        visible={this.state.isModalOpen}
                                        onSubmit={this.onSubmit}
                                        onCancel={this.onCancel}
                                    />
                                </Fragment>
                            );
                        }}
                    </Query>
                )}
            </Query>
        );
    }
}

export default DentistAppointmentsContainer;
