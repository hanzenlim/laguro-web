import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import * as actions from "../actions";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dentist: {}
		};
	}

	componentWillMount() {
		this.dentist_id = this.props.match.params.id;

		this.getDentist().then(dentist => {
			document.title = `Laguro - ${dentist.name}`;
			this.setState({ dentist: dentist });
		});

		this.props.fetchOffices();

		this.props.fetchListings();
	}

	// get all dentists and find the dentist profile that matches logged in user
	async getDentist() {
		await this.props.fetchDentists();

		const { dentists } = this.props;
		if (dentists.length) {
			const dentist = dentists.filter(
				dentist => dentist.user_id === this.dentist_id
			);
			return dentist[0];
		} else {
			return {};
		}
	}

	renderProfileDetails() {
		const { dentist } = this.state;

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
					</div>
				</li>
			));

			return filteredListings;
		} else {
			return [];
		}
	}

	renderUserOffices() {
		const { offices } = this.props;

		let userOffices = [];

		if (offices.length) {
			userOffices = offices.filter(office => office.user === this.dentist_id);
		} else {
			userOffices = [];
		}

		return userOffices.map((office, index) => {
			let officeListings = this.getSortedListings(office);

			return (
				<div className="office" key={index}>
					<div className="office_header">
						<h5>{office.name}</h5>
					</div>
					<p>{office.location}</p>
					<h6>Upcoming listings:</h6>
					<ul className="profile_listings browser-default">{officeListings}</ul>
				</div>
			);
		});
	}

	setNewProfileImage(result) {
		let upload = result.filesUploaded[0];
		if (upload) {
			this.props.updateProfileImage(upload.url);
		}
	}

	render() {
		const { dentist } = this.state;
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
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		dentists: state.dentists.dentists,
		offices: state.offices.offices,
		listings: state.listings.data
	};
}
export default connect(mapStateToProps, actions)(Profile);
