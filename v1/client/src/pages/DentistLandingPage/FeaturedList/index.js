import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { isEmpty } from 'lodash';
import { getActiveOfficesQuery } from './queries';
import FeaturedListView from './view';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';

class FeaturedListContainer extends PureComponent {
    render() {
        return (
            <Query query={getActiveOfficesQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <RedirectErrorPage />;
                    }

                    const mappedData = data.getActiveOffices.map(item => ({
                        title: item.name,
                        rating: isEmpty(item.reviews)
                            ? 5
                            : item.reviews.reduce(
                                  (a, b) => a.rating + b.rating
                              ) / item.reviews.length,
                        image: item.imageUrls[0],
                        address: item.location,
                    }));

                    return <FeaturedListView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default FeaturedListContainer;
