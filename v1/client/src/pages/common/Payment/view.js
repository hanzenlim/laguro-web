import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { Box } from '../../../components';
import PaymentCardForm from '../../common/Forms/PaymentCardForm';

const PaymentPageView = props => {
    const { stripe, btnText, userId, handleSubmit } = props;

    return (
        <Box width="100%">
            <StripeProvider stripe={stripe}>
                <Elements>
                    <PaymentCardForm
                        btnText={btnText}
                        userId={userId}
                        handleSubmit={handleSubmit}
                    />
                </Elements>
            </StripeProvider>
        </Box>
    );
};

export default PaymentPageView;
