import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Container, Button, Box, Text, Responsive } from '../../components';
import ProcedureSummary from '../common/ProcedureSummary';
import PaymentConfirmation from '../common/PaymentConfirmation';
import Payment from '../common/Payment';
import ConsentCheckbox from './ConsentCheckbox';
import { withScreenSizes } from '../../components/Responsive';

const { TabletMobile, Desktop } = Responsive;

const ConsentAndPaymentPageView = props => {
    const {
        onPaymentSuccess,
        hasConsented,
        onClickCheckbox,
        patientProcedures,
        isPaymentSuccessful,
        isSubmitting,
        updateSubmittingState,
        tabletMobileOnly,
        onClickNext,
        hasClickedNext,
        rejectedIds,
        rejectProcedure,
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

    const content = (
        <Box maxWidth={662} width="100%" my={[30, '', 140]} mx="auto">
            <Box mb={[16, '', 30]}>
                <Text
                    fontSize={[28, '', 30]}
                    lineHeight={1}
                    fontWeight="bold"
                    letterSpacing={['-0.7px', '', '-0.6px']}
                    color="text.gray"
                    mb={[0, '', 20]}
                >
                    Consent and Payment
                </Text>
                <Text
                    is="span"
                    fontSize={[28, '', 30]}
                    lineHeight={1}
                    fontWeight="bold"
                    letterSpacing="-0.6px"
                    color="text.black"
                >
                    Review and pay for your procedure{' '}
                </Text>
                {tabletMobileOnly && (
                    <Text
                        is="span"
                        fontSize={[28, '', 30]}
                        lineHeight={1}
                        fontWeight="bold"
                        letterSpacing="-0.6px"
                        color="text.black"
                    >
                        {!hasClickedNext ? '(1/2)' : '(2/2)'}
                    </Text>
                )}
            </Box>

            {(!tabletMobileOnly || (!hasClickedNext && tabletMobileOnly)) && (
                <Box mb={[28, '', 0]}>
                    <ProcedureSummary
                        patientProcedures={patientProcedures}
                        rejectedIds={rejectedIds}
                        rejectProcedure={rejectProcedure}
                    />
                    <ConsentCheckbox
                        dentistId={patientProcedures[0].dentistId}
                        onClickCheckbox={onClickCheckbox}
                        hasConsented={hasConsented}
                    />
                </Box>
            )}

            {tabletMobileOnly &&
                !hasClickedNext && (
                    <Button
                        width="100%"
                        disabled={!hasConsented}
                        onClick={onClickNext}
                    >
                        Next
                    </Button>
                )}

            {(tabletMobileOnly && hasClickedNext) ||
            (!tabletMobileOnly && hasConsented) ? (
                <Box
                    px={[0, '', 38]}
                    py={[0, '', 26]}
                    boxShadow={['none', '', 0]}
                >
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
    );

    return (
        <Fragment>
            <TabletMobile>
                <Container>{content}</Container>
            </TabletMobile>
            <Desktop>{content}</Desktop>
        </Fragment>
    );
};

ConsentAndPaymentPageView.propTypes = {
    onPaymentSuccess: PropTypes.func.isRequired,
    hasConsented: PropTypes.bool.isRequired,
    hasClickedNext: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    updateSubmittingState: PropTypes.func.isRequired,
    patientProcedures: PropTypes.array.isRequired,
    isPaymentSuccessful: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    rejectedIds: PropTypes.array.isRequired,
    rejectProcedure: PropTypes.func.isRequired,
};

export default withScreenSizes(ConsentAndPaymentPageView);
