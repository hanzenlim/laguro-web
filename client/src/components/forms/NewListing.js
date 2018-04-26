import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  SubmissionError,
  formValueSelector
} from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Link } from "react-router-dom";

import * as actions from "../../actions";

import "react-datepicker/dist/react-datepicker.css";

class NewListing extends Component {
  componentWillMount() {
    document.title = "Laguro - New Listing";
    this.props.fetchUserOffices();

    this.props.initialize({
      time_available: moment(),
      time_closed: moment(),
      chairs_available: 1
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
    } else if (!values.office) {
      throw new SubmissionError({
        office: "Please select an office",
        _error: "Please select an office above"
      });
    } else {
      let office = JSON.parse(values.office);
      this.props.createListing({
        ...values,
        office: office.id,
        office_name: office.office_name,
        office_img: office.office_img,
        office_chairs: office.chairs
      });
    }
  }

  renderOffices() {
    const offices = this.props.offices;

    if (offices.length) {
      return offices.map((office, index) => (
        <option
          value={JSON.stringify({
            id: office._id,
            office_name: office.name,
            office_img: office.img_url[0],
            chairs: office.chairs
          })}
          key={index}
        >
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
    <div className={className}>
      <label>{label}</label>
      <div>
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
    if (this.hours <= 0 || !chairs_available || !price) {
      return 0;
    }

    return Math.floor(chairs_available * price * this.hours * 0.2);
  }

  render() {
    const { handleSubmit, submitting, error, selected_office } = this.props;

    if (!this.props.initialized || this.props.isFetching)
      return <div>Loading...</div>;

    this.calcTime();

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="bigForm light-blue lighten-5"
      >
        <div className="form_title">
          <h4>Create a Listing for an Existing Office</h4>
          <Link
            className="btn light-blue lighten-2 waves-effect"
            to={"/profile"}
          >
            Go back to profile
          </Link>
        </div>
        <label>
          Select an existing office
          <Field name="office" style={{ display: "block" }} component="select">
            <option value="">Please select an office...</option>
            {this.renderOffices()}
          </Field>
        </label>
        <div className="row">
          <Field
            name="price"
            label="Price per chair (hourly)"
            placeholder="100"
            className="col s4"
            component={this.renderField}
            validate={required}
          />

          <label className="col s4">
            Number of chairs available
            <Field
              name="chairs_available"
              type="select"
              style={{ display: "block" }}
              component="select"
            >
              {this.renderOptions(
                selected_office ? JSON.parse(selected_office).chairs : 1,
                1
              )}
            </Field>
          </label>

          <Field
            name="cleaning_fee"
            label="Cleaning Fee"
            placeholder="50"
            className="col s4"
            component={this.renderField}
            validate={required}
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
            <label>Total due - 20% of total chair rental fee</label>
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

const required = value => (value && value !== "" ? undefined : "Required");

NewListing = reduxForm({
  form: "newListing"
})(NewListing);

function mapStateToProps(state) {
  const selector = formValueSelector("newListing");
  return {
    time_available: selector(state, "time_available"),
    time_closed: selector(state, "time_closed"),
    price: selector(state, "price"),
    selected_office: selector(state, "office"),
    chairs_available: selector(state, "chairs_available"),
    offices: state.offices.selected,
    isFetching: state.offices.isFetching
  };
}

export default connect(mapStateToProps, actions)(NewListing);
