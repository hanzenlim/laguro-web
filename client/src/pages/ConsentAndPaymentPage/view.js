import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    CheckMarkAnimation,
    Container,
    Button,
    Box,
    Text,
    Responsive,
} from '../../components';
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
        desktopOnly,
        onClickNext,
        hasClickedNext,
        rejectedIds,
        rejectProcedure,
        confirmRejectAllProcedures,
        isRejectSuccessful,
    } = props;

    const hasNotClickedNextOnTabletMobile = !hasClickedNext && tabletMobileOnly;
    const hasClickedNextOnTabletMobile = hasClickedNext && tabletMobileOnly;
    const hasConsentedOnDesktop = hasConsented && desktopOnly;
    const hasRejectedAll = patientProcedures.length === rejectedIds.length;

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

    if (isRejectSuccessful) {
        return (
            <Box mt={50}>
                <Text textAlign="center">
                    <CheckMarkAnimation />
                    <Box width={['100%', '', '400px']} mx="auto">
                        <Text
                            fontSize={[2, '', 4]}
                            py={10}
                            textTransform="uppercase"
                        >
                            All Procedures have been rejected.
                        </Text>
                    </Box>
                </Text>
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
                    Review and pay for your procedure
                </Text>
            </Box>

            {(desktopOnly || hasNotClickedNextOnTabletMobile) && (
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

            {hasNotClickedNextOnTabletMobile && (
                <Button
                    width="100%"
                    disabled={!hasConsented}
                    loading={isSubmitting}
                    onClick={
                        !hasRejectedAll
                            ? onClickNext
                            : confirmRejectAllProcedures
                    }
                >
                    {!hasRejectedAll ? 'Next' : 'Confirm'}
                </Button>
            )}

            {(hasClickedNextOnTabletMobile || hasConsentedOnDesktop) &&
            !hasRejectedAll ? (
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
            ) : null}

            {hasRejectedAll && hasConsentedOnDesktop ? (
                <Fragment>
                    <Box
                        px={[0, '', 38]}
                        py={[0, '', 26]}
                        boxShadow={['none', '', 0]}
                    >
                        <Box pt={16}>
                            <Text mb={16} fontSize={2}>
                                By clicking the button below, you agree on
                                rejecting the following procedures:
                            </Text>
                            <ul>
                                {patientProcedures.map(pc => (
                                    <li key={pc.id}>
                                        <Text fontSize={2} fontWeight="medium">
                                            {pc.name}
                                        </Text>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    </Box>
                    <Text textAlign="right" mt={20}>
                        <Button
                            height="60px"
                            width={200}
                            onClick={confirmRejectAllProcedures}
                            loading={isSubmitting}
                        >
                            Confirm
                        </Button>
                    </Text>
                </Fragment>
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
    confirmRejectAllProcedures: PropTypes.func.isRequired,
    isRejectSuccessful: PropTypes.bool.isRequired,
};

export default withScreenSizes(ConsentAndPaymentPageView);
