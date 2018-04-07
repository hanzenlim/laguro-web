import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from "../actions";
import keys from "../config/keys";
import moment from "moment";

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
        <h4>Hey, I'm {dentist ? dentist.name : auth.name}!</h4>
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
            <p>
              {moment(listing.time_available).format("MMM D, h a - ")}
              {moment(listing.time_closed).format("h a")}
            </p>
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
    this.props.deleteListing(listing._id);
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
        <div className="office" key={index}>
          <div className="office_header">
            <h5>{office.name}</h5>
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

  render() {
    const { auth } = this.props;
    const { dentist } = this.state;
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
          <div className="offices">
            <h5>Offices:</h5>
            {this.renderUserOffices()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.data,
    dentists: state.dentists.dentists,
    offices: state.offices.offices,
    listings: state.listings.data
  };
}
export default connect(mapStateToProps, actions)(Profile);
