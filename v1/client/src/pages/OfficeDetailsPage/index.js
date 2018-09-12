import React, { PureComponent } from 'react';
import get from 'lodash/get';
import { Query } from 'react-apollo';
import { getOfficeImageQuery } from './queries';
import OfficeDetailsPageView from './view';
import { Loading } from '../../components';

class OfficeDeatilsPageContainer extends PureComponent {
    render() {
        const { id } = this.props.match.params;

        return (
            <Query query={getOfficeImageQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
                    }

                    if (error) {
                        return <div>Error</div>;
                    }
                    return (
                        <OfficeDetailsPageView
                            imageUrls={get(data, 'getOffice.imageUrls')}
                            id={id}
                        />
                    );
                }}
            </Query>
        );
    }
}

export default OfficeDeatilsPageContainer;
