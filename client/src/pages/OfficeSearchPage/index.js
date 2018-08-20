import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { getActiveOfficesQuery } from './queries';
import OfficeSearchPageView from './view';

class OfficeSearchPageContainer extends PureComponent {
    render() {
        return (
            <Query query={getActiveOfficesQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    console.log(222, data);

                    const mappedData = data.getActiveOffices.map(item => ({
                        title: item.name,
                        rating: 2.5,
                        image: 'http://via.placeholder.com/186x186',
                        address: item.location,
                        subtitle: 'dental emergency',
                    }));

                    return <OfficeSearchPageView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeSearchPageContainer;
