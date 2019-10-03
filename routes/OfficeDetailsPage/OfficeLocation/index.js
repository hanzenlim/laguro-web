import React from 'react';
import { Query } from 'react-apollo';
import OfficeLocationView from './view';
import { getOfficeQuery } from '~/common/OfficeDetails/queries';
import { RedirectErrorPage } from '../../GeneralErrorPage';

const OfficeLocation = ({ id }) => (
    <Query query={getOfficeQuery} variables={{ id }}>
        {({ loading, error, data }) => {
            if (loading) {
                return null;
            }

            if (error) {
                return <RedirectErrorPage />;
            }

            const office = data.getOffice;

            const mappedData = {
                officeName: office.name,
                imageUrls: office.imageUrls,
                address: office.location,
                rating: office.averageRating,
            };

            return <OfficeLocationView data={mappedData} />;
        }}
    </Query>
);

export default OfficeLocation;
