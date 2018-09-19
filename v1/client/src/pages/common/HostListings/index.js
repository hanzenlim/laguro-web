import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';

import HostListings from './view';
import EditListingModal from '../Modals/EditListingModal';
import { Loading } from '../../../components';

import { getDentistIdQueryClient, getDentistQuery } from './queries';

class HostListingsContainer extends PureComponent {
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
                                    <HostListings
                                        offices={data.getDentist.offices}
                                        toggleModalState={this.toggleModalState}
                                    />
                                    <EditListingModal
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

export default HostListingsContainer;
