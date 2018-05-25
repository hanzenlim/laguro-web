import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector,
    SubmissionError
} from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../actions';
import { DENTIST } from '../util/strings';

class ReservationOptions extends Component {
    componentWillMount() {
        this.props.fetchUser(DENTIST);
        const { listing, office } = this.props;
        this.props.initialize({
            staffSelected: listing.staffAvailable,
            equipmentOptions: office.equipment,
            numChairs: 1,
            appts_per_hour: 1,
            startTime: moment(listing.startTime),
            endTime: moment(listing.endTime),
            acknowledge: false
        });
    }

    createReservation(values) {
        const { listing, startTime, endTime } = this.props;

        if (
            moment(startTime)
                .add(2, 'hours')
                .isAfter(endTime)
        ) {
            throw new SubmissionError({
                endTime: 'Minimum reservation is 2 hours',
                _error: 'Invalid time frame, please correct error above'
            });
        } else if (!values.acknowledge) {
            throw new SubmissionError({
                _error: 'Please accept the terms to continue'
            });
        } else {
            let duration = 60;

            switch (Number(values.appts_per_hour)) {
            case 1:
                duration = 60;
                break;
            case 2:
                duration = 30;
                break;
            case 3:
                duration = 20;
                break;
            case 4:
                duration = 15;
                break;
            default:
                break;
            }

            let appt_time = moment(startTime);
            const appointments = [];

            while (appt_time.isBefore(moment(endTime))) {
                appointments.push({
                    time: appt_time.format('MMM D, YYYY h:mm a')
                });
                appt_time = appt_time.add(duration, 'minutes');
            }

            const staffSelected = values.staffSelected
                .filter(staff => staff.count > 0)
                .map(staff => {
                    const { role, count } = staff;
                    return {
                        role,
                        count
                    };
                });
            const totalPaid = Math.round(this.calcTotal() * 100);
            const { equipmentOptions } = this.props;
            const equipmentSelected = equipmentOptions
                .filter(equipment => equipment.needed)
                .map(equipment => equipment.name);
            this.props.createReservation({
                numChairsSelected: values.numChairs,
                staffSelected,
                equipmentSelected,
                listingId: listing.id,
                reservedBy: this.props.auth.dentist.id,
                startTime: values.startTime,
                endTime: values.endTime,
                paymentOptionId: 'card_1CVHQAG42zKCEoIVErYyYlQ9',
                totalPaid
            });

            this.closeModals();
        }
    }

    closeModals() {
        const modals = document.getElementsByClassName('modal');
        const modal_overlay = document.getElementById('modal-overlay');
        for (const modal of modals) {
            modal.classList.remove('open');
        }
        modal_overlay.classList.remove('open');
    }

    renderStaticField = ({ input, label, className }) => (
        <div>
            <div className={className}>
                <label>{label}</label>
                <h6>{input.value}</h6>
            </div>
        </div>
    );

    renderOptions = (max_avail, min_avail = 1, label = '') => {
        const options = [];
        for (let i = min_avail; i <= max_avail; i++) {
            options.push(
                <option value={Number(i)} key={i}>
                    {`${i} ${label}`}
                </option>
            );
        }
        return options;
    };

    renderDatePicker = ({
        input,
        label,
        className,
        dateType,
        listing,
        meta: { touched, error }
    }) => {
        const { startTime, endTime } = this.props;
        return (
            <div className={className}>
                <label>{label}</label>
                <DatePicker
                    selected={input.value}
                    onChange={input.onChange.bind(this)}
                    dateFormat="LLL"
                    placeholderText={moment().format('MMM DD, YYYY')}
                    minDate={moment(listing.startTime)}
                    maxDate={moment(listing.endTime)}
                    minTime={
                        dateType === 'startTime'
                            ? moment(listing.startTime)
                            : moment(startTime).add(2, 'hours')
                    }
                    maxTime={
                        dateType === 'startTime'
                            ? moment(endTime).subtract(2, 'hours')
                            : moment(listing.endTime)
                    }
                    showTimeSelect
                    timeFormat="h:mm"
                    timeIntervals={30}
                    timeCaption="Time"
                />
                {touched && error && <span className="red-text">{error}</span>}
            </div>
        );
    };

