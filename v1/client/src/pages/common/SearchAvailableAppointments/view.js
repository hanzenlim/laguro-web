import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FilterAppointmentsForm from '../Forms/FilterAppointmentsForm';
import SelectAppointment from '../SelectAppointment';

import { Text } from '../../../components';

const SearchAvailableAppointments = props => {
    const {
        appointments,
        onSelect,
        onFilter,
        hasFiltered,
        selected,
        availableDateList,
        locationList,
    } = props;

    return (
        <Fragment>
            <Text
                mb={20}
                lineHeight="30px"
                fontWeight="bold"
                color="text.black"
                fontSize={4}
            >
                Make an appointment
            </Text>
            <FilterAppointmentsForm
                handleSubmit={onFilter}
                locationList={locationList}
                availableDateList={availableDateList}
            />
            {hasFiltered && !appointments.length ? (
                <Text
                    textAlign="center"
                    fontSize={3}
                    letterSpacing="-0.6px"
                    color="text.gray"
                    mt={20}
                >
                    There is no appointent available at this time
                </Text>
            ) : (
                <SelectAppointment
                    appointments={appointments}
                    selected={selected}
                    onSelect={onSelect}
                />
            )}
        </Fragment>
    );
};

SearchAvailableAppointments.propTypes = {
    appointments: PropTypes.array,
    onFilter: PropTypes.func,
    onSelect: PropTypes.func,
};

export default SearchAvailableAppointments;
