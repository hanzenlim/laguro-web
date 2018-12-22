import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AppointmentFormView from './view';

import { stripTimezone } from '../../../../../util/timeUtil';

class AppointmentForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                time: null,
                date: null,
                location: null,
            },
            selectedTime: {},
        };
    }

    handleFilter = filter => {
        this.setState({
            filters: {
                date: filter.date,
                location: filter.location,
            },
            selectedTime: {},
        });

        if (this.props.onFilter) {
            this.props.onFilter();
        }
    };

    onDateChange = date => {
        this.setState({
            filters: {
                ...this.state.filters,
                date,
            },
            selectedTime: {},
        });
    };

    handleSelectTime = selectedTime => {
        this.setState({ selectedTime });
    };

    getAppointmentProps = (selectedTime, dateFilter) => {
        const { firstAppointmentDuration } = this.props;

        const startTime = moment(
            `${dateFilter} ${selectedTime.key}`,
            'YYYY-MM-DD HH:mm a'
        ).format();
        const endTime = moment(startTime)
            .add(firstAppointmentDuration, 'minutes')
            .format();

        const appointmentProps = {
            reservationId: selectedTime.value,
            startTime: stripTimezone(startTime),
            endTime: stripTimezone(endTime),
        };

        return appointmentProps;
    };

    /**
     * Returns appointments that are not in reservations array
     * @param {array} appointments Array of objects with key value pairs
     * @param {array} reservations Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    getAvailableOnly = (appointments, reservations) => {
        const formattedReservations = reservations.map(reservation =>
            JSON.stringify(reservation)
        );

        return appointments.filter(
            appointment =>
                !formattedReservations.includes(JSON.stringify(appointment))
        );
    };

    /**
     * Formats the key of a list of objects to a readable time
     * @param {array} list Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    formatTime = list =>
        list.map(a => ({
            key: moment(a.key).format('LT'),
            value: a.value,
        }));

    /**
     * Removes reservation objects that isn't the same day as the date filter
     * @param {string} dateFilter Date string
     * @param {array} list Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    filterByDate = (dateFilter, list) =>
        list.filter(
            item =>
                moment(item.key).format('YYYY MM DD') ===
                moment(dateFilter).format('YYYY MM DD')
        );

    /**
     * Removes reservation objects that are before current time
     * @param {array} list Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    filterByCurrentTime = list =>
        list.filter(item => {
            const currentTime = moment();
            const formattedItem = moment(item.key);
            return moment(formattedItem).isAfter(currentTime);
        });

    /**
     * Returns an array of time strings by `props.appointment` minute blocks
     * @param {string} start Start time
     * @param {string} end End time
     * @returns {array}
     */
    getTimeSlots = (start, end) => {
        const { firstAppointmentDuration } = this.props;
        const startTime = moment(start);
        const endTime = moment(end);

        const timeSlots = [];

        let apptTime = moment(startTime).startOf('minute');
        while (apptTime.isBefore(endTime)) {
            timeSlots.push(apptTime.format());

            apptTime = apptTime
                .startOf('minute')
                .add(firstAppointmentDuration, 'minutes');
        }

        return timeSlots;
    };

    /**
     * Returns appointments slots that are booked yet
     * @param {array} reservations Array of reservations from API call
     * @returns {array} Array of objects with key value pairs
     */
    getTimeSlotsWithoutAppointments = reservations => {
        const reservedTimeSlots = [];
        const timeSlotsWithAppointments = [];

        reservations.forEach(reservation => {
            reservation.localAvailableTimes.forEach(availableTime => {
                const timeSlots = this.getTimeSlots(
                    availableTime.startTime,
                    availableTime.endTime
                );

                timeSlots.forEach(timeSlot => {
                    reservedTimeSlots.push({
                        key: timeSlot,
                        value: reservation.id,
                    });
                });
            });

            reservation.appointments.forEach(appointment => {
                const timeSlots = this.getTimeSlots(
                    appointment.localStartTime,
                    appointment.localEndTime
                );

                timeSlots.forEach(timeSlot => {
                    timeSlotsWithAppointments.push({
                        key: timeSlot,
                        value: reservation.id,
                    });
                });
            });
        });

        const timeSlotsWithoutAppointments = this.getAvailableOnly(
            reservedTimeSlots,
            timeSlotsWithAppointments
        );

        return timeSlotsWithoutAppointments;
    };

    /**
     * Returns array of date strings that is the same day as today or after today's date
     * @param {array} dateList Array of objects
     * @returns {array} Array of date strings
     */
    getAvailableDateList = dateList => {
        const list = [];

        const today = moment().startOf('day');
        const days = dateList.map(item =>
            moment(item.key)
                .startOf('day')
                .format()
        );

        days.forEach(day => {
            if (!list.includes(day)) {
                if (moment(day).isSameOrAfter(today)) {
                    list.push(day);
                }
            }
        });

        return list;
    };

    /**
     * Returns an array of objects with key vaue pairs
     * @param {array} list Array of date strings
     * @returns {array} Array of objects with key value pairs
     */
    formatDate = list => {
        const formattedList = list.map(day => ({
            key: day,
            value: moment(day),
        }));

        return formattedList.sort((a, b) =>
            moment(a.value).diff(b.value, 'days')
        );
    };

    /**
     * Returns all unique locations from reservations list from api call
     * @param {array} reservations Array of reservations
     * @returns {array} Array of strings
     */
    getLocationList = reservations => {
        const list = [];
        reservations.forEach(item => {
            if (!list.includes(item.location.name)) {
                list.push(item.location.name);
            }
        });
        return list;
    };

    filterByLocation = (reservations, locationFilter) =>
        reservations.filter(item => item.location.name === locationFilter);

    handleSelectLocation = value => {
        this.setState({
            filters: {
                ...this.state.filters,
                location: value,
                date: null,
            },
        });
    };

    onSubmit = values => {
        const selectedPatient = this.props.patientsName.filter(
            value => value.fullName === values.patientName
        );

        const parsedDate = moment(values.appointmentDate).format('YYYY-MM-DD');
        let data = this.getAppointmentProps(values.selectedTime, parsedDate);

        data = {
            ...data,
            patientId: selectedPatient[0].key,
            notes: values.additionalNote,
        };

        this.props.onSubmit(data);
    };

    validateForm = values => {
        const errors = {};

        if (!values.patientName) {
            errors.patientName = 'Please select a patient from the dropdown';
        }

        if (!values.selectedTime) {
            errors.selectedTime = 'Please select a time';
        }

        if (!values.dentalOfficeName) {
            errors.dentalOfficeName = 'Please select a location';
        }

        if (!values.appointmentDate) {
            errors.appointmentDate = 'Please select a date';
        }

        return errors;
    };

    render() {
        const reservations = this.props.data;
        // GET LOCATION LIST
        const locationList = this.getLocationList(reservations);

        const locationFilter = this.state.filters.location || locationList[0];

        // FILTER LIST BY LOCATION
        const filteredByLocation = this.filterByLocation(
            reservations,
            locationFilter
        );

        // REMOVE BOOKED APPOINTMENTS
        const timeSlotsWithoutAppointments = this.getTimeSlotsWithoutAppointments(
            filteredByLocation
        );

        // GET LIST OF DATES
        const availableDateList = this.getAvailableDateList(
            timeSlotsWithoutAppointments
        );

        const dateFilter = this.state.filters.date || availableDateList[0];

        const filteredByDate = this.filterByDate(
            dateFilter,
            timeSlotsWithoutAppointments
        );

        const filteredByCurrentTime = this.filterByCurrentTime(filteredByDate);

        // GET TIME BLOCKS
        const timeBlocks = this.formatTime(filteredByCurrentTime);

        // GET READABLE DATE LIST
        const formattedAvailableDateList = this.formatDate(availableDateList);

        return (
            <AppointmentFormView
                appointments={timeBlocks}
                onDateChange={this.onDateChange}
                availableDateList={formattedAvailableDateList}
                locationList={locationList}
                selected={this.state.selectedTime}
                onSelect={this.handleSelectTime}
                onSelectLocation={this.handleSelectLocation}
                validate={this.validateForm}
                patientsName={this.props.patientsName}
                onSubmit={this.onSubmit}
            />
        );
    }
}

AppointmentForm.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    onFilter: PropTypes.func,
};

export default AppointmentForm;
