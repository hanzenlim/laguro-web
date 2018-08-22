import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
// scanDentistsQuery is for testing purposes only
import { scanDentistsQuery } from './queries';
import DentistSearchPageView from './view';

class OfficeSearchPageContainer extends PureComponent {
    render() {
        return (
            <Query query={scanDentistsQuery}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }

                    const mappedData = data.scanDentists.map(item => ({
                        title: `${item.user.firstName} ${item.user.lastName}`,
                        rating: 2.5,
                        image: 'http://via.placeholder.com/186x186',
                        address: item.location,
                        subtitle: item.specialty,
                    }));

                    return <DentistSearchPageView data={mappedData} />;
                }}
            </Query>
        );
    }
}

export default OfficeSearchPageContainer;
