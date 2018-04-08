import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactStars from "react-stars";
import moment from "moment";

class ReviewContainer extends Component {
  componentWillMount() {
    this.props.fetchReviews(this.props.reviewee_id);
  }

  renderEditButtons() {
    return(
      <div>
        <button
          type="button"
          className="btn-small red lighten-2"
          >
            <i className="material-icons">delete_forever</i>
          </button>
      </div>
    )
  }

  renderReviewList(reviews) {
    const id = this.props.auth.data._id;
    return reviews.map((review, index) => (
      <div key={index} className="review grey lighten-5">
        <div className="reviewer">
          <img src={review.reviewer_img} alt="reviewer" />
          <h6>{review.reviewer_name}</h6>
        </div>
        <div className="content">
          <ReactStars count={5} edit={false} value={review.rating} />
          <p>{review.text}</p>
          {id === review.reviewer_id ? (
            this.renderEditButtons()
          ) : (
            ""
          )}
        </div>
      </div>
    ));
  }

  render() {
    const { reviews, reviewee_name } = this.props;

    if (reviews && reviews.length === 0) {
      return <div>Be the first to review {reviewee_name}</div>;
    }

    return (
      <div>
        <h5>{"Reviews for " + reviewee_name}</h5>
        {this.renderReviewList(reviews)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reviews: state.reviews
  };
}

export default connect(mapStateToProps, actions)(ReviewContainer);
