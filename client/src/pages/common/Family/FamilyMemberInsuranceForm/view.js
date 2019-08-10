import React from 'react';
import { Form, Field, withFormik } from 'formik';
import _capitalize from 'lodash/capitalize';
import FormFields from '../../FormFields';
import FormElements from '../../FormElements';
import { Onboarding } from '../../the-bright-side-components/';
import { Box, Text, Flex, Grid } from '../../../../components/';
import { validationSchema } from './validators';

const YES = 'yes';
const NO = 'no';

const YES_AND_NO_CHOICES = [
    { key: YES, value: _capitalize(YES) },
    { key: NO, value: _capitalize(NO) },
];

const FamilyMemberInsuranceFormView = props => {
    const { isSubmitting = false, values } = props;
    return (
        <Form>
            <Flex alignItems="center" flexDirection="column" width="100%">
                <Box width={['100%', '', '500px']}>
                    <Box width="100%">
                        <Text
                            width={['100%', '', '500px']}
                            fontSize={1}
                            letterSpacing="-0.4px"
                            color="text.black"
                            mb="10px"
                        >
                            Does this person have insurance?
                        </Text>
                        <Box width={['100%', '', '500px']}>
                            <Field name="hasInsurance">
                                {({ form, field }) => (
                                    <FormElements.Choices
                                        form={form}
                                        field={field}
                                        defaultValue={null}
                                        values={YES_AND_NO_CHOICES}
                                    />
                                )}
                            </Field>
                        </Box>
                    </Box>

                    {values.hasInsurance === YES && (
                        <Box width="100%">
                            <Text
                                width={['100%', '', '500px']}
                                fontSize={1}
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Does this person have their own insurance?
                            </Text>
                            <Box width={['100%', '', '500px']}>
                                <Field name="hasOwnInsurance">
                                    {({ form, field }) => (
                                        <FormElements.Choices
                                            form={form}
                                            field={field}
                                            defaultValue={null}
                                            values={YES_AND_NO_CHOICES}
                                        />
                                    )}
                                </Field>
                            </Box>
                        </Box>
                    )}

                    {values.hasInsurance === YES &&
                        values.hasOwnInsurance === NO && (
                            <Box width="100%">
                                <Text
                                    fontSize={1}
                                    letterSpacing="-0.4px"
                                    color="text.black"
                                    mb="10px"
                                >
                                    Is this person under your insurance?
                                </Text>
                                <Box width={['100%', '', '500px']}>
                                    <Field name="isUnderPrimaryUserInsurance">
                                        {({ form, field }) => (
                                            <FormElements.Choices
                                                form={form}
                                                field={field}
                                                defaultValue={null}
                                                values={YES_AND_NO_CHOICES}
                                            />
                                        )}
                                    </Field>
                                </Box>
                            </Box>
                        )}

                    {values.hasInsurance === YES &&
                        values.hasOwnInsurance === NO &&
                        values.isUnderPrimaryUserInsurance === NO && (
                            <Box width="100%">
                                <Text
                                    fontSize={1}
                                    letterSpacing="-0.4px"
                                    color="text.black"
                                    mb="10px"
                                >
                                    Name
                                </Text>
                                <Flex flexDirection={['column', '', 'row']}>
                                    <Flex>
                                        <Box width="50%" mr={11}>
                                            <Field
                                                name="policyHolderUser.firstName"
                                                placeholder="First Name"
                                                component={
                                                    Onboarding.InputField
                                                }
                                            />
                                        </Box>
                                        <Box width="50%" mr={[0, '', '11px']}>
                                            <Field
                                                name="policyHolderUser.lastName"
                                                placeholder="Last Name"
                                                component={
                                                    Onboarding.InputField
                                                }
                                            />
                                        </Box>
                                    </Flex>
                                </Flex>
                                <Text
                                    fontSize={1}
                                    letterSpacing="-0.4px"
                                    color="text.black"
                                    mb="10px"
                                >
                                    Date of Birth
                                </Text>
                                <Grid
                                    width="100%"
                                    gridColumnGap="14px"
                                    gridTemplateColumns={[
                                        '100%',
                                        '',
                                        `1fr 1fr 1fr`,
                                    ]}
                                >
                                    <Field name="policyHolderUser.birthMonth">
                                        {props => (
                                            <FormFields.SelectMonth
                                                {...props}
                                            />
                                        )}
                                    </Field>
                                    <Field name="policyHolderUser.birthDate">
                                        {props => (
                                            <FormFields.SelectDate {...props} />
                                        )}
                                    </Field>
                                    <Field name="policyHolderUser.birthYear">
                                        {props => (
                                            <FormFields.SelectYear {...props} />
                                        )}
                                    </Field>
                                </Grid>
                                <Text
                                    fontSize={1}
                                    letterSpacing="-0.4px"
                                    color="text.black"
                                    mb="10px"
                                >
                                    Gender
                                </Text>
                                <Box width="100%">
                                    <Field
                                        name="policyHolderUser.gender"
                                        component={props => (
                                            <Onboarding.ChoicesField
                                                {...props}
                                                namesAndTexts={[
                                                    {
                                                        name: 'female',
                                                        text: 'Female',
                                                    },
                                                    {
                                                        name: 'male',
                                                        text: 'Male',
                                                    },
                                                    {
                                                        name: 'unknown',
                                                        text:
                                                            'I do not wish to answer',
                                                    },
                                                ]}
                                            />
                                        )}
                                    />
                                </Box>
                                <Text
                                    fontSize={1}
                                    letterSpacing="-0.4px"
                                    color="text.black"
                                    mb="10px"
                                >
                                    Address
                                </Text>
                                <Box width={['100%', '', '500px']}>
                                    <Field
                                        name="policyHolderUser.address1"
                                        placeholder="Address 1"
                                        component={Onboarding.InputField}
                                    />
                                    <Field
                                        name="policyHolderUser.address2"
                                        placeholder="Address 2"
                                        component={Onboarding.InputField}
                                    />
                                    <Field
                                        name="policyHolderUser.city"
                                        placeholder="City"
                                        component={Onboarding.InputField}
                                    />
                                    <Field
                                        name="policyHolderUser.state"
                                        component={props => (
                                            <FormFields.SelectState
                                                {...props}
                                            />
                                        )}
                                    />
                                    <Field
                                        name="policyHolderUser.zipCode"
                                        placeholder="Postal code"
                                        component={Onboarding.InputField}
                                    />
                                </Box>
                            </Box>
                        )}

                    {(values.hasInsurance === YES &&
                        values.hasOwnInsurance === NO &&
                        values.isUnderPrimaryUserInsurance === NO) ||
                    (values.hasInsurance === YES &&
                        values.hasOwnInsurance === YES) ? (
                        <Box width="100%">
                            <Text
                                mt={[15, '', 20]}
                                mb={[10, '', 15]}
                                width={['100%', '', '500px']}
                                fontWeight="bold"
                            >
                                Please provide insurance policy information for
                                this family member. He or she must be the
                                policyholder of the insurance policy.
                            </Text>
                            <Text
                                fontSize={1}
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Insurance provider
                            </Text>
                            <Box width={['100%', '', '500px']}>
                                <Field name="insuranceProvider">
                                    {props => (
                                        <FormFields.SelectInsurance
                                            {...props}
                                        />
                                    )}
                                </Field>
                            </Box>

                            <Text
                                fontSize={1}
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Subscriber ID
                            </Text>
                            <Box width={['100%', '', '500px']}>
                                <Field
                                    name="insuranceNumber"
                                    placeholder="Subscriber ID"
                                    component={Onboarding.InputField}
                                />
                            </Box>

                            <Text
                                fontSize={1}
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Plan / group number
                            </Text>
                            <Box width={['100%', '', '500px']}>
                                <Field
                                    name="planOrGroupNumber"
                                    placeholder="Plan / group number"
                                    component={Onboarding.InputField}
                                />
                            </Box>
                        </Box>
                    ) : null}

                    <Onboarding.NextButton
                        loading={isSubmitting}
                        onClick={props.submitForm}
                    >
                        Save
                    </Onboarding.NextButton>
                    {props.isSubmitting && (
                        <Text color="text.blue" textAlign="center" fontSize={0}>
                            Validating your insurance information may take up to
                            one minute
                        </Text>
                    )}
                </Box>
            </Flex>
        </Form>
    );
};

export default withFormik({
    validationSchema,
    mapPropsToValues: props => ({ ...props.initialValues }),
    handleSubmit: async (values, actions) => {
        try {
            await actions.props.onSubmit(values);
            actions.setSubmitting(false);
        } catch (err) {
            actions.setSubmitting(false);
        }
    },
})(FamilyMemberInsuranceFormView);
