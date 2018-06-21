import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    reduxForm,
    formValueSelector,
    SubmissionError
} from 'redux-form';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../actions';
import { required, isNum } from './formValidation';
import {
    renderField,
    renderDatePicker,
    renderOptions
} from './sharedComponents';

class EditListing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listing: {}
        };
    }

    componentWillMount() {
        document.title = 'Laguro - Edit Listing';

        this.office_id = this.props.computedMatch.params.office_id;
        this.listing_id = this.props.computedMatch.params.id;

        this.loadListing();
    }

    async loadListing() {
        await this.props.getOffice(this.office_id);
        await this.props.getListing(this.listing_id);

        const listing = this.props.listing;
        this.setState({
            listing
        });

        this.props.initialize({
            startTime: moment(listing.startTime),
            endTime: moment(listing.endTime),
            numChairsAvailable: listing.numChairsAvailable,
            chairHourlyPrice: listing.chairHourlyPrice
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
        } else {
            // TODO aggregate misc expenses
            this.props.editListing({ ...values, id: this.listing_id });
        }
    }

    handleChange(dateType, date) {
        const stateObject = {};
        stateObject[dateType] = date;

        this.setState(stateObject);
    }

    calcTime() {
        const { startTime, endTime } = this.props;
        const minutes = endTime.diff(startTime, 'minutes');
        this.hours = minutes / 60;
    }

    calcTotal() {
        const { price, chairsAvailable } = this.props;
        const { listing } = this.state;

        if (this.hours <= 0 || !chairsAvailable || !price) {
            return 0;
        }

        const oldMinutes = moment(listing.endTime).diff(
            moment(listing.startTime),
            'minutes'
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

        if (!this.props.initialized || this.props.isFetching) {
            return <div>Loading...</div>;
        }

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
                        className="col s12 m4"
                        validate={[required, isNum]}
                        component={renderField}
                    />

                    <label className="col s12 m4">
                        Number of chairs available
                        <Field
                            name="numChairsAvailable"
                            type="select"
                            style={{ display: 'block' }}
                            component="select"
                        >
                            {renderOptions((this.props.office.numChairs: 1), 1)}
                        </Field>
                    </label>

                    <Field
                        name="cleaningFee"
                        label="Cleaning Fee"
                        placeholder="50"
                        className="col s12 m4"
                        validate={[required, isNum]}
                        component={renderField}
                    />
                </div>

                <div className="row valign-wrapper">
                    <div className="col s6 left-align">
                        <label>
                            Additional listing fee due - 20% of adjusted chair
                            rental fee
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

const mapStateToProps = state => {
    const selector = formValueSelector('editListing');
    return {
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime'),
        chairsAvailable: selector(state, 'chairsAvailable'),
        price: selector(state, 'price'),
        listing: state.listings.selected,
        isFetching: state.listings.isFetching,
        office: state.offices.selected
    };
};

export default reduxForm({
    form: 'editListing'
})(connect(mapStateToProps, actions)(EditListing));
