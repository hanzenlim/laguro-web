import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { withRouter } from 'react-router-dom';

import { Box, Text, Button, Flex } from '../../../components';
import { FORM_STEPS, FORM_LOADERS } from '.';

const selection = [
    { value: true, title: 'Yes' },
    { value: false, title: 'No' },
];

const CheckInsurance = ({ setFormStep, history }) => (
    <Box mt={20}>
        <Text fontSize={0} color="#757575" maxWidth={320} mx="auto">
            We’ll give you an estimate of how much you’ll be paying for this
            procedure.
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
                                    setFormStep(
                                        FORM_STEPS.GET_INSURANCE_PROVIDER
                                    );
                                } else {
                                    setFormStep(
                                        FORM_LOADERS.MATCH_DENTIST_AVAILABLE
                                    );
                                    setTimeout(() => {
                                        history.push(
                                            `/dentist/search?bundleGroup=${
                                                form.values.bundleGroup
                                            }&dayAvailability=${
                                                form.values.dayAvailability
                                            }&timeAvailability=${
                                                form.values.timeAvailability
                                            }&age=${
                                                form.values.age
                                            }&hasFinishedSurvey=true`
                                        );
                                    }, 3000);
                                }
                            }}
                        >
                            <Box
                                py={20}
                                border="1px solid"
                                borderRadius={32}
                                borderColor={
                                    form.values.hasInsurance === value
                                        ? 'divider.blue'
                                        : '#dfe0e2'
                                }
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
        </Flex>
    </Box>
);

CheckInsurance.propTypes = {
    setFormStep: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default withRouter(CheckInsurance);
