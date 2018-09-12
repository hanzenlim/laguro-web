import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { getOfficeQuery } from './queries';
import OfficeDetailsView from './view';
import { Box, Loading } from '../../../components';

class OfficeDetails extends PureComponent {
    render() {
        const { id } = this.props;

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

                    if (error) {
                        return <div>Error</div>;
                    }

                    const office = data.getOffice;

                    const mappedData = {
                        name: office.name,
                        imageUrls: [
                            'http://dental-care.dentistinhamilton-nj.com/wp-content/uploads/2015/12/2489226_xxl.jpg',
                            'http://via.placeholder.com/1000x1000',
                            'http://via.placeholder.com/500x500',
                        ],
                        // imageUrls: office.imageUrls,
                        // description: office.description,
                        description:
                            'lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames lorem ipsum blandit aptent phasellus viverra sollicitudin nostra netus fringilla, lobortis conubia eu auctor varius aliquam blandit faucibus donec, suspendisse nisl sapien turpis pretium diam arcu nostra, netus lectus faucibus rhoncus tellus ligula hendrerit vivamus. aenean hac ornare fermentum mi justo enim massa fames',
                        rating: 4,
                        reviewsCount: 84,
                        address: office.location,
                    };

                    return <OfficeDetailsView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeDetails;
