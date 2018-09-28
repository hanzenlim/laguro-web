import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { Query } from 'react-apollo';

import ReviewList from './view';
import { Loading } from '../../../components';
import { NewReviewModal } from '../../common/Modals';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { GET_DENTIST_REVIEWS, GET_OFFICE_REVIEWS } from './queries';
import { DENTIST } from '../../../util/strings';

class ReviewContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModalState = () =>
        this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));

    render() {
        const { id, type } = this.props;

        const isDentist = type === DENTIST;
        const reviewsQuery = isDentist
            ? GET_DENTIST_REVIEWS
            : GET_OFFICE_REVIEWS;
        const queryName = isDentist ? 'getDentist' : 'getOffice';

        return (
            <Query query={reviewsQuery} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (error) return <RedirectErrorPage />;
                    if (loading) return <Loading />;

                    const queryData = data[queryName];
                    const { reviews, numReviews, averageRating } = queryData;

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
                                numReviews={numReviews}
                                averageRating={averageRating}
                                reviews={reviews}
                                toggleModalState={this.toggleModalState}
                                viewOnly={this.props.viewOnly}
                            />
                            {!this.props.viewOnly && (
                                <NewReviewModal
                                    visible={this.state.isModalOpen}
                                    toggleModalState={this.toggleModalState}
                                    info={mappedData}
                                />
                            )}
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

ReviewContainer.defaultProps = {
    id: '',
    type: '',
    viewOnly: false,
};

export default withRouter(ReviewContainer);
