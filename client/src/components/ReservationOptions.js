import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";

import * as actions from "../actions";

import "react-datepicker/dist/react-datepicker.css";

class ReservationOptions extends Component {
  componentWillMount() {
    this.props.initialize({
      staff: this.props.listing.staff
    });
  }

  onSubmit(values) {
    const { reset, listing } = this.props;
    this.props.reserveListing(listing._id, {
      appts_per_hour: values.appts_per_hour,
      staff_required: values.staff,
      total_paid: this.calcTotal() + 50
    });
    reset();
  }

  renderStaticField = ({ input, label, className }) => (
    <div>
      <div className={className}>
        <label>{label}</label>
        <h6>{input.value}</h6>
      </div>
    </div>
  );

  renderOptions = max_avail => {
    let options = [];
    for (let i = 0; i <= max_avail; i++) {
      options.push(
        <option value={Number(i)} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  renderStaff = ({ fields, className, meta: { error } }) => {
    const { listing } = this.props;
    let staffData = this.props.staff;
    if (!staffData) {
      return <div>Loading...</div>;
    }
    return (
      <ul className={className}>
        <label>Staff Required</label>
        {fields.map((staff, index) => (
          <li key={index} className="multiRow">
            <Field
              name={`${staff}.role`}
              component={this.renderStaticField}
              label="Staff Role"
            />
            <div>
              <label>
                Number required
                <Field
                  name={`${staff}.count`}
                  type="select"
                  style={{ display: "block" }}
                  component="select"
                >
                  {this.renderOptions(listing.staff[index].count)}
                </Field>
              </label>
            </div>
            <div>
              <label>Subtotal</label>
              <h6 className="red-text">
                ${staffData[index].count * staffData[index].price}
              </h6>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  calcTotal() {
    let staffData = this.props.staff;

    if (!staffData || !staffData.length) {
      return 0;
    }

    let subtotals = staffData.map((staff, index) => staff.count * staff.price);

    return subtotals.reduce((acc, sub) => sub + acc);
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="modalForm light-blue lighten-5"
      >
        <div className="form_title">
          <h5>Choose reservation options</h5>
        </div>
        <div>
          <FieldArray
            name="staff"
            className="row"
            component={this.renderStaff}
          />
        </div>

        <div className="row">
          <label className="col s6 offset-s3">
            Number of appointment slots per hour
            <Field
              name={`appts_per_hour`}
              type="select"
              style={{ display: "block" }}
              component="select"
            >
              {this.renderOptions(2)}
            </Field>
            <sub>
              *Choose 0 slots per hour to prevent patients signing up
            </sub>
          </label>
        </div>

        <div className="row">
          <div className="col s6 left-align">
            <label>Booking Fee</label>
            <h6 className="red-text">$50</h6>
          </div>
          <div className="col s6 right-align">
            <label>Total due today</label>
            <h6 className="red-text">${this.calcTotal() + 50}</h6>
          </div>
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
        <div className="form_footer">
          <sub>
            *Payment for staff and initial booking fee is non-refundable
          </sub>
        </div>
      </form>
    );
  }
}

ReservationOptions = reduxForm({
  form: "reservationOptions"
})(ReservationOptions);

function mapStateToProps(state) {
  const selector = formValueSelector("reservationOptions");
  return {
    staff: selector(state, "staff")
  };
}

export default connect(mapStateToProps, actions)(ReservationOptions);
