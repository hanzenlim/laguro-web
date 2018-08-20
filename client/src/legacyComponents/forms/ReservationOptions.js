import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector,
    SubmissionError,
    change
} from 'redux-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import DatePicker from 'react-datepicker';
import { Typography, Button, Input, Flex, Box } from '../common';

import {
    renderSelect,
    renderCheckbox,
    renderOptions,
    addTooltip
} from './sharedComponents';

import * as actions from '../../actions';
import { ACTIVE } from '../../util/strings';
import { calculateTimeslots, getStartTime } from '../../util/timeUtil';
import { renderPrice } from '../../util/paymentUtil';

const MINIMUM_RESERVATION_WINDOW = 60;

class ReservationOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToPayment: false
        };
    }

    componentWillMount() {
        const { office } = this.props;

        this.timeslots = this.initTimeslots();
        this.firstAvail = this.getFirstAvailReservation();

        this.props.initialize({
            equipmentSelected: office.equipment,
            numChairs: 1,
            appts_per_hour: 1,
            startTime: moment(this.firstAvail),
            endTime: moment(this.firstAvail).add(
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
                endTime: `Minimum reservation is ${MINIMUM_RESERVATION_WINDOW} minutes`,
                _error: 'Invalid time frame, please correct error above'
            });
        } else if (
            // if chosen duration is greater than 12 hrs
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

    initTimeslots() {
        const { listing } = this.props;

        const filteredReservations = listing.reservations.filter(
            res => res.status === ACTIVE
        );

        const timeslots = calculateTimeslots(listing, filteredReservations);

        const filteredTimeslots = timeslots.map((duration, index) => {
            let timeslotStartTime = getStartTime(index, listing.startTime);
            if (moment(timeslotStartTime).isSameOrBefore(moment())) {
                return 0;
            } else {
                return duration;
            }
        });

        return filteredTimeslots.map((duration, index) => {
            return {
                durationToNext: duration,
                startTime: getStartTime(index, listing.startTime)
            };
        });
    }

    getFirstAvailReservation() {
        const { listing } = this.props;
        let durations = this.timeslots.map(timeslot => timeslot.durationToNext);

        const index = durations.findIndex(
            duration => duration >= MINIMUM_RESERVATION_WINDOW
        );

        return getStartTime(index, listing.startTime);
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
                <label>
                    {'Equipment Needed'}
                    {addTooltip(
                        'Select the equipment you anticipate needing for your reservation.'
                    )}
                </label>
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
        const reservationFee = Math.round(
            numChairs * listing.chairHourlyPrice * this.calcTime()
        );

        return reservationFee;
    }

    calcBookingFee() {
        const bookingFee = Math.round(this.calcReservationFee() * 0.15);

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

    onOpeningTimeChange(startTime) {
        let { endTime, listing } = this.props;
        if (moment(startTime).isAfter(moment(endTime))) {
            if (
                moment(startTime)
                    .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
                    .isAfter(listing.endTime)
            ) {
                this.props.dispatch(
                    change(
                        'reservationOptions',
                        'startTime',
                        moment(listing.endTime).subtract(
                            MINIMUM_RESERVATION_WINDOW,
                            'minutes'
                        )
                    )
                );
                this.props.dispatch(
                    change(
                        'reservationOptions',
                        'endTime',
                        moment(listing.endTime)
                    )
                );
            } else {
                this.props.dispatch(
                    change(
                        'reservationOptions',
                        'endTime',
                        moment(startTime).add(
                            MINIMUM_RESERVATION_WINDOW,
                            'minutes'
                        )
                    )
                );
                this.props.dispatch(
                    change('reservationOptions', 'startTime', moment(startTime))
                );
            }
        } else {
            this.props.dispatch(
                change('reservationOptions', 'startTime', moment(startTime))
            );
        }
    }

    renderOpeningTimePicker({
        input,
        label,
        className,
        listing,
        tooltip,
        reservedTimeSlots,
        meta: { touched, error }
    }) {
        let { startTime } = this.props;
        let firstAvail = moment(this.firstAvail);
        let minTime = startTime.isSame(firstAvail, 'day')
            ? firstAvail
            : moment(startTime).startOf('day');
        let maxTime = moment(startTime).isSame(listing.endTime, 'day')
            ? moment(listing.endTime).subtract(
                MINIMUM_RESERVATION_WINDOW,
                'minutes'
            )
            : moment().endOf('day');
        let todaysReservations = reservedTimeSlots.filter(timeslot =>
            timeslot.isSame(moment(startTime), 'day')
        );

        return (
            <div className={className}>
                <label>
                    {label && `${label} `}
                    {tooltip && addTooltip(tooltip)}
                </label>
                <DatePicker
                    customInput={<Input />}
                    selected={input.value}
                    onChange={this.onOpeningTimeChange.bind(this)}
                    dateFormat="LLL"
                    minTime={moment(minTime)}
                    maxTime={moment(maxTime)}
                    showTimeSelect
                    minDate={moment(firstAvail)}
                    maxDate={moment(listing.endTime)}
                    excludeTimes={todaysReservations}
                    timeFormat="h:mm a"
                    timeIntervals={15}
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
        tooltip,
        durationToNext,
        listing,
        meta: { touched, error }
    }) {
        let { startTime, endTime } = this.props;

        let minTime = moment(startTime)
            .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
            .isSame(startTime, 'day')
            ? moment(startTime).add(MINIMUM_RESERVATION_WINDOW, 'minutes')
            : moment(endTime).startOf('day');
        let maxTime = moment(endTime).isSame(listing.endTime, 'day')
            ? moment(listing.endTime)
            : moment(startTime)
                .add(durationToNext, 'minutes')
                .isSame(startTime, 'day')
                ? moment(startTime).add(durationToNext, 'minutes')
                : moment().endOf('day');

        return (
            <div className={className}>
                <label>
                    {label && `${label} `}
                    {tooltip && addTooltip(tooltip)}
                </label>
                <DatePicker
                    customInput={<Input />}
                    selected={input.value}
                    onChange={input.onChange.bind(this)}
                    dateFormat="LLL"
                    minTime={moment(minTime)}
                    maxTime={moment(maxTime)}
                    showTimeSelect
                    minDate={
                        moment(startTime)
                            .add(MINIMUM_RESERVATION_WINDOW, 'minutes')
                            .isSame(startTime, 'day')
                            ? moment(startTime)
                            : moment(startTime).add(1, 'day')
                    }
                    maxDate={moment(listing.endTime)}
                    timeFormat="h:mm a"
                    timeIntervals={15}
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

        let selectedTimeSlot = this.timeslots.find(timeslot =>
            moment(timeslot.startTime).isSame(startTime, 'minute')
        );

        let durationToNextReservation = selectedTimeSlot
            ? selectedTimeSlot.durationToNext
            : 0;

        let reservedTimeSlots = this.timeslots
            .filter(timeslot => timeslot.durationToNext < 60)
            .map(timeslot => timeslot.startTime);

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
            urlParams.reservedBy = auth.dentistId;
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
                        <Field
                            name="startTime"
                            label="Doors opening"
                            tooltip="What is the first time you want available for patients to reserve?"
                            component={this.renderOpeningTimePicker.bind(this)}
                            listing={listing}
                            reservedTimeSlots={reservedTimeSlots}
                        />
                    </Flex>

                    <Flex width={1 / 2} pb={3} ml={4} flexDirection="column">
                        <Field
                            name="endTime"
                            label="Doors closing"
                            tooltip="What is the last time you want available for patients to reserve?"
                            component={this.renderClosingTimePicker.bind(this)}
                            durationToNext={durationToNextReservation}
                            listing={listing}
                        />
                    </Flex>
                </Flex>

                <Flex pb={3} flexDirection="column">
                    <Field
                        name={'numChairs'}
                        type="select"
                        label="Number of chairs needed"
                        tooltip="If you work in pairs or with an assistant you may prefer to reserve multiple chairs."
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
                        <label>
                            {'Chair Rental Fee'}
                            {addTooltip(
                                'Total price based on hourly price and reservation duration.'
                            )}
                        </label>
                        <h6>{renderPrice(this.calcReservationFee())}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>Equipment Fee</label>
                        <h6>{renderPrice(this.calcEquipFee())}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>
                            {'Cleaning Fee'}
                            {addTooltip(
                                'Price charged by host for post-reservation cleanup.'
                            )}
                        </label>
                        <h6>{renderPrice(listing.cleaningFee)}</h6>
                    </Box>
                    <Box width={1 / 5}>
                        <label>
                            {'Booking Fee *'}
                            {addTooltip(
                                'Fee for using Laguro services based on reservation cost.'
                            )}
                        </label>
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

export { ReservationOptions };
export default reduxForm({
    form: 'reservationOptions'
})(
    connect(
        mapStateToProps,
        actions
    )(ReservationOptions)
);