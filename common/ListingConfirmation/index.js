import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import _get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import ListingConfirmationView from './view';
import { Loading } from '~/components';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';
import { getOfficeQuery } from './queries';
import { formatAddress } from '~/util/styleUtil';

const mapListings = (listings, equipment) =>
    listings.map(
        ({
            id,
            availability,
            numChairsAvailable,
            localStartTime,
            localEndTime,
            category,
        }) => ({
            id,
            availability,
            equipments: equipment.map(item => item.name),
            numChairsAvailable,
            localStartTime,
            localEndTime,
            category,
        })
    );

class ListingConfirmationContainer extends PureComponent {
    render() {
        const { officeId, listingIds } = this.props;

        return (
            <Query
                query={getOfficeQuery}
                fetchPolicy="network-only"
                variables={{ id: officeId }}
            >
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const { name, location, listings, equipment } = _get(
                        data,
                        'getOffice'
                    );

                    const addedListings = listings.filter(lng =>
                        listingIds.includes(lng.id)
                    );

                    const listingsToBeUsed = !isEmpty(addedListings)
                        ? addedListings
                        : listings;

                    const mappedListings = mapListings(
                        listingsToBeUsed,
                        equipment
                    );

                    return (
                        <ListingConfirmationView
                            name={name}
                            address={formatAddress(
                                _get(location, 'name'),
                                _get(location, 'addressDetails')
                            )}
                            listings={mappedListings}
                            equipment={equipment}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default ListingConfirmationContainer;
