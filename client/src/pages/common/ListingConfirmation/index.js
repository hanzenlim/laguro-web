import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import ListingConfirmationView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { getOfficeQuery } from './queries';
import { renderPrice } from '../../../util/paymentUtil';

const mapListings = (listings, equipment) =>
    listings.map(
        ({
            id,
            availability,
            numChairsAvailable,
            cleaningFee,
            chairHourlyPrice,
            localStartTime,
            localEndTime,
        }) => ({
            id,
            availability,
            cleaningFee: renderPrice(cleaningFee),
            equipments: equipment.map(item => item.name),
            numChairsAvailable,
            chairHourlyPrice: renderPrice(chairHourlyPrice),
            localStartTime,
            localEndTime,
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

                    const { name, location, listings, equipment } = get(
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
                            address={location.name}
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
