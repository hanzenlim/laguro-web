import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { withRouter } from 'react-router-dom';

import { Box, Text, Button, Flex } from '../../../components';
import { FORM_STEPS } from '.';

const selection = [
    { value: true, title: 'Yes' },
    { value: false, title: 'No' },
];

const CheckInsurance = ({ setStep, history }) => (
    <Box mt={20}>
        <Text fontSize={0} color="#757575" width={324} mx="auto">
            By entering your insurance information, we’ll give you an estimate
            of how much you’ll be paying for this procedure.
        </Text>

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
                                form.setFieldValue('hasInsurance', value);

                                if (value) {
                                    setStep(FORM_STEPS.GET_INSURANCE_PROVIDER);
                                } else {
                                    // TODO: Add query params based on answers
                                    history.push('/dentist/search');
                                }
                            }}
                        >
                            <Box
                                py={20}
                                border="1px solid"
                                borderColor="#dfe0e2"
                                borderRadius={32}
                                borderColor={
                                    form.values.hasInsurance === value
                                        ? 'divider.blue'
                                        : '#dfe0e2'
                                }
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

CheckInsurance.propTypes = {
    setStep: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(CheckInsurance);
