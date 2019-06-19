/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Button, Flex, Text, Icon } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    { value: 'Morning', title: 'Morning', icon: 'Morning' },
    { value: 'Afternoon', title: 'Afternoon', icon: 'Afternoon' },
    { value: 'Evening', title: 'Evening', icon: 'Evening' },
    { value: 'Any time', title: 'Any time', icon: 'Anytime' },
];

const TimeAvailabilitySelection = ({ setFormStep }) => (
    <Box mt={33}>
        {selection.map(({ value, title, icon }) => (
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
                            form.setFieldValue('timeAvailability', value);
                            setFormStep(FORM_STEPS.SELECT_DAYS);
                        }}
                    >
                        <Flex
                            alignItems="center"
                            px={74}
                            py={20}
                            border="1px solid"
                            borderColor={
                                form.values.timeAvailability === value
                                    ? 'divider.blue'
                                    : '#dfe0e2'
                            }
                            borderRadius={32}
                            bg="background.white"
                            boxShadow="0 2px 7px 0 rgba(48, 53, 73, 0.1)"
                        >
                            <Icon type={icon} fontSize={20} mr={12} />
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

TimeAvailabilitySelection.propTypes = {
    setFormStep: PropTypes.func.isRequired,
};

export default TimeAvailabilitySelection;
