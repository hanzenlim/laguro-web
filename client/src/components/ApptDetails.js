import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import moment from "moment";

class ApptDetails extends Component {
  reserveAppt() {
    const { auth, reservation, appt } = this.props;
    if (auth && auth.data) {
      this.props.reserveAppointment(reservation._id, appt._id, auth.data._id);
    }
  }

  timeComparison(time1, time2, duration) {
    return moment(time1)
      .add(duration, "minutes")
      .isAfter(moment(time2));
  }

  invalidDurationCheck(reservation, procedure, appts, index) {
    // dont allow reservations to go past the closing time
    let pastClosing = this.timeComparison(
      appts[index].time,
      reservation.time_end,
      procedure.duration
    );

    if (pastClosing) {
      return true;
    }

    // dont allow reservations that go over into the next time slot if that slot is taken
    for(var i = index; i < appts.length; i++){
      let overlap = this.timeComparison(
        appts[index].time,
        appts[i].time,
        procedure.duration
      );

      let reserved = appts[i].patient_id;

      if (overlap && reserved) {
        return true;
      }
    }

    return false;
  }

  renderProcedureButtons() {
    const { procedures, appointments, index, reservation } = this.props;
    return procedures.map(procedure => (
      <button
        key={procedure.name}
        className="waves-effect btn light-blue lighten-2"
        type="button"
        disabled={this.invalidDurationCheck(
          reservation,
          procedure,
          appointments,
          index
        )}
        onClick={this.reserveAppt.bind(this)}
      >
        {`${procedure.name} - ${procedure.duration} mins`}
      </button>
    ));
  }

  render() {
    return <div>{this.renderProcedureButtons()}</div>;
  }
}

export default connect(null, actions)(ApptDetails);
