import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from 'moment';
import { Link } from "react-router-dom";


class OfficeResultIndex extends Component {
	componentWillMount() {
		this.listing_id = this.props.match.params.id
		this.office_id = this.props.match.params.office_id

		this.props.fetchListings();
		this.props.fetchOffices();
	}

	renderListing = (office, listing) => {
		return (
			<div>
				<h4>{office.name}</h4>
				<h4>${listing.price}</h4>
			</div>
		)
	}

	render() {
		let { offices, listings } = this.props;

		if(offices && listings) {

			let singleOffice = offices.filter(office => office._id === this.office_id)[0]

			let singleListing = listings.filter(listing => listing._id === this.listing_id)[0]

			return (
				<div>
					<Link to={'/offices/search'}>Go back to listings</Link>
					{this.renderListing(singleOffice, singleListing)}
					<br/>
					<br/>
					Page in progress
				</div>
			);
		} else {
			return <div>Loading...</div>
		}
	}
}

function mapStateToProps(state) {
	return {
		listings: state.listings.data,
		offices: state.offices.data
   };
}

export default connect(mapStateToProps, actions)(OfficeResultIndex);
