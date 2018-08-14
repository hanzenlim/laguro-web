import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { getActiveOfficesQuery } from './queries';

class HomePage extends Component {
    render () {
        return (
            <Query query={getActiveOfficesQuery}>
                {({ loading, error, data }) => {

                    if(loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    return (
                        <div>
                            <div>Home page</div>
                            <div>{JSON.stringify(data.getActiveOffices[0])}</div>
                        </div>
                    )
                }}
            </Query>
        )
    }

}

export default HomePage;
