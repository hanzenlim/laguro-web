import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from "../actions";
import keys from "../config/keys";

class Landing extends Component {
	componentWillMount(){
		document.title = "Laguro - Profile"
	}

	profileDetails(auth) {
		return (
			<div className="details">
				<h4 className="flow-text">Welcome back {auth.data.name}</h4>
			</div>
		);
	}

	renderActions() {
		return (
			<ul className="collection">
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
				<Link className=" link" to={"/offices/new"}>
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
		return (
			<div className="profile_container">
				<div className="sidebar">
					<img src={auth.data.img} alt="user" />
					{this.renderActions()}
				</div>
				{this.profileDetails(auth)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(Landing);
