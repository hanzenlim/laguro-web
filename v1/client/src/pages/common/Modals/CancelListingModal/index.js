import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';

import CancelListingModal from './view';
import { cancelListingMutation, getDentistIdQueryClient } from './queries';
import { getDentistQuery } from '../../HostListings/queries';

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
        return (
            <Query query={getDentistIdQueryClient}>
                {({ data: clientData }) => (
                    <Mutation
                        mutation={cancelListingMutation}
                        refetchQueries={refetchQueries(
                            clientData.activeUser.dentistId
                        )}
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
                )}
            </Query>
        );
    }
}

export default CancelListingContainer;
