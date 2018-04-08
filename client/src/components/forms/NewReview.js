import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ReactStars from "react-stars";

import * as actions from "../../actions";

class NewDentist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 3.5
		}
	}

  ratingPhrase() {
    let roundedRating = Math.floor(Math.abs(this.state.rating - 1));
		let phrases = ["Awful", "Okay", "Good", "Great!", "The Best!!"]
    return phrases[roundedRating];
  }

  onSubmit(values) {
    const { reset, dentist } = this.props;
		const { rating } = this.state;
    // console.log({...values, rating, reviewee_id: dentist._id});
    this.props.createReview({...values, rating, reviewee_id: dentist._id});
    reset();
  }

  renderTextArea = ({
    input,
    label,
    className,
    placeholder,
    meta: { touched, error }
  }) => (
    <div className={className}>
      <div className="input-field">
				<i className="material-icons prefix">mode_edit</i>
        <textarea
          {...input}
          className="materialize-textarea"
          placeholder={placeholder}
        />
      </div>
      {touched && error && <span className="red-text">{error}</span>}
    </div>
  );

	ratingChanged = (newRating) => {
		this.setState({rating: newRating})
	}

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        className="card-panel orange lighten-5"
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <div className="row valign-wrapper">
					<h5 className="col s12 m5">Leave a review</h5>
					<ReactStars
						className="col s6 m4 center-align"
						count={5}
						size={24}
						onChange={this.ratingChanged}
						value={this.state.rating}
					/>
					<h6 className="col s6 m3">{this.ratingPhrase()}</h6>
				</div>
				<div className="row valign-wrapper">
					<Field
						name="text"
						className="col s12 m9"
						placeholder={this.props.dentist.name + " was a great dentist!"}
						component={this.renderTextArea}
						validate={required}
					/>
					<div className="form-buttons col s12 m3">
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

const required = value => (value && value !== "" ? undefined : "Required");

export default reduxForm({
  form: "newDentist"
})(connect(null, actions)(NewDentist));
