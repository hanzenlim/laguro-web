import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";
import * as actions from "../actions";
import keys from '../config/keys';

class NewOffice extends Component {
	constructor(props){
		super(props);
		this.state = {
			img_url: []
		}
	}

	loginMessage(){
    const { auth } = this.props;
    return(
      auth && auth.data === "" ? <Link
				className="red-text"
        to={'/auth/google'}
      >Login to create new offices</Link> : ""
    )
  }

	extractUrlToState(result){
		let upload = result.filesUploaded
		let allUrls = [];
		if(upload.length){
			allUrls = upload.map(file => {
				return file.url;
			})
		}
		this.setState({img_url: allUrls})
	}

	renderUploadedImages(){
		const { img_url } = this.state;
		return img_url.map((url, index) => {
			return <img src={url} key={"img"+index} alt="office"/>
		})
	}

	onSubmit(values) {
		const { reset } = this.props;
		const { img_url } = this.state;
		this.props.createOffice({...values, img_url});
		reset();
	}

	renderField = ({ input, label, placeholder, meta: { touched, error } }) => (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
		</div>
	);

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		return (
			<form
				className="bigForm light-blue lighten-5"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<h4>Create a new office</h4>

				<Field
					name="name"
					label="Office Name"
					placeholder="Bell Dental Center"
					component={this.renderField}
				/>
				<Field
					name="location"
					label="Address"
					placeholder="1598 Washington Ave, San Leandro, CA"
					component={this.renderField}
				/>
				<Field
					name="chairs"
					label="Number of Chairs"
					placeholder={3}
					component={this.renderField}
				/>
				<div className="image_upload">
					<ReactFilestack
						apikey={keys.filestack}
						buttonText="Upload Images"
						buttonClass="btn light-blue lighten-2"
						options={{
							accept: ["image/*"],
							imageMin: [300, 300],
							maxFiles: 5,
							fromSources: [
								"local_file_system",
								"url",
								"imagesearch",
								"facebook",
								"instagram"
							],
							storeTo: { container: 'office-photos'}
						}}
						onSuccess={ result => this.extractUrlToState(result) }
					/>
					<div className="image_display">
						{this.renderUploadedImages()}
					</div>
				</div>
				<div className="form-buttons">
					{this.loginMessage()}
					<button
						className="waves-effect btn light-blue lighten-2"
						type="submit"
						disabled={pristine || submitting}
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

function mapStateToProps(state){
	return{ auth: state.auth }
}

export default reduxForm({
	form: "newOffice"
})(connect(mapStateToProps, actions)(NewOffice));
