import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";


class OfficeSearch extends Component {

  onSubmit(values) {
    const {reset} = this.props;

    console.log(values);
    reset();
  }

  renderField = ({input, label, placeholder, meta: {touched, error} }) => (
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
        className="searchModule toggle active" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="location"
          label="Where"
          placeholder="Office form"
          component={this.renderField}
        />
        <div className="form-buttons">
					<button
            className="waves-effect btn green lighten-2"
            type="submit"
            disabled={pristine || submitting}>
						Submit
					</button>
          <button
            className="waves-effect btn red lighten-2"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}>
            Clear
          </button>
				</div>
      </form>
    )
  }

}

export default reduxForm({
  form: "officeSearch"
})(connect(null)(OfficeSearch));
