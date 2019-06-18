import React from 'react';
import { Field } from 'formik';

import { Box } from '../../../components';
import { Input } from './CustomInputs';

const NameStep = () => (
    <Box mt={30} textAlign="center">
        <Field
            name="firstName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="First Name" {...field} />
                </Box>
            )}
        />
        <Field
            name="lastName"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input type="text" placeholder="Last Name" {...field} />
                </Box>
            )}
        />
    </Box>
);

export default NameStep;
