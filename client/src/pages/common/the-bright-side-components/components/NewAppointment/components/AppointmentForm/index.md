import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _sortBy from 'lodash/sortBy';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment-timezone';
import AppointmentFormView from './view';

// remove the timezone offset from a timestamp
// 2018-11-04T00:00:00-07:00 becomes 2018-11-04T00:00:00
const stripTimezone = timezone =>
    timezone.substring(0, 19);

const formatAddress = (addressString, addressDetail) => {
    if (_isEmpty(addressString)) {
        return '';
    }
    const addressElements = addressString
        .replace(/ [\d]{5}, United States/, '')
        .split(',');

    return `${addressElements[0]}, ${
        addressDetail ? `${addressDetail}, ` : ''
    }${addressElements.slice(1)}`;
};


type State = {
    filters: object,
    selectedTime: object,
}

type Props = {
    data: Array<any>,
    firstAppointmentDuration: number,
    patientsName: Array<any>,
    onFilter(): void,
    onSubmit(data: any): void,
    onClose(): void,
}

class AppointmentForm extends PureComponent<Props, State> {
    state = {
        filters: {
            time: null,
            date: null,
            location: null,
        },
        selectedTime: {},
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
        const availableTimeslotIndex = {};

        appointments.forEach(a => {
            availableTimeslotIndex[a.key] = a;
        });

        reservations.forEach(r => {
            const availableSlot = availableTimeslotIndex[r.key];
            availableSlot.numChairs -= r.numChairs;
        });

        const timeslots = Object.values(availableTimeslotIndex).filter(
            (timeslot: any) => timeslot.numChairs > 0
        );

        return timeslots;
    };

    /**
     * Formats the key of a list of objects to a readable time
     * @param {array} list Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    formatTime = list =>
        list.map(a => ({
            key: moment.tz(a.key, a.timezone).format('LT'),
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
                moment.tz(item.key, item.timezone).format('YYYY MM DD') ===
                moment.tz(dateFilter, item.timezone).format('YYYY MM DD')
        );

    /**
     * Removes reservation objects that are before current time
     * @param {array} list Array of objects with key value pairs
     * @returns {array} Array of objects with key value pairs
     */
    filterByCurrentTime = list => {
        const currentTime = moment();
        return _sortBy(
            list.filter(item => {
                const formattedItem = moment(item.key);
                return formattedItem.isAfter(currentTime);
            }),
            'key'
        );
    };

    /**
     * Returns an array of time strings by `props.appointment` minute blocks
     * @param {string} start Start time
     * @param {string} end End time
     * @returns {array}
     */
    getTimeSlots = (start, end, timezone) => {
        const { firstAppointmentDuration } = this.props;
        const startTime = moment.tz(start, timezone);
        const endTime = moment.tz(end, timezone);

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
     * Returns slots that have available chairs
     * @param {array} reservations Array of reservations from API call
     * @returns {array} Array of objects with key value pairs
     */
    getAvailableTimeslots = reservations => {
        const reservedTimeSlots = [];
        const timeSlotsWithAppointments = [];

        reservations.forEach(reservation => {
            const { timezone, numChairsSelected } = reservation;
            reservation.localAvailableTimes.forEach(availableTime => {
                const timeSlots = this.getTimeSlots(
                    availableTime.startTime,
                    availableTime.endTime,
                    timezone
                );

                timeSlots.forEach(timeSlot => {
                    reservedTimeSlots.push({
                        key: timeSlot,
                        value: reservation.id,
                        numChairs: numChairsSelected,
                        timezone,
                    });
                });
            });

            reservation.appointments.forEach(appointment => {
                const timeSlots = this.getTimeSlots(
                    appointment.localStartTime,
                    appointment.localEndTime,
                    timezone
                );

                timeSlots.forEach(timeSlot => {
                    timeSlotsWithAppointments.push({
                        key: timeSlot,
                        value: reservation.id,
                        numChairs: 1,
                        timezone,
                    });
                });
            });
        });

        const availableTimeslots = this.getAvailableOnly(
            reservedTimeSlots,
            timeSlotsWithAppointments
        );

        return availableTimeslots;
    };

   /**
     * Returns array of date strings that is the same day as today or after today's date
     * @param {array} dateList Array of objects
     * @returns {array} Array of date strings
     */
    getAvailableDateList = (dateList, timezone) => {
        const list = [];

        if (!timezone) {
            return list;
        }

        const today = moment()
            .tz(timezone)
            .startOf('day');
        const days = dateList.map(item =>
            moment
                .tz(item.key, item.timezone)
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
    formatDate = (list, timezone) => {
        const formattedList = list.map(day => ({
            key: day,
            value: moment(day).tz(timezone),
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
            const address = formatAddress(
                _get(item, 'location.name'),
                _get(item, 'location.addressDetails')
            );
            if (!list.includes(address)) {
                list.push(address);
            }
        });
        return list;
    };

    filterByLocation = (reservations, locationFilter) =>
        reservations.filter(item => {
            const address = formatAddress(
                _get(item, 'location.name'),
                _get(item, 'location.addressDetails')
            );
            return address === locationFilter;
        });

    handleSelectLocation = value => {
        this.setState({
            filters: {
                ...this.state.filters,
                location: value,
                date: null,
            },
        });
    };

    onSubmit = (values, timezone) => {
        const selectedPatient = this.props.patientsName.filter(
            value => value.fullName === values.patientName
        );

        const parsedDate = moment(values.appointmentDate).tz(timezone).format('YYYY-MM-DD');
        let data: object = this.getAppointmentProps(values.selectedTime, parsedDate);

        data = {
            ...data,
            patientId: selectedPatient[0].key,
            notes: values.additionalNote,
        };

        this.props.onSubmit(data);
    };

    validateForm = values => {
        const errors: any = {};

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
        const timeSlotsWithoutAppointments = this.getAvailableTimeslots(
            filteredByLocation
        );

        // GET LIST OF DATES
        const timezone = _get(timeSlotsWithoutAppointments, '[0].timezone');
        const availableDateList = this.getAvailableDateList(
            timeSlotsWithoutAppointments,
            timezone
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
        const formattedAvailableDateList = this.formatDate(availableDateList, timezone);

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
                onSubmit={(values) => this.onSubmit(values, timezone)}
                onClose={this.props.onClose}
           />
        );
    }
}

export default AppointmentForm;
