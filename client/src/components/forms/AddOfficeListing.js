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
import { borders, color } from 'styled-system';

import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';
import { getNextHalfHour } from '../../util/timeUtil';
import { renderPrice, removeSpecialChars } from '../../util/paymentUtil';
import { Typography, Grid, Button, Flex } from '../common';
import { Padding } from '../common/Spacing';

import { renderDatePicker, renderField } from './sharedComponents';
import {
    required,
    isNum,
    dollarMinimum,
    lessFifty,
    greaterZero
} from './formValidation';

import history from '../../history';

const StyledContainer = styled.div`
    min-height: 100vh;
    height: 100%;
    max-width: 1080px;
    padding: 5em 10px;
    margin: 0 auto;
`;

const StyledFlexWithBorder = styled(Flex)`
    ${borders} ${color};
`;

class NewListing extends Component {
    constructor(props) {
        super(props);

        this.urlParams = queryString.parse(history.location.search);
        const {
            cleaningFee,
            chairHourlyPrice,
            startTime,
            endTime,
            numChairsAvailable,
            name,
            officeId
        } = this.urlParams;

        // if officeId is defined, office exists, no need
        // to create a new office
        this.state = { isExistingOffice: officeId !== undefined };

        this.props.initialize({
            office: name,
            cleaningFee: cleaningFee ? cleaningFee : 1500,
            chairHourlyPrice: chairHourlyPrice ? chairHourlyPrice : 5000,
            startTime: startTime ? moment(startTime) : getNextHalfHour(),
            endTime: endTime
                ? moment(endTime)
                : getNextHalfHour().add(2, 'hours'),
            numChairsAvailable: numChairsAvailable
                ? Number(numChairsAvailable)
                : 1
        });
    }

    async componentWillMount() {
        document.title = 'Laguro - New Listing';
        await this.props.fetchUser(DENTIST);
    }

    handleBack = () => {
        const {
            chairHourlyPrice,
            cleaningFee,
            numChairsAvailable,
            endTime,
            startTime
        } = this.props;

        const params = queryString.stringify({
            ...this.urlParams,
            startTime: moment(startTime).format(),
            endTime: moment(endTime).format(),
            chairHourlyPrice: chairHourlyPrice ? chairHourlyPrice : 0,
            cleaningFee: cleaningFee ? cleaningFee : 0,
            numChairsAvailable: numChairsAvailable
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
            delete values.office;

            const {
                name,
                location,
                imageUrls,
                equipment,
                description,
                officeId
            } = this.urlParams;

            if (!this.state.isExistingOffice) {
                await this.props.createOffice({
                    name,
                    location,
                    hostId: this.props.auth.dentist.id,
                    imageUrls: JSON.parse(imageUrls),
                    equipment: JSON.parse(equipment),
                    description
                });
            }

            // if opened from an existing office, use that officeId, else use
            // the newly created office's id
            await this.props.createListing({
                ...values,
                chairHourlyPrice: values.chairHourlyPrice,
                cleaningFee: values.cleaningFee,
                officeId: this.state.isExistingOffice
                    ? officeId
                    : this.props.offices[0].id
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
                                    {this.state.isExistingOffice ? (
                                        <Typography fontSize={5}>
                                            Enter more info to create a new
                                            listing for your office
                                        </Typography>
                                    ) : (
                                        <Typography fontSize={5}>
                                            Now that you have created an office,
                                            we need to create a listing
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>

                            <Padding bottom="24" />

                            <StyledFlexWithBorder
                                borderBottom="1px solid gray"
                                flexDirection="column"
                            >
                                <label>Office Name</label>
                                <Typography fontSize={4}>
                                    {this.urlParams.name}
                                </Typography>
                            </StyledFlexWithBorder>

                            <Padding bottom="16" />

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
                                        validate={[required, dollarMinimum]}
                                        format={value => renderPrice(value)}
                                        normalize={value =>
                                            removeSpecialChars(value)
                                        }
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
                                        validate={[required]}
                                        format={value => renderPrice(value)}
                                        normalize={value =>
                                            removeSpecialChars(value)
                                        }
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                                <Grid item md={1} />
                                <Grid item xs={12} md={4}>
                                    <Field
                                        name="numChairsAvailable"
                                        label="Number of chairs available"
                                        component={renderField}
                                        placeholder="1"
                                        validate={[
                                            required,
                                            greaterZero,
                                            lessFifty,
                                            isNum
                                        ]}
                                    />
                                    <Padding bottom="16" />
                                </Grid>
                            </Grid>

                            <Grid container justify="space-between">
                                {!this.state.isExistingOffice && (
                                    <Grid item>
                                        <Button
                                            color="default"
                                            onClick={this.handleBack}
                                        >
                                            <Typography
                                                size="t2"
                                                weight="medium"
                                            >
                                                Previous
                                            </Typography>
                                        </Button>
                                    </Grid>
                                )}
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
        cleaningFee: selector(state, 'cleaningFee'),
        auth: state.auth,
        offices: state.offices.selected ? state.offices.selected : []
    };
};

export default reduxForm({
    form: 'newListing'
})(connect(mapStateToProps, actions)(NewListing));
