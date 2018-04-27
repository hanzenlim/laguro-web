import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray } from "redux-form";
import ReactFilestack from "filestack-react";
import { Link } from "react-router-dom";

import equipmentList from "../../staticData/equipmentList";
import * as actions from "../../actions";

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
				chairs: office.chairs,
				equipment: office.equipment
			});
		});
	}

	onSubmit(values) {
		const { reset } = this.props;
		const { img_url } = this.state;
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

	extractUrlToState(result) {
		let upload = result.filesUploaded;
		let allUrls = this.state.img_url;
		if (upload.length) {
			let newImgs = upload.map(file => {
				return file.url;
			});

			allUrls = [...allUrls, ...newImgs];
		}
		this.setState({ img_url: allUrls });
	}

	deleteImg(index) {
		let allUrls = this.state.img_url;
		allUrls.splice(index, 1);

		this.setState({ img_url: allUrls });
	}

	renderUploadedImages() {
		const { img_url } = this.state;
		return img_url.map((url, index) => {
			return (
				<div className="edit_img_container" key={"img" + index}>
					<button
						onClick={this.deleteImg.bind(this, index)}
						type="button"
						className="delete_img red lighten-2 btn"
						>
						<i className="material-icons">delete_forever</i>
					</button>
					<img src={url} alt="office" />
				</div>
			);
		});
	}

	renderEquipment() {
		return equipmentList.map(equipment => {
			return (
				<option value={equipment.name} key={equipment.id}>
					{equipment.name}
				</option>
			);
		});
	}

	renderSelect = ({ input, label, meta: { touched, error } }) => {
		return (
			<div className="col s4">
				<select {...input} className="browser-default">
					<option value="">Please select equipment...</option>
					{this.renderEquipment()}
				</select>
				{touched && (error && <span className="red-text">{error}</span>)}
			</div>
		);
	};

	renderEquipmentSelector = ({ fields, className, meta: { error } }) => (
		<ul className={className}>
			<label>Equipment Available</label>
			<li>
				<button
					type="button"
					className="waves-effect btn-flat"
					onClick={() => fields.push({})}
				>
					Add Equipment
				</button>
				{error && <span>{error}</span>}
			</li>
			{fields.map((equipment, index) => (
				<li key={index} className="multiRowAdd">
					<Field
						name={`${equipment}.name`}
						component={this.renderSelect}
						validate={required}
					/>
					<div className="col s2">
						<Field
							name={`${equipment}.price`}
							type="text"
							placeholder="15"
							component={this.renderField}
							label="Usage Price"
							validate={required}
						/>
					</div>
					<button
						type="button"
						title="Remove Equipment"
						className="red lighten-3 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

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
						validate={required}
					/>
					<Field
						name="location"
						label="Location"
						className="col s12 m5"
						placeholder="San Leandro, CA"
						component={this.renderField}
						validate={required}
					/>
					<Field
						name="chairs"
						label="Number of Chairs"
						className="col s12 m3"
						placeholder="3"
						component={this.renderField}
						validate={required}
					/>
				</div>

				<div className="row">
					<FieldArray
						name="equipment"
						className="col s12"
						component={this.renderEquipmentSelector}
					/>
				</div>

				<div className="image_upload">
					<div className="image_display">{this.renderUploadedImages()}</div>
					<ReactFilestack
						apikey={"Aj4gwfCaTS2Am35P0QGrbz"}
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

const required = value => (value && value !== "" ? undefined : 'Required')

function mapStateToProps(state) {
	return {
		auth: state.auth.data,
		offices: state.offices.all
	};
}

export default reduxForm({
	form: "editOffice"
})(connect(mapStateToProps, actions)(EditOffice));
