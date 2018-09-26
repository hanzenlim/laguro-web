import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import HostListings from './view';
import CancelListingModal from '../Modals/CancelListingModal';
import { Loading } from '../../../components';

import { getDentistIdQueryClient, getDentistQuery } from './queries';

const HostListingsContainer = () => (
    <Query query={getDentistIdQueryClient}>
        {({ data: clientData }) => (
            <Query
                query={getDentistQuery}
                variables={{ id: clientData.activeUser.dentistId }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Error</div>;
                    if (loading) return <Loading />;

                    const { offices } = get(data, 'getDentist');
                    return <HostListingsView offices={offices} />;
                }}
            </Query>
        )}
    </Query>
);

class HostListingsView extends PureComponent {
    state = {
        isCancelModalOpen: false,
        listingId: null,
    };

    toggleCancelModalState = listingId => () =>
        this.setState(({ isCancelModalOpen }) => ({
            isCancelModalOpen: !isCancelModalOpen,
            listingId,
        }));

    render() {
        const { listingId, isCancelModalOpen } = this.state;
        return (
            <Fragment>
                <HostListings
                    offices={this.props.offices}
                    toggleCancelModalState={this.toggleCancelModalState}
                />

                <CancelListingModal
                    listingId={listingId}
                    visible={isCancelModalOpen}
                    toggleModalState={this.toggleCancelModalState(listingId)}
                />
            </Fragment>
        );
    }
}

export default HostListingsContainer;
