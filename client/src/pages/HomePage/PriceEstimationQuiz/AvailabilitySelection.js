/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Button, Flex, Text } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    { value: 'Morning', title: 'Morning' },
    { value: 'Afternoon', title: 'Afternoon' },
    { value: 'Evening', title: 'Evening' },
    { value: 'Any time', title: 'Any time' },
];

const AvailabilitySelection = ({ setStep }) => (
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
                                availability: value,
                            });
                            setStep(FORM_STEPS.SELECT_DAYS);
                        }}
                    >
                        <Flex
                            alignItems="center"
                            px={74}
                            py={20}
                            border="1px solid"
                            borderColor={
                                form.values.availability === value
                                    ? 'divider.blue'
                                    : '#dfe0e2'
                            }
                            borderRadius={32}
                            bg="background.white"
                            boxShadow="0 2px 7px 0 rgba(48, 53, 73, 0.1)"
                        >
                            <Box
                                bg="background.gray"
                                width={20}
                                height={20}
                                mr={12}
                            />
                            <Box textAlign="left">
                                <Text
                                    color="text.blue"
                                    fontSize={3}
                                    fontWeight="medium"
                                    lineHeight="21px"
                                >
                                    {title}
                                </Text>
                            </Box>
                        </Flex>
                    </Button>
                )}
            />
        ))}
    </Box>
);

AvailabilitySelection.propTypes = {
    setStep: PropTypes.func.isRequired,
};

export default AvailabilitySelection;
