/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Button, Flex, Text } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    {
        value: 'First Visit',
        title: 'First Visit',
        subtitle: 'General checkup, X-rays or Exams',
    },
    {
        value: 'General procedures',
        title: 'General procedures',
        subtitle: 'Fillings, Crowns, Bridges or Veneers',
    },
    {
        value: 'Surgery',
        title: 'Surgery',
        subtitle: 'General checkup, X-rays or Exams',
    },
    {
        value: 'Special treatment',
        title: 'Special treatment',
        subtitle: 'Special treatment',
    },
];

const ProcedureSelection = ({ setStep }) => (
    <Box mt={33}>
        {selection.map(({ value, title, subtitle }) => (
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
                            form.setFieldValue('procedure', value);
                            setStep(FORM_STEPS.SELECT_AVAILABILITY);
                        }}
                    >
                        <Flex
                            alignItems="center"
                            px={36}
                            py={12}
                            border="1px solid"
                            borderColor={
                                form.values.procedure === value
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
                                    mb={6}
                                >
                                    {title}
                                </Text>
                                <Text
                                    color="#757575"
                                    fontSize={0}
                                    lineHeight="14px"
                                >
                                    {subtitle}
                                </Text>
                            </Box>
                        </Flex>
                    </Button>
                )}
            />
        ))}
    </Box>
);

ProcedureSelection.propTypes = {
    setStep: PropTypes.func.isRequired,
};

export default ProcedureSelection;
