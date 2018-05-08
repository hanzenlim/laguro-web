import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import * as materialize from "materialize-css/dist/js/materialize.js";

import * as actions from "../actions";
import NewReview from "./forms/NewReview";
import ReviewContainer from "./ReviewContainer";
import ApptDetails from "./ApptDetails";

class Profile extends Component {
  componentWillMount() {
    this.dentist_id = this.props.match.params.id;
    this.props.fetchReviews(this.dentist_id);
    this.props.fetchListings();

    this.getDentist().then(dentist => {
      document.title = `Laguro - ${dentist.name}`;
      this.dentist_user_id = dentist.user_id;
      this.props.fetchDentistReservations(this.dentist_user_id);
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

  componentDidUpdate() {
    var elements = document.getElementsByClassName("dropdown-trigger");
    for (var el of elements) {
      materialize.Dropdown.init(el, {
        coverTrigger: false,
        closeOnClick: false,
        constrainWidth: false
      });
    }
  }

  renderProcedures(procedures) {
    if (procedures.length) {
      return procedures.slice(0, 4).map(procedure => (
        <span
          key={procedure.name}
          className="badge white-text light-blue lighten-2"
          style={{float: "none", padding: "3px 8px", marginLeft: "0", marginRight: "10px"}}
        >
          {`${procedure.name} - ${procedure.duration} mins`}
        </span>
      ));
    } else {
      return <div />;
    }
  }

  renderProfileDetails() {
    const { dentist } = this.props;

    return (
      <div>
        <h4>Hey, I'm {dentist ? dentist.name : ""}!</h4>
        <div>{this.renderProcedures(dentist.procedures)}</div>
        <p>
          {(dentist && dentist.location ? dentist.location + " - " : "") +
            "Member since " +
            moment(dentist.date_created).format("MMMM `YY")}
        </p>
        <div className="rating">
          <ReactStars
            count={5}
            edit={false}
            size={18}
            value={this.avg_rating}
          />
          <span className="rating_count">{`${this.rating_count} Reviews`}</span>
        </div>
      </div>
    );
  }

  renderApptTimes(reservation) {
    const { auth, dentist } = this.props;
    const { appointments } = reservation;
    return appointments.map((appt, index) => (
      <div key={index}>
        {!appt.patient_id ? (
          <div>
            <a
              className="light-green-text text-accent-4 dropdown-trigger"
              style={{ cursor: "pointer" }}
              data-target={`dropdown${index}`}
              href={auth && auth.data ? "#" : "/auth/google"}
            >
              {/* If no patient has reserved this appt */}
              {`${moment(appt.time).format("h:mm a")} - Available!`}
            </a>
            <ul className="dropdown-content" id={`dropdown${index}`}>
              <ApptDetails
                appointments={appointments}
                procedures={dentist.procedures}
                appt={appt}
                auth={auth}
                index={index}
                reservation={reservation}
              />
            </ul>
          </div>
        ) : (
          <span
            className="grey-text"
            style={{
              textDecoration: "line-through",
              cursor: "not-allowed"
            }}
          >
            {/*If appt has already been reserved*/}
            {`${moment(appt.time).format("h:mm a")} - Reserved`}
          </span>
        )}
      </div>
    ));
  }

  renderReservations() {
    const { reservations } = this.props;

    return reservations.map((reservation, index) => (
      <div key={index} className="reservation card-panel grey lighten-5">
        <div className="office_detail">
          <img src={reservation.office_img} alt="office" />
          <h6>{reservation.office_name}</h6>
        </div>
        <div className="content">
          <div className="top-bar">
            <Link
              className="blue-text text-darken-2"
              to={`/offices/${reservation.office_id}`}
            >
              <p>
                {moment(reservation.time_start).format("MMM D, h:mm - ")}
                {moment(reservation.time_end).format("h:mm a")}
              </p>
            </Link>
          </div>
          <div>{this.renderApptTimes(reservation)}</div>
        </div>
      </div>
    ));
  }

  render() {
    const { dentist, auth, reviews } = this.props;
    // if dentist still hasn't loaded, wait for render
    if (!dentist || Object.keys(dentist).length === 0) {
      return <div>Loading...</div>;
    }
    // calculate avg rating
    if (reviews && reviews.length) {
      let dentistReviews = reviews.filter(
        review => review.reviewee_id === dentist._id
      );
      this.avg_rating =
        dentistReviews
          .map(review => review.rating)
          .reduce((acc, rating) => acc + rating, 0) / dentistReviews.length;
      this.rating_count = dentistReviews.length;
    } else {
      this.avg_rating = 0;
      this.rating_count = 0;
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
            <div className="offices">
              <h5>Upcoming Appointment Openings</h5>
              {this.renderReservations()}
            </div>
          </div>
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
    listings: state.listings.all,
    reservations: state.reservations.selected,
    dentist: state.dentists.selectedDentist,
    reviews: state.reviews.selected
  };
}
export default connect(mapStateToProps, actions)(Profile);
