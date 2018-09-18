import React, { Fragment, PureComponent } from 'react';
import HostListings from './view';
import EditListingModal from '../Modals/EditListingModal';

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
            <Fragment>
                <HostListings toggleModalState={this.toggleModalState} />
                <EditListingModal
                    visible={this.state.isModalOpen}
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                />
            </Fragment>
        );
    }
}

export default HostListingsContainer;
