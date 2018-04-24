import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";

import * as actions from "../actions";

import "react-datepicker/dist/react-datepicker.css";

class ReservationOptions extends Component {
  constructor(props) {
    super(props);
    const { listing } = this.props;

    this.state = {
      time_start: moment(listing.time_available),
      time_end: moment(listing.time_closed),
      total_due: 0
    };
  }

  componentWillMount() {
    this.props.initialize({
      staff_selected: this.props.listing.staff,
      chairs_selected: 1,
      appts_per_hour: 1
    });
  }

  onSubmit(values) {
    const { reset, listing, office } = this.props;
    const { time_end, time_start } = this.state;

    let appt_time = moment(time_start);

    let appointments = [];
    let duration = 60;

    switch (Number(values.appts_per_hour)) {
      case 1:
        duration = 60;
        break;
      case 2:
        duration = 30;
        break;
      case 3:
        duration = 20;
        break;
      case 4:
        duration = 15;
        break;
      default:
        return 60;
    }

    while (appt_time.isBefore(moment(time_end))) {
      appointments.push({ time: appt_time.format("MMM D, YYYY h:mm a") });
      appt_time = appt_time.add(duration, "minutes");
    }

    this.props.createReservation({
      ...values,
      listing_id: listing._id,
      office_id: office._id,
      host_id: listing.host,
      office_name: office.name,
      office_img: office.img_url[0],
      appointments,
      total_paid: this.calcTotal(),
      time_start,
      time_end
    });

    reset();
    this.closeModals();
  }

  closeModals() {
    let modals = document.getElementsByClassName("modal");
    let modal_overlay = document.getElementById("modal-overlay");
    for (var modal of modals) {
      modal.classList.remove("open");
    }
    modal_overlay.classList.remove("open");
  }

  renderStaticField = ({ input, label, className }) => (
    <div>
      <div className={className}>
        <label>{label}</label>
        <h6>{input.value}</h6>
      </div>
    </div>
  );

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

  handleChange(dateType, date) {
    let stateObject = {};
    stateObject[dateType] = moment(date);

    this.setState(stateObject);
  }

  renderDatePicker = ({
    label,
    className,
    selectedDate,
    dateType,
    listing
  }) => {
    return (
      <div className={className}>
        <label>{label}</label>
        <DatePicker
          selected={selectedDate ? moment(selectedDate) : moment()}
          onChange={this.handleChange.bind(this, dateType)}
          dateFormat="LLL"
          placeholderText={moment().format("MMM DD, YYYY")}
          minDate={moment(listing.time_available)}
          maxDate={moment(listing.time_closed)}
          minTime={moment(listing.time_available)}
          maxTime={moment(listing.time_closed)}
          showTimeSelect
          timeFormat="h:mm"
          timeIntervals={60}
          timeCaption="Time"
        />
      </div>
    );
  };

  renderStaff = ({ fields, className, meta: { error } }) => {
    const { listing } = this.props;
    let staffData = this.props.staff_selected;
    if (!staffData) {
      return <div>Loading...</div>;
    }
    return (
      <ul
        className={className}
        style={{ border: "1px solid #999", padding: "4px" }}
      >
        <label>Staff Required</label>
        {fields.map((staff_selected, index) => (
          <li key={index} className="multiRow">
            <Field
              name={`${staff_selected}.role`}
              component={this.renderStaticField}
              label="Staff Role"
            />
            <div>
              <label>
                Number required
                <Field
                  name={`${staff_selected}.count`}
                  type="select"
                  style={{ display: "block" }}
                  component="select"
                >
                  {this.renderOptions(listing.staff[index].count, 0)}
                </Field>
              </label>
            </div>
            <div>
              <label>Subtotal</label>
              <h6 className="red-text">
                ${staffData[index].count * staffData[index].price}/Hour
              </h6>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  calcTime() {
    let { time_start, time_end } = this.state;
    let minutes = time_end.diff(time_start, "minutes");
    this.hours = minutes / 60;
  }

  calcBookingFee() {
    let { chairs_selected, listing } = this.props;
    let chair_price = chairs_selected * listing.price * this.hours;

    this.booking_fee = chair_price * 0.15;

    return this.booking_fee;
  }

  calcTotal() {
    let { chairs_selected, listing } = this.props;
    let staffData = this.props.staff_selected;

    if (this.hours <= 0) {
      return 0;
    }

    let chair_price = chairs_selected * listing.price * this.hours;

    if (!staffData || !staffData.length) {
      return this.booking_fee + chair_price;
    }

    let subtotals = staffData.map(
      (staff, index) => staff.count * staff.price * this.hours
    );

    return (
      this.booking_fee + chair_price + subtotals.reduce((acc, sub) => sub + acc)
    );
  }

  render() {
    const { handleSubmit, submitting, listing } = this.props;

    this.calcTime();

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className="modalForm light-blue lighten-5"
      >
        <div className="form_title">
          <h5>Choose reservation options</h5>
        </div>

        <div className="row">
          <Field
            name="time_start"
            label="Doors opening"
            dateType="time_start"
            selectedDate={this.state.time_start}
            className="col s12 m6"
            component={this.renderDatePicker}
            listing={listing}
          />

          <Field
            name="time_end"
            label="Doors closing"
            dateType="time_end"
            selectedDate={this.state.time_end}
            className="col s12 m6"
            component={this.renderDatePicker}
            listing={listing}
          />
        </div>

        <div className="row">
          <label className="col s5">
            Number of appointment slots per hour
            <Field
              name={`appts_per_hour`}
              type="select"
              style={{ display: "block" }}
              component="select"
            >
              <option value={1}>1 - 60 min appointments</option>
              <option value={2}>2 - 30 min appointments</option>
              <option value={3}>3 - 20 min appointments</option>
              <option value={4}>4 - 15 min appointments</option>
            </Field>
          </label>
          <label className="col s5 offset-s2">
            Number of chairs needed
            <Field
              name={`chairs_selected`}
              type="select"
              style={{ display: "block" }}
              component="select"
            >
              {this.renderOptions(
                this.props.office.chairs,
                1,
                `- $${this.props.listing.price}/chair/hr`
              )}
            </Field>
          </label>
        </div>

        <div>
          <FieldArray
            name="staff_selected"
            className="row"
            component={this.renderStaff}
          />
        </div>

        <div className="row">
          <div className="col s6 left-align">
            <label>Booking Fee - 15% of chair time</label>
            <h6 className="red-text">${this.calcBookingFee()}</h6>
          </div>
          <div className="col s6 right-align">
            <label>Total due</label>
            <h6 className="red-text">${this.calcTotal()}</h6>
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
    staff_selected: selector(state, "staff_selected"),
    chairs_selected: selector(state, "chairs_selected")
  };
}

export default connect(mapStateToProps, actions)(ReservationOptions);
