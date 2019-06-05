import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

import { Box, Text, Button } from '../../../components';
import { Input } from './CustomInputs';

const StyledButton = styled(Button)`
    &&.ant-btn {
        border-radius: 32px;
    }
`;

const MemberIdStep = () => (
    <Box mt={22} textAlign="center">
        <Text fontSize={0} color="#757575" maxWidth={320} mb={25} mx="auto">
            You can find this information on your insurance card
        </Text>

        <Field
            name="memberId"
            render={({ field }) => (
                <Box mb={20} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="Member ID" {...field} />
                </Box>
            )}
        />

        <Box width={320} maxWidth="100%" mb={12} mx="auto">
            <StyledButton
                type="primary"
                maxWidth="100%"
                width="100%"
                height={60}
                fontWeight="bold"
                fontSize={1}
                htmlType="submit"
            >
                Calculate my price estimation
            </StyledButton>
        </Box>
    </Box>
);

export default MemberIdStep;
