import React, { Component } from 'react';
import {
    Field,
    reduxForm,
    SubmissionError,
    formValueSelector
} from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';

import history from '../../history';

import { Typography, Grid, Button, Option, Box, Flex } from '../common';
import { renderInput, renderSelect, renderCheckbox } from './sharedComponents';
import { APPOINTMENT_SCHEDULING_FEE } from '../../util/paymentUtil';

class BookAppointment extends Component {
    componentWillMount() {
        const { dentist, durationToNextAppointment } = this.props;

        this.props.initialize({
            procedure:
                dentist.procedures[0].duration <= durationToNextAppointment
                    ? dentist.procedures[0]
                    : null,
            time: `${this.formattedTime(dentist.procedures[0].duration)}`
        });
    }

    formattedTime = duration => {
        const { startTime } = this.props;
        const startTimeMoment = moment(startTime);

        const formattedDate = startTimeMoment.format('MMM D, YYYY');
        const formattedStartTime = startTimeMoment.format('h:mm a');
        const formattedEndTime = moment(startTimeMoment)
            .add(duration, 'minutes')
            .format('h:mm a');

        return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
    };

    onSubmit(values) {
        const { startTime, reservation, auth } = this.props;

        if (!values.acknowledge) {
            throw new SubmissionError({
                _error: 'Please accept the terms to continue'
            });
        }

        const endTime = moment(startTime)
            .clone()
            .add(values.procedure.duration, 'minutes');

        const urlParams = {};
        urlParams.type = 'appointment';
        urlParams.totalPaid = APPOINTMENT_SCHEDULING_FEE;
        urlParams.reservationFee = APPOINTMENT_SCHEDULING_FEE;
        urlParams.startTime = moment(startTime).format();
        urlParams.endTime = moment(endTime).format();
        urlParams.procedure = JSON.stringify(values.procedure);
        urlParams.reservationId = reservation.id;
        urlParams.patientId = auth.id;

        history.push(`/payment?${queryString.stringify(urlParams)}`);
    }

    renderProcedures = (procedures, durationToNextAppointment) => {
        return procedures.map(procedure => (
            <Option
                disabled={durationToNextAppointment < procedure.duration}
                key={procedure.name}
                value={procedure}
            >{`${procedure.name} - ${procedure.duration} mins`}</Option>
        ));
    };

    updateTime(event) {
        this.props.initialize({
            time: this.formattedTime(event.target.value.duration)
        });
    }

    render() {
        const {
            handleSubmit,
            dentist,
            error,
            durationToNextAppointment,
            initialized
        } = this.props;

        if (!initialized) return <div />;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Grid container>
                    <Grid item xs={12}>
                        <Box pb={4}>
                            <Typography
                                fontSize={5}
                                fontWeight="bold"
                                color="abbey"
                            >
                                Available Appointments
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box pb={3}>
                            <label>Selected Time</label>
                            <Field
                                name="time"
                                disabled
                                component={renderInput}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box pb={4}>
                            <label>Procedures Available</label>
                            <Field
                                name="procedure"
                                component={renderSelect}
                                validate={required}
                                onChange={this.updateTime.bind(this)}
                            >
                                {this.renderProcedures(
                                    dentist.procedures,
                                    durationToNextAppointment
                                )}
                            </Field>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Flex alignItems="center" pb={4}>
                            <Field
                                name="acknowledge"
                                label="I understand and agree to the terms"
                                component={renderCheckbox}
                            />
                        </Flex>
                    </Grid>
                    <Grid item xs={12}>
                        {error && (
                            <Typography fontSize={3} color="red">
                                {error}
                            </Typography>
                        )}
                        <Button fullWidth color="secondary" type="submit">
                            <Typography fontSize={4} fontWeight="medium">
                                Book Appointment
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const required = value => (!value ? 'Required' : undefined);

const mapStateToProps = state => {
    const selector = formValueSelector('bookAppointment');
    return {
        duration: selector(state, 'procedure.duration'),
        time: selector(state, 'time')
    };
};

export default reduxForm({
    form: 'bookAppointment'
})(connect(mapStateToProps, null)(BookAppointment));
