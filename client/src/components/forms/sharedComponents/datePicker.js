import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Input from '../../common/Input';

const getMinTime = (dateType, listing) => {
    if (!listing)
        return moment()
            .hours(0)
            .minutes(0);
    switch (dateType) {
    case 'startTime':
        return moment(listing.startTime);
    case 'endTime':
        return moment(listing.startTime).add(2, 'hours');
    default:
        return moment()
            .hours(0)
            .minutes(0);
    }
};

const getMaxTime = (dateType, listing) => {
    if (!listing)
        return moment()
            .hours(23)
            .minutes(59);
    switch (dateType) {
    case 'startTime':
        return moment(listing.endTime).subtract(2, 'hours');
    case 'endTime':
        return moment(listing.endTime);
    default:
        return moment()
            .hours(23)
            .minutes(59);
    }
};

const renderDatePicker = ({
    input,
    label,
    className,
    dateType,
    listing,
    meta: { touched, error }
}) => (
    <div className={className}>
        <label>{label}</label>
        <DatePicker
            customInput={<Input />}
            selected={input.value}
            onChange={input.onChange.bind(this)}
            dateFormat="LLL"
            placeholderText={moment().format('LLL')}
            minDate={listing ? moment(listing.startTime) : moment()}
            maxDate={
                listing ? moment(listing.endTime) : moment().add(1, 'years')
            }
            minTime={getMinTime(dateType, listing)}
            maxTime={getMaxTime(dateType, listing)}
            showTimeSelect
            timeFormat="h:mma"
            timeIntervals={30}
            timeCaption="Time"
        />
        {touched && error && <span className="red-text">{error}</span>}
    </div>
);

export default renderDatePicker;
