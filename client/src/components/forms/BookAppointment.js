import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import moment from 'moment';

import history from '../../history';

import {
    Typography,
    Grid,
    Button,
    Option,
    Select,
    Box,
    Modal,
    Input,
    Checkbox,
    Flex
} from '../common';

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

    renderInput = ({ input, disabled }) => (
        <Grid container>
            <Input {...input} disabled={disabled} />
        </Grid>
    );

    renderCheckbox = ({ label, input: { onChange, value } }) => (
        <Flex alignItems="center">
            <Checkbox
                checked={value ? true : false}
                onClick={() => {
                    onChange(value ? false : true);
                }}
            />
            <Typography pl={2}>{label}</Typography>
        </Flex>
    );

    renderSelect = ({
        input,
        disabled,
        children,
        meta: { touched, error }
    }) => {
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

        const search = `?type=appointment&totalPaid=10000&time=[${moment(
            startTime
        ).format()},${moment(endTime).format()}]&procedure=${JSON.stringify(
            values.procedure
        )}&reservationId=${reservation.id}&patientId=${auth.id}`;

        history.push(`/payment${search}`);
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

    render() {
        const {
            handleSubmit,
            dentist,
            open,
            error,
            closeModal,
            durationToNextAppointment
        } = this.props;

        return (
            <Modal closable open={open} onClose={closeModal}>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box pb={4}>
                                <Typography
                                    size="t1"
                                    weight="bold"
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
                                    component={this.renderInput}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box pb={4}>
                                <label>Procedures Available</label>
                                <Field
                                    name="procedure"
                                    component={this.renderSelect}
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
                                    component={this.renderCheckbox}
                                />
                            </Flex>
                        </Grid>
                        <Grid item xs={12}>
                            {error && (
                                <Typography size="t3" color="red">
                                    {error}
                                </Typography>
                            )}
                            <Button fullWidth color="secondary" type="submit">
                                <Typography size="t2" weight="medium">
                                    Book Appointment
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        );
    }
}

const required = value => (!value ? 'Required' : undefined);

export default reduxForm({
    form: 'bookAppointment'
})(BookAppointment);
