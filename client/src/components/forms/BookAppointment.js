import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import moment from 'moment';

import history from '../../history';

import { Typography, Grid, Button, Option, Box, Flex } from '../common';
import { renderInput, renderSelect, renderCheckbox } from './sharedComponents';
import { APPOINTMENT_SCHEDULING_FEE } from '../../util/paymentUtil';

class BookAppointment extends Component {
    componentWillMount() {
        const { startTime, durationToNextAppointment } = this.props;

        const startTimeMoment = moment(startTime);

        const formattedDate = startTimeMoment.format('MMM D, YYYY');
        const formattedStartTime = startTimeMoment.format('h:mm a');
        const formattedEndTime = startTimeMoment
            .clone()
            .add(durationToNextAppointment, 'minutes')
            .format('h:mm a');

        this.props.initialize({
            time: `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`
        });
    }

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

        const search = `?type=appointment&totalPaid=${APPOINTMENT_SCHEDULING_FEE}&time=[${moment(
            startTime
        ).format()},${moment(endTime).format()}]&procedure=${
            values.procedure
        }&reservationId=${reservation.id}&patientId=${auth.id}`;

        history.push(`/payment${search}`);
    }

    renderProcedures = (procedures, durationToNextAppointment) => {
        return procedures.map(procedure => (
            <Option
                disabled={durationToNextAppointment < procedure.duration}
                key={procedure.name}
                value={JSON.stringify(procedure)}
            >{`${procedure.name} - ${procedure.duration} mins`}</Option>
        ));
    };

    render() {
        const {
            handleSubmit,
            dentist,
            error,
            durationToNextAppointment
        } = this.props;

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
                            <label>Available Times</label>
                            <Field
                                disabled
                                name="time"
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

export default reduxForm({
    form: 'bookAppointment'
})(BookAppointment);
