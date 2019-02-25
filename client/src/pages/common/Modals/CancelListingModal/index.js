import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import _get from 'lodash/get';

import CancelListingModal from './view';
import { cancelListingMutation } from './queries';
import { getDentistQuery } from '../../HostListings/queries';
import { getUser } from '../../../../util/authUtils';

const refetchQueries = id => [
    {
        query: getDentistQuery,
        variables: { id },
    },
];

class CancelListingContainer extends PureComponent {
    onCancel = () => {
        this.props.toggleModalState();
    };

    render() {
        const user = getUser();
        return (
            <Mutation
                mutation={cancelListingMutation}
                refetchQueries={refetchQueries(_get(user, 'id'))}
            >
                {(cancelListing, { loading }) => {
                    const onSubmit = async () => {
                        await cancelListing({
                            variables: {
                                input: {
                                    id: this.props.listingId,
                                },
                            },
                        });
                        this.props.toggleModalState();
                    };

                    return (
                        <CancelListingModal
                            visible={this.props.visible}
                            onCancel={this.onCancel}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    );
                }}
            </Mutation>
        );
    }
}

export default CancelListingContainer;
