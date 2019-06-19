/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Button, Flex, Text, Icon } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    {
        value: 'FIRST_VISIT',
        title: 'First Visit',
        subtitle: 'General checkup, X-rays or Exams',
        icon: 'FirstVisit',
    },
    {
        value: 'GENERAL',
        title: 'General procedures',
        subtitle: 'Fillings, Crowns, Bridges or Veneers',
        icon: 'GeneralProcedures',
    },
    {
        value: 'SURGERY',
        title: 'Surgery',
        subtitle: 'General checkup, X-rays or Exams',
        icon: 'Surgery',
    },
    {
        value: 'SPECIAL',
        title: 'Special treatment',
        subtitle: 'Special treatment',
        icon: 'SpecialTreatment',
    },
];

const BundleGroupSelection = ({ setFormStep }) => (
    <Box mt={33}>
        {selection.map(({ value, title, subtitle, icon }) => (
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
                            form.setFieldValue('bundleGroup', value);
                            setFormStep(FORM_STEPS.SELECT_TIME_AVAILABILITY);
                        }}
                    >
                        <Flex
                            alignItems="center"
                            px={36}
                            py={12}
                            border="1px solid"
                            borderColor={
                                form.values.bundleGroup === value
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

BundleGroupSelection.propTypes = {
    setFormStep: PropTypes.func.isRequired,
};

export default BundleGroupSelection;
