import React from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import FormFields from '../../FormFields';
import { Onboarding } from '../../the-bright-side-components/';
import { Box, Text, Button, Flex, Image, Grid } from '../../../../components/';
import ReactFilestack from 'filestack-react';
import { profileImageRatio } from '../../../../util/uiUtil';
import { USER_PHOTOS_CONTAINER } from '../../../../util/strings';
import { filestackKey } from '../../../../config/keys';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';
import { setImageSizeToUrl } from '../../../../util/imageUtil';

const StyledRadioGroup = styled(Radio.Group)`
    &&.ant-radio-group {
        width: 100%;
        margin-bottom: 15px;
    }
    && .ant-radio-button-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 46px;
        border-radius: 0;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            width: 50%;
            border-radius: 4px;
        }
    }
`;

const AddFamilyMemberFormView = props => {
    const {
        setNewProfileImage,
        removeProfileImage,
        hasRemovedProfileImage,
        newProfileImage,
        onRemoveFamilyMember = () => {},
        isEditting = false,
        isSubmitting,
        values,
    } = props;

    return (
        <Form>
            <Flex justifyContent="center">
                <Box>
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Profile picture
                    </Text>
                    <Box
                        mb={20}
                        ml={0}
                        mr={0}
                        width="78px"
                        height="78px"
                        position="relative"
                    >
                        <Image
                            alt="profile photo"
                            borderRadius="50%"
                            width="78px"
                            height="78px"
                            src={setImageSizeToUrl(
                                hasRemovedProfileImage
                                    ? defaultUserImage
                                    : newProfileImage ||
                                          values.imageUrl ||
                                          defaultUserImage,
                                78
                            )}
                        />
                        <ReactFilestack
                            apikey={filestackKey}
                            options={{
                                accept: ['image/*'],
                                imageMin: [300, 300],
                                fromSources: [
                                    'local_file_system',
                                    'url',
                                    'imagesearch',
                                    'facebook',
                                    'instagram',
                                ],
                                transformations: {
                                    crop: {
                                        aspectRatio: profileImageRatio,
                                        force: true,
                                    },
                                },
                                uploadInBackground: false,
                                storeTo: { container: USER_PHOTOS_CONTAINER },
                            }}
                            onSuccess={setNewProfileImage}
                            render={({ onPick }) => (
                                <Flex
                                    position="absolute"
                                    top="30px"
                                    left="100px"
                                >
                                    <Button
                                        type="ghost"
                                        height="auto"
                                        onClick={onPick}
                                        mr={14}
                                    >
                                        <Text color="text.blue" fontSize={0}>
                                            Upload new image
                                        </Text>
                                    </Button>
                                    <Button
                                        type="ghost"
                                        height="auto"
                                        onClick={removeProfileImage}
                                    >
                                        <Text color="#cb4242" fontSize={0}>
                                            Remove
                                        </Text>
                                    </Button>
                                </Flex>
                            )}
                        />
                    </Box>
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
                            <Box width={['50%', '', '160px']} mr={11}>
                                <Field
                                    name="firstName"
                                    placeholder="First Name"
                                    component={Onboarding.InputField}
                                />
                            </Box>
                            <Box
                                width={['50%', '', '160px']}
                                mr={[0, '', '11px']}
                            >
                                <Field
                                    name="middleName"
                                    placeholder="Middle Name"
                                    component={Onboarding.InputField}
                                />
                            </Box>
                        </Flex>
                        <Box width={['100%', '', '160px']}>
                            <Field
                                name="lastName"
                                placeholder="Last Name"
                                component={Onboarding.InputField}
                            />
                        </Box>
                    </Flex>

                    <Text
                        fontSize={1}
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Relationship with you
                    </Text>
                    <Box width={['100%', '', '320px']}>
                        <Field
                            name="relationship"
                            component={props => (
                                <FormFields.SelectRelationship {...props} />
                            )}
                        />
                    </Box>
                    <Text
                        fontSize={1}
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Gender
                    </Text>
                    <Box width={['100%', '', '500px']}>
                        <Field
                            name="gender"
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
                                            text: 'I do not wish to answer',
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
                        Date of Birth
                    </Text>
                    <Flex flexDirection={['column', '', 'row']}>
                        <Flex>
                            <Box width={['100%', '', '160px']} mr="10px">
                                <Field
                                    name="birthMonth"
                                    component={props => (
                                        <FormFields.SelectMonth {...props} />
                                    )}
                                />
                            </Box>
                            <Box width={['100%', '', '160px']} mr="10px">
                                <Field
                                    name="birthDate"
                                    component={props => (
                                        <FormFields.SelectDate {...props} />
                                    )}
                                />
                            </Box>
                        </Flex>
                        <Box width={['100%', '', '160px']} mr="10px">
                            <Field
                                name="birthYear"
                                component={props => (
                                    <FormFields.SelectYear {...props} />
                                )}
                            />
                        </Box>
                    </Flex>
                    <Text
                        fontSize={1}
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Address
                    </Text>
                    <Box width={['100%', '', '500px']}>
                        {/* do not use component prop for this Field */}
                        <Field name="hasDifferentAddress">
                            {props => (
                                <StyledRadioGroup
                                    defaultValue={values.hasDifferentAddress}
                                    onChange={e =>
                                        props.form.setFieldValue(
                                            props.field.name,
                                            e.target.value
                                        )
                                    }
                                >
                                    <Radio.Button value={false}>
                                        Same as primary account
                                    </Radio.Button>
                                    <Radio.Button value={true}>
                                        New address
                                    </Radio.Button>
                                </StyledRadioGroup>
                            )}
                        </Field>
                    </Box>
                    {values.hasDifferentAddress && (
                        <Box width={['100%', '', '500px']}>
                            <Field
                                name="address1"
                                placeholder="Address 1"
                                component={Onboarding.InputField}
                            />
                            <Field
                                name="address2"
                                placeholder="Address 2"
                                component={Onboarding.InputField}
                            />
                            <Field
                                name="city"
                                placeholder="City"
                                component={Onboarding.InputField}
                            />
                            <Field
                                name="state"
                                component={props => (
                                    <FormFields.SelectState {...props} />
                                )}
                            />
                            <Field
                                name="zipCode"
                                placeholder="Postal code"
                                component={Onboarding.InputField}
                            />
                        </Box>
                    )}

                    <Text
                        fontSize={1}
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Contact information
                    </Text>
                    <Box width={['100%', '', '500px']}>
                        {/* do not use componenet prop for this field */}
                        <Field name="hasDifferentContactInformation">
                            {props => (
                                <StyledRadioGroup
                                    defaultValue={false}
                                    onChange={e =>
                                        props.form.setFieldValue(
                                            props.field.name,
                                            e.target.value
                                        )
                                    }
                                >
                                    <Radio.Button value={false}>
                                        Same as primary account
                                    </Radio.Button>
                                    <Radio.Button value={true}>
                                        New contact information
                                    </Radio.Button>
                                </StyledRadioGroup>
                            )}
                        </Field>
                    </Box>
                    {values.hasDifferentContactInformation && (
                        <Grid
                            width={['100%', '', '500px']}
                            gridColumnGap="13px"
                            gridTemplateColumns={'1fr 1fr'}
                        >
                            <Field
                                name="phoneNumber"
                                placeholder="Mobile number"
                                component={Onboarding.InputField}
                            />
                            <Field
                                name="email"
                                placeholder="E-mail"
                                component={Onboarding.InputField}
                            />
                        </Grid>
                    )}
                    <Onboarding.NextButton
                        loading={isSubmitting}
                        onClick={props.submitForm}
                    >
                        Save family member
                    </Onboarding.NextButton>
                    {isEditting && (
                        <Flex justifyContent="center">
                            <Button
                                type="ghost"
                                mt="16px"
                                height="auto"
                                onClick={onRemoveFamilyMember}
                            >
                                <Text
                                    letterSpacing="0.4px"
                                    fontSize={1}
                                    color="#b11f29"
                                >
                                    Remove family member
                                </Text>
                            </Button>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </Form>
    );
};
export default withFormik({
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('Please fill out this field.'),
        lastName: Yup.string().required('Please fill out this field.'),
        relationship: Yup.string().required('Please fill out this field.'),
        phoneNumber: Yup.string().when(
            'hasDifferentContactInformation',
            (hasDifferentContactInformation, schema) =>
                hasDifferentContactInformation
                    ? schema
                          .matches(
                              /^[0-9]*$/,
                              'Please use a valid phone number'
                          )
                          .length(10, 'Mobile number should be 10 digits')
                          .required('Please fill out this field.')
                    : schema
        ),
        email: Yup.string().when(
            'hasDifferentContactInformation',
            (hasDifferentContactInformation, schema) =>
                hasDifferentContactInformation
                    ? schema
                          .min(3, 'Email must be at least 3 characters.')
                          .max(255)
                          .email(
                              `Please include an '@' and '.' in the email address.`
                          )
                    : schema
        ),
        address1: Yup.string().when(
            'hasDifferentAddress',
            (hasDifferentAddress, schema) =>
                hasDifferentAddress
                    ? schema.required('Please fill out this field.')
                    : schema
        ),
        city: Yup.string().when(
            'hasDifferentAddress',
            (hasDifferentAddress, schema) =>
                hasDifferentAddress
                    ? schema.required('Please fill out this field.')
                    : schema
        ),
        state: Yup.string().when(
            'hasDifferentAddress',
            (hasDifferentAddress, schema) =>
                hasDifferentAddress
                    ? schema.required('Please fill out this field.')
                    : schema
        ),
        zipCode: Yup.string().when(
            'hasDifferentAddress',
            (hasDifferentAddress, schema) =>
                hasDifferentAddress
                    ? schema.required('Please fill out this field.')
                    : schema
        ),
        birthMonth: Yup.string().required('Month is required'),
        birthDate: Yup.string().required('Date is required'),
        birthYear: Yup.date().required('Year is required'),
        gender: Yup.string()
            .required('Gender is required')
            .nullable(),
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
})(AddFamilyMemberFormView);
