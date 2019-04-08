import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import _sortBy from 'lodash/sortBy';
import _get from 'lodash/get';
import { formatAddress } from '../../../util/styleUtil';
import SearchAvailableAppointmentsView from './view';
import queryString from 'query-string';
import history from '../../../history';

class SearchAvailableAppointmentsContainer extends PureComponent {
    constructor(props) {
        super(props);
        const urlParams = queryString.parse(history.location.search);

        this.state = {
            hasFiltered: !!urlParams.startTime,
            filters: {
                time: null,
                date: urlParams.startTime || null,
                location: null,
            },
            selectedTime: urlParams.startTime
                ? {
                      key: moment
                          .tz(urlParams.startTime, props.data[0].timezone)
                          .format('LT'),
                      reservationId: urlParams.reservationId,
                  }
                : {},
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

    handleSelect = (selectedTime, timezone) => {
        const parsedDate = moment(this.state.filters.date)
            .tz(timezone)
            .format('YYYY-MM-DD');
        const data = this.getAppointmentProps(selectedTime, parsedDate);

        this.setState({ selectedTime });

        if (this.props.onSelect) {
            this.props.onSelect(data);
        }
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
            location: this.state.filters.location,
            startTime,
            endTime,
        };

        return appointmentProps;
    };

    /**
     * Returns appointments that are not in reservations array
     * @param {array} appointments Array of objects with key value pairs for available timeslots
     * @param {array} reservations Array of objects with key value pairs for timeslots that are already reserved
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
            timeslot => timeslot.numChairs > 0
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
        const startTime = moment.tz(start, timezone).startOf('minute');
        const endTime = moment.tz(end, timezone).startOf('minute');

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

    render() {
        const reservations = this.props.data;
        const urlParams = queryString.parse(history.location.search);
        // GET LOCATION LIST
        const locationList = this.getLocationList(reservations);

        const locationFilter = this.state.filters.location || locationList[0];
        const dateFilter = this.state.filters.date || urlParams.startTime;

        // FILTER LIST BY LOCATION
        const filteredByLocation = this.filterByLocation(
            reservations,
            locationFilter
        );

        // REMOVE BOOKED APPOINTMENTS
        const availableTimeslots = this.getAvailableTimeslots(
            filteredByLocation
        );

        const timezone = _get(availableTimeslots, '[0].timezone');
        // GET LIST OF DATES
        const availableDateList = this.getAvailableDateList(
            availableTimeslots,
            timezone
        );

        const filteredByDate = this.filterByDate(
            dateFilter,
            availableTimeslots
        );

        const filteredByCurrentTime = this.filterByCurrentTime(filteredByDate);

        // GET TIME BLOCKS
        const timeBlocks = this.formatTime(filteredByCurrentTime);

        // GET READABLE DATE LIST
        const formattedAvailableDateList = this.formatDate(
            availableDateList,
            timezone
        );

        const defaultDate = urlParams.startTime
            ? moment.tz(urlParams.startTime, timezone).format('ddd, MM/DD/YYYY')
            : null;

        return (
            <SearchAvailableAppointmentsView
                defaultDate={defaultDate}
                appointments={timeBlocks}
                availableDateList={formattedAvailableDateList}
                locationList={locationList}
                selected={this.state.selectedTime}
                hasFiltered={this.state.hasFiltered}
                onFilter={this.handleFilter}
                onSelect={value => this.handleSelect(value, timezone)}
                onSelectLocation={this.handleSelectLocation}
            />
        );
    }
}

SearchAvailableAppointmentsContainer.propTypes = {
    data: PropTypes.array,
    onSelect: PropTypes.func,
    onFilter: PropTypes.func,
};

export default SearchAvailableAppointmentsContainer;
