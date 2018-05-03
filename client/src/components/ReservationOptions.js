import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Field,
  FieldArray,
  reduxForm,
  formValueSelector,
  SubmissionError
} from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";

import * as actions from "../actions";

import "react-datepicker/dist/react-datepicker.css";

class ReservationOptions extends Component {
  componentWillMount() {
    const { listing, office } = this.props;

    this.props.initialize({
      staff_selected: listing.staff,
      equip_selected: office.equipment,
      chairs_selected: 1,
      appts_per_hour: 1,
      time_start: moment(listing.time_available),
      time_end: moment(listing.time_closed),
      acknowledge: false
    });
  }

  createReservation(values) {
    const { listing, office, time_start, time_end } = this.props;

    if (
      moment(time_start)
        .add(2, "hours")
        .isAfter(time_end)
    ) {
      throw new SubmissionError({
        time_end: "Minimum reservation is 2 hours",
        _error: "Invalid time frame, please correct error above"
      });
    } else if (!values.acknowledge) {
      throw new SubmissionError({
        _error: "Please accept the terms to continue"
      });
    } else {
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
          break;
      }

      let appt_time = moment(time_start);
      let appointments = [];

      while (appt_time.isBefore(moment(time_end))) {
        appointments.push({ time: appt_time.format("MMM D, YYYY h:mm a") });
        appt_time = appt_time.add(duration, "minutes");
      }

      let equip_selected = values.equip_selected.filter(equip => equip.needed)

      let staff_selected = values.staff_selected.filter(staff => staff.count > 0)

      this.props.createReservation({
        ...values,
        staff_selected,
        equip_selected,
        listing_id: listing._id,
        office_id: office._id,
        host_id: listing.host,
        office_name: office.name,
        office_img: office.img_url[0],
        appointments,
        total_paid: this.calcTotal()
      });

      this.closeModals();
    }
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

  renderDatePicker = ({
    input,
    label,
    className,
    selectedDate,
    dateType,
    listing,
    meta: { touched, error }
  }) => {
    const { time_start, time_end } = this.props;
    return (
      <div className={className}>
        <label>{label}</label>
        <DatePicker
          selected={input.value}
          onChange={input.onChange.bind(this)}
          dateFormat="LLL"
          placeholderText={moment().format("MMM DD, YYYY")}
          minDate={moment(listing.time_available)}
          maxDate={moment(listing.time_closed)}
          minTime={
            dateType === "time_start"
              ? moment(listing.time_available)
              : moment(time_start).add(2, "hours")
          }
          maxTime={
            dateType === "time_start"
              ? moment(time_end).subtract(2, "hours")
              : moment(listing.time_closed)
          }
          showTimeSelect
          timeFormat="h:mm"
          timeIntervals={60}
          timeCaption="Time"
        />
        {touched && error && <span className="red-text">{error}</span>}
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

  renderEquipment = ({ fields, className, meta: { error } }) => {
    let equipData = this.props.equip_selected;
    return (
      <ul className={className}>
        <label>Equipment Available</label>
        {fields.map((equipment, index) => (
          <li key={index} className="multiRowAdd">
            {`${equipData[index].name} - $${equipData[index].price}`}
            <Field
              name={`${equipment}.needed`}
              id={`equip${index}`}
              component="input"
              type="checkbox"
            />
          </li>
        ))}
      </ul>
    );
  };

  calcTime() {
    let { time_start, time_end } = this.props;
    let minutes = time_end.diff(time_start, "minutes");
    this.hours = minutes / 60;
  }

  calcBookingFee() {
    let { chairs_selected, listing } = this.props;
    let chair_price = chairs_selected * listing.price * this.hours;

    this.booking_fee = Number(Math.floor(chair_price * 0.15));

    return this.booking_fee.toFixed(2);
  }

  calcTotal() {
    let { chairs_selected, listing } = this.props;
    let staffData = this.props.staff_selected;
    let equipData = this.props.equip_selected;
    this.staffTotal = 0;
    this.equipTotal = 0;

    if (this.hours <= 0) {
      return 0;
    }

    let chair_price = chairs_selected * listing.price * this.hours;

    if (staffData && staffData.length) {
      this.staffTotal = staffData
        .map((staff, index) => staff.count * staff.price * this.hours)
        .reduce((acc, sub) => sub + acc, 0);
    }

    if (equipData && equipData.length) {
      this.equipTotal = equipData
        .filter(equip => equip.needed)
        .map(equip => equip.price)
        .reduce((acc, sub) => sub + acc, 0);
    }

    let total =
      this.booking_fee + chair_price + this.equipTotal + this.staffTotal;
    return total.toFixed(2);
  }

  render() {
    const {
      handleSubmit,
      submitting,
      listing,
      error,
      staff_selected,
      equip_selected
    } = this.props;

    if (!this.props.initialized) return <div>Loading...</div>;

    this.calcTime();

    return (
      <form
        onSubmit={handleSubmit(this.createReservation.bind(this))}
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
            className="col s12 m6"
            component={this.renderDatePicker}
            listing={listing}
          />

          <Field
            name="time_end"
            label="Doors closing"
            dateType="time_end"
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
                this.props.listing.chairs_available,
                1,
                `- $${this.props.listing.price}/chair/hr`
              )}
            </Field>
          </label>
        </div>

        {staff_selected && staff_selected.length ? (
          <div>
            <FieldArray
              name="staff_selected"
              className="row"
              component={this.renderStaff}
            />
          </div>
        ) : (
          <div />
        )}

        {equip_selected && equip_selected.length ? (
          <div>
            <FieldArray
              name="equip_selected"
              className="row"
              component={this.renderEquipment}
            />
          </div>
        ) : (
          <div />
        )}

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

        <div className="row">
          <sub>
            *An additional 10% of final patient payment will be deducted on
            completion of procedure for use of Laguro services
          </sub>
          <br />
          <sub>
            **Payment for first two hours of selected staff payroll and booking
            fee are non-refundable
          </sub>
        </div>

        <div
          className="row valign-wrapper"
          style={{ marginTop: "30px", marginBottom: "0px" }}
        >
          <div className="col s7 left-align">
            <Field
              name="acknowledge"
              id="acknowledge"
              component="input"
              type="checkbox"
              className="browser-default"
            />
            I understand and agree to the terms above
          </div>
          <div className="form-buttons col s5 right-align">
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

ReservationOptions = reduxForm({
  form: "reservationOptions"
})(ReservationOptions);

function mapStateToProps(state) {
  const selector = formValueSelector("reservationOptions");
  return {
    staff_selected: selector(state, "staff_selected"),
    chairs_selected: selector(state, "chairs_selected"),
    equip_selected: selector(state, "equip_selected"),
    time_start: selector(state, "time_start"),
    time_end: selector(state, "time_end")
  };
}

export default connect(mapStateToProps, actions)(ReservationOptions);
