import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { Query } from 'react-apollo';

import ReviewList from './view';
import { Loading } from '../../../components';
import { NewReviewModal } from '../../common/Modals';
import { GET_DENTIST_REVIEWS, GET_OFFICE_REVIEWS } from './queries';
import { DENTIST } from '../../../util/strings';

class ReviewContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModalState = () =>
        this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

    render() {
        const {
            type,
            match: {
                params: { id },
            },
        } = this.props;

        const isDentist = type === DENTIST;
        const reviewsQuery = isDentist
            ? GET_DENTIST_REVIEWS
            : GET_OFFICE_REVIEWS;
        const queryName = isDentist ? 'getDentist' : 'getOffice';

        return (
            <Query query={reviewsQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Error</div>;
                    if (loading) return <Loading />;

                    const queryData = data[queryName];

                    const mappedData = isDentist
                        ? {
                              type,
                              name: `Dr. ${queryData.user.firstName} ${
                                  queryData.user.lastName
                              }`,
                              imageUrl: queryData.user.imageUrl,
                              specialty: queryData.specialty,
                          }
                        : {
                              type,
                              name: queryData.name,
                              imageUrl: queryData.imageUrls[0],
                          };

                    return (
                        <Fragment>
                            <ReviewList
                                reviews={queryData.reviews}
                                toggleModalState={this.toggleModalState}
                            />
                            <NewReviewModal
                                visible={this.state.isModalOpen}
                                toggleModalState={this.toggleModalState}
                                info={mappedData}
                            />
                        </Fragment>
                    );
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
