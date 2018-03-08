import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";

class LocationFilter extends Component {
	onSubmit(values) {
		this.props.updateFilters({location: values.location})
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

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		return (
			<form
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<Field
					name="location"
					label="New Location"
					placeholder={this.props.searchLocation}
					component={this.renderField}
				/>
				<div className="form-buttons">
					<button
						className="waves-effect btn light-blue lighten-2"
						type="submit"
						disabled={pristine || submitting}
					>
						Search
					</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "locationFilter"
})(connect(null, actions)(LocationFilter));
