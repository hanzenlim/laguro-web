import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import { graphql, withApollo } from 'react-apollo';
import _get from 'lodash/get';
import compose from 'lodash/flowRight';

import NewReviewView from './view';

import { CREATE_REVIEW } from './queries';
import {
    GET_DENTIST_REVIEWS,
    GET_OFFICE_REVIEWS,
} from '../ReviewContainer/queries';
import { DENTIST } from '~/util/strings';
import { getUser } from '~/util/authUtils';
import { trackAddReview } from '~/util/trackingUtils';

class NewReview extends PureComponent {
    state = {
        rating: 0,
        error: '',
        mutationLoading: false,
    };

    setRating = rating => this.setState({ rating: Math.round(rating) });

    setErrorMessage = error => this.setState({ error });

    onCancel = () => {
        this.setErrorMessage('');
        this.setRating(0);
        this.props.toggleModalState();
    };

    onSuccess = async ({ text }) => {
        const user = getUser();
        const { mutate, info, router, contextId } = this.props;
        const { rating } = this.state;
        const reviewerId = _get(user, 'id');
        const revieweeId = contextId;
        const { type } = info;

        const input = {
            reviewerId,
            revieweeId,
            type,
            rating,
            text,
        };

        try {
            this.setState({ mutationLoading: true });
            const createReview = await mutate({
                variables: { input },
                refetchQueries: [
                    {
                        query:
                            info.type === DENTIST
                                ? GET_DENTIST_REVIEWS
                                : GET_OFFICE_REVIEWS,
                        variables: { id: contextId },
                    },
                ],
            });

            if (_get(createReview, 'data.createReview.id')) {
                if (trackAddReview) {
                    trackAddReview({
                        eventLabel:
                            type === DENTIST
                                ? 'Dentist Review'
                                : 'Office Review',
                    });
                }
            }

            this.setErrorMessage('');
            this.setRating(0);

            if (this.props.toggleModalState) {
                this.props.toggleModalState();
            }
        } catch (error) {
            this.setErrorMessage(error.graphQLErrors[0].message);
        } finally {
            this.setState({ mutationLoading: false });
        }
    };

    render() {
        const user = getUser();
        const { visible, toggleModalState } = this.props;
        if (!user && !visible) return null;
        if (!user && visible) {
            toggleModalState();
            return null;
        }
        return (
            <NewReviewView
                {...this.props}
                rating={this.state.rating}
                setRating={this.setRating}
                onSuccess={this.onSuccess}
                onCancel={this.onCancel}
                error={this.state.error}
                mutationLoading={this.state.mutationLoading}
            />
        );
    }
}

export default compose(
    withRouter,
    withApollo,
    graphql(CREATE_REVIEW)
)(NewReview);
