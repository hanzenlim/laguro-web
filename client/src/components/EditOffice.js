import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../actions";
import ReactFilestack from "filestack-react";
import keys from "../config/keys";
import { Link } from "react-router-dom";

class EditOffice extends Component {
	constructor(props) {
		super(props);

		this.state = {
			office: {},
			img_url: []
		};
	}

	componentWillMount() {
		document.title = "Laguro - Edit Office";

		// id from URL
		this.office_id = this.props.computedMatch.params.office_id;

		this.getOffice().then(office => {
			this.setState({
				office: office,
				img_url: office.img_url
			});

			this.props.initialize({
				name: office.name,
				location: office.location,
				chairs: office.chairs
			});
		});
	}

	onSubmit(values) {
		const { reset } = this.props;
		const { img_url, office } = this.state;
		this.props.editOffice({
			...values,
			img_url,
			id: this.office_id
		});
		reset();
	}

	// get all dentists and find the dentist profile that matches logged in user
	async getOffice() {
		await this.props.fetchOffices();

		const { offices } = this.props;
		if (offices.length) {
			const office = offices.filter(office => office._id === this.office_id);
			return office[0];
		} else {
			return {};
		}
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

	renderField = ({
		input,
		label,
		className,
		placeholder,
		meta: { touched, error }
	}) => (
		<div className={className}>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
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
					<h4>Edit Dentist Office</h4>
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
						label="Name"
						className="col s12 m4"
						placeholder="Bell Dental"
						component={this.renderField}
					/>
					<Field
						name="location"
						label="Location"
						className="col s12 m5"
						placeholder="San Leandro, CA"
						component={this.renderField}
					/>
					<Field
						name="chairs"
						label="Number of Chairs"
						className="col s12 m3"
						placeholder="3"
						component={this.renderField}
					/>
				</div>

				<div className="image_upload">
					<div className="image_display">{this.renderUploadedImages()}</div>
					<ReactFilestack
						apikey={keys.filestack}
						buttonText="Upload New Image"
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
							storeTo: { container: "office-photos" }
						}}
						onSuccess={result => this.extractUrlToState(result)}
					/>
				</div>

				<div className="form-buttons">
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

function mapStateToProps(state) {
	return {
		auth: state.auth.data,
		offices: state.offices.offices
	};
}

export default reduxForm({
	form: "editOffice"
})(connect(mapStateToProps, actions)(EditOffice));
