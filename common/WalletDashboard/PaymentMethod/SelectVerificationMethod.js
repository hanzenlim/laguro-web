import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Box, Text, Grid } from '~/components';
import { PaymentMethodContext } from './PaymentMethodModal';

const SelectVerificationMethod = () => {
    const { setCurrentStep, PAYMENT_METHOD_STEPS } = useContext(
        PaymentMethodContext
    );
    return (
        <Box>
            <Text fontSize={3} fontWeight="medium" textAlign="center" mb={82}>
                Select verification method
            </Text>

            <Grid gridTemplateColumns="1fr 1fr" gridColumnGap={18}>
                <VericationMethod
                    title="Instant Verification"
                    description="Sign in to your bank to instantly verify your bank account."
                    onClick={() =>
                        setCurrentStep(
                            PAYMENT_METHOD_STEPS.INSTANT_VERIFICATION
                        )
                    }
                />
                <VericationMethod
                    title="Manual Verification"
                    description="Use your bank’s routing and account number. Verification can take up to 3 business days."
                    disabled
                    onClick={
                        () => {}
                        // Todo: change step
                        // setCurrentStep(
                        //     PAYMENT_METHOD_STEPS.INSTANT_VERIFICATION
                        // )
                    }
                />
            </Grid>
        </Box>
    );
};

const VericationMethod = ({ title, description, onClick, disabled }) => (
    <Box
        boxShadow="0 2px 6px 1px rgba(0, 0, 0, 0.09)"
        borderRadius={21}
        px={16}
        pb={32}
        pt={52}
        style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.4 : 1,
        }}
        onClick={onClick}
    >
        <Text fontSize={2} fontWeight="medium" color="#245197" mb={10}>
            {title}
        </Text>
        <Text fontSize="10px" color="text.gray">
            {description}
        </Text>
    </Box>
);

SelectVerificationMethod.propTypes = {};
VericationMethod.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

VericationMethod.defaultProps = {
    disabled: false,
};

export default SelectVerificationMethod;
