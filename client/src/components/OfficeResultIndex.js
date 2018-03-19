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
		const filteredOffices = this.props.offices;
		const allListings = this.props.listings;

		let officeList = filteredOffices.map(office => {
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

			//average the ratings
			let avg_rating =
				office.rating.length > 0
					? office.rating.reduce((acc, val) => acc + val) / office.rating.length
					: null;

			return (
				<OfficeResult
					name={office.name}
					location={office.location}
					chairs={office.chairs}
					listings={listings}
					rating_value={avg_rating}
					rating_count={office.rating.length}
					img={office.img_url[0]}
					key={office._id}
				/>
			);
		});

		return officeList;
	}

	render() {
		if (this.props.invalid) {
			this.props.fetchOffices(this.props.filters)
		}

		if (this.props.isFetching) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<FilterBar />
				<div className="resultContainer">
					<div className="resultList">
						{this.renderOfficeList()}
					</div>
					<div className="map">
						{this.renderMap()}
					</div>
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
		offices: getVisibleOffices(state.offices.offices),
		isFetching: state.offices.isFetching,
		invalid: state.offices.invalid,
		listings: state.listings.data,
		filters: state.filters
	};
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
