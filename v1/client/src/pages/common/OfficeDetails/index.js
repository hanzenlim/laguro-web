import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { getOfficeQuery } from './queries';
import OfficeDetailsView from './view';
import { Box, Loading } from '../../../components';

class OfficeDetails extends PureComponent {
    render() {
        const { id, doneLoading } = this.props;

        return (
            <Query query={getOfficeQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return (
                            <Box minHeight="600px">
                                <Loading />
                            </Box>
                        );
                    }

                    // Notify parent container that it's done loading.
                    // This will trigger an event to load up the sticky side bar.
                    if (doneLoading) {
                        doneLoading();
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    const office = data.getOffice;
                    const {
                        name,
                        imageUrls,
                        description,
                        totalRating,
                        numReviews,
                    } = office;

                    const mappedData = {
                        name: office.name,
                        imageUrls: office.imageUrls,
                        description: office.description,
                        rating: office.averageRating,
                        numReviews: office.numReviews,
                        address: office.location,
                    };

                    return <OfficeDetailsView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeDetails;
