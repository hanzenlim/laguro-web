import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector, SubmissionError } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";

import * as actions from "../../actions";

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
				listing: listing
			});

			this.props.initialize({
				time_available: moment(listing.time_available),
				time_closed: moment(listing.time_closed),
				equipment: listing.equipment,
				staff: listing.staff,
				cleaning_fee: listing.cleaning_fee,
				chairs_available: listing.chairs_available,
				price: listing.price
			});
		});
	}

	onSubmit(values) {
		if (
      // if chosen duration is less than 2 hrs
      moment(values.time_available)
        .add(2, "hours")
        .isAfter(values.time_closed)
    ) {
      throw new SubmissionError({
        time_closed: "Minimum reservation is 2 hours"
      });
		} else {
			// this.props.editListing({...values, id: this.listing_id });
		}
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
			{touched && error && <span className="red-text">{error}</span>}
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
						validate={required}
					/>
					<Field
						name={`${staff}.price`}
						type="text"
						placeholder="30"
						component={this.renderField}
						label="Hourly Price"
						validate={required}
					/>
					<Field
						name={`${staff}.count`}
						type="text"
						placeholder="3"
						component={this.renderField}
						label="Number of Staff"
						validate={required}
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
						validate={required}
					/>
					<Field
						name={`${equipment}.price`}
						type="text"
						placeholder="15"
						component={this.renderField}
						label="Per Unit Price"
						validate={required}
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

	renderDatePicker = ({
    input,
    label,
    className,
    selectedDate,
    dateType,
    meta: { touched, error }
  }) => {
    return (
      <div className={className}>
        <label>{label}</label>
        <DatePicker
          selected={input.value}
          onChange={input.onChange.bind(this)}
          dateFormat="LLL"
          placeholderText={moment().format("LLL")}
          minDate={moment()}
          showTimeSelect
          withPortal
          timeFormat="h:mm a"
          timeIntervals={60}
          timeCaption="Time"
        />
        {touched && error && <span className="red-text">{error}</span>}
      </div>
    );
  };

	renderOptions = (max_avail, min_avail = 1, label = "") => {
		let options = [];
		for (let i = min_avail; i <= max_avail; i++) {
			options.push(
				<option value={Number(i)} key={i}>
					{`${i} ${label}`}
				</option>
			);
		}
		return options;
	};

	calcTime() {
    let { time_available, time_closed } = this.props;
    let minutes = time_closed.diff(time_available, "minutes");
    this.hours = minutes / 60;
  }

  calcTotal() {
    const { price, chairs_available } = this.props;
		const { listing } = this.state;

    if (this.hours <= 0 || !chairs_available || !price) {
      return 0;
    }

		let old_minutes = moment(listing.time_closed).diff(moment(listing.time_available), "minutes");
		let old_hours = old_minutes / 60;

		let old_total = listing.chairs_available * listing.price * old_hours;
		let new_total = chairs_available * price * this.hours;

		let total_diff = new_total - old_total;
		if(total_diff <= 0) return 0;

    return Math.floor(total_diff * 0.2);
  }

	render() {
		const { handleSubmit, submitting, error } = this.props;

		if (!this.props.initialized || this.props.isFetching)
      return <div>Loading...</div>;

    this.calcTime();

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
						className="col s12 m4"
						validate={required}
						component={this.renderField}
					/>

					<label className="col s12 m4">
            Number of chairs available
            <Field
              name="chairs_available"
              type="select"
              style={{ display: "block" }}
              component="select"
            >
              {this.renderOptions(
 								this.state.listing.office_chairs : 1,
                1
              )}
            </Field>
          </label>

					<Field
						name="cleaning_fee"
						label="Cleaning Fee"
						placeholder="50"
						className="col s12 m4"
						validate={required}
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
            className="col s12 m6"
            component={this.renderDatePicker}
          />

          <Field
            name="time_closed"
            label="Closing Time"
            dateType="time_closed"
            className="col s12 m6"
            component={this.renderDatePicker}
          />
        </div>

				<div className="row valign-wrapper">
          <div className="col s6 left-align">
            <label>Additional listing fee due - 20% of adjusted chair rental fee</label>
            <h6 className="red-text">${this.calcTotal()}</h6>
          </div>
          <div className="form-buttons col s6 right-align">
            {error && <strong className="red-text">{error}</strong>}
            <button
              className="waves-effect btn light-blue lighten-2"
              type="submit"
              disabled={submitting}
            >
              Submit
            </button>
          </div>
        </div>
			</form>
		);
	}
}

const required = value => (value && value !== "" ? undefined : 'Required')

EditListing = reduxForm({
	form: "editListing"
})(EditListing);

function mapStateToProps(state) {
	const selector = formValueSelector("editListing");
	return {
		time_available: selector(state, "time_available"),
		time_closed: selector(state, "time_closed"),
		chairs_available: selector(state, "chairs_available"),    price: selector(state, "price"),
		listings: state.listings.all,
		isFetching: state.listings.isFetching
	};
}

export default connect(mapStateToProps, actions)(EditListing);
