import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

import { Box, Input as AntdInput } from '../../../components';

const Input = styled(AntdInput)`
    &.ant-input {
        text-align: center;
        height: 46px;
        font-size: ${props => props.theme.fontSizes[3]};
        border-radius: 32px;
    }
`;

const AskHolderInfo = () => (
    <Box mt={38} textAlign="center">
        <Field
            name="holderFirstName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="First Name" {...field} />
                </Box>
            )}
        />
        <Field
            name="holderLastName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="Last Name" {...field} />
                </Box>
            )}
        />
    </Box>
);

export default AskHolderInfo;
