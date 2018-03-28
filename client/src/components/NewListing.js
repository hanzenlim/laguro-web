import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as actions from "../actions";
import { Link } from "react-router-dom";


import "react-datepicker/dist/react-datepicker.css";

class NewListing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time_available: moment(),
			time_closed: moment()
		};
	}

	componentDidMount() {
		this.props.fetchUserOffices();
	}

	onSubmit(values) {
		const { reset } = this.props;
		const { time_available, time_closed } = this.state;
		this.props.createListing({ ...values, time_available, time_closed });
		reset();
	}

	renderOffices() {
		const offices = this.props.offices;

		if (offices.length) {
			return offices.map((office, index) => (
				<option value={`${office._id}`} key={index}>
					{office.name} - {office.location}
				</option>
			));
		} else {
			return null;
		}
	}

	renderField = ({
		input,
		label,
		type,
		placeholder,
		className,
		meta: { touched, error }
	}) => (
		<div>
			<div className={className}>
				<label>{label}</label>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
		</div>
	);

	renderStaff = ({ fields, className, meta: { error } }) => (
		<ul className={className}>
			<label>Staff Available</label>
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
						className="red lighten-3 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	renderEquipment = ({ fields, className, meta: { error } }) => (
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
						className="red lighten-3 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	handleChange(dateType, date) {
		let stateObject = {};
		stateObject[dateType] = date;

		this.setState(stateObject);
	}

	renderDatePicker = ({ label, className, selectedDate, dateType }) => {
		return (
			<div className={className}>
				<label>{label}</label>
				<DatePicker
					selected={selectedDate ? moment(selectedDate) : moment()}
					onChange={this.handleChange.bind(this, dateType)}
					dateFormat="LLL"
					placeholderText={moment().format("MMM DD, YYYY")}
					minDate={moment()}
					showTimeSelect
					withPortal
					timeFormat="h:mm a"
					timeIntervals={60}
					timeCaption="Time"
				/>
			</div>
		);
	};

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
				className="bigForm light-blue lighten-5"
			>
				<div className="form_title">
					<h4>Create a listing for an existing office</h4>
					<Link
						className="btn light-blue lighten-2 waves-effect"
						to={"/profile"}
					>
						Go back to profile
					</Link>
				</div>
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
				<div className="row">
					<Field
						name="price"
						label="Price per chair (hourly)"
						placeholder="100"
						className="col s12 m6"
						component={this.renderField}
					/>

					<Field
						name="cleaning_fee"
						label="Cleaning Fee"
						placeholder="50"
						className="col s12 m6"
						component={this.renderField}
					/>
				</div>

				<div className="row">
					<FieldArray
						name="staff"
						className="col s12"
						component={this.renderStaff}
					/>
				</div>

				<div className="row">
					<FieldArray
						name="equipment"
						className="col s12"
						component={this.renderEquipment}
					/>
				</div>

				<div className="row">
					<Field
						name="time_available"
						label="Opening Time"
						dateType="time_available"
						selectedDate={this.state.time_available}
						className="col s12 m6"
						component={this.renderDatePicker}
					/>

					<Field
						name="time_closed"
						label="Closing Time"
						dateType="time_closed"
						selectedDate={this.state.time_closed}
						className="col s12 m6"
						component={this.renderDatePicker}
					/>
				</div>

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
	return { offices: state.offices.offices };
}

export default reduxForm({
	form: "newListing"
})(connect(mapStateToProps, actions)(NewListing));
