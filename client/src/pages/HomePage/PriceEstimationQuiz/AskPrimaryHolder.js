import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import { Box, Text, Button, Flex } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    { value: true, title: 'Yes' },
    { value: false, title: 'No' },
];

const resetHolderFields = form => {
    form.setFieldValue('holderFirstName', '');
    form.setFieldValue('holderLastName', '');
    form.setFieldValue('holderBirthMonth', '');
    form.setFieldValue('holderBirthDay', '');
    form.setFieldValue('holderBirthYear', '');
};

const AskPrimaryHolder = ({ setStep }) => (
    <Box mt={30}>
        <Flex width={324} mt={24} mx="auto" justifyContent="space-between">
            {selection.map(({ value, title }) => (
                <Field
                    key={value}
                    render={({ form }) => (
                        <Button
                            type="ghost"
                            width={157}
                            height="auto"
                            mb={12}
                            onClick={() => {
                                form.setFieldValue('isPrimaryHolder', value);

                                resetHolderFields(form);

                                if (value) {
                                    setStep(FORM_STEPS.INPUT_BIRTHDAY);
                                } else {
                                    setStep(FORM_STEPS.ASK_HOLDER_INFO);
                                }
                            }}
                        >
                            <Box
                                py={20}
                                border="1px solid"
                                borderColor="#dfe0e2"
                                borderRadius={32}
                                borderColor="#dfe0e2"
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
        </Flex>
    </Box>
);

AskPrimaryHolder.propTypes = {
    setStep: PropTypes.func.isRequired,
};

export default AskPrimaryHolder;
