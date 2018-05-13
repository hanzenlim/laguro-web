import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector,
    SubmissionError,
} from 'redux-form';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../actions';

const required = value => (value && value !== '' ? undefined : 'Required');

class EditListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listing: {},
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Edit Listing';

        this.listing_id = this.props.computedMatch.params.id;

        this.getListing().then((listing) => {
            this.setState({
                listing,
            });

            this.props.initialize({
                timeAvailable: moment(listing.timeAvailable),
                timeClosed: moment(listing.timeClosed),
                staff: listing.staff,
                cleaning_fee: listing.cleaning_fee,
                chairsAvailable: listing.chairsAvailable,
                price: listing.price,
            });
        });
    }

    onSubmit(values) {
        if (
        // if chosen duration is less than 2 hrs
            moment(values.timeAvailable)
                .add(2, 'hours')
                .isAfter(values.timeClosed)
        ) {
            throw new SubmissionError({
                timeClosed: 'Minimum reservation is 2 hours',
            });
        } else {
            this.props.editListing({ ...values, id: this.listing_id });
        }
    }

    async getListing() {
        await this.props.fetchListings();

        const { listings } = this.props;
        if (listings.length) {
            const filteredListing = listings.filter(listing => listing._id === this.listing_id);
            return filteredListing[0];
        }
        return {};
    }

    renderField = ({
        input,
        label,
        placeholder,
        className,
        meta: { touched, error },
    }) => (
        <div>
            <div className={className}>
                <label>{label}</label>
                <input {...input} placeholder={placeholder} />
            </div>
            {touched && error && <span className="red-text">{error}</span>}
        </div>
    );

  renderStaff = ({ fields, className, meta: { error } }) => (
      <ul className={className}>
          <label>Staff Available</label>
          <li>
              <button
                  type="button"
                  className="waves-effect btn-flat"
                  onClick={() => fields.push({})}
              >
          Add Staff
              </button>
              {error && <span>{error}</span>}
          </li>
          {fields.map((staff, index) => (
              <li key={index} className="multiRowAdd">
                  <Field
                      name={`${staff}.role`}
                      type="text"
                      placeholder="RDA"
                      component={this.renderField}
                      label="Staff Role"
                      validate={required}
                  />
                  <Field
                      name={`${staff}.price`}
                      type="text"
                      placeholder="30"
                      component={this.renderField}
                      label="Hourly Price"
                      validate={required}
                  />
                  <Field
                      name={`${staff}.count`}
                      type="text"
                      placeholder="3"
                      component={this.renderField}
                      label="Number of Staff"
                      validate={required}
                  />
                  <button
                      type="button"
                      title="Remove Staff"
                      className="red lighten-3 waves-effect btn"
                      onClick={() => fields.remove(index)}
                  >
                      <i className="material-icons tiny">delete_forever</i>
                  </button>
              </li>
          ))}
      </ul>
  );

  handleChange(dateType, date) {
      const stateObject = {};
      stateObject[dateType] = date;

      this.setState(stateObject);
  }

  renderDatePicker = ({
      input,
      label,
      className,
      meta: { touched, error },
  }) => (
      <div className={className}>
          <label>{label}</label>
          <DatePicker
              selected={input.value}
              onChange={input.onChange.bind(this)}
              dateFormat="LLL"
              placeholderText={moment().format('LLL')}
              minDate={moment()}
              showTimeSelect
              withPortal
              timeFormat="h:mm a"
              timeIntervals={60}
              timeCaption="Time"
          />
          {touched && error && <span className="red-text">{error}</span>}
      </div>
  );

  renderOptions = (maxAvail, minAvail = 1, label = '') => {
      const options = [];
      for (let i = minAvail; i <= maxAvail; i++) {
          options.push(<option value={Number(i)} key={i}>
              {`${i} ${label}`}
          </option>);
      }
      return options;
  };

  calcTime() {
      const { timeAvailable, timeClosed } = this.props;
      const minutes = timeClosed.diff(timeAvailable, 'minutes');
      this.hours = minutes / 60;
  }

  calcTotal() {
      const { price, chairsAvailable } = this.props;
      const { listing } = this.state;

      if (this.hours <= 0 || !chairsAvailable || !price) {
          return 0;
      }

      const oldMinutes = moment(listing.timeClosed).diff(
          moment(listing.timeAvailable),
          'minutes',
      );
      const oldHours = oldMinutes / 60;

      const oldTotal = listing.chairsAvailable * listing.price * oldHours;
      const newTotal = chairsAvailable * price * this.hours;

      const totalDiff = newTotal - oldTotal;
      if (totalDiff <= 0) return 0;

      return Math.floor(totalDiff * 0.2).toFixed(2);
  }

  render() {
      const { handleSubmit, submitting, error } = this.props;

      if (!this.props.initialized || this.props.isFetching) { return <div>Loading...</div>; }

      this.calcTime();

      return (
          <form
              onSubmit={handleSubmit(this.onSubmit.bind(this))}
              className="bigForm light-blue lighten-5"
          >
              <div className="form_title">
                  <h4>Edit office listing</h4>
                  <Link
                      className="btn light-blue lighten-2 waves-effect"
                      to={'/profile'}
                  >
            Go back to profile
                  </Link>
              </div>

              <div className="row">
                  <Field
                      name="timeAvailable"
                      label="Opening Time"
                      dateType="timeAvailable"
                      className="col s12 m6"
                      component={this.renderDatePicker}
                  />

                  <Field
                      name="timeClosed"
                      label="Closing Time"
                      dateType="timeClosed"
                      className="col s12 m6"
                      component={this.renderDatePicker}
                  />
              </div>

              <div className="row">
                  <Field
                      name="price"
                      label="Price per chair (hourly)"
                      placeholder="100"
                      className="col s12 m4"
                      validate={required}
                      component={this.renderField}
                  />

                  <label className="col s12 m4">
            Number of chairs available
                      <Field
                          name="chairsAvailable"
                          type="select"
                          style={{ display: 'block' }}
                          component="select"
                      >
                          {this.renderOptions((this.state.listing.office_chairs: 1), 1)}
                      </Field>
                  </label>

                  <Field
                      name="cleaning_fee"
                      label="Cleaning Fee"
                      placeholder="50"
                      className="col s12 m4"
                      validate={required}
                      component={this.renderField}
                  />
              </div>

              <div className="row">
                  <FieldArray
                      name="staff"
                      className="col s12"
                      component={this.renderStaff}
                  />
              </div>

              <div className="row valign-wrapper">
                  <div className="col s6 left-align">
                      <label>
              Additional listing fee due - 20% of adjusted chair rental fee
                      </label>
                      <h6 className="red-text">${this.calcTotal()}</h6>
                  </div>
                  <div className="form-buttons col s6 right-align">
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

const mapStateToProps = (state) => {
    const selector = formValueSelector('editListing');
    return {
        timeAvailable: selector(state, 'timeAvailable'),
        timeClosed: selector(state, 'timeClosed'),
        chairsAvailable: selector(state, 'chairsAvailable'),
        price: selector(state, 'price'),
        listings: state.listings.all,
        isFetching: state.listings.isFetching,
    };
};

export default reduxForm({
    form: 'editListing',
})(connect(mapStateToProps, actions)(EditListing));
