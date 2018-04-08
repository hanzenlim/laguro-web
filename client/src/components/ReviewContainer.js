import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ReactStars from "react-stars";
import moment from "moment";

class ReviewContainer extends Component {
  componentWillMount() {
    this.props.fetchReviews(this.props.reviewee_id);
  }

  renderEditButtons(id) {
    return (
      <div>
        <button
          type="button"
          className="btn-small red lighten-2 delete"
          onClick={() => this.props.deleteReview(id)}
        >
          <i className="material-icons">delete_forever</i>
        </button>
      </div>
    );
  }

  renderReviewList(reviews) {
    const id = this.props.auth.data._id;
    return reviews.map((review, index) => (
      <div key={index} className="review card-panel grey lighten-5">
        <div className="reviewer">
          <img src={review.reviewer_img} alt="reviewer" />
          <h6>{review.reviewer_name}</h6>
        </div>
        <div className="content">
          <div className="top-bar">
            {moment(review.date_created).format("M/D/YY")}
            <ReactStars count={5} edit={false} value={review.rating} />
            {id === review.reviewer_id
              ? this.renderEditButtons(review._id)
              : ""}
          </div>
          <p>{review.text}</p>
        </div>
      </div>
    ));
  }

  render() {
    const { reviews, reviewee_name } = this.props;

    let noExistingReviews = (reviews && reviews.length === 0);

    return (
      <div>
        {noExistingReviews ? (
          <h6 className="blue-text text-darken-3">No reviews yet for {reviewee_name}, login to be the first!</h6>
        ) : (
          this.renderReviewList(reviews)
        )}
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
