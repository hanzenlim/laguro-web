import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
    Input,
    Grid,
    Option,
    Select,
    Checkbox,
    Typography,
    Flex
} from '../common';
import equipmentList from '../../staticData/equipmentList';
import procedureList from '../../staticData/procedureList';

export const equipmentOptions = equipmentList.map(equipment => {
    return (
        <Option value={equipment.name} key={equipment.id}>
            {equipment.name}
        </Option>
    );
});

export const procedureOptions = procedureList.map(procedure => {
    return (
        <Option value={procedure.name} key={procedure.id}>
            {procedure.name}
        </Option>
    );
});

export const durationOptions = [
    <option value={30} key={30}>
        30 minutes
    </option>,
    <option value={60} key={60}>
        60 minutes
    </option>
];

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

export const renderDatePicker = ({
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

export const renderField = ({
    input,
    label,
    className,
    disabled,
    placeholder,
    meta: { touched, error }
}) => (
    <Grid className={className} container direction="column">
        <label>{label}</label>
        <Input {...input} disabled={disabled} placeholder={placeholder} />
        {touched && error && <span className="red-text">{error}</span>}
    </Grid>
);

export const renderOptions = (maxAvail, minAvail = 1, label = '') => {
    const options = [];
    for (let i = minAvail; i <= maxAvail; i++) {
        options.push(
            <Option value={Number(i)} key={i}>
                {`${i} ${label}`}
            </Option>
        );
    }
    return options;
};

export const renderOfficeOptions = offices => {
    if (offices.length) {
        return offices.map((office, index) => (
            <Option
                value={JSON.stringify({
                    id: office.id,
                    office_name: office.name,
                    chairs: office.numChairs
                })}
                key={index}
            >
                {office.name} - {office.location}
            </Option>
        ));
    }
    return null;
};

export const renderSelect = props => {
    const {
        input,
        label,
        disabled,
        meta: { touched, error },
        children
    } = props;

    return (
        <Grid container>
            <label>{label}</label>
            <Select {...input} disabled={disabled}>
                {children}
            </Select>
            {touched && (error && <span className="red-text">{error}</span>)}
        </Grid>
    );
};

export const renderInput = ({ input, disabled }) => (
    <Grid container>
        <Input {...input} disabled={disabled} />
    </Grid>
);

export const renderCheckbox = ({ label, input: { onChange, value } }) => (
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
