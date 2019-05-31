/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Button, Text } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    { value: 'Weekdays', title: 'Weekdays' },
    { value: 'Weekends', title: 'Weekends' },
    { value: 'Any day', title: 'Any day' },
];

const DaysSelection = ({ setStep }) => (
    <Box mt={33}>
        {selection.map(({ value, title }) => (
            <Field
                key={value}
                render={({ form }) => (
                    <Button
                        type="ghost"
                        width={320}
                        height="auto"
                        mb={12}
                        mx="auto"
                        onClick={() => {
                            form.setValues({
                                ...form.values,
                                days: value,
                            });
                            setStep(FORM_STEPS.INPUT_NAME);
                        }}
                    >
                        <Box
                            px={74}
                            py={20}
                            border="1px solid"
                            borderColor={
                                form.values.days === value
                                    ? 'divider.blue'
                                    : '#dfe0e2'
                            }
                            borderRadius={32}
                            bg="background.white"
                            boxShadow="0 2px 7px 0 rgba(48, 53, 73, 0.1)"
                            textAlign="center"
                        >
                            <Text
                                color="text.blue"
                                fontSize={3}
                                fontWeight="medium"
                                lineHeight="21px"
                            >
                                {title}
                            </Text>
                        </Box>
                    </Button>
                )}
            />
        ))}
    </Box>
);

DaysSelection.propTypes = {
    setStep: PropTypes.func.isRequired,
};

export default DaysSelection;
