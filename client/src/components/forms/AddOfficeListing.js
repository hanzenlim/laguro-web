import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import moment from 'moment';
import styled from 'styled-components';

import * as actions from '../../actions';
import renderDatePicker from './sharedComponents/datePicker';
import { DENTIST, OFFICES } from '../../util/strings';
import { getNextHalfHour } from '../../util/timeUtil';

import { Typography, Input, Grid, Button, Option, Select } from '../common';
import { Padding } from '../common/Spacing';
import history from '../../history';

import exitSVG from '../icons/exit.svg';
import staffSVG from '../icons/staff.svg';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledRemoveStaffIcon = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const StyledImage = styled.img`
    padding-top: 10em;
`;

const required = value => (value && value !== '' ? undefined : 'Required');

class NewListing extends Component {
    async componentWillMount() {
        document.title = 'Laguro - New Listing';
        await this.props.fetchUser(DENTIST);
        const { auth } = this.props;
        await this.props.getDentist(auth.dentist.id, OFFICES);
        const office = this.props.offices[0] || {};

        this.props.initialize({
            startTime: getNextHalfHour(),
            endTime: getNextHalfHour().add(2, 'hours'),
            numChairsAvailable: 1,
            office: JSON.stringify({
                id: office.id,
                office_name: office.name,
                chairs: office.numChairs
            })
        });
    }

    handleBack() {
        history.goBack();
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
            this.props.createListing({
                ...values,
                officeId: office.id
            });
        }
    }

    renderOfficeList() {
        const { offices } = this.props;

        if (offices.length) {
            return offices.map((office, index) => (
                <Option
                    value={JSON.stringify({
                        id: office.id,
                        office_name: office.name,
                        chairs: office.numChairs
                    })}
                    key={index}
                >
                    {office.name} - {office.location}
                </Option>
            ));
        }
        return null;
    }

    renderField = ({ input, placeholder, meta: { touched, error } }) => (
        <Grid container direction="column">
            <Input {...input} placeholder={placeholder} />
            {touched && error && <span className="red-text">{error}</span>}
        </Grid>
    );

    renderStaff = ({ fields, className, meta: { error } }) => (
        <ul className={className}>
            <li>
                <Button
                    type="button"
                    color="primary"
                    onClick={() => fields.push({})}
                >
                    <Typography size="t2" weight="medium">
                        Add Staff
                    </Typography>
                </Button>
                {error && <span>{error}</span>}
            </li>
            <Padding bottom="16" />
            {fields.map((staff, index) => (
                <li key={index}>
                    <Grid container alignItems="flex-start">
                        <Grid xs>
                            <label>Staff Role</label>
                            <Field
                                name={`${staff}.role`}
                                type="text"
                                placeholder="RDA"
                                component={this.renderField}
                                label="Staff Role"
                                validate={required}
                            />
                            <Padding bottom="16" />
                        </Grid>
                        <Grid xs>
                            <label>Hourly Price</label>
                            <Field
                                name={`${staff}.price`}
                                type="text"
                                placeholder="30"
                                component={this.renderField}
                                label="Hourly Price"
                                validate={[required, isNum]}
                            />
                            <Padding bottom="16" />
                        </Grid>
                        <Grid xs>
                            <label>Number of Staff</label>
                            <Field
                                name={`${staff}.count`}
                                type="text"
                                placeholder="3"
                                component={this.renderField}
                                label="Number of Staff"
                                validate={[required, isNum]}
                            />
                            <Padding bottom="16" />
                        </Grid>
                        <Grid>
                            <StyledRemoveStaffIcon
                                type="button"
                                title="Remove Staff"
                                onClick={() => fields.remove(index)}
                            >
                                <img src={exitSVG} alt="Remove Staff" />
                            </StyledRemoveStaffIcon>
                            <Padding bottom="16" />
                        </Grid>
                    </Grid>
                </li>
            ))}
        </ul>
    );

    renderOptions = (maxAvail, minAvail = 1, label = '') => {
        const options = [];
        for (let i = minAvail; i <= maxAvail; i++) {
            options.push(
                <Option value={Number(i)} key={i}>
                    {`${i} ${label}`}
                </Option>
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

    renderSelect = props => {
        const {
            input,
            disabled,
            meta: { touched, error },
            children
        } = props;

        return (
            <Grid container>
                <Select {...input} disabled={disabled}>
                    {children}
                </Select>
                {touched &&
                    (error && <span className="red-text">{error}</span>)}
            </Grid>
        );
    };

    render() {
        const { handleSubmit, submitting, error, selectedOffice } = this.props;

        if (!this.props.initialized || !this.props.offices) {
            return <div>Loading...</div>;
        }

        this.calcTime();

        return (
            <StyledContainer>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t1">
                                        Now that you have created an office, we
                                        need a few more details
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3">Step 3</Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="16" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3" weight="bold">
                                        Add more details about your office
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <label>Office Name</label>
                                    <Field
                                        disabled
                                        label="Office Name"
                                        name="office"
                                        style={{ display: 'block' }}
                                        component={this.renderSelect}
                                    >
                                        {this.renderOfficeList()}
                                    </Field>
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        name="startTime"
                                        label="Opening Time"
                                        dateType="startTime"
                                        className="col s12 m6"
                                        component={renderDatePicker}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field
                                        name="endTime"
                                        label="Closing Time"
                                        dateType="endTime"
                                        className="col s12 m6"
                                        component={renderDatePicker}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <label>Price per chair (hourly)</label>
                                    <Field
                                        name="chairHourlyPrice"
                                        label="Price per chair (hourly)"
                                        placeholder="100"
                                        component={this.renderField}
                                        validate={[required, isNum]}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <label>Number of chairs available</label>
                                    <Field
                                        name="numChairsAvailable"
                                        type="select"
                                        style={{ display: 'block' }}
                                        component={this.renderSelect}
                                    >
                                        {this.renderOptions(
                                            selectedOffice
                                                ? JSON.parse(selectedOffice)
                                                    .chairs
                                                : 1,
                                            1
                                        )}
                                    </Field>
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12}>
                                    <label>Cleaning Fee</label>
                                    <Field
                                        name="cleaningFee"
                                        label="Cleaning Fee"
                                        placeholder="50"
                                        component={this.renderField}
                                        validate={[required, isNum]}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>
                            <div className="row">
                                <FieldArray
                                    name="staffAvailable"
                                    component={this.renderStaff}
                                />
                                <Padding bottom="16" />
                            </div>

                            <Grid container>
                                <Grid item xs={12}>
                                    <label>
                                        Total due - 20% of total chair rental
                                        fee
                                    </label>
                                    <h6 className="red-text">
                                        ${this.calcTotal()}
                                    </h6>
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container justify="flex-end">
                                <Grid item>
                                    {error && (
                                        <strong className="red-text">
                                            {error}
                                        </strong>
                                    )}
                                    <Button
                                        color="secondary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        <Typography size="t2" weight="medium">
                                            Submit
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container justify="center">
                            <StyledImage src={staffSVG} />
                        </Grid>
                    </Grid>
                </Grid>
            </StyledContainer>
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
