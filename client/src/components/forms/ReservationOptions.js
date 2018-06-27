import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector,
    SubmissionError
} from 'redux-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import DatePicker from 'react-datepicker';
import { Typography, Button, Input, Flex, Box } from '../common';

import {
    renderSelect,
    renderCheckbox,
    renderOptions
} from './sharedComponents';

import * as actions from '../../actions';
import { DENTIST, ACTIVE } from '../../util/strings';
import { calculateTimeslots, getStartTime } from '../../util/timeUtil';
import { renderPrice } from '../../util/paymentUtil';

const MINIMUM_RESERVATION_WINDOW = 60;

class ReservationOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToPayment: false,
            timeSlots: []
        };
    }

    componentWillMount() {
        this.props.fetchUser(DENTIST);
        const { listing, office } = this.props;

        const filteredReservations = listing.reservations.filter(
            res => res.status === ACTIVE
        );

        const durationToNextReservation = calculateTimeslots(
            listing,
            filteredReservations
        );

        const timeSlotsWithDuration = durationToNextReservation.map(
            (duration, index) => {
                return {
                    durationToNext: duration,
                    startTime: getStartTime(index, listing.startTime)
                };
            }
        );

        const firstAvailReservationIndex = durationToNextReservation.findIndex(
            duration => duration > 0
        );
        const firstAvailReservation = getStartTime(
            firstAvailReservationIndex,
            listing.startTime
        );

        this.setState({ timeSlots: timeSlotsWithDuration });

        this.props.initialize({
            equipmentSelected: office.equipment,
            numChairs: 1,
            appts_per_hour: 1,
            startTime: moment(firstAvailReservation),
            endTime: moment(firstAvailReservation).add(
                MINIMUM_RESERVATION_WINDOW,
                'minutes'
            ),
            acknowledge: false
        });
    }

    initiatePayment(values) {
        if (
            // endTime should be after startTime
            moment(values.endTime).isBefore(values.startTime)
        ) {
            throw new SubmissionError({
                endTime: 'Closing time must be after opening time'
            });
        } else if (
            moment(values.startTime)
                .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
                .isAfter(values.endTime)
        ) {
            throw new SubmissionError({
                endTime: 'Minimum reservation is 1 hour',
                _error: 'Invalid time frame, please correct error above'
            });
        } else if (
            // if chosen duration is greater than 8 hrs
            moment(values.startTime)
                .add(12, 'hours')
                .isBefore(values.endTime)
        ) {
            throw new SubmissionError({
                endTime: 'Max length for reservation is 12 hours'
            });
        } else if (!values.acknowledge) {
            throw new SubmissionError({
                _error: 'Please accept the terms to continue'
            });
        }

        this.setState({ redirectToPayment: true });
    }

    renderStaticField = ({ input, label, className }) => (
        <div>
            <div className={className}>
                <label>{label}</label>
                <h6>{input.value}</h6>
            </div>
        </div>
    );

    renderEquipment = ({ fields, className }) => {
        const equipData = this.props.equipmentSelected;
        return (
            <ul className={className}>
                <label>Equipment Available</label>
                {fields.map((equipment, index) => (
                    <li key={index} className="multiRowAdd">
                        {`${equipData[index].name} - ${renderPrice(
                            equipData[index].price
                        )}`}
                        <Field
                            name={`${equipment}.needed`}
                            id={`equip${index}`}
                            component="input"
                            type="checkbox"
                        />
                    </li>
                ))}
            </ul>
        );
    };

    calcTime() {
        const { startTime, endTime } = this.props;
        const minutes = endTime.diff(startTime, 'minutes');
        if (minutes <= 0) return 0;

        return minutes / 60; //hours
    }

    calcReservationFee() {
        const { numChairs, listing } = this.props;
        const reservationFee =
            numChairs * listing.chairHourlyPrice * this.calcTime();

        return reservationFee;
    }

    calcBookingFee() {
        const bookingFee = this.calcReservationFee() * 0.15;

        return bookingFee;
    }

    calcEquipFee() {
        const { equipmentSelected } = this.props;
        if (!equipmentSelected || equipmentSelected.length === 0) {
            return 0;
        }
        const equipmentFee = equipmentSelected
            .filter(equip => equip.needed)
            .map(equip => equip.price)
            .reduce((acc, sub) => sub + acc, 0);

        return equipmentFee;
    }

    calcTotal() {
        const { listing } = this.props;
        const reservationFee = this.calcReservationFee();
        const bookingFee = this.calcBookingFee();
        const equipmentFee = this.calcEquipFee();

        const total =
            bookingFee + reservationFee + equipmentFee + listing.cleaningFee;

        return total;
    }

    renderOpeningTimePicker({
        input,
        label,
        className,
        listing,
        reservedTimeSlots,
        meta: { touched, error }
    }) {
        let { startTime } = this.props;
        return (
            <div className={className}>
                <label>{label}</label>
                <DatePicker
                    customInput={<Input />}
                    selected={input.value}
                    onChange={input.onChange.bind(this)}
                    dateFormat="LLL"
                    minTime={
                        moment(listing.startTime).isBefore(startTime, 'day')
                            ? moment().startOf('day')
                            : moment(listing.startTime)
                    }
                    maxTime={
                        moment(listing.endTime).isAfter(startTime, 'day')
                            ? moment().endOf('day')
                            : moment(listing.endTime).subtract(
                                MINIMUM_RESERVATION_WINDOW,
                                'minutes'
                            )
                    }
                    showTimeSelect
                    minDate={moment(listing.startTime)}
                    maxDate={moment(listing.endTime)}
                    excludeTimes={reservedTimeSlots}
                    timeFormat="h:mm a"
                    timeIntervals={30}
                    timeCaption="Time"
                />
                {touched && error && <span className="red-text">{error}</span>}
            </div>
        );
    }

    renderClosingTimePicker({
        input,
        label,
        className,
        durationToNext,
        meta: { touched, error }
    }) {
        let { startTime } = this.props;
        return (
            <div className={className}>
                <label>{label}</label>
                <DatePicker
                    customInput={<Input />}
                    selected={input.value}
                    onChange={input.onChange.bind(this)}
                    dateFormat="LLL"
                    minTime={moment(startTime).add(
                        MINIMUM_RESERVATION_WINDOW,
                        'minutes'
                    )}
                    maxTime={
                        moment(startTime)
                            .add(durationToNext, 'minutes')
                            .isAfter(startTime, 'day')
                            ? moment().endOf('day')
                            : moment(startTime).add(durationToNext, 'minutes')
                    }
                    showTimeSelect
                    minDate={
                        moment(startTime)
                            .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
                            .isSame(moment(startTime), 'day')
                            ? moment(startTime)
                            : moment(startTime).add(1, 'day')
                    }
                    maxDate={
                        moment(startTime)
                            .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
                            .isSame(moment(startTime), 'day')
                            ? moment(startTime)
                            : moment(startTime).add(1, 'day')
                    }
                    timeFormat="h:mm a"
                    timeIntervals={30}
                    timeCaption="Time"
                />
                {touched && error && <span className="red-text">{error}</span>}
            </div>
        );
    }

    render() {
        const {
            handleSubmit,
            submitting,
            listing,
            error,
            equipmentSelected,
            auth
        } = this.props;

        if (!this.props.initialized) return <div>Loading...</div>;

        let { startTime } = this.props;
        let { timeSlots } = this.state;

        let selectedTimeSlot = timeSlots.find(timeSlot =>
            moment(timeSlot.startTime).isSame(startTime, 'minute')
        );

        let durationToNextReservation = selectedTimeSlot
            ? selectedTimeSlot.durationToNext
            : 0;

        let reservedTimeSlots = timeSlots
            .filter(timeSlot => timeSlot.durationToNext === 0)
            .map(timeSlot => timeSlot.startTime);

        if (this.state.redirectToPayment) {
            const { startTime, endTime, numChairs } = this.props;
            let { equipmentSelected } = this.props;

            equipmentSelected = JSON.stringify(
                equipmentSelected
                    .filter(equip => equip.needed)
                    .map(equip => equip.name)
            );

            const urlParams = {};
            urlParams.type = 'reservation';
            urlParams.totalPaid = this.calcTotal();
            urlParams.equipmentFee = this.calcEquipFee();
            urlParams.cleaningFee = listing.cleaningFee;
            urlParams.bookingFee = this.calcBookingFee();
            urlParams.reservationFee = this.calcReservationFee();
            urlParams.startTime = moment(startTime).format();
            urlParams.endTime = moment(endTime).format();
            urlParams.numChairs = numChairs;
            urlParams.reservedBy = auth.dentist.id;
            urlParams.equipmentSelected = equipmentSelected;
            urlParams.listingId = listing.id;

            return (
                <Redirect
                    push
                    to={{
                        pathname: '/payment',
                        search: `?${queryString.stringify(urlParams)}`
                    }}
                />
            );
        }

        return (
            <form onSubmit={handleSubmit(this.initiatePayment.bind(this))}>
                <Flex pb={4}>
                    <Typography fontSize={5}>
                        Choose reservation options
                    </Typography>
                </Flex>

                <Flex direction="row">
                    <Flex width={1 / 2} pb={3} mr={4} flexDirection="column">
                        <label>Doors opening</label>
                        <Field
                            name="startTime"
                            dateType="startTime"
                            component={this.renderOpeningTimePicker.bind(this)}
                            listing={listing}
                            reservedTimeSlots={reservedTimeSlots}
                        />
                    </Flex>

                    <Flex width={1 / 2} pb={3} ml={4} flexDirection="column">
                        <label>Doors closing</label>
                        <Field
                            name="endTime"
                            dateType="endTime"
                            component={this.renderClosingTimePicker.bind(this)}
                            durationToNext={durationToNextReservation}
                            listing={listing}
                        />
                    </Flex>
                </Flex>

                <Flex pb={3} flexDirection="column">
                    <label>Number of chairs needed</label>
                    <Field
                        name={'numChairs'}
                        type="select"
                        style={{ display: 'block' }}
                        component={renderSelect}
                    >
                        {renderOptions(
                            this.props.listing.numChairsAvailable,
                            1,
                            `- $${(
                                this.props.listing.chairHourlyPrice / 100
                            ).toFixed(2)}/chair/hr`
                        )}
                    </Field>
                </Flex>

                {equipmentSelected && equipmentSelected.length ? (
                    <div>
                        <FieldArray
                            name="equipmentSelected"
                            className="row"
                            component={this.renderEquipment}
                        />
                    </div>
                ) : (
                    <div />
                )}

                <Flex pt={2}>
                    <Box width={1 / 5}>
                        <label>Chair Rental Fee</label>
                        <h6>{renderPrice(this.calcReservationFee())}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>Equipment Fee</label>
                        <h6>{renderPrice(this.calcEquipFee())}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>Cleaning Fee</label>
                        <h6>{renderPrice(listing.cleaningFee)}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>Booking Fee *</label>
                        <h6>{renderPrice(this.calcBookingFee())}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>Total due **</label>
                        <h6 className="red-text">
                            {renderPrice(this.calcTotal())}
                        </h6>
                    </Box>
                </Flex>

                <Flex pt={3} pb={3} flexDirection="column">
                    <Box>
                        <sub>* Booking fee is non-refundable</sub>
                    </Box>
                    <Box>
                        <sub>
                            ** An additional 10% fee will be deducted from
                            patient collections for use of Laguro services
                        </sub>
                    </Box>
                </Flex>

                <Flex pb={3}>
                    <Field
                        name="acknowledge"
                        label="I understand and agree to the terms above"
                        id="acknowledge"
                        component={renderCheckbox}
                        type="checkbox"
                        className="browser-default"
                    />
                </Flex>

                <Flex flexDirection="column">
                    {error && <strong className="red-text">{error}</strong>}

                    <Button
                        fullWidth
                        color="secondary"
                        type="submit"
                        disabled={submitting}
                    >
                        <Typography fontSize={4} fontWeight="medium">
                            Book Reservation
                        </Typography>
                    </Button>
                </Flex>
            </form>
        );
    }
}

const mapStateToProps = state => {
    const selector = formValueSelector('reservationOptions');
    return {
        numChairs: selector(state, 'numChairs'),
        equipmentSelected: selector(state, 'equipmentSelected'),
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime')
    };
};

export default reduxForm({
    form: 'reservationOptions'
})(connect(mapStateToProps, actions)(ReservationOptions));
