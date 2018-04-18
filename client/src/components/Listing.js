import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

import ReservationOptions from './ReservationOptions';

class OfficeResultIndex extends Component {
  componentDidMount() {
    this.listing_id = this.props.match.params.id;
    this.office_id = this.props.match.params.office_id;

    this.props.getOneListing(this.listing_id);
    this.props.getOneOffice(this.office_id);
    this.props.fetchReviews(this.office_id);
  }

  renderEquipment(listing) {
    if (listing.equipment && listing.equipment.length) {
      return listing.equipment.map(equipment => (
        <li className="listingRow" key={equipment.name}>
          {equipment.name} - ${equipment.price}
        </li>
      ));
    } else {
      return <li className="listingRow">No Equipment Available</li>;
    }
  }

  renderStaff(listing) {
    if (listing.staff && listing.staff.length) {
      return listing.staff.map(staff => (
        <li className="listingRow" key={staff.role}>
          {staff.role} - ${staff.price} ({staff.count} available)
        </li>
      ));
    } else {
      return <li className="listingRow">No Staff Available</li>;
    }
  }

  renderImages(office) {
    if(office.img_url && office.img_url.length){
      return office.img_url.map(url => (
        <img className="officeImg" key={url} src={url} alt="office" />
      ));
    }
  }

  openModal(modal_id) {
    let modal = document.getElementById(modal_id);
    let modal_overlay = document.getElementById("modal-overlay");
    modal.classList.add("open");
    modal_overlay.classList.add("open");
  }

  closeModals() {
    let modals = document.getElementsByClassName("modal");
    let modal_overlay = document.getElementById("modal-overlay");
    for (var modal of modals) {
      modal.classList.remove("open");
    }
    modal_overlay.classList.remove("open");
  }

  render() {
    let { office, listing, reviews } = this.props;
    // if dentist still hasn't loaded, wait for render
    if (
      !office ||
      !listing ||
      Object.keys(office).length === 0 ||
      Object.keys(listing).length === 0
    ) {
      return <div>Loading...</div>;
    }

    // calculate avg rating
    if (reviews && reviews.length) {
      this.avg_rating =
        reviews
          .map(review => review.rating)
          .reduce((acc, rating) => acc + rating) / reviews.length;
      this.rating_count = reviews.length;
    } else {
      this.avg_rating = 0;
      this.rating_count = 0;
    }

    this.formatted_time =
      moment(listing.time_available).format("MMM D, h:mm a - ") +
      moment(listing.time_closed).format("h:mm a");

    return (
      <div className="listing">
        <div className="officeImgs">{this.renderImages(office)}</div>

        <div className="listingDetails">
          <div className="listingHeader">
            <div>
              <h3>{office.name}</h3>
              <h5>{office.location}</h5>
              <blockquote>
                <h6>Rental Window: {this.formatted_time}</h6>
                {listing.reserved_by ? (
                  <span className="red-text">
                    This listing has been reserved
                  </span>
                ) : (
                  ""
                )}
              </blockquote>
            </div>
            <Link
              className="btn light-blue lighten-2 waves-effect"
              to={"/offices/search"}
            >
              Go back to listings
            </Link>
          </div>

          <div className="availableRow">
            <div>
              <h5>Staff Available</h5>
              {this.renderStaff(listing)}
            </div>
            <div>
              <h5>Equipment Available</h5>
              {this.renderEquipment(listing)}
            </div>
          </div>

          <div>
            <h6>Cleaning Fee - ${listing.cleaning_fee}</h6>
            <h6>Rental Charge - 15%</h6>
          </div>
        </div>

        <div id="reservation_options" className="modal">
          <ReservationOptions listing={listing} office={office}/>
        </div>
        <div
          id="modal-overlay"
          onClick={() => {
            this.closeModals();
          }}
        />

        <div className="bookNow">
          <div className="content">
            <div>
              <p>
                ${listing.price} <small>hourly per chair</small>
              </p>
              <div className="rating">
                <ReactStars count={5} value={this.avg_rating} size={10} />
                <small>{`(${this.rating_count})`}</small>
              </div>
            </div>
            <button
              className="btn red lighten-2 waves-effect"
              onClick={() => this.openModal("reservation_options")}
              disabled={!!(listing.reserved_by)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    listing: state.listings.selected,
    office: state.offices.selected,
    reviews: state.reviews.selected,
    filters: state.filters
  };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
