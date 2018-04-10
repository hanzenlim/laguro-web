import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import * as actions from "../actions";
import NewReview from "./forms/NewReview";
import ReviewContainer from "./ReviewContainer";

class Profile extends Component {
  componentWillMount() {
    this.dentist_id = this.props.match.params.id;
		this.props.fetchReviews(this.dentist_id);

    this.getDentist().then(dentist => {
      document.title = `Laguro - ${dentist.name}`;
    });
  }

  // get dentist profile for id
  async getDentist() {
    await this.props.getOneDentist(this.dentist_id);
    const { dentist } = this.props;

    if (Object.keys(dentist).length) {
      return dentist;
    } else {
      return {};
    }
  }

  renderProfileDetails() {
    const { dentist } = this.props;

    return (
      <div>
        <h4>Hey, I'm {dentist ? dentist.name : ""}!</h4>
        <p>
          {(dentist && dentist.location ? dentist.location + " - " : "") +
            "Member since " +
            moment(dentist.date_created).format("MMMM `YY")}
        </p>
      </div>
    );
  }

  render() {
    const { dentist, auth, reviews } = this.props;
    // if dentist still hasn't loaded, wait for render
    if (Object.keys(dentist).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile_container">
        <div className="sidebar">
          <img
            className="profile_img"
            src={dentist ? dentist.img_url : ""}
            alt="user"
          />
        </div>
        <div className="main">
          {this.renderProfileDetails()}
          <Link
            className="btn light-blue lighten-2 waves-effect"
            to={"/dentists/search"}
          >
            Go back to dentists
          </Link>
					<div className="profile_section">
						<h5>{"Reviews for " + dentist.name}</h5>
						{/* if logged out, hide new review form */}
						{auth && auth.data ? <NewReview reviewee={dentist} /> : ""}
						<ReviewContainer
							reviewee_id={dentist._id}
							reviewee_name={dentist.name}
							reviews={reviews}
						/>
					</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    dentist: state.dentists.selectedDentist,
		reviews: state.reviews
  };
}
export default connect(mapStateToProps, actions)(Profile);
