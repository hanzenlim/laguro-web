import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchAvailableAppointments from '../SearchAvailableAppointments';
import PaymentConfirmation from '../PaymentConfirmation';
// import Payment from '../Payment';

import { Box, Button } from '../../../components';

const BookAppointmentView = props => {
    const {
        data,
        bookedAppointment,
        isPaymentVisible,
        firstAppointmentDuration,
        onSelect,
        onFilter,
        isSubmitting,
    } = props;

    if (bookedAppointment)
        return (
            <PaymentConfirmation
                h1="YOUR BOOKING IS CONFIRMED"
                h2={bookedAppointment.time}
                h3={bookedAppointment.location}
            />
        );

    return (
        <Fragment>
            <SearchAvailableAppointments
                data={data}
                firstAppointmentDuration={firstAppointmentDuration}
                onSelect={onSelect}
                onFilter={onFilter}
            />
            {isPaymentVisible ? (
                <Fragment>
                    <Box mt={40}>
                        <Button
                            width={'100%'}
                            height={['50px', '', '60px']}
                            fontSize={[1, '', 3]}
                            px={14}
                            isSubmitting={isSubmitting}
                            onClick={() =>
                                props.onBookAppointment(
                                    data[0].timezone,
                                    firstAppointmentDuration
                                )
                            }
                        >
                            Make An Appointment
                        </Button>
                    </Box>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

BookAppointmentView.propTypes = {
    bookedAppointment: PropTypes.object,
    checkIfVerified: PropTypes.func,
    data: PropTypes.array,
    firstAppointmentDuration: PropTypes.number,
    isPaymentVisible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onBookAppointment: PropTypes.func,
    onFilter: PropTypes.func,
    onPay: PropTypes.func,
    onSelect: PropTypes.func,
    onVerificationResult: PropTypes.func,
    updateSubmittingState: PropTypes.func,
};

export default BookAppointmentView;
