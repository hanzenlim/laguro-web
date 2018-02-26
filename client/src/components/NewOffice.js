import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import * as actions from "../actions";

class NewOffice extends Component {
	loginMessage(){
    const { auth } = this.props;
    return(
      auth && auth.data === "" ? <Link
				className="red-text"
        to={'/auth/google'}
      >Login to create new offices</Link> : ""
    )
  }

	onSubmit(values) {
		const { reset } = this.props;

		this.props.createOffice(values);
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

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;

		return (
			<form
				className="bigForm light-blue lighten-5"
				onSubmit={handleSubmit(this.onSubmit.bind(this))}
			>
				<h4>Create a new office</h4>

				<Field
					name="name"
					label="Office Name"
					placeholder="Bell Dental Center"
					component={this.renderField}
				/>
				<Field
					name="location"
					label="Address"
					placeholder="1598 Washington Ave, San Leandro, CA"
					component={this.renderField}
				/>
				<Field
					name="chairs"
					label="Number of Chairs"
					placeholder={3}
					component={this.renderField}
				/>
				<div className="form-buttons">
					{this.loginMessage()}
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
						validate={loginCheck}
					>
						Clear
					</button>
				</div>
			</form>
		);
	}
}

const loginCheck = (user = this.props.auth) => (user && user.data !== "")

function mapStateToProps(state){
	return{ auth: state.auth }
}

export default reduxForm({
	form: "newOffice"
})(connect(mapStateToProps, actions)(NewOffice));
