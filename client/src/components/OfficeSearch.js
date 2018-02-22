import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as actions from "../actions";

import "react-datepicker/dist/react-datepicker.css";

class OfficeSearch extends Component {
	onSubmit(values) {
		const { reset } = this.props;

		this.props.searchOffices(values);
		reset();
	}

	renderField = ({ input, label, placeholder, meta: { touched, error } }) => (
		<div>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
		</div>
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
			<form
				className="searchModule toggle active"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<Field
					name="location"
					label="Where"
					placeholder="San Leandro, CA"
					component={this.renderField}
				/>
				<Field name="date" label="When" component={this.renderDatePicker} />
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

export default reduxForm({
	form: "officeSearch"
})(connect(null, actions)(OfficeSearch));
