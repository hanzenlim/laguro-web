import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from "../actions";
import keys from "../config/keys";
import moment from "moment";
import ReviewContainer from "./ReviewContainer";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dentist: {},
      offices: []
    };
  }

  componentWillMount() {
    document.title = "Laguro - Profile";

    this.getDentist().then(dentist => {
      this.setState({ dentist: dentist });

      if (dentist) {
        this.props.fetchReviews(dentist._id);
      }
    });

    this.props.fetchOffices();

    this.props.fetchListings();
  }

  // get all dentists and find the dentist profile that matches logged in user
  async getDentist() {
    await this.props.fetchDentists();

    const { dentists, auth } = this.props;
    if (dentists.length) {
      const dentist = dentists.filter(dentist => dentist.user_id === auth._id);
      return dentist[0];
    } else {
      return {};
    }
  }

  renderProfileDetails() {
    const { auth } = this.props;
    const { dentist } = this.state;

    return (
      <div>
        <h4>Welcome back {dentist ? dentist.name : auth.name}!</h4>
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
    if (listings) {
      let filteredListings = listings.filter(
        listing => listing.office === office._id
      );

      filteredListings = filteredListings.sort((listing_a, listing_b) => {
        return moment(listing_a.time_available).isAfter(
          moment(listing_b.time_available)
        );
      });

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
    } else {
      userOffices = [];
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
    const { dentist } = this.state;
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
            apikey={keys.filestack}
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

  renderOptions = (max) => {
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

  updateAppts(event){
    this.props.editListing({id: event.target.dataset.id, appts_per_hour: event.target.value})
  }

  renderReservations() {
    const { listings, auth } = this.props;

    let userListings = [];

    if (listings && listings.length) {
      userListings = listings.filter(
        listing => listing.reserved_by === auth._id
      );
    }

    return userListings.map((listing, index) => (
      <div key={index} className="reservation card-panel grey lighten-5">
        <Link
          className="blue-text text-darken-2"
          to={`/offices/${listing.office}`}
        >
          <div className="office_detail">
            <img src={listing.office_img} alt="office" />
            <h6>{listing.office_name}</h6>
          </div>
        </Link>
        <div className="content">
          <div className="top-bar">
            <Link
              className="blue-text text-darken-2"
              to={`/offices/${listing.office}/listings/${listing._id}`}
            >
              <p>
                {moment(listing.time_available).format("MMM D, h:mm - ")}
                {moment(listing.time_closed).format("h:mm a")}
              </p>
            </Link>
          </div>
            <select data-id={listing._id} defaultValue={listing.appts_per_hour} onChange={this.updateAppts.bind(this)} style={{ display: "block", width: "50%", margin: "4px 0" }}>
              {this.renderOptions(2)}
            </select>
            <sub>Apts/Hr</sub>
        </div>
      </div>
    ));
  }

  render() {
    const { auth, reviews } = this.props;
    const { dentist } = this.state;
    // if dentist still hasn't loaded, wait for render
    if (!dentist || Object.keys(dentist).length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile_container">
        <div className="sidebar">
          <img
            className="profile_img"
            src={dentist ? dentist.img_url : auth.img}
            alt="user"
          />
          {this.renderActions()}
        </div>
        <div className="main">
          {this.renderProfileDetails()}
          {dentist ? (
            <div className="offices profile-section">
              <h5>Offices</h5>
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
    auth: state.auth.data,
    dentists: state.dentists.dentists,
    offices: state.offices.all,
    listings: state.listings.all.data,
    reviews: state.reviews.selected
  };
}
export default connect(mapStateToProps, actions)(Profile);
