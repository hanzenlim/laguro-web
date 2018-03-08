import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as actions from "../../actions";

import "react-datepicker/dist/react-datepicker.css";


class DateFilter extends Component {
	handleChange(date) {
		this.props.updateFilters({date: date})
	}

	render() {

		return (
			<DatePicker
				className="dropdown btn light-blue lighten-1"
		  	selected={this.props.selectedDate ? moment(this.props.selectedDate) : moment()}
		  	onChange={this.handleChange.bind(this)}
			/>
		);
	}
}

export default connect(null, actions)(DateFilter);
