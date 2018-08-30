import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { getOfficeQuery } from './queries';
import OfficeDetailsPageView from './view';
import { Loading } from '../../components';

class OfficeDeatilsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={getOfficeQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    const office = data.getOffice;

                    const mappedData = {
                        name: office.name,
                        imageUrls: [
                            'http://via.placeholder.com/186x186',
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

                    return <OfficeDetailsPageView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeDeatilsPageContainer;
