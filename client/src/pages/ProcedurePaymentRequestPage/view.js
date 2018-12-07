import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Container, Button, Box, Text, Responsive } from '../../components';
import ProcedureSummary from './ProcedureSummary';
import PaymentConfirmation from '../common/PaymentConfirmation';
import Payment from '../common/Payment';
import ConsentCheckbox from './ConsentCheckbox';
import { withScreenSizes } from '../../components/Responsive';

const { TabletMobile, Desktop } = Responsive;

const ProcedurePaymentRequestView = props => {
    const {
        onPaymentSuccess,
        hasConsented,
        onClickCheckbox,
        patientProcedures,
        installmentPlan,
        totalPrice,
        discountPrice,
        originalPrice,
        isPaymentSuccessful,
        isSubmitting,
        updateSubmittingState,
        tabletMobileOnly,
        desktopOnly,
        onClickNext,
        hasClickedNext,
    } = props;

    const hasNotClickedNextOnTabletMobile = !hasClickedNext && tabletMobileOnly;
    const hasClickedNextOnTabletMobile = hasClickedNext && tabletMobileOnly;
    const hasConsentedOnDesktop = hasConsented && desktopOnly;

    if (!_get(patientProcedures, 'length'))
        return (
            <Container>
                <Box mt={50} width="100%" textAlign="center">
                    <Text fontSize={3}>You have no pending procedures.</Text>
                </Box>
            </Container>
        );

    if (isPaymentSuccessful) {
        window.scrollTo(0, 0);
        return (
            <Box mt={50}>
                <PaymentConfirmation h1="Payment Successful" h2="" h3="" />
            </Box>
        );
    }

    const content = (
        <Box maxWidth={662} width="100%" my={[30, '', 140]} mx="auto">
            <Box mb={[25, '', 30]}>
                <Text
                    fontSize={[28, '', 30]}
                    lineHeight={1}
                    fontWeight="bold"
                    letterSpacing={['-0.7px', '', '-0.6px']}
                    color="text.gray"
                    mb={[0, '', 20]}
                >
                    Procedure Payment
                </Text>
                <Text
                    is="span"
                    fontSize={[28, '', 30]}
                    lineHeight={1}
                    fontWeight="bold"
                    letterSpacing="-0.6px"
                    color="text.black"
                >
                    Review and pay for your procedure
                </Text>
            </Box>

            {(desktopOnly || hasNotClickedNextOnTabletMobile) && (
                <Box mb={[28, '', 0]}>
                    <ProcedureSummary
                        patientProcedures={patientProcedures}
                        installmentPlan={installmentPlan}
                        totalPrice={totalPrice}
                        originalPrice={originalPrice}
                        discountPrice={discountPrice}
                    />
                    <ConsentCheckbox
                        onClickCheckbox={onClickCheckbox}
                        hasConsented={hasConsented}
                    />
                </Box>
            )}

            {hasNotClickedNextOnTabletMobile && (
                <Button
                    width="100%"
                    disabled={!hasConsented}
                    loading={isSubmitting}
                    onClick={onClickNext}
                >
                    Next
                </Button>
            )}

            {(hasClickedNextOnTabletMobile || hasConsentedOnDesktop) && (
                <Box
                    px={[0, '', 38]}
                    py={[0, '', 26]}
                    boxShadow={['none', '', 0]}
                >
                    <Payment
                        isSubmitting={isSubmitting}
                        onSuccess={onPaymentSuccess}
                        btnText="Pay"
                        updateSubmittingState={updateSubmittingState}
                        isButtonOutside={true}
                        disabled={!hasConsentedOnDesktop}
                    />
                </Box>
            )}
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

ProcedurePaymentRequestView.propTypes = {
    onPaymentSuccess: PropTypes.func.isRequired,
    hasConsented: PropTypes.bool.isRequired,
    hasClickedNext: PropTypes.bool.isRequired,
    onClickCheckbox: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    updateSubmittingState: PropTypes.func.isRequired,
    patientProcedures: PropTypes.array.isRequired,
    installmentPlan: PropTypes.object.isRequired,
    originalPrice: PropTypes.string,
    totalPrice: PropTypes.string,
    discountPrice: PropTypes.string,
    isPaymentSuccessful: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};

export default withScreenSizes(ProcedurePaymentRequestView);
