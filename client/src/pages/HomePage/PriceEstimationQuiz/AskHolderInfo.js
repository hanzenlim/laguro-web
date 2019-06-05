import React from 'react';
import { Field } from 'formik';

import { Box } from '../../../components';
import { Input } from './CustomInputs';

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
