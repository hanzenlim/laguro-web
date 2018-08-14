import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { getActiveOfficesQuery } from './queries';

import FeaturedList from './FeaturedList';

// NOTE: Ideally, we should limit styled components here in HomePage/index.js file
// import { StyledWrapper } from './styles';

class HomePage extends Component {
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

                    return (
                        <Fragment>
                            <div>Home page</div>
                            <div>
                                {JSON.stringify(data.getActiveOffices[0])}
                            </div>
                            <FeaturedList />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default HomePage;
