import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as actions from "../actions";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

class EditListing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			listing: {}
		};
	}

	componentWillMount() {
		document.title = "Laguro - Edit Listing";

		this.listing_id = this.props.computedMatch.params.id;

		this.getListing().then(listing => {
			this.setState({
				listing: listing,
				time_available: listing.time_available,
				time_closed: listing.time_closed
			});

			this.props.initialize({
				equipment: listing.equipment,
				staff: listing.staff,
				cleaning_fee: listing.cleaning_fee,
				price: listing.price
			});
		});
	}

	onSubmit(values) {
		const { reset } = this.props;
		const { time_available, time_closed, listing } = this.state;

		this.props.editListing({...values, time_available, time_closed, id: listing._id });
		reset();
	}

	async getListing() {
		await this.props.fetchListings();

		const { listings } = this.props;
		if (listings.length) {
			const listing = listings.filter(
				listing => listing._id === this.listing_id
			);
			return listing[0];
		} else {
			return {};
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
					selected={
						selectedDate ? moment(selectedDate) : moment()
					}
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
		const { handleSubmit, submitting } = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
				className="bigForm light-blue lighten-5"
			>
				<div className="form_title">
					<h4>Edit Office Listing</h4>
					<Link
						className="btn light-blue lighten-2 waves-effect"
						to={"/profile"}
					>
						Go back to profile
					</Link>
				</div>

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
	return { listings: state.listings.data };
}

export default reduxForm({
	form: "editListing"
})(connect(mapStateToProps, actions)(EditListing));
