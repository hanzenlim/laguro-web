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

import { Typography, Button, Option, Modal, Flex, Box } from '../common';

import {
    renderSelect,
    renderDatePicker,
    renderCheckbox,
    renderOptions
} from './sharedComponents';

import * as actions from '../../actions';
import { DENTIST } from '../../util/strings';

class ReservationOptions extends Component {
    constructor(props) {
        super(props);

        this.state = { redirectToPayment: false };
    }

    componentWillMount() {
        this.props.fetchUser(DENTIST);
        const { listing, office } = this.props;
        this.props.initialize({
            staffSelected: listing.staffAvailable,
            equipmentSelected: office.equipment,
            numChairs: 1,
            appts_per_hour: 1,
            startTime: moment(listing.startTime),
            endTime: moment(listing.endTime),
            acknowledge: false
        });
    }

    initiatePayment(values) {
        if (
            moment(values.startTime)
                .add(1, 'hours')
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
                                    component={renderSelect}
                                >
                                    {renderOptions(
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
        const equipData = this.props.equipmentSelected;
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
        this.booking_fee = Number(chair_price * 0.15);

        return this.booking_fee.toFixed(2);
    }

    // TODO create a payment calculator utility class
    calcTotal() {
        const { numChairs, listing } = this.props;
        const staffData = this.props.staffSelected;
        const equipData = this.props.equipmentSelected;
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
            equipmentSelected,
            auth
        } = this.props;

        if (!this.props.initialized) return <div>Loading...</div>;

        this.calcTime();

        if (this.state.redirectToPayment) {
            const { startTime, endTime, numChairs } = this.props;
            const totalPaid = Math.round(this.calcTotal() * 100);
            let { equipmentSelected, staffSelected } = this.props;

            staffSelected = JSON.stringify(
                staffSelected.filter(staff => staff.count > 0).map(staff => {
                    return { role: staff.role, count: staff.count };
                })
            );
            equipmentSelected = JSON.stringify(
                equipmentSelected
                    .filter(equip => equip.needed)
                    .map(equip => equip.name)
            );

            return (
                <Redirect
                    push
                    to={{
                        pathname: '/payment',
                        search: `?totalPaid=${totalPaid}&time=[${moment(
                            startTime
                        ).format('YYYY-MM-DDTHH:mm:ss.SSSSZ')},${moment(
                            endTime
                        ).format(
                            'YYYY-MM-DDTHH:mm:ss.SSSSZ'
                        )}]&numChairs=${numChairs}&reservedBy=${
                            auth.dentist.id
                        }&staffSelected=${staffSelected}&equipmentSelected=${equipmentSelected}&type=reservation&listingId=${
                            listing.id
                        }`
                    }}
                />
            );
        }

        return (
            <Modal open={this.props.open} onClose={this.props.onClose} closable>
                <form onSubmit={handleSubmit(this.initiatePayment.bind(this))}>
                    <Flex pb={4}>
                        <Typography size="t1">
                            Choose reservation options
                        </Typography>
                    </Flex>

                    <Flex pb={3} flexDirection="column">
                        <label>Doors opening</label>
                        <Field
                            name="startTime"
                            dateType="startTime"
                            component={renderDatePicker}
                            listing={listing}
                        />
                    </Flex>

                    <Flex pb={3} flexDirection="column">
                        <label>Doors closing</label>
                        <Field
                            name="endTime"
                            dateType="endTime"
                            component={renderDatePicker}
                            listing={listing}
                        />
                    </Flex>

                    <Flex pb={3} flexDirection="column">
                        <label>Number of appointment slots per hour</label>
                        <Field
                            name={'appts_per_hour'}
                            type="select"
                            style={{ display: 'block' }}
                            component={renderSelect}
                        >
                            <Option value={1}>1 - 60 min appointments</Option>
                            <Option value={2}>2 - 30 min appointments</Option>
                            <Option value={3}>3 - 20 min appointments</Option>
                            <Option value={4}>4 - 15 min appointments</Option>
                        </Field>
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
                                `- $${
                                    this.props.listing.chairHourlyPrice
                                }/chair/hr`
                            )}
                        </Field>
                    </Flex>

                    <Flex pb={3} flexDirection="column">
                        {staffSelected && staffSelected.length ? (
                            <div>
                                <FieldArray
                                    name="staffSelected"
                                    component={this.renderStaff}
                                />
                            </div>
                        ) : (
                            <div />
                        )}
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

                    <Flex>
                        <Box width={1 / 2}>
                            <label>Booking Fee - 15% of chair time</label>
                            <h6 className="red-text">
                                ${this.calcBookingFee()}
                            </h6>
                        </Box>
                        <Box width={1 / 2}>
                            <label>Total due</label>
                            <h6 className="red-text">${this.calcTotal()}</h6>
                        </Box>
                    </Flex>

                    <Flex pb={3} flexDirection="column">
                        <Box>
                            <sub>
                                *An additional 10% of final patient payment will
                                be deducted on completion of procedure for use
                                of Laguro services
                            </sub>
                        </Box>
                        <Box>
                            <sub>
                                **Payment for first two hours of selected staff
                                payroll and booking fee are non-refundable
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
                            <Typography size="t2" weight="medium">
                                Book Reservation
                            </Typography>
                        </Button>
                    </Flex>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    const selector = formValueSelector('reservationOptions');
    return {
        staffSelected: selector(state, 'staffSelected'),
        numChairs: selector(state, 'numChairs'),
        equipmentSelected: selector(state, 'equipmentSelected'),
        startTime: selector(state, 'startTime'),
        endTime: selector(state, 'endTime')
    };
};

export default reduxForm({
    form: 'reservationOptions'
})(connect(mapStateToProps, actions)(ReservationOptions));
