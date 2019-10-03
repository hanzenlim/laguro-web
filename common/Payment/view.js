import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { Box } from '~/components';
import PaymentCardForm from '~/common/Forms/PaymentCardForm';

const PaymentView = props => {
    const {
        stripe,
        btnText,
        isButtonOutside,
        userId,
        handleSubmit,
        onBackButton,
        hasBackButton,
        isSubmitting,
        updateSubmittingState,
        checkIfVerified,
    } = props;

    return (
        <Box width="100%">
            <StripeProvider stripe={stripe}>
                <Elements>
                    <PaymentCardForm
                        btnText={btnText}
                        isButtonOutside={isButtonOutside}
                        userId={userId}
                        handleSubmit={handleSubmit}
                        onBackButton={onBackButton}
                        hasBackButton={hasBackButton}
                        isSubmitting={isSubmitting}
                        updateSubmittingState={updateSubmittingState}
                        checkIfVerified={checkIfVerified}
                        isInPatientDashboard={props.isInPatientDashboard}
                    />
                </Elements>
            </StripeProvider>
        </Box>
    );
};

export default PaymentView;
