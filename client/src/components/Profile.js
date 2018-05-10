import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from "../actions";
import moment from "moment";
import ReviewContainer from "./ReviewContainer";
import { makeQuery, getUserQuery, getUserVariable } from "../util/clientDataLoader"
import isEmpty from 'lodash/isEmpty'
import cookies from 'browser-cookies';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offices: []
    };
  }

  componentWillMount() {
    this.getDentist().then(dentist => {
      this.props.fetchReviews(dentist._id);
    });

    this.props.fetchOffices();
    this.props.fetchListings();
    this.props.fetchUserReservations();
  }

  async getDentist() {
    const { getDentistByUser, auth } = this.props;
    await getDentistByUser(auth._id);

    const { dentist } = this.props;
    return dentist;
  }

  renderProfileDetails() {
    const { auth } = this.props;
    const { dentist } = this.props;

    return (
      <div>
        <h4>Welcome back {dentist ? dentist.name : auth.username}!</h4>
        <p>
          {(dentist && dentist.location ? dentist.location + " - " : "") +
            "Member since " +
            moment(auth.date_created).format("MMMM `YY")}
        </p>
      </div>
    );
  }

  getSortedListings(office) {
    const { listings } = this.props;
    if (listings && listings.length) {
      let filteredListings = listings.filter(
        listing => listing.office === office._id
      );

      filteredListings = filteredListings.sort((listing_a, listing_b) => {
        return moment(listing_a.time_available).isAfter(
          moment(listing_b.time_available)
        );
      });

      if (filteredListings.length === 0) {
        return (
          <li>
            <strong>No listings available</strong>
          </li>
        );
      }

      filteredListings = filteredListings.map((listing, index) => (
        <li className="profile_listing" key={index}>
          <div className="listing_content">
            <Link
              className="blue-text text-darken-2"
              to={`/offices/${listing.office}/listings/${listing._id}`}
            >
              <p>
                {moment(listing.time_available).format("MMM D, h:mm - ")}
                {moment(listing.time_closed).format("h:mm a")}
              </p>
            </Link>
            <div className="listing_btns">
              <Link
                className="btn-small light-blue lighten-2"
                to={`/offices/${listing.office}/listings/${listing._id}/edit`}
              >
                <i className="material-icons">edit</i>
              </Link>
              <button
                type="button"
                onClick={this.deleteListing.bind(this, listing)}
                className="btn-small red lighten-2"
              >
                <i className="material-icons">delete_forever</i>
              </button>
            </div>
          </div>
        </li>
      ));

      return filteredListings;
    } else {
      return [];
    }
  }

  deleteOffice(office) {
    // eslint-disable-next-line
    if (confirm(`Delete ${office.name} and all associated listings?`)) {
      this.props.deleteOffice(office._id);
    }
  }

  deleteListing(listing) {
    if (
      // eslint-disable-next-line
      confirm(
        `Delete listing for ${moment(listing.time_available).format(
          "MMM D, h a"
        )}?`
      )
    ) {
      this.props.deleteListing(listing._id);
    }
  }

  renderUserOffices() {
    const { offices, auth } = this.props;

    let userOffices = [];

    if (offices.length) {
      userOffices = offices.filter(office => office.user === auth._id);
    }

    if (!userOffices.length) {
      return (
        <div>
          {"No offices yet - "}
          <Link className="blue-text text-darken-2" to={`/offices/new`}>
            create a new office to begin hosting today
          </Link>
        </div>
      );
    }

    return userOffices.map((office, index) => {
      let officeListings = this.getSortedListings(office);

      return (
        <div className="office card-panel" key={index}>
          <div className="office_header">
            <Link
              className="blue-text text-darken-2"
              to={`/offices/${office._id}`}
            >
              <h5>{office.name}</h5>
            </Link>
            <div className="office_btns">
              <Link
                className="btn-small light-blue lighten-2 waves-effect"
                to={`/offices/${office._id}/edit`}
              >
                Edit Office
              </Link>
              <button
                type="button"
                onClick={this.deleteOffice.bind(this, office)}
                className="btn-small red lighten-2"
              >
                <i className="material-icons">delete_forever</i>
              </button>
            </div>
          </div>
          <p>{office.location}</p>
          <h6>Upcoming listings:</h6>
          <ul className="profile_listings browser-default">{officeListings}</ul>
        </div>
      );
    });
  }

  renderActions() {
    const { dentist } = this.props;
    let dentistProfileExists = dentist && Object.keys(dentist).length !== 0;

    return (
      <ul className="collection">
        {/* Display Create if no dentist profile or Edit if profile exists */}
        {dentistProfileExists ? (
          <Link className="link" to={"/dentist/edit"}>
            Edit Dentist Profile
          </Link>
        ) : (
          <Link className="link red-text" to={"/dentist/new"}>
            Create Dentist Profile
          </Link>
        )}

        {/* Hide image uploader if dentist profile exists (must edit photo thru dentist profile) */}
        {dentistProfileExists ? (
          ""
        ) : (
          <ReactFilestack
            apikey={"Aj4gwfCaTS2Am35P0QGrbz"}
            buttonText="Upload New Image"
            buttonClass="link"
            options={{
              accept: ["image/*"],
              imageMin: [300, 300],
              fromSources: [
                "local_file_system",
                "url",
                "imagesearch",
                "facebook",
                "instagram"
              ],
              storeTo: { container: "user-photos" }
            }}
            onSuccess={result => this.setNewProfileImage(result)}
          />
        )}

        {dentistProfileExists ? (
          <Link className="link" to={"/dentist/" + dentist._id}>
            View public profile
          </Link>
        ) : (
          ""
        )}

        {dentistProfileExists ? (
          <Link className="link" to={"/offices/new"}>
            Create a new office
          </Link>
        ) : (
          ""
        )}

        {dentistProfileExists ? (
          <Link className="link" to={"/listings/new"}>
            Create a new listing
          </Link>
        ) : (
          ""
        )}

        <Link className="link" to={"/offices/search"}>
          Browse listings
        </Link>
      </ul>
    );
  }

  setNewProfileImage(result) {
    let upload = result.filesUploaded[0];
    if (upload) {
      this.props.updateProfileImage(upload.url);
    }
  }

  renderOptions = max => {
    let options = [];
    for (let i = 0; i <= max; i++) {
      options.push(
        <option value={Number(i)} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  deleteReservation(reservation) {
    if (
      // eslint-disable-next-line
      confirm(
        `Delete reservation for ${moment(reservation.time_start).format(
          "MMM D, h a"
        )}?`
      )
    ) {
      this.props.deleteReservation(reservation._id);
    }
  }

  renderReservations() {
    const { reservations } = this.props;

    if (reservations.length === 0) {
      return (
        <div>
          <h6>
            {"No reservations yet - "}
            <Link className="blue-text text-darken-2" to={`/offices/search`}>
              search for new listings and make a reservation
            </Link>
          </h6>
        </div>
      );
    }

    return reservations.map((reservation, index) => (
      <div key={index} className="reservation card-panel grey lighten-5">
        <Link
          className="blue-text text-darken-2"
          to={`/offices/${reservation.office_id}`}
        >
          <div className="office_detail">
            <img src={reservation.office_img} alt="office" />
            <h6>{reservation.office_name}</h6>
          </div>
        </Link>
        <div className="content">
          <Link
            className="blue-text text-darken-2"
            to={`/offices/${reservation.office_id}/listings/${
              reservation.listing_id
            }`}
          >
            <p>
              {moment(reservation.time_start).format("MMM D, h:mm - ")}
              {moment(reservation.time_end).format("h:mm a")}
            </p>
          </Link>
          <h6
            onClick={this.deleteReservation.bind(this, reservation)}
            className="red-text valign-wrapper"
            style={{ cursor: "pointer" }}
          >
            <i className="material-icons" style={{ fontSize: "18px" }}>
              delete_forever
            </i>
            Cancel Reservation
          </h6>
        </div>
      </div>
    ));
  }

  render() {
    const { auth, reviews } = this.props;
    const { dentist, dentistLoading } = this.props;

    if(dentistLoading) return <div>Loading...</div>

    return (
      <div className="profile_container">
        <div className="sidebar">
          <img
            className="profile_img"
            src={!isEmpty(dentist) ? dentist.img_url : auth.imageUrl}
            // src={auth.imageUrl}
            alt="user"
          />
          {this.renderActions()}
        </div>
        <div className="main">
          {this.renderProfileDetails()}
          {dentist ? (
            <div className="offices profile-section">
              <h5>Your Offices</h5>
              {this.renderUserOffices()}
            </div>
          ) : (
            ""
          )}
          {dentist ? (
            <div className="offices profile-section">
              <h5>Upcoming Reservations</h5>
              {this.renderReservations()}
            </div>
          ) : (
            ""
          )}
          {dentist ? (
            <div className="reviews profile-section">
              <h5>{"Reviews for " + dentist.name}</h5>
              <ReviewContainer
                reviewee_id={dentist._id}
                reviewee_name={dentist.name}
                reviews={reviews}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.data.getUserByGoogleId,
    dentist: state.dentists.selectedDentist,
    dentistLoading: state.dentists.isFetching,
    reservations: state.reservations.selected,
    offices: state.offices.all,
    listings: state.listings.all,
    reviews: state.reviews.selected
  };
}
export default connect(mapStateToProps, actions)(Profile);
