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
        // checkIfVerified,
        // onPay,
        // updateSubmittingState,
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
                    {/* <Box mt={40} mb={38}>
                        <Text
                            mb={16}
                            lineHeight="30px"
                            fontWeight="bold"
                            color="text.black"
                            fontSize={[1, '', 4]}
                        >
                            Payment Summary
                        </Text>
                        <Text
                            mb={40}
                            fontSize={[0, '', 1]}
                            letterSpacing="0.4px"
                            color="text.black"
                        >
                            * This is just a reservation fee. You will be
                            refunded after your appointment.
                        </Text>
                        <Flex mb={10} justifyContent="space-between">
                            <Text fontSize={[0, '', 2]} color="text.black">
                                Service fee
                            </Text>
                            <Text fontSize={[0, '', 2]} color="text.black">
                                $0.00
                            </Text>
                        </Flex>
                        <Box
                            borderBottom="1px solid"
                            borderColor="divider.darkGray"
                            mb={10}
                        />
                        <Flex justifyContent="space-between">
                            <Text
                                fontSize={[0, '', 3]}
                                fontWeight={['bold', '', 'regular']}
                                color="text.blue"
                            >
                                Total
                            </Text>
                            <Text
                                fontSize={[0, '', 3]}
                                fontWeight={['bold', '', 'regular']}
                                color="text.blue"
                            >
                                $0.00
                            </Text>
                        </Flex>
                    </Box>
                    */}
                    {/* <Payment
                        onPay={onPay}
                        isSubmitting={isSubmitting}
                        updateSubmittingState={updateSubmittingState}
                        checkIfVerified={checkIfVerified}
                    /> */}
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
