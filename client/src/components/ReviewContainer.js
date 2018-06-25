import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { REVIEWEE_ID } from '../util/strings';
import { Flex, Box } from './common';
import { Padding } from './common/Spacing';
import * as actions from '../actions';

const ReviewBox = styled(Box)`
    float: left;
`;

const ReviewNameDiv = styled(Box)`
    font-weight: bold;
`;

const ReviewContentDiv = styled(Box)`
    float: none;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

class ReviewContainer extends Component {
    renderEditButtons(id) {
        return (
            <Box
                height={33}
                p={1}
                className="red lighten-3 white-text pointer"
                onClick={() => {
                    this.deleteReview(id);
                }}
            >
                <i className="material-icons">delete_forever</i>
            </Box>
        );
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
                            <ReviewNameDiv fontSize={17}>
                                {review.reviewer.name}
                            </ReviewNameDiv>
                            <Padding bottom={10} />
                            <ReviewContentDiv
                                fontSize={14}
                                className="review-content"
                            >
                                {review.text}
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

    async deleteReview(id) {
        await this.props.deleteReview(id);
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
