import React, { Fragment } from 'react';
import SearchAvailableAppointments from '../SearchAvailableAppointments';
import PaymentConfirmation from '../PaymentConfirmation';
import Payment from '../Payment';

import { Text, Flex, Box } from '../../../components';

const BookAppointmentView = props => {
    const {
        data,
        bookedAppointment,
        isPaymentVisible,
        onPaymentSuccess,
        onSelect,
        onFilter,
    } = props;

    if (bookedAppointment)
        return (
            <PaymentConfirmation
                h1="YOUR BOOKING IS COMFIRMED"
                h2={bookedAppointment.time}
                h3={bookedAppointment.location}
            />
        );

    return (
        <Fragment>
            <SearchAvailableAppointments
                data={data}
                onSelect={onSelect}
                onFilter={onFilter}
            />
            {isPaymentVisible ? (
                <Fragment>
                    <Box mt={40}>
                        <Text
                            mb={16}
                            lineHeight="30px"
                            fontWeight="bold"
                            color="text.black"
                            fontSize={4}
                        >
                            Payment Summary
                        </Text>
                        <Text
                            mb={40}
                            fontSize={1}
                            letterSpacing="0.4px"
                            color="text.black"
                        >
                            * This is just a reservation fee. You will be
                            refunded after your appointment.
                        </Text>
                        <Flex mb={10} justifyContent="space-between">
                            <Text fontSize={2} color="text.black">
                                Service fee
                            </Text>
                            <Text fontSize={2} color="text.black">
                                $20.00
                            </Text>
                        </Flex>
                        <Box
                            borderBottom="1px solid"
                            borderColor="divider.darkGray"
                            mb={10}
                        />
                        <Flex justifyContent="space-between">
                            <Text fontSize={3} color="text.green">
                                Total
                            </Text>
                            <Text fontSize={3} color="text.green">
                                $20.00
                            </Text>
                        </Flex>
                    </Box>
                    <Payment onSuccess={onPaymentSuccess} />
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default BookAppointmentView;
