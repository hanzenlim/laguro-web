import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import * as actions from "../actions";

import OfficeResult from "./OfficeResult";
import FilterBar from "./FilterBar";
import ResultMap from "./ResultMap";

class OfficeResultIndex extends Component {
  componentWillMount() {
    document.title = "Laguro - Search Index";
    this.props.fetchListings();
    this.props.fetchOffices(this.props.filters);
    this.props.fetchAllReviews();
  }

  renderMap() {
    return (
      <ResultMap
        locations={this.props.offices}
        google={window.google}
        searchLocation={
          this.props.filters.location ? this.props.filters.location : null
        }
      />
    );
  }

  renderOfficeList() {
    const { reviews } = this.props;

    const filteredOffices = this.props.offices;
    const allListings = this.props.listings;

    let officeList = filteredOffices.map((office, index) => {
      //get all listings for this office
      let officeListings = allListings
        ? allListings.filter(listing => listing.office === office._id)
        : [];

      //extract the price and time for each listing
      let listings = officeListings.map(listing => {
        return {
          time: moment(listing.time_available),
          office_id: listing.office,
          id: listing._id
        };
      });

      listings = listings.sort((listing_a, listing_b) => {
        return moment(listing_a.time).isAfter(moment(listing_b.time));
      });

      // calculate avg rating
			if (reviews && reviews.length) {
        let officeReviews = reviews.filter(review => (review.reviewee_id === office._id))
				this.avg_rating =
					officeReviews.map(review => (review.rating)).reduce((acc, rating) => acc + rating) / officeReviews.length;
				this.rating_count = officeReviews.length;
			} else {
				this.avg_rating = 0;
				this.rating_count = 0;
			}

      return (
        <OfficeResult
          name={office.name}
          location={office.location}
          chairs={office.chairs}
          listings={listings}
          avg_rating={this.avg_rating}
          rating_count={this.rating_count}
          img={office.img_url[0]}
          office_id={office._id}
          index={index}
          key={office._id}
        />
      );
    });

    return officeList;
  }

  render() {
    if (this.props.invalid) {
      this.props.fetchOffices(this.props.filters);
    }

    if (this.props.isFetching) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <FilterBar />
        <div className="resultContainer">
          <div className="resultList">{this.renderOfficeList()}</div>
          <div className="map">{this.renderMap()}</div>
        </div>
      </div>
    );
  }
}

function getVisibleOffices(offices) {
  //remove any offices greater than 35 miles away
  //if no location filter, office.distance is undefined and !!(undefined > 35) == false
  let filteredOffices = offices.filter(office => {
    if (office.distance > 35) {
      return false;
    }

    return true;
  });

  //sort offices within range, allows their labels to reflect order
  return filteredOffices.sort((a, b) => a.distance - b.distance);
}

function mapStateToProps(state) {
  return {
    offices: getVisibleOffices(state.offices.all),
    isFetching: state.offices.isFetching,
    invalid: state.offices.invalid,
    listings: state.listings.all.data,
    reviews: state.reviews,
    filters: state.filters
  };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
