import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import ReactFilestack from "filestack-react";

import * as actions from "../../actions";
import keys from '../../config/keys';

class NewOffice extends Component {
	constructor(props){
		super(props);
		this.state = {
			img_url: []
		}
	}

	componentWillMount() {
		document.title = "Laguro - New Office"
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

	renderField = ({ input, label, placeholder, className, meta: { touched, error } }) => (
		<div className={className}>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span className="red-text">{error}</span>}
		</div>
	);

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<form
				className="bigForm light-blue lighten-5"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<div className="form_title">
					<h4>Create a New Office</h4>
					<Link
						className="btn light-blue lighten-2 waves-effect"
						to={"/profile"}
					>
						Go back to profile
					</Link>
				</div>

				<div className="row">
					<Field
						name="name"
						label="Office Name"
						placeholder="Bell Dental Center"
						component={this.renderField}
						validate={required}
						className="col s12 m9"
					/>

					<Field
						name="chairs"
						label="Number of Chairs"
						placeholder={3}
						component={this.renderField}
						validate={required}
						className="col s12 m3"
					/>
				</div>
				<div className="row">
					<Field
						name="location"
						label="Address"
						placeholder="1598 Washington Ave, San Leandro, CA"
						component={this.renderField}
						validate={required}
						className="col s12"
					/>
				</div>
				<div className="image_upload">
					<ReactFilestack
						apikey={"Aj4gwfCaTS2Am35P0QGrbz"}
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
						disabled={submitting}
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

const required = value => (value && value !== "" ? undefined : 'Required')

function mapStateToProps(state){
	return{ auth: state.auth }
}

export default reduxForm({
	form: "newOffice"
})(connect(mapStateToProps, actions)(NewOffice));
