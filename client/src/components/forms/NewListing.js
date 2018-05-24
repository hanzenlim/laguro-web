import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../actions';
import { DENTIST, OFFICES } from '../../util/strings';

const required = value => (value && value !== '' ? undefined : 'Required');

class NewListing extends Component {
    async componentWillMount() {
        document.title = 'Laguro - New Listing';
        await this.props.fetchUser(DENTIST);
        const { auth } = this.props;
        await this.props.getDentist(auth.dentist.id, OFFICES);

        this.props.initialize({
            startTime: moment(),
            endTime: moment(),
            numChairsAvailable: 1
        });
    }

    onSubmit(values) {
        if (
            // if chosen duration is less than 2 hrs
            moment(values.startTime)
                .add(2, 'hours')
                .isAfter(values.endTime)
        ) {
            throw new SubmissionError({
                endTime: 'Minimum reservation is 2 hours'
            });
        } else if (!values.office) {
            throw new SubmissionError({
                office: 'Please select an office',
                _error: 'Please select an office above'
            });
        } else {
            const office = JSON.parse(values.office);
            values.staffAvailable = values.staffAvailable || [];
            delete values.office;
            values.totalPaid = Math.round(this.calcTotal() * 100);
            this.props.createListing({
                ...values,
                officeId: office.id
            });
        }
    }

    renderOffices() {
        const { offices } = this.props;

        if (offices.length) {
            return offices.map((office, index) => (
                <option
                    value={JSON.stringify({
                        id: office.id,
                        office_name: office.name,
                        chairs: office.numChairs
                    })}
                    key={index}
                >
                    {office.name} - {office.location}
                </option>
            ));
        }
        return null;
    }

    renderField = ({
        input,
        label,
        placeholder,
        className,
        meta: { touched, error }
    }) => (
        <div className={className}>
            <label>{label}</label>
            <div>
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
                        validate={[required, isNum]}
                    />
                    <Field
                        name={`${staff}.count`}
                        type="text"
                        placeholder="3"
                        component={this.renderField}
                        label="Number of Staff"
                        validate={[required, isNum]}
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

    renderDatePicker = ({
        input,
        label,
        className,
        meta: { touched, error }
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
            options.push(
                <option value={Number(i)} key={i}>
                    {`${i} ${label}`}
                </option>
            );
        }
        return options;
    };

    calcTime() {
        const { startTime, endTime } = this.props;
        const minutes = endTime.diff(startTime, 'minutes');
        this.hours = minutes / 60;
    }

    calcTotal() {
        const { price, numChairsAvailable } = this.props;
        if (this.hours <= 0 || !numChairsAvailable || !price) {
            return 0;
        }

        return Math.floor(
            numChairsAvailable * price * this.hours * 0.2
        ).toFixed(2);
    }

    render() {
        const { handleSubmit, submitting, error, selectedOffice } = this.props;

        if (!this.props.initialized || !this.props.offices) {
            return <div>Loading...</div>;
        }

        this.calcTime();

        return (
            <form
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                className="bigForm light-blue lighten-5"
            >
                <div className="form_title">
                    <h4>Create a new listing</h4>
                    <Link
                        className="btn light-blue lighten-2 waves-effect"
                        to={'/profile'}
                    >
                        Go back to profile
                    </Link>
                </div>

                <label>
                    Select an existing office
                    <Field
                        name="office"
                        style={{ display: 'block' }}
                        component="select"
                    >
                        <option value="">Please select an office...</option>
                        {this.renderOffices()}
                    </Field>
                </label>

                <div className="row">
                    <Field
                        name="startTime"
                        label="Opening Time"
                        dateType="startTime"
                        className="col s12 m6"
                        component={this.renderDatePicker}
                    />

                    <Field
                        name="endTime"
                        label="Closing Time"
                        dateType="endTime"
                        className="col s12 m6"
                        component={this.renderDatePicker}
                    />
                </div>

                <div className="row">
                    <Field
                        name="chairHourlyPrice"
                        label="Price per chair (hourly)"
                        placeholder="100"
                        className="col s4"
                        component={this.renderField}
                        validate={[required, isNum]}
                    />

                    <label className="col s4">
                        Number of chairs available
                        <Field
                            name="numChairsAvailable"
                            type="select"
                            style={{ display: 'block' }}
                            component="select"
                        >
                            {this.renderOptions(
                                selectedOffice
                                    ? JSON.parse(selectedOffice).chairs
                                    : 1,
                                1
                            )}
                        </Field>
                    </label>

                    <Field
                        name="cleaningFee"
                        label="Cleaning Fee"
                        placeholder="50"
                        className="col s4"
                        component={this.renderField}
                        validate={[required, isNum]}
                    />
                </div>

                <div className="row">
                    <FieldArray
                        name="staffAvailable"
                        className="col s12"
                        component={this.renderStaff}
                    />
                </div>

                <div className="row valign-wrapper">
                    <div className="col s6 left-align">
                        <label>Total due - 20% of total chair rental fee</label>
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

const isNum = value =>
    value && !isNaN(value) ? undefined : 'Must be a number';

const mapStateToProps = state => {
    const selector = formValueSelector('newListing');
    return {
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime'),
        price: selector(state, 'price'),
        selectedOffice: selector(state, 'office'),
        numChairsAvailable: selector(state, 'numChairsAvailable'),
        auth: state.auth,
        offices: state.dentists.selectedDentist
            ? state.dentists.selectedDentist.offices
            : []
    };
};

export default reduxForm({
    form: 'newListing'
})(connect(mapStateToProps, actions)(NewListing));
