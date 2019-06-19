import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import _capitalize from 'lodash/capitalize';
import FormFields from '../../FormFields';
import FormElements from '../../FormElements';
import { Onboarding } from '../../the-bright-side-components/';
import { Box, Text, Flex } from '../../../../components/';

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
            <Flex alignItems="center" flexDirection="column">
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

                {values.hasInsurance === YES && (
                    <Box>
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
                    values.isUnderPrimaryUserInsurance === NO && (
                        <Box>
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
                                Insurance number
                            </Text>
                            <Box width={['100%', '', '500px']}>
                                <Field
                                    name="insuranceNumber"
                                    placeholder="Insurance number"
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
                    )}

                <Onboarding.NextButton
                    loading={isSubmitting}
                    onClick={props.submitForm}
                >
                    Save
                </Onboarding.NextButton>
                {props.isSubmitting && (
                    <Text color="text.blue" textAlign="center" fontSize={0}>
                        Validating your insurance information may take up to one
                        minute
                    </Text>
                )}
            </Flex>
        </Form>
    );
};

const HAS_INSURANCE_FORM_NAME = 'hasInsurance';
const IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME =
    'isUnderPrimaryUserInsurance';

const getHasInsuranceYesValidation = validation =>
    Yup.string().when(HAS_INSURANCE_FORM_NAME, {
        is: YES,
        then: validation,
    });

const getIsUnderPrimaryUserInsuranceNoValidation = validation =>
    Yup.string().when(IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME, {
        is: NO,
        then: validation,
    });

const getHasInsuranceYesAndIsUnderPrimaryUserInsuranceNoValidation = validation =>
    Yup.string().when(
        [
            HAS_INSURANCE_FORM_NAME,
            IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME,
        ],
        {
            is: (hasInsurance, isUnderPrimaryUserInsurance) =>
                hasInsurance === YES && isUnderPrimaryUserInsurance === NO,
            then: validation,
        }
    );

const INSURANCE_PROVIDER_YUP_VALIDATION = Yup.string().required(
    'Insurance provider is required'
);
const INSURANCE_NUMBER_YUP_VALIDATION = Yup.string().required(
    'Insurance number is required'
);

export default withFormik({
    validationSchema: Yup.object().shape({
        [HAS_INSURANCE_FORM_NAME]: Yup.string()
            .required('Please fill out this field.')
            .nullable(),
        [IS_UNDER_PRIMARY_USER_INSURNACE_FORM_ITEM_NAME]: getHasInsuranceYesValidation(
            Yup.string().required('Please fill out this field.')
        ),
        birthMonth: Yup.string().required('Month is required'),
        birthDate: Yup.string().required('Date is required'),
        birthYear: Yup.string().required('Year is required'),
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        insuranceProvider: getHasInsuranceYesAndIsUnderPrimaryUserInsuranceNoValidation(
            INSURANCE_PROVIDER_YUP_VALIDATION
        ),
        insuranceNumber: getIsUnderPrimaryUserInsuranceNoValidation(
            INSURANCE_NUMBER_YUP_VALIDATION
        ),
    }),
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
