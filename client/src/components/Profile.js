import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from '../actions';
import keys from '../config/keys';

class Landing extends Component {
	profileDetails() {
		const { auth } = this.props;
    console.log(auth)
		if (auth && auth.data) {
			return (
				<div>
					<img src={auth.data.img} alt="user" />
					<h4>Welcome back {auth.data.name}</h4>
				</div>
			);
		} else {
			return <Link to={"/auth/google"}>Login to see your profile</Link>;
		}
	}

  setNewProfileImage(result){
    let upload = result.filesUploaded[0]
    if(upload){
      this.props.updateProfileImage(upload.url)
    }
  }

	render() {
		return (
			<div>
				<div>{this.profileDetails()}</div>
				<ReactFilestack
					apikey={keys.filestack}
					buttonText="Upload Image"
					buttonClass="btn light-blue lighten-2"
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
            storeTo: { container: 'user-photos'}
					}}
					onSuccess={ result => this.setNewProfileImage(result) }
				/>
				<div>
					<Link to={"/offices/new"}>Create a new office</Link>
					<br />
					<Link to={"/listings/new"}>
						Create a new listing for existing office
					</Link>
					<br />
					<Link to={"/offices/search"}>Browse listings</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { auth: state.auth };
}
export default connect(mapStateToProps, actions)(Landing);
