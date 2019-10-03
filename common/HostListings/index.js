import React, { Fragment, PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';

import HostListings from './view';
import CancelListingModal from '~/common/Modals/CancelListingModal';
import { Loading } from '~/components';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';

import { getDentistQuery } from './queries';
import { getUser } from '~/util/authUtils';

const HostListingsContainer = () => {
    const user = getUser();
    return (
        <Query
            query={getDentistQuery}
            variables={{ id: get(user, 'dentistId') }}
            fetchPolicy="cache-and-network"
        >
            {({ loading, error, data }) => {
                if (error) return <RedirectErrorPage />;
                if (loading) return <Loading />;

                const { offices } = get(data, 'getDentist');
                return <HostListingsView offices={offices} />;
            }}
        </Query>
    );
};

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
