import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as actions from "../actions";

import "react-datepicker/dist/react-datepicker.css";

class NewListing extends Component {
	componentDidMount() {
		this.props.fetchUserOffices();
	}

	onSubmit(values) {
		const { reset } = this.props;
		this.props.createListing(values);
		reset();
	}

	renderOffices() {
		const offices = this.props.offices.data;

		if(offices){
			return offices.map(office => (
					<option value={`${office._id}`} key={`${office.name}`}>
						{office.name} - {office.location}
					</option>
				)
			);
		} else {
			return null;
		}
	}

	renderField = ({ input,	label, type, placeholder, meta: { touched, error }	}) => (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
		</div>
	);

	renderStaff = ({ fields, meta: { error } }) => (
		<ul>
			<h6>Staff Available</h6>
			<li>
				<button
					type="button"
					className="waves-effect btn-flat"
					onClick={() => fields.push({})}
				>
					Add Staff
				</button>
				{error && <span>{error}</span>}
			</li>
			{fields.map((staff, index) => (
				<li key={index} className="multiRowAdd">
					<Field
						name={`${staff}.role`}
						type="text"
						placeholder="RDA"
						component={this.renderField}
						label="Staff Role"
					/>
					<Field
						name={`${staff}.price`}
						type="text"
						placeholder="30"
						component={this.renderField}
						label="Hourly Price"
					/>
					<Field
						name={`${staff}.count`}
						type="text"
						placeholder="3"
						component={this.renderField}
						label="Number of Staff"
					/>
					<button
						type="button"
						title="Remove Staff"
						className="red lighten-2 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	renderEquipment = ({ fields, meta: { error } }) => (
		<ul>
			<h6>Equipment Available</h6>
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
						type="text"
						placeholder="Filling Setup"
						component={this.renderField}
						label="Equipment Type"
					/>
					<Field
						name={`${equipment}.price`}
						type="text"
						placeholder="15"
						component={this.renderField}
						label="Per Unit Price"
					/>
					<button
						type="button"
						title="Remove Staff"
						className="red lighten-2 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	renderDatePicker = ({ input, label, meta: { touched, error } }) => (
		<div>
			<label>{label}</label>
			<DatePicker
				{...input}
				selected={input.value ? moment(input.value, "MMM DD, YYYY") : null}
				dateFormat="MMM DD, YYYY"
				placeholderText={moment().format("MMM DD, YYYY")}
			/>
			{touched && error && <span>{error}</span>}
		</div>
	);

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<label>
					Select an existing office
					<Field
						name="office"
						type="select"
						style={{ display: "block" }}
						component="select"
					>
						<option value="">Please select an office...</option>
						{this.renderOffices()}
					</Field>
				</label>
				<Field
					name="price"
					label="Price per chair (hourly)"
					placeholder="100"
					component={this.renderField}
				/>

				<FieldArray name="staff" component={this.renderStaff} />
				<FieldArray name="equipment" component={this.renderEquipment} />

				<Field
					name="time_available"
					label="Opening Time"
					component={this.renderDatePicker}
				/>

				<Field
					name="time_closed"
					label="Closing Time"
					component={this.renderDatePicker}
				/>

				<Field
					name="cleaning_fee"
					label="Cleaning Fee"
					placeholder="50"
					component={this.renderField}
				/>

				<div className="form-buttons">
					<button
						className="waves-effect btn green lighten-2"
						type="submit"
						disabled={pristine || submitting}
					>
						Submit
					</button>
					<button
						className="waves-effect btn red lighten-2"
						type="button"
						disabled={pristine || submitting}
						onClick={reset}
					>
						Clear
					</button>
				</div>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return { offices: state.offices };
}

export default reduxForm({
	form: "newListing"
})(connect(mapStateToProps, actions)(NewListing));
