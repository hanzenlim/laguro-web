import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import moment from 'moment';
import { REVIEWEE_ID } from '../util/strings';

import * as actions from '../actions';

class ReviewContainer extends Component {
    renderEditButtons(id) {
        return (
            <div>
                <button
                    type="button"
                    className="btn-small red lighten-2 delete"
                    onClick={() => {
                        this.deleteReview(id);
                    }}
                >
                    <i className="material-icons">delete_forever</i>
                </button>
            </div>
        );
    }

    renderReviewList(reviews) {
        if (!this.props.auth || !reviews) {
            return '';
        }

        const id = this.props.auth.id;
        return reviews.map((review, index) => (
            <div key={index} className="review card-panel grey lighten-5">
                <div className="reviewer">
                    <img src={review.reviewer.imageUrl} alt="reviewer" />
                    <h6>{review.reviewer_name}</h6>
                </div>

                <div className="content">
                    <div className="top-bar">
                        {moment(review.date_created).format('M/D/YY')}
                        <ReactStars
                            count={5}
                            edit={false}
                            value={review.rating}
                        />
                        {id === review.reviewer.id
                            ? this.renderEditButtons(review.id)
                            : ''}
                    </div>
                    <p>{review.text}</p>
                </div>
            </div>
        ));
    }

    async deleteReview(id) {
        await this.props.deleteReview(id);
        await this.props.queryReviews(REVIEWEE_ID, this.props.revieweeId);
    }

    render() {
        const { reviews, revieweeName } = this.props;
        const noExistingReviews = !reviews || reviews.length === 0;
        return (
            <div>
                {noExistingReviews ? (
                    <h6 className="blue-text text-darken-3">
                        No reviews yet for {revieweeName}, login to be the
                        first!
                    </h6>
                ) : (
                    this.renderReviewList(reviews)
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, actions)(ReviewContainer);
