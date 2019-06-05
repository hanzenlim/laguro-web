import React from 'react';
import { Field } from 'formik';

import { Box } from '../../../components';
import { Input } from './CustomInputs';

const InsuranceProvider = () => (
    <Box mt={38} textAlign="center">
        <Field
            name="insuranceProvider"
            render={({ field }) => (
                <Box mb={10} mx="auto" maxWidth={320}>
                    <Input
                        type="text"
                        placeholder="Type your insurance"
                        {...field}
                    />
                </Box>
            )}
        />
    </Box>
);

export default InsuranceProvider;
