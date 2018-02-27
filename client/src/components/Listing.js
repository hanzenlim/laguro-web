import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

class OfficeResultIndex extends Component {
	componentDidMount() {
		this.listing_id = this.props.match.params.id;
		this.office_id = this.props.match.params.office_id;

		this.props.fetchListings();
		this.props.fetchOffices();
	}

	renderEquipment(listing) {
		if(listing.equipment){
			return listing.equipment.map(equipment => (
				<li className="listingRow">
					{equipment.name} - ${equipment.price}
				</li>
			))
		} else {
			return <li>No Equipment Available</li>
		}
	}

	renderStaff(listing) {
		if(listing.staff){
			return listing.staff.map(staff => (
				<li className="listingRow">
					{staff.role} - ${staff.price} ({staff.count} available)
				</li>
			))
		} else {
			return <li>No Staff Available</li>
		}
	}

	renderImages(office) {
		console.log(office.img_url)
		return office.img_url.map(url =>
			<img className="officeImg" src={url} />
		)
	}

	render() {
		let { offices, listings } = this.props;

		if (offices && listings) {
			let office = offices.filter(office => office._id === this.office_id)[0];

			let listing = listings.filter(
				listing => listing._id === this.listing_id
			)[0];

			let avg_rating =
				office.rating.length > 0
					? office.rating.reduce((acc, val) => acc + val) / office.rating.length
					: null;

			return (
				<div className="listing">
					<div className="officeImgs">
						{this.renderImages(office)}
					</div>

					<div className="listingDetails">
						<div className="listingHeader">
							<div>
								<h3>{office.name}</h3>
								<h5>{office.location}</h5>
								<h6>
									{moment(listing.time_available).format("MMM D, h a")} -{" "}
									{moment(listing.time_closed).format("h a")}
								</h6>
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

					<div className="bookNow">
						<div className="content">
							<div>
								<p>
									${listing.price} <small>hourly per chair</small>
								</p>
								<div className="rating">
									<ReactStars count={5} value={avg_rating} size="10" />
									<small>{`(${office.rating.length})`}</small>
								</div>
							</div>
							<Link
								className="btn red lighten-2 waves-effect"
								to={"/offices/search"}
								>
									Book Now
								</Link>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>Loading...</div>;
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
