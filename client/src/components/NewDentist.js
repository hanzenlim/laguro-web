import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FieldArray, reduxForm } from "redux-form";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class NewDentist extends Component {
	onSubmit(values) {
		const { reset } = this.props;
		this.props.createDentist({...values});
		reset();
	}

	renderField = ({ input, label, className, placeholder, meta: { touched, error } }) => (
		<div className={className}>
			<label>{label}</label>
			<div>
				<input {...input} placeholder={placeholder} />
			</div>
			{touched && error && <span>{error}</span>}
		</div>
	);

	renderProcedures = ({ fields, className, meta: { error } }) => (
		<ul className={className}>
			<label>Procedures Offered</label>
			<li>
				<button
					type="button"
					className="waves-effect btn-flat"
					onClick={() => fields.push({})}
				>
					Add Procedure
				</button>
				{error && <span>{error}</span>}
			</li>
			{fields.map((procedure, index) => (
				<li key={index} className="multiRowAdd">
					<Field
						name={`${procedure}.name`}
						type="text"
						placeholder="Implants"
						component={this.renderField}
						label="Procedure"
					/>
					<button
						type="button"
						title="Remove Procedure"
						className="red lighten-3 waves-effect btn"
						onClick={() => fields.remove(index)}
					>
						<i className="material-icons tiny">delete_forever</i>
					</button>
				</li>
			))}
		</ul>
	);

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		return (
			<form
				className="bigForm light-blue lighten-5"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<div className="form_title">
					<h4>Create a dentist profile</h4>
					<Link
						className="btn light-blue lighten-2 waves-effect"
						to={"/profile"}
					>
						Go back to profile
					</Link>
				</div>

				<div className="row">
					<Field
						name="type"
						label="Dental Specialty"
						className="col s12 m6"
						placeholder="General Dentist"
						component={this.renderField}
					/>
					<Field
						name="location"
						label="Location of practice"
						className="col s12 m6"
						placeholder="Oakland, CA"
						component={this.renderField}
					/>
				</div>

				<div className="row">
					<FieldArray
						name="procedures"
						className="col s12"
						component={this.renderProcedures}
					/>
				</div>

				<div className="form-buttons">
					<button
						className="waves-effect btn light-blue lighten-2"
						type="submit"
						disabled={pristine || submitting}
					>
						Submit
					</button>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: "newDentist"
})(connect(null, actions)(NewDentist));