    renderStaff = ({ fields, className }) => {
        const { listing } = this.props;
        const staffData = this.props.staffSelected;
        if (!staffData) {
            return <div>Loading...</div>;
        }
        return (
            <ul
                className={className}
                style={{ border: '1px solid #999', padding: '4px' }}
            >
                <label>Staff Required</label>

                {fields.map((staffSelected, index) => (
                    <li key={index} className="multiRow">
                        <Field
                            name={`${staffSelected}.role`}
                            component={this.renderStaticField}
                            label="Staff Role"
                        />
                        <div>
                            <label>
                                Number required
                                <Field
                                    name={`${staffSelected}.count`}
                                    type="select"
                                    style={{ display: 'block' }}
                                    component="select"
                                >
                                    {this.renderOptions(
                                        listing.staffAvailable[index].count,
                                        0
                                    )}
                                </Field>
                            </label>
                        </div>
                        <div>
                            <label>Subtotal</label>
                            <h6 className="red-text">
                                ${staffData[index].count *
                                    staffData[index].price}/Hour
                            </h6>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    renderEquipment = ({ fields, className }) => {
        const equipData = this.props.equipmentOptions;
        return (
            <ul className={className}>
                <label>Equipment Available</label>
                {fields.map((equipment, index) => (
                    <li key={index} className="multiRowAdd">
                        {`${equipData[index].name} - $${
                            equipData[index].price
                        }`}
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
        this.hours = minutes / 60;
    }

    calcBookingFee() {
        const { numChairs, listing } = this.props;
        const chair_price = numChairs * listing.chairHourlyPrice * this.hours;
        this.booking_fee = Number(Math.floor(chair_price * 0.15));
        return this.booking_fee.toFixed(2);
    }

    // TODO create a payment calculator utility class
    calcTotal() {
        const { numChairs, listing } = this.props;
        const staffData = this.props.staffSelected;
        const equipData = this.props.equipmentOptions;
        this.staffTotal = 0;
        this.equipTotal = 0;

        if (this.hours <= 0) {
            return 0;
        }

        const chair_price = numChairs * listing.chairHourlyPrice * this.hours;

        if (staffData && staffData.length) {
            this.staffTotal = staffData
                .map(staff => staff.count * staff.price * this.hours)
                .reduce((acc, sub) => sub + acc, 0);
        }

        if (equipData && equipData.length) {
            this.equipTotal = equipData
                .filter(equip => equip.needed)
                .map(equip => equip.price)
                .reduce((acc, sub) => sub + acc, 0);
        }

        const total =
            this.booking_fee + chair_price + this.equipTotal + this.staffTotal;
        return total.toFixed(2);
    }

    render() {
        const {
            handleSubmit,
            submitting,
            listing,
            error,
            staffSelected,
            equipmentOptions
        } = this.props;

        if (!this.props.initialized) return <div>Loading...</div>;

        this.calcTime();

        return (
            <form
                onSubmit={handleSubmit(this.createReservation.bind(this))}
                className="modalForm light-blue lighten-5"
            >
                <div className="form_title">
                    <h5>Choose reservation options</h5>
                </div>

                <div className="row">
                    <Field
                        name="startTime"
                        label="Doors opening"
                        dateType="startTime"
                        className="col s12 m6"
                        component={this.renderDatePicker}
                        listing={listing}
                    />

                    <Field
                        name="endTime"
                        label="Doors closing"
                        dateType="endTime"
                        className="col s12 m6"
                        component={this.renderDatePicker}
                        listing={listing}
                    />
                </div>

                <div className="row">
                    <label className="col s5">
                        Number of appointment slots per hour
                        <Field
                            name={'appts_per_hour'}
                            type="select"
                            style={{ display: 'block' }}
                            component="select"
                        >
                            <option value={1}>1 - 60 min appointments</option>
                            <option value={2}>2 - 30 min appointments</option>
                            <option value={3}>3 - 20 min appointments</option>
                            <option value={4}>4 - 15 min appointments</option>
                        </Field>
                    </label>
                    <label className="col s5 offset-s2">
                        Number of chairs needed
                        <Field
                            name={'numChairs'}
                            type="select"
                            style={{ display: 'block' }}
                            component="select"
                        >
                            {this.renderOptions(
                                this.props.listing.numChairsAvailable,
                                1,
                                `- $${
                                    this.props.listing.chairHourlyPrice
                                }/chair/hr`
                            )}
                        </Field>
                    </label>
                </div>

                {staffSelected && staffSelected.length ? (
                    <div>
                        <FieldArray
                            name="staffSelected"
                            className="row"
                            component={this.renderStaff}
                        />
                    </div>
                ) : (
                    <div />
                )}

                {equipmentOptions && equipmentOptions.length ? (
                    <div>
                        <FieldArray
                            name="equipmentOptions"
                            className="row"
                            component={this.renderEquipment}
                        />
                    </div>
                ) : (
                    <div />
                )}

                <div className="row">
                    <div className="col s6 left-align">
                        <label>Booking Fee - 15% of chair time</label>
                        <h6 className="red-text">${this.calcBookingFee()}</h6>
                    </div>
                    <div className="col s6 right-align">
                        <label>Total due</label>
                        <h6 className="red-text">${this.calcTotal()}</h6>
                    </div>
                </div>

                <div className="row">
                    <sub>
                        *An additional 10% of final patient payment will be
                        deducted on completion of procedure for use of Laguro
                        services
                    </sub>
                    <br />
                    <sub>
                        **Payment for first two hours of selected staff payroll
                        and booking fee are non-refundable
                    </sub>
                </div>

                <div
                    className="row valign-wrapper"
                    style={{ marginTop: '30px', marginBottom: '0px' }}
                >
                    <div className="col s7 left-align">
                        <Field
                            name="acknowledge"
                            id="acknowledge"
                            component="input"
                            type="checkbox"
                            className="browser-default"
                        />
                        I understand and agree to the terms above
                    </div>
                    <div className="form-buttons col s5 right-align">
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
    const selector = formValueSelector('reservationOptions');
    return {
        staffSelected: selector(state, 'staffSelected'),
        numChairs: selector(state, 'numChairs'),
        equipmentOptions: selector(state, 'equipmentOptions'),
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime')
    };
};

export default reduxForm({
    form: 'reservationOptions'
})(connect(mapStateToProps, actions)(ReservationOptions));
