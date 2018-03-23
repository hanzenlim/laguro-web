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

		this.getOffices().then(offices => {
			this.setState({ offices: offices });
		});

		this.props.fetchListings();
	}

	//get all offices for the logged in user
	async getOffices() {
		await this.props.fetchOffices();

		const { offices, auth } = this.props;
		if (offices.length) {
			const userOffices = offices.filter(office => office.user === auth._id);
			return userOffices;
		} else {
			return [];
		}
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

	renderProfileDetails(auth, dentist) {
		return (
			<div>
				<h4>Hey, I'm {dentist ? dentist.name : auth.name}!</h4>
				<p>
					{((dentist && dentist.location) ? dentist.location + " - " : "") +
						"Member since " +
						moment(auth.date_created).format("MMMM `YY")}
				</p>
			</div>
		);
	}

	getSortedListings(office) {
		const { listings } = this.props;
		if (listings) {

			let filteredListings = listings.filter(listing => listing.office === office._id)

			filteredListings = filteredListings.map((listing, index) => (
				<li className="profile_listing" key={index}>
					{moment(listing.time_available).format("MMM D, h a - ")}
					{moment(listing.time_closed).format("h a")}
				</li>
			));

			return filteredListings;
		} else {
			return []
		}
	}

	renderUserOffices() {
		const { auth } = this.props;
		const { offices } = this.state;

		return offices.map((office, index) => {
			let filteredListings = this.getSortedListings(office);

			return (
				<div className="office" key={index}>
					<h5>{office.name}</h5>
					<p>{office.location}</p>
					<h6>Upcoming listings:</h6>
					<ul className="profile_listings browser-default">
						{filteredListings}
					</ul>
				</div>
			);
		});
	}

	renderActions(dentist) {
		return (
			<ul className="collection">
				{/* Display Create if no dentist profile or Edit if profile exists */}
				{dentist ? (
					<Link className="link" to={"/dentist/edit"}>
						Edit Dentist Profile
					</Link>
				) : (
					<Link className="link red-text" to={"/dentist/new"}>
						Create Dentist Profile
					</Link>
				)}

				{/* Hide image uploader if dentist profile exists (must edit photo thru dentist profile) */}
				{dentist ? (
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
				<Link className="link" to={"/offices/new"}>
					Create a new office
				</Link>
				<Link className="link" to={"/listings/new"}>
					Create a new listing
				</Link>
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
		const { dentist, offices } = this.state;
		return (
			<div className="profile_container">
				<div className="sidebar">
					<img className="profile_img" src={dentist ? dentist.img_url : auth.img} alt="user" />
					{this.renderActions(dentist)}
				</div>
				<div className="main">
					{this.renderProfileDetails(auth, dentist)}
					<div className="offices">
						<h5>Offices:</h5>
						{this.renderUserOffices(auth, offices)}
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
		offices: state.offices.offices
		listings: state.listings.data
	};
}
export default connect(mapStateToProps, actions)(Profile);
