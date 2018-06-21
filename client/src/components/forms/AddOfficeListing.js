import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import moment from 'moment';
import queryString from 'query-string';
import styled from 'styled-components';

import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import { getNextHalfHour } from '../../util/timeUtil';
import { Typography, Grid, Button } from '../common';
import { Padding } from '../common/Spacing';

import {
    renderDatePicker,
    renderField,
    renderOptions,
    renderSelect
} from './sharedComponents';
import { required, isNum, dollarMinimum } from './formValidation';

import history from '../../history';
import staffSVG from '../icons/staff.svg';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledImage = styled.img`
    padding-top: 10em;
`;

class NewListing extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);

        this.props.initialize({
            office: this.urlParams.name,
            cleaningFee: this.urlParams.cleaningFee,
            chairHourlyPrice: this.urlParams.chairHourlyPrice,
            startTime: this.urlParams.startTime
                ? moment(this.urlParams.startTime)
                : getNextHalfHour(),
            endTime: this.urlParams.endTime
                ? moment(this.urlParams.endTime)
                : getNextHalfHour().add(2, 'hours'),
            numChairsAvailable: this.urlParams.numChairsAvailable
                ? Number(this.urlParams.numChairsAvailable)
                : 1,
            staffAvailable: this.urlParams.staffAvailable
                ? JSON.parse(this.urlParams.staffAvailable)
                : []
        });
    }

    async componentWillMount() {
        document.title = 'Laguro - New Listing';
        await this.props.fetchUser(DENTIST);
    }

    handleBack = () => {
        const params = queryString.stringify({
            ...this.urlParams,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            chairHourlyPrice: this.props.chairHourlyPrice,
            cleaningFee: this.props.cleaningFee,
            numChairsAvailable: this.props.numChairsAvailable,
            staffAvailable: this.props.staffAvailable
                ? JSON.stringify(this.props.staffAvailable)
                : []
        });

        history.push(`/landlord-onboarding/add-equipments?${params}`);
    };

    async onSubmit(values) {
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
            values.staffAvailable = values.staffAvailable || [];
            delete values.office;

            const {
                name,
                location,
                numChairs,
                imageUrls,
                equipment
            } = this.urlParams;

            await this.props.createOffice({
                name,
                location,
                numChairs,
                hostId: this.props.auth.dentist.id,
                imageUrls: JSON.parse(imageUrls),
                equipment: JSON.parse(equipment)
            });

            await this.props.createListing({
                ...values,
                officeId: this.props.offices[0].id
            });
        }
    }

    calcTime() {
        const { startTime, endTime } = this.props;
        const minutes = endTime.diff(startTime, 'minutes');
        this.hours = minutes / 60;
    }

    render() {
        const { handleSubmit, submitting, error } = this.props;

        if (!this.props.initialized) {
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
                                    <Typography fontSize={5}>
                                        Now that you have created an office, we
                                        need to create a listing
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography size="t3" weight="bold">
                                        Add more details about your listing
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <Grid container>
                                <Grid item xs={12}>
                                    <Field
                                        disabled
                                        label="Office Name"
                                        name="office"
                                        component={renderField}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item xs={12} md={5}>
                                    <Field
                                        name="startTime"
                                        label="Opening Time"
                                        dateType="startTime"
                                        className="col s12 m6"
                                        component={renderDatePicker}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item md={2} />
                                <Grid item xs={12} md={5}>
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
                                <Grid item xs={12} md={4}>
                                    <Field
                                        name="chairHourlyPrice"
                                        label="Price per chair (hourly)"
                                        placeholder="100"
                                        component={renderField}
                                        validate={[
                                            required,
                                            isNum,
                                            dollarMinimum
                                        ]}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item md={1} />
                                <Grid item xs={12} md={2}>
                                    <Field
                                        name="cleaningFee"
                                        label="Cleaning Fee"
                                        placeholder="50"
                                        component={renderField}
                                        validate={[required, isNum]}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item md={1} />
                                <Grid item xs={12} md={4}>
                                    <Field
                                        name="numChairsAvailable"
                                        label="Number of chairs available"
                                        type="select"
                                        style={{ display: 'block' }}
                                        component={renderSelect}
                                    >
                                        {renderOptions(
                                            this.urlParams.numChairs || 1,
                                            1
                                        )}
                                    </Field>
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container justify="space-between">
                                <Grid item>
                                    <Button
                                        color="default"
                                        onClick={this.handleBack}
                                    >
                                        <Typography size="t2" weight="medium">
                                            Previous
                                        </Typography>
                                    </Button>
                                </Grid>
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
                                        <Typography
                                            fontSize={4}
                                            fontWeight="medium"
                                        >
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

const mapStateToProps = state => {
    const selector = formValueSelector('newListing');
    return {
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime'),
        chairHourlyPrice: selector(state, 'chairHourlyPrice'),
        selectedOffice: selector(state, 'office'),
        numChairsAvailable: selector(state, 'numChairsAvailable'),
        staffAvailable: selector(state, 'staffAvailable'),
        cleaningFee: selector(state, 'cleaningFee'),
        auth: state.auth,
        offices: state.offices.selected ? state.offices.selected : []
    };
};

export default reduxForm({
    form: 'newListing'
})(connect(mapStateToProps, actions)(NewListing));