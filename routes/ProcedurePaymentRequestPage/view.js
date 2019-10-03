import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Container, Button, Box, Text, Responsive } from '~/components';
import ProcedureSummary from './ProcedureSummary';
import PaymentConfirmation from '~/common/PaymentConfirmation';
import Payment from '~/common/Payment';
import { withScreenSizes } from '~/components/Responsive';
import DeclinePaymentModalView from './DeclinePaymentModal';

const { TabletMobile, Desktop } = Responsive;

const ProcedurePaymentRequestView = props => {
    const {
        onPaymentSuccess,
        patientProcedures,
        installmentPlan,
        nominalAmount,
        discountPrice,
        originalPrice,
        isPaymentSuccessful,
        isSubmitting,
        updateSubmittingState,
        tabletMobileOnly,
        desktopOnly,
        onClickNext,
        hasClickedNext,
        onDeclineBtn,
        showDeclinePaymentModal,
        onSubmitDeclinePayment,
        onCancelDeclinePayment,
        insuranceCoverage,
    } = props;

    const hasNotClickedNextOnTabletMobile = !hasClickedNext && tabletMobileOnly;
    const hasClickedNextOnTabletMobile = hasClickedNext && tabletMobileOnly;

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
        <Box maxWidth={662} width="100%" my={[30, '', 50]} mx="auto">
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
                        nominalAmount={nominalAmount}
                        originalPrice={originalPrice}
                        discountPrice={discountPrice}
                        insuranceCoverage={insuranceCoverage}
                    />
                </Box>
            )}

            {hasNotClickedNextOnTabletMobile && (
                <Box>
                    <Button
                        width="100%"
                        height={50}
                        loading={isSubmitting}
                        onClick={onClickNext}
                    >
                        Next
                    </Button>
                    <Button
                        type="ghost"
                        width="100%"
                        height={50}
                        mt="20px"
                        onClick={onDeclineBtn}
                    >
                        <Text
                            fontWeight="bold"
                            fontSize={3}
                            color="text.blue"
                            border="2px solid"
                            borderColor="divider.blue"
                            borderRadius="4px"
                            lineHeight="46px"
                        >
                            Decline
                        </Text>
                    </Button>
                </Box>
            )}

            {(hasClickedNextOnTabletMobile || desktopOnly) && (
                <Box>
                    <Box
                        my={[20, '', 30]}
                        px={[0, '', 38]}
                        py={[0, '', 26]}
                        boxShadow={['none', '', 0]}
                    >
                        <Payment
                            isSubmitting={isSubmitting}
                            onSuccess={onPaymentSuccess}
                            btnText="Pay"
                            updateSubmittingState={updateSubmittingState}
                            isButtonOutside
                        />
                    </Box>
                    <Button
                        type="ghost"
                        height={[50, '', 60]}
                        width={['100%', '', 200]}
                        onClick={onDeclineBtn}
                    >
                        <Text
                            fontWeight="bold"
                            fontSize={3}
                            color="text.blue"
                            border="2px solid"
                            borderColor="divider.blue"
                            borderRadius="4px"
                            lineHeight={['46px', '', '56px']}
                        >
                            Decline
                        </Text>
                    </Button>
                </Box>
            )}
            <DeclinePaymentModalView
                visible={showDeclinePaymentModal}
                onSubmit={onSubmitDeclinePayment}
                onCancel={onCancelDeclinePayment}
            />
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
    hasClickedNext: PropTypes.bool.isRequired,
    onClickNext: PropTypes.func.isRequired,
    onDeclineBtn: PropTypes.func.isRequired,
    patientProcedures: PropTypes.array.isRequired,
    installmentPlan: PropTypes.object.isRequired,
    originalPrice: PropTypes.string,
    nominalAmount: PropTypes.string,
    discountPrice: PropTypes.string,
    isPaymentSuccessful: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmitDeclinePayment: PropTypes.func.isRequired,
    onCancelDeclinePayment: PropTypes.func.isRequired,
    showDeclinePaymentModal: PropTypes.bool.isRequired,
    insuranceCoverage: PropTypes.number.isRequired,
    updateSubmittingState: PropTypes.func.isRequired,
    tabletMobileOnly: PropTypes.bool.isRequired,
    desktopOnly: PropTypes.bool.isRequired,
};

export default withScreenSizes(ProcedurePaymentRequestView);
