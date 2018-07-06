import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { REVIEWEE_ID } from '../util/strings';
import { Flex, Box, Typography } from './common';
import { Padding } from './common/Spacing';
import * as actions from '../actions';

const ReviewBox = styled(Box)`
    float: left;
    max-width: 100%;
`;

const ReviewContentDiv = styled(Box)`
    float: none;
    font-weight: 500;
    overflow: hidden;
`;

class ReviewContainer extends Component {
    constructor() {
        super();
        this.state = { showMoreMap: {} };
    }

    componentWillReceiveProps(){
        const { reviews } = this.props;
        let showMoreMap = this.state.showMoreMap;

        for (let review in reviews) {
            showMoreMap[review.id] = false;
        }

        this.setState({ showMoreMap });
    }

    handleShowMoreReviewText = (e) => {
        let showMoreMap = this.state.showMoreMap;
        const { reviewid } = e.target.dataset;

        showMoreMap[reviewid] = true;

        this.setState({ showMoreMap });
    }

    renderEditButtons = (reviewid) => {
        return (
            <Box
                height={33}
                p={1}
                className="red lighten-3 white-text pointer"
                data-reviewid={reviewid}
                onClick={this.deleteReview}
            >
                <i className="material-icons">delete_forever</i>
            </Box>
        );
    }

    renderReviewText = (reviewId, reviewText) => {
        if (reviewText.length > 190) {
            return (
                <div>
                    {this.state.showMoreMap[reviewId] ? reviewText : reviewText.substring(0, 190).trim() + '...'}
                    {!this.state.showMoreMap[reviewId] && <a data-reviewid={reviewId} onClick={this.handleShowMoreReviewText}>Read more</a>}
                </div>)
        } else {
            return reviewText;
        }
    }

    renderReviewList(reviews) {
        const { auth } = this.props;
        if (!reviews) {
            return '';
        }
        const reviewPerRow = window.innerWidth >= 601 ? 3 : 2;

        return reviews
            .slice(0, this.props.rows * reviewPerRow)
            .map((review, index) => (
                <Grid item xs={6} sm={4} key={index}>
                    <Flex>
                        <ReviewBox fontSize={13}>
                            <Typography pr={1} fontSize={17} fontWeight={"bold"} truncate>
                                {review && review.reviewer && (review.reviewer.firstName + " " + review.reviewer.lastName)}
                            </Typography>
                            <Padding bottom={10} />
                            <ReviewContentDiv
                                fontSize={14}
                                className="review-content"
                                showMore={this.state.showMoreMap[review.id]}
                            >
                                {this.renderReviewText(review.id, review.text)}
                            </ReviewContentDiv>
                            <Padding bottom={10} />
                            <ReactStars
                                count={5}
                                edit={false}
                                size={15}
                                value={review.rating}
                            />
                        </ReviewBox>
                        {auth && auth.id === review.reviewer.id
                            ? this.renderEditButtons(review.id)
                            : null}
                    </Flex>
                </Grid>
            ));
    }

    deleteReview = async (e) => {
        const { reviewid } = e.currentTarget.dataset;
        await this.props.deleteReview(reviewid);
        await this.props.queryReviews(REVIEWEE_ID, this.props.revieweeId);
    }

    render() {
        const { reviews } = this.props;
        return (
            <div>
                <Grid container spacing={40}>
                    {this.renderReviewList(reviews)}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        reviews: state.reviews.all
    };
}

export default connect(mapStateToProps, actions)(ReviewContainer);
