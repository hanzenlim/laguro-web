import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import { Box, Text, Button, Flex, Grid } from '../../../../components';
import { Onboarding } from '../../the-bright-side-components';

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29.5px;
        border: 1px solid;
        font-size: 16px;
    }
`;

const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
];

const ContactInformationForm = props => (
    <Form>
        <Box mt={[22, '', 0]} mb={[42, '', 0]} pl={[0, '', 10]}>
            <Text
                fontSize={1}
                fontWeight="500"
                letterSpacing="-0.4px"
                color="text.black"
            >
                Address
            </Text>
            <Text
                fontSize={1}
                fontWeight="500"
                letterSpacing="-0.4px"
                color="text.lightGray"
                mb="16px"
            >
                We use this data for analysis only and will never share this
                with others.
            </Text>
            <Grid
                gridTemplateRows={['auto auto', '', 'auto']}
                gridTemplateColumns={['1fr', '', '1fr 1fr']}
                gridColumnGap={11}
            >
                <Box width={['100%', '', '']}>
                    <Field
                        name="address.streetAddress"
                        placeholder="Address 1"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="address.addressDetails"
                        placeholder="Address 2"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="address.city"
                        placeholder="City"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="address.zipCode"
                        placeholder="Postal code"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="address.state"
                        placeholder="State"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                options={states.map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            />
                        )}
                    />
                </Box>
            </Grid>

            <Text
                fontSize={1}
                fontWeight="500"
                letterSpacing="-0.4px"
                color="text.black"
                mb="10px"
            >
                Emergency contact
            </Text>
            <Text
                fontSize={1}
                fontWeight="500"
                letterSpacing="-0.4px"
                color="text.lightGray"
                mb="16px"
                maxWidth="590px"
            >
                Your most trusted contact we can alert in urgent situations.
            </Text>
            <Grid
                gridTemplateRows={['auto auto', '', 'auto']}
                gridTemplateColumns={['1fr', '', '1fr 1fr']}
                gridColumnGap={11}
            >
                <Box width={['100%', '', '']}>
                    <Field
                        name="emergencyContact.firstName"
                        placeholder="First name"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="emergencyContact.lastName"
                        placeholder="Last name"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="emergencyContact.relationship"
                        placeholder="Relationship"
                        component={Onboarding.InputField}
                    />
                </Box>
                <Box width={['100%', '', '']}>
                    <Field
                        name="emergencyContact.phoneNumber"
                        placeholder="Phone number"
                        component={Onboarding.InputField}
                    />
                </Box>
            </Grid>

            <Flex width="100%" justifyContent="center" mt={28}>
                <StyledNextButton
                    htmlType="submit"
                    loading={props.isSubmitting}
                    width={329}
                    height={50}
                    ghost={true}
                >
                    Save changes
                </StyledNextButton>
            </Flex>
        </Box>
    </Form>
);

ContactInformationForm.defaultProps = {
    onSuccess: async () => {},
};

ContactInformationForm.propTypes = {
    data: PropTypes.shape({
        streetAddress: PropTypes.string,
        addressDetails: PropTypes.string,
        city: PropTypes.string,
        zipCode: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        relationship: PropTypes.string,
        phoneNumber: PropTypes.string,
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default withFormik({
    validationSchema: Yup.object().shape({
        address: Yup.object().shape({
            streetAddress: Yup.string().required('Please fill out this field.'),
            addressDetails: Yup.string(),
            city: Yup.string().required('Please fill out this field.'),
            zipCode: Yup.string().required('Please fill out this field.'),
            state: Yup.string().required('Please fill out this field.'),
        }),
        emergencyContact: Yup.object().shape({
            firstName: Yup.string().required('Please fill out this field.'),
            lastName: Yup.string().required('Please fill out this field.'),
            relationship: Yup.string().required('Please fill out this field.'),
            phoneNumber: Yup.string()
                .matches(/^[0-9]*$/, 'Please use a valid phone number')
                .length(10, 'Mobile number should be 10 digits')
                .required('Please fill out this field.'),
        }),
    }),
    mapPropsToValues: props => {
        const { data } = props;
        return { ...data };
    },
    handleSubmit: async (values, actions) => {
        actions.setSubmitting(true);
        const result = await actions.props.onSuccess(values);
        actions.setSubmitting(false);

        if (result) {
            message.success('Contact information successfully updated!');
        }
    },
})(ContactInformationForm);
