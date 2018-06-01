import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { REVIEWEE_ID } from '../util/strings';

import * as actions from '../actions';

const ReviewDiv = styled.div`
    float: left;
    font-size: 13px;
`;

const ReviewNameDiv = styled.div`
    font-weight: bold;
    margin-top: 3%;
    margin-bottom: 3%;
    font-size: 17px;
`;

const ReviewContentDiv = styled.div`
    float: none;
    font-weight: 500;
    font-size: 14px;
`;

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
        const reviewPerRow = window.innerWidth >= 601 ? 3 : 2;

        return reviews.slice(0,this.props.rows * reviewPerRow).map((review, index) => (
            <Grid item xs={6} sm={4} key={index}>
                <ReviewDiv>
                    <ReviewNameDiv> {review.reviewer_name} </ReviewNameDiv>
                    <ReviewContentDiv> {review.text} </ReviewContentDiv>

                    <ReactStars
                        count={5}
                        edit={false}
                        size={15}
                        value={review.rating}
                    />

                </ReviewDiv>
            </Grid>
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
                    <Grid container spacing={40}> {this.renderReviewList(reviews)} </Grid>
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
