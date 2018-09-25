import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import { Box } from '../../../components';
import PaymentCardForm from '../../common/Forms/PaymentCardForm';

const PaymentView = props => {
    const { stripe, btnText, isButtonOutside, userId, handleSubmit } = props;

    return (
        <Box width="100%">
            <StripeProvider stripe={stripe}>
                <Elements>
                    <PaymentCardForm
                        btnText={btnText}
                        isButtonOutside={isButtonOutside}
                        userId={userId}
                        handleSubmit={handleSubmit}
                    />
                </Elements>
            </StripeProvider>
        </Box>
    );
};

export default PaymentView;
