import React, { PureComponent, Fragment, useContext } from 'react';
import { withRouter } from 'next/router';
import { shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import _flowRight from 'lodash/flowRight';

import ReviewContainerView from './view';
import { Loading, Modal } from '~/components';
import { withScreenSizes } from '~/components/Responsive';
import NewReview from '~/common/NewReview';
import RedirectErrorPage from '~/routes/GeneralErrorPage';
import { GET_DENTIST_REVIEWS, GET_OFFICE_REVIEWS } from './queries';
import { DENTIST } from '~/util/strings';
import { getUser } from '~/util/authUtils';
import { LoginContext } from '../../appContext';

const StyledModal = styled(Modal)`
    &.ant-modal {
        top: 0;
        margin: 0 auto;
        max-width: 100%;

        @media (min-width: ${props => props.theme.breakpoints[0]}) {
            top: 100px;
        }
    }
`;

class ReviewContainer extends PureComponent {
    state = {
        isModalOpen: false,
    };

    toggleModalState = () => {
        const user = getUser();

        if (!user) {
            this.props.openLoginModal();
        } else {
            this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
        }
    };

    render() {
        const { id, type, match, mobileOnly } = this.props;

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
                              name: `Dr. ${queryData.user.firstName} ${queryData.user.lastName}`,
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
                                    <StyledModal
                                        visible={this.state.isModalOpen}
                                        onCancel={this.toggleModalState}
                                        width={mobileOnly ? '100%' : 600}
                                        bodyStyle={{
                                            height: mobileOnly
                                                ? window.innerHeight
                                                : 600,
                                            overFlow: 'auto',
                                        }}
                                        destroyOnClose
                                    >
                                        <NewReview
                                            info={mappedData}
                                            toggleModalState={
                                                this.toggleModalState
                                            }
                                        />
                                    </StyledModal>
                                </Fragment>
                            )}
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

const EnhancedReviewContainer = props => {
    const { openLoginModal } = useContext(LoginContext);

    return <ReviewContainer {...props} openLoginModal={openLoginModal} />;
};

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

export default _flowRight(withRouter, withScreenSizes)(EnhancedReviewContainer);
