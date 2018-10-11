import React from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Text } from '../../components';

import ProcedureSummary from '../common/ProcedureSummary';
import PaymentConfirmation from '../common/PaymentConfirmation';
import Payment from '../common/Payment';
import ConsentCheckbox from './ConsentCheckbox';

const ConsentAndPaymentPageView = props => {
    const {
        onPaymentSuccess,
        hasConsented,
        onClickCheckbox,
        patientProcedures,
        isPaymentSuccessful,
        isSubmitting,
        updateSubmittingState,
    } = props;

    if (!patientProcedures.length)
        return (
            <Container>
                <Box mt={50} width="100%" textAlign="center">
                    <Text fontSize={3}>You have no pending procedures.</Text>
                </Box>
            </Container>
        );

    if (isPaymentSuccessful) {
        return (
            <Box mt={50}>
                <PaymentConfirmation h1="Payment Successful" h2="" h3="" />
            </Box>
        );
    }

    return (
        <Container>
            <Box maxWidth={662} width="100%" my={140} mx="auto">
                <ProcedureSummary patientProcedures={patientProcedures} />
                <ConsentCheckbox
                    dentistId={patientProcedures[0].dentistId}
                    onClickCheckbox={onClickCheckbox}
                    hasConsented={hasConsented}
                />
                {hasConsented ? (
                    <Box px={38} py={26} boxShadow={0}>
                        <Payment
                            isSubmitting={isSubmitting}
                            onSuccess={onPaymentSuccess}
                            btnText="Submit"
                            updateSubmittingState={updateSubmittingState}
                            isButtonOutside={true}
                        />
                    </Box>
                ) : null}
            </Box>
        </Container>
    );
};

ConsentAndPaymentPageView.propTypes = {
    onPaymentSuccess: PropTypes.func.isRequired,
    hasConsented: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    updateSubmittingState: PropTypes.func.isRequired,
    patientProcedures: PropTypes.array.isRequired,
    isPaymentSuccessful: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};

export default ConsentAndPaymentPageView;
