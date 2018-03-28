import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../actions";
import ReactFilestack from "filestack-react";
import keys from "../config/keys";
import { Link } from "react-router-dom";

class EditDentist extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dentist: {},
			img_url: ""
		};
	}

	componentWillMount() {
		document.title = "Laguro - Edit Profile";

		this.getDentist().then(dentist => {
			this.setState({
				dentist: dentist,
				img_url: dentist.img_url
			});

			this.props.initialize({
				name: dentist.name,
				location: dentist.location,
				type: dentist.type,
				procedures: dentist.procedures
			});
		});
	}

	onSubmit(values) {
		const { reset, auth } = this.props;
		const { img_url } = this.state;
		this.props.editDentist({ ...values, img_url, id: auth._id });
		reset();
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

	extractUrlToState(result) {
		let upload = result.filesUploaded;
		if (upload.length) {
			this.setState({ img_url: upload[0].url });
		}
	}

	renderUploadedImages() {
		const { img_url } = this.state;
		return <img src={img_url} alt="dentist" />;
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

	renderProcedures = ({ fields, className, meta: { error } }) => (
		<ul className={className}>
			<label>Procedures Offered</label>
			<li>
				<button
					type="button"
					className="waves-effect btn-flat"
					onClick={() => fields.push({})}
				>
					Add Procedure
				</button>
				{error && <span>{error}</span>}
			</li>
			{fields.map((procedure, index) => (
				<li key={index} className="multiRowAdd">
					<Field
						name={`${procedure}.name`}
						type="text"
						placeholder="Implants"
						component={this.renderField}
						label="Procedure"
					/>
					<button
						type="button"
						title="Remove Procedure"
						className="red lighten-3 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<form
				className="bigForm light-blue lighten-5"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<div className="form_title">
					<h4>Edit Dentist Profile</h4>
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
						placeholder="General Dentist"
						component={this.renderField}
					/>
					<Field
						name="type"
						label="Dental Specialty"
						className="col s12 m4"
						placeholder="General Dentist"
						component={this.renderField}
					/>
					<Field
						name="location"
						label="Location of practice"
						className="col s12 m4"
						placeholder="Oakland, CA"
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
							maxFiles: 1,
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

				<div className="row">
					<FieldArray
						name="procedures"
						className="col s12"
						component={this.renderProcedures}
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
		dentists: state.dentists.dentists
	};
}

export default reduxForm({
	form: "editDentist"
})(connect(mapStateToProps, actions)(EditDentist));