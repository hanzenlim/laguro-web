import React, { Fragment } from 'react';
import { Field } from 'formik';
import _range from 'lodash/range';

import { Box, Text } from '~/components';
import { Select } from './CustomInputs';

const { Option } = Select;

const days = _range(18, 121).map(i => i.toString());

const checkIfMinor = ({ form }) => {
    let isMinor = false;

    const {
        values: { age },
    } = form;

    isMinor = age < 18;

    return isMinor;
};

const GetAge = () => (
    <Box mt={30}>
        <Field
            name="age"
            render={({ form }) => {
                const isMinor = checkIfMinor({ form });
                return (
                    <Fragment>
                        <Box id="age-input" mx="auto" mb={20} maxWidth={320}>
                            <Select
                                placeholder="Age"
                                onChange={value =>
                                    form.setFieldValue('age', value)
                                }
                                getPopupContainer={() =>
                                    document.getElementById('age-input')
                                }
                            >
                                {days.map(year => (
                                    <Option key={year} value={year}>
                                        {year}
                                    </Option>
                                ))}
                            </Select>
                        </Box>
                        {isMinor && (
                            <Text
                                color="#ea424c"
                                fontSize={0}
                                mx="auto"
                                maxWidth={320}
                                textAlign="left"
                            >
                                You must be at least 18 years old to continue.
                                If you are not, then please restart the quiz
                                using your legal guardian’s information.
                            </Text>
                        )}
                    </Fragment>
                );
            }}
        />
    </Box>
);

export default GetAge;
