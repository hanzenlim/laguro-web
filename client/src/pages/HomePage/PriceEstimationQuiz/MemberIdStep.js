import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

import { Box, Text, Button } from '../../../components';
import { Input } from './CustomInputs';

const StyledButton = styled(Button)`
    &&.ant-btn {
        border-radius: 32px;
    }
`;

const MemberIdStep = ({ isCheckEligibilityLoading }) => (
    <Box mt={22} textAlign="center">
        <Text fontSize={0} color="#757575" maxWidth={320} mb={25} mx="auto">
            You can find this information on your insurance card
        </Text>

        <Field
            name="memberId"
            render={({ field }) => (
                <Box mb={20} mx="auto" maxWidth={320}>
                    <Input
                        type="text"
                        placeholder="Member ID"
                        {...field}
                        required
                    />
                </Box>
            )}
        />

        <Box width={320} maxWidth="100%" mb={15} mx="auto">
            <StyledButton
                type="primary"
                width="100%"
                height={60}
                fontWeight="bold"
                fontSize={1}
                loading={isCheckEligibilityLoading}
                htmlType="submit"
            >
                Calculate my price estimation
            </StyledButton>
        </Box>

        <Text
            color="#ea424c"
            fontSize={0}
            fontWeight="medium"
            textAlign="left"
            width={320}
            maxWidth="100%"
            mx="auto"
        >
            <ErrorMessage name="memberId" />
        </Text>
    </Box>
);

MemberIdStep.propTypes = {
    isCheckEligibilityLoading: PropTypes.bool.isRequired,
};

export default MemberIdStep;
