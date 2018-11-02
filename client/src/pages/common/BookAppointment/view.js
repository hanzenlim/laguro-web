import React, { Fragment } from 'react';
import SearchAvailableAppointments from '../SearchAvailableAppointments';
import PaymentConfirmation from '../PaymentConfirmation';
import Payment from '../Payment';

import { Text, Flex, Box } from '../../../components';
import UserVerificationModal from '../Modals/UserVerificationModal';
import { PATIENT } from '../../../util/strings';

const BookAppointmentView = props => {
    const {
        data,
        bookedAppointment,
        isPaymentVisible,
        onPay,
        onSelect,
        onFilter,
        showVerificationModal,
        onVerificationResult,
        isSubmitting,
        updateSubmittingState,
        checkIfVerified,
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
            <UserVerificationModal
                persona={PATIENT}
                visible={showVerificationModal}
                closeModal={onVerificationResult}
                onVerificationComplete={onVerificationResult}
            />
            <SearchAvailableAppointments
                data={data}
                onSelect={onSelect}
                onFilter={onFilter}
            />
            {isPaymentVisible ? (
                <Fragment>
                    <Box mt={40} mb={38}>
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
                                $20.00
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
                                $20.00
                            </Text>
                        </Flex>
                    </Box>
                    <Payment
                        onPay={onPay}
                        isSubmitting={isSubmitting}
                        updateSubmittingState={updateSubmittingState}
                        checkIfVerified={checkIfVerified}
                    />
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default BookAppointmentView;
