import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import FilterAppointmentsForm from '../Forms/FilterAppointmentsForm';
import SelectAppointment from '../SelectAppointment';
import { Text } from '../../../components';

const NoAppointmentsMessage = () => (
    <Text
        textAlign="center"
        fontSize={[1, '', 3]}
        letterSpacing="-0.6px"
        color="text.black"
        mt={20}
    >
        There is no appointment available at this time.
    </Text>
);

const SearchAvailableAppointments = props => {
    const {
        appointments,
        onSelect,
        onFilter,
        hasFiltered,
        selected,
        availableDateList,
        locationList,
        onSelectLocation,
        defaultDate,
    } = props;

    const hasAvailableDateList = get(props, 'availableDateList.length') > 0;
    return (
        <Fragment>
            {locationList.length > 0 ? (
                <Fragment>
                    <Text
                        mb={20}
                        lineHeight="30px"
                        fontWeight="bold"
                        color="text.black"
                        fontSize={[1, '', 3]}
                    >
                        Make an appointment
                    </Text>
                    <FilterAppointmentsForm
                        defaultDate={defaultDate}
                        onSelectLocation={onSelectLocation}
                        handleSubmit={onFilter}
                        locationList={locationList}
                        availableDateList={availableDateList}
                        hasTimeFilter={hasAvailableDateList}
                    />
                    {hasAvailableDateList ? null : <NoAppointmentsMessage />}
                    {hasFiltered && appointments && appointments.length > 0 && (
                        <SelectAppointment
                            appointments={appointments}
                            selected={selected}
                            onSelect={onSelect}
                        />
                    )}
                </Fragment>
            ) : (
                <NoAppointmentsMessage />
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
