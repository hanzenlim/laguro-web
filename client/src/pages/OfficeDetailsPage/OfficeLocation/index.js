import React from 'react';
import { Query } from 'react-apollo';

import { Loading } from '../../../components';
import OfficeLocationView from './view';
import { getOfficeQuery } from '../../common/OfficeDetails/queries';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

const OfficeLocation = ({ id }) => {
    return (
        <Query query={getOfficeQuery} variables={{ id }}>
            {({ loading, error, data }) => {
                if (loading) {
                    return <Loading />;
                }

                if (error) {
                    return <RedirectErrorPage />;
                }

                const office = data.getOffice;

                const mappedData = {
                    officeName: office.name,
                    imageUrls: office.imageUrls,
                    address: office.location,
                };

                return (
                    <OfficeLocationView data={mappedData} />
                );
            }}
        </Query>
    )
}

export default OfficeLocation;