import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { Query } from 'react-apollo';

import ReviewList from './view';
import { Loading } from '../../../components';
import { getDentistReviews, getOfficeReviews } from './queries';
import { DENTIST } from '../../../util/strings';

class ReviewContainer extends PureComponent {
    render() {
        const {
            type,
            match: {
                params: { id },
            },
        } = this.props;
        const reviewsQuery =
            type === DENTIST ? getDentistReviews : getOfficeReviews;
        const queryName = type === DENTIST ? 'getDentist' : 'getOffice';

        return (
            <Query query={reviewsQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Error</div>;
                    if (loading) return <Loading />;
                    return <ReviewList reviews={data[queryName].reviews} />;
                }}
            </Query>
        );
    }
}

ReviewContainer.propType = {
    match: shape({
        params: shape({ id: string }),
    }).isRequired,
    type: string.isRequired,
};

export default withRouter(ReviewContainer);
