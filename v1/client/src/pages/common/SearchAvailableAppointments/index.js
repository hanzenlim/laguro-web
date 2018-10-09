import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SearchAvailableAppointmentsView from './view';

class SearchAvailableAppointmentsContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hasFiltered: false,
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
            hasFiltered: true,
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

    handleSelect = selectedTime => {
        const data = this.getAppointmentProps(
            selectedTime,
            this.state.filters.date
        );

        this.setState({ selectedTime });

        if (this.props.onSelect) {
            this.props.onSelect(data);
        }
    };

    getAppointmentProps = (selectedTime, dateFilter) => {
        const startTime = moment(`${dateFilter} ${selectedTime.key}`).format();
        const endTime = moment(startTime)
            .add(1, 'hour')
            .format();

        const appointmentProps = {
            reservationId: selectedTime.value,
            location: this.state.filters.location,
            startTime,
            endTime,
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
     * Returns an array of time strings by 1 hour blocks
     * @param {string} start Start time
     * @param {string} end End time
     * @returns {array}
     */
    getTimeSlots = (start, end) => {
        const startTime = moment(start);
        const endTime = moment(end);

        const duration = moment.duration(endTime.diff(startTime));
        const hours = duration.asHours();
        const timeSlots = [];

        timeSlots.push(
            moment(startTime)
                .startOf('hour')
                .format()
        );

        for (let i = 1; i < hours; i++) {
            timeSlots.push(
                moment(startTime)
                    .startOf('hour')
                    .add(i, 'hour')
                    .format()
            );
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
            reservation.availableTimes.forEach(availableTime => {
                const timeSlotsPerHour = this.getTimeSlots(
                    availableTime.startTime,
                    availableTime.endTime
                );

                timeSlotsPerHour.forEach(timeSlot => {
                    reservedTimeSlots.push({
                        key: timeSlot,
                        value: reservation.id,
                    });
                });
            });

            reservation.appointments.forEach(appointment => {
                const timeSlotsPerHour = this.getTimeSlots(
                    appointment.startTime,
                    appointment.endTime
                );

                timeSlotsPerHour.forEach(timeSlot => {
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

        const today = moment().subtract(1, 'days');
        const days = dateList.map(item =>
            moment(item.key)
                .startOf('day')
                .format('YYYY MM DD')
        );

        days.forEach(day => {
            if (!list.includes(day)) {
                if (!moment(day).isBefore(today)) {
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
        const dateToday = moment().startOf('day');

        return list.map(day => {
            if (
                moment(day)
                    .startOf('day')
                    .format() === dateToday.format()
            ) {
                return {
                    key: day,
                    value: 'Today',
                };
            }

            return {
                key: day,
                value: day,
            };
        });
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
            },
        });
    };

    render() {
        const reservations = this.props.data;
        // GET LOCATION LIST
        const locationList = this.getLocationList(reservations);

        const locationFilter = this.state.filters.location || locationList[0];
        const dateFilter = this.state.filters.date;

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

        const filteredByDate = this.filterByDate(
            dateFilter,
            timeSlotsWithoutAppointments
        );

        // GET TIME BLOCKS
        const timeBlocks = this.formatTime(filteredByDate);

        // GET READABLE DATE LIST
        const formattedAvailableDateList = this.formatDate(availableDateList);

        return (
            <SearchAvailableAppointmentsView
                appointments={timeBlocks}
                availableDateList={formattedAvailableDateList}
                locationList={locationList}
                selected={this.state.selectedTime}
                hasFiltered={this.state.hasFiltered}
                onFilter={this.handleFilter}
                onSelect={this.handleSelect}
                onSelectLocation={this.handleSelectLocation}
            />
        );
    }
}

SearchAvailableAppointmentsContainer.propTypes = {
    data: PropTypes.object,
    onSelect: PropTypes.func,
    onFilter: PropTypes.func,
};

export default SearchAvailableAppointmentsContainer;
