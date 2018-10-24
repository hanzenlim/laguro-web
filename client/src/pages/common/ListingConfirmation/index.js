import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import ListingConfirmationView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { getOfficeQuery } from './queries';
import { renderPrice } from '../../../util/paymentUtil';

const mapListings = (listings, equipment) =>
    listings.map(
        ({
            id,
            availability: { startDay, endDay },
            numChairsAvailable,
            cleaningFee,
            chairHourlyPrice,
            localStartTime,
            localEndTime,
        }) => {
            const startDate = localStartTime;
            const endDate = localEndTime;
            const formattedStartTime = moment(startDate).format('hA');
            const formattedEndTime = moment(endDate).format('hA');
            const formattedStartDay = moment(startDay).format('MMM. D, YYYY');
            const formattedEndDay = moment(endDay).format('MMM. D, YYYY');

            const formattedAvailability = `${formattedStartDay} - ${formattedEndDay}, ${formattedStartTime} - ${formattedEndTime}`;
            return {
                id,
                availability: formattedAvailability,
                cleaningFee: renderPrice(cleaningFee),
                equipments: equipment.map(item => item.name),
                numChairsAvailable,
                chairHourlyPrice: renderPrice(chairHourlyPrice),
            };
        }
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
