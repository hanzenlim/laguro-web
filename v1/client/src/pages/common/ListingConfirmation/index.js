import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import moment from 'moment';
import queryString from 'query-string';
import ListingConfirmationView from './view';
import { Loading } from '../../../components';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { getOfficeQuery } from './queries';
import { renderPrice } from '../../../util/paymentUtil';

const mapListings = (listings, equipment) =>
    listings.map(
        ({
            id,
            availability: { startTime, endTime, startDay, endDay },
            numChairsAvailable,
            cleaningFee,
            chairHourlyPrice,
        }) => {
            const startDate = `${startDay}T${startTime}`;
            const endDate = `${endDay}T${endTime}`;
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
        const historyLocationSearch = queryString.parse(
            get(this.props, 'location.search')
        );

        const { officeId: id } = historyLocationSearch;
        return (
            <Query query={getOfficeQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const { name, location, listings, equipment } = get(
                        data,
                        'getOffice'
                    );

                    const mappedListings = mapListings(listings, equipment);

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
