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
			dentist: {}
		};
	}

	componentWillMount() {
		document.title = "Laguro - Profile";

		this.getDentist().then(dentist => {
			this.setState({ dentist: dentist });
		});
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

	profileDetails(auth, dentist) {
		return (
			<div className="details">
				<h4>Hey, I'm {auth.name}!</h4>
				<p>
					{((dentist && dentist.location) ? dentist.location + " - " : "") +
						"Member since " +
						moment(auth.date_created).format("MMMM `YY")}
				</p>
			</div>
		);
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
		const { dentist } = this.state;
		return (
			<div className="profile_container">
				<div className="sidebar">
					<img className="profile_img" src={auth.img} alt="user" />
					{this.renderActions(dentist)}
				</div>
				{this.profileDetails(auth, dentist)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth.data,
		dentists: state.dentists.dentists
	};
}
export default connect(mapStateToProps, actions)(Profile);
