import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { getActiveOfficesQuery } from './queries';
import SearchResultsListView from './view';

class SearchResultsListContainer extends PureComponent {
    // Add data manipulation and formatting here
    // just how recompose map props works
    // so that we don't send too many props in our view component

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
                        <SearchResultsListView data={data.getActiveOffices} />
                    );
                }}
            </Query>
        );
    }
}

export default SearchResultsListContainer;
