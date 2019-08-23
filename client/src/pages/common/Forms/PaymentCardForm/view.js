import React from 'react';
import _get from 'lodash/get';
import { Alert } from 'antd';
import ExistingCardFormView from './ExistingCardForm';
import NewCardFormView from './NewCardForm';
import { Box, Button, Text } from '../../../../components';
import { withScreenSizes } from '../../../../components/Responsive';
import { NEW_CARD_PAYMENT_METHOD } from '../../../../util/strings';

const renderExistingCards = (
    paymentOptionsCards,
    selectedCard,
    onChangeCardSelect
) => (
    <Box my={10}>
        <ExistingCardFormView
            selectedCard={selectedCard}
            onChangeCardMethod={onChangeCardSelect}
            paymentOptionsCards={paymentOptionsCards}
        />
    </Box>
);

const CardView = ({
    isButtonOutside,
    paymentOptionsCards,
    selectedCard,
    btnText,
    handleSubmitExistingCard,
    handleSubmitNewCard,
    onChangeCardSelect,
    onBackButton,
    hasBackButton,
    errorMessage,
    isSubmitting,
    tabletMobileOnly,
    isInPatientDashboard,
    isCreatingStripeToken,
}) => {
    const pathname = _get(window, 'location.pathname');
    const isConsentAndPayment = pathname.startsWith('/consent-and-payment');
    return (
        <Box width="100%" position="relative">
            <Text
                fontSize={isConsentAndPayment ? 3 : [1, '', 3]}
                color="text.black"
                fontWeight="bold"
                mb={[16, '', 18]}
                className="payment-card-form-title"
            >
                Card Info
            </Text>
            <Box mb={isConsentAndPayment ? [104, '', 28] : [24, '', 28]}>
                {(_get(paymentOptionsCards, 'length') > 0 ||
                    isInPatientDashboard) &&
                    renderExistingCards(
                        paymentOptionsCards,
                        selectedCard,
                        onChangeCardSelect
                    )}

                {errorMessage && <Alert type="error" message={errorMessage} />}

                {selectedCard === NEW_CARD_PAYMENT_METHOD && (
                    <NewCardFormView
                        btnText={btnText}
                        handleSubmit={handleSubmitNewCard}
                        isButtonOutside={isButtonOutside}
                        onBackButton={onBackButton}
                        hasBackButton={hasBackButton}
                        isSubmitting={isSubmitting}
                        // for payment methods in patient dashboard
                        isCreatingStripeToken={isCreatingStripeToken}
                    />
                )}
            </Box>

            {hasBackButton &&
                selectedCard !== NEW_CARD_PAYMENT_METHOD &&
                onBackButton && (
                    <Button
                        ghost={true}
                        height={['50px', '', '60px']}
                        fontSize={[1, '', 3]}
                        mb={10}
                        width={'100%'}
                        color="text.blue"
                        onClick={onBackButton}
                    >
                        Back
                    </Button>
                )}
            {/* for payment methods in patient dashboard, don't display this submit button because new card form has its own submit button  */}
            {!isInPatientDashboard && selectedCard !== NEW_CARD_PAYMENT_METHOD && (
                <Button
                    width={'100%'}
                    height={['50px', '', '60px']}
                    fontSize={[1, '', 3]}
                    px={14}
                    onClick={handleSubmitExistingCard}
                    loading={isSubmitting}
                    style={
                        // Temporary solution before we can figure out
                        // how to connect an external button to a form
                        isButtonOutside
                            ? {
                                  position: tabletMobileOnly
                                      ? 'auto'
                                      : 'absolute',
                                  width: tabletMobileOnly ? '100%' : '200px',
                                  bottom: tabletMobileOnly ? '0' : '-142px',
                                  right: tabletMobileOnly ? '0' : '-40px',
                              }
                            : {}
                    }
                >
                    {btnText}
                </Button>
            )}
        </Box>
    );
};

export default withScreenSizes(CardView);
