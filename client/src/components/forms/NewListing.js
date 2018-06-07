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
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../actions';
import { DENTIST, OFFICES } from '../../util/strings';
import { getNextHalfHour } from '../../util/timeUtil';
import { dollarMinimum, required, isNum } from './formValidation';
import {
    renderField,
    renderSelect,
    renderOptions,
    renderOfficeOptions,
    renderDatePicker
} from './sharedComponents';

class NewListing extends Component {
    async componentWillMount() {
        document.title = 'Laguro - New Listing';
        await this.props.fetchUser(DENTIST);
        const { auth } = this.props;
        await this.props.getDentist(auth.dentist.id, OFFICES);

        this.props.initialize({
            startTime: getNextHalfHour(),
            endTime: getNextHalfHour().add(2, 'hours'),
            numChairsAvailable: 1
        });
    }

    onSubmit(values) {
        if (
            // endTime should be after startTime
            moment(values.endTime).isBefore(values.startTime)
        ) {
            throw new SubmissionError({
                endTime: 'Closing time must be after opening time'
            });
        } else if (
            // if chosen duration is less than 1 hrs
            moment(values.startTime)
                .add(1, 'hours')
                .isAfter(values.endTime)
        ) {
            throw new SubmissionError({
                endTime: 'Minimum reservation is 1 hour'
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
            this.props.createListing({
                ...values,
                officeId: office.id
            });
        }
    }

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
                        component={renderField}
                        label="Staff Role"
                        validate={required}
                    />
                    <Field
                        name={`${staff}.price`}
                        type="text"
                        placeholder="30"
                        component={renderField}
                        label="Hourly Price"
                        validate={[required, isNum]}
                    />
                    <Field
                        name={`${staff}.count`}
                        type="text"
                        placeholder="3"
                        component={renderField}
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
        const {
            handleSubmit,
            submitting,
            error,
            selectedOffice,
            offices
        } = this.props;

        if (!this.props.initialized || !offices) {
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
                        component={renderSelect}
                    >
                        {renderOfficeOptions(offices)}
                    </Field>
                </label>

                <div className="row">
                    <Field
                        name="startTime"
                        label="Opening Time"
                        dateType="startTime"
                        className="col s12 m6"
                        component={renderDatePicker}
                    />

                    <Field
                        name="endTime"
                        label="Closing Time"
                        dateType="endTime"
                        className="col s12 m6"
                        component={renderDatePicker}
                    />
                </div>

                <div className="row">
                    <Field
                        name="chairHourlyPrice"
                        label="Price per chair (hourly)"
                        placeholder="100"
                        className="col s4"
                        component={renderField}
                        validate={[required, isNum, dollarMinimum]}
                    />

                    <label className="col s4">
                        Number of chairs available
                        <Field
                            name="numChairsAvailable"
                            type="select"
                            style={{ display: 'block' }}
                            component={renderSelect}
                        >
                            {renderOptions(
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
                        component={renderField}
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
