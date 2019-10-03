import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { getOfficeQuery } from './queries';
import OfficeDetailsView from './view';
import { Box, Loading } from '~/components';
import { RedirectErrorPage } from '~/routes/GeneralErrorPage';

class OfficeDetails extends PureComponent {
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            window.scrollTo(0, 0);
        }
    }

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
                        return <RedirectErrorPage />;
                    }

                    const office = data.getOffice;

                    const mappedData = {
                        officeName: office.name,
                        imageUrls: office.imageUrls,
                        description: office.description,
                        rating: office.averageRating,
                        numReviews: office.numReviews,
                        address: office.location,
                        equipments: office.equipment,
                    };

                    return <OfficeDetailsView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeDetails;
