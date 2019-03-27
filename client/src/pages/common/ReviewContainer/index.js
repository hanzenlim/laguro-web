import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { Query } from 'react-apollo';

import ReviewContainerView from './view';
import { Loading, Modal } from '../../../components';
import NewReview from '../../common/NewReview';
import { RedirectErrorPage } from '../../../pages/GeneralErrorPage';
import { GET_DENTIST_REVIEWS, GET_OFFICE_REVIEWS } from './queries';
import { DENTIST } from '../../../util/strings';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';

class ReviewContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModalState = () => {
        const user = getUser();

        if (!user) {
            emitter.emit('loginModal');
        } else {
            this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
        }
    };

    render() {
        const { id, type, match } = this.props;

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
                    if (!queryData) return null;
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
                            <ReviewContainerView
                                numReviews={numReviews}
                                averageRating={averageRating}
                                reviews={reviews}
                                toggleModalState={this.toggleModalState}
                                viewOnly={this.props.viewOnly}
                                info={mappedData}
                                match={match}
                            />
                            {!this.props.viewOnly && (
                                <Fragment>
                                    <Modal
                                        visible={this.state.isModalOpen}
                                        onCancel={this.toggleModalState}
                                        destroyOnClose
                                    >
                                        <NewReview
                                            info={mappedData}
                                            toggleModalState={
                                                this.toggleModalState
                                            }
                                        />
                                    </Modal>
                                </Fragment>
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
