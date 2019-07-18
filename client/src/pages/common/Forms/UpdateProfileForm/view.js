import React, { PureComponent } from 'react';
import _mapValues from 'lodash/mapValues';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';
import _trim from 'lodash/trim';
import { Box, Text, Image, Button, Flex } from '../../../../components';
import { filestackKey } from '../../../../config/keys';
import { profileImageRatio } from '../../../../util/uiUtil';
import { USER_PHOTOS_CONTAINER } from '../../../../util/strings';
import { setImageSizeToUrl } from '../../../../util/imageUtil';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';
import { SelectLanguage } from '../../the-bright-side-components/components/Onboarding/SelectLanguage';
import { Onboarding } from '../../the-bright-side-components';
import FormFields from '../../FormFields';

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29.5px;
        border: 1px solid;
        font-size: 16px;
    }
`;

const minAdultAge = moment()
    .subtract(18, 'years')
    .format();

class UpdateProfileForm extends PureComponent {
    render() {
        const {
            data,
            newProfileImage,
            setNewProfileImage,
            removeProfileImage,
            hasRemovedProfileImage,
        } = this.props;

        return (
            <Form>
                <Box mt={[22, '', 0]} mb={[42, '', 0]} pl={['', '', 10]}>
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                    >
                        Profile picture
                    </Text>
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.lightGray"
                        mb="16px"
                    >
                        Your picture will be available for all users to see
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
                                          data.imageUrl ||
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
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Name
                    </Text>
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.lightGray"
                        mb="16px"
                        maxWidth="590px"
                    >
                        Your profile will show your first name and the first
                        initial of your last name. When you book an appointment,
                        your dentist will see your full name.
                    </Text>
                    <Flex width={['100%', '', '500px']}>
                        <Box width={['100%', '', '160px']} mr={11}>
                            <Field
                                name="firstName"
                                placeholder="First Name"
                                component={Onboarding.InputField}
                            />
                        </Box>
                        <Box width={['100%', '', '160px']} mr={11}>
                            <Field
                                name="middleName"
                                placeholder="Middle Name"
                                component={Onboarding.InputField}
                            />
                        </Box>
                        <Box width={['100%', '', '160px']} mr={11}>
                            <Field
                                name="lastName"
                                placeholder="Last Name"
                                component={Onboarding.InputField}
                            />
                        </Box>
                    </Flex>
                    <Flex flexDirection={['column', '', 'row']}>
                        <Box
                            width={['100%', '', '340px']}
                            mr={['0', '', '11px']}
                            mb="10px"
                        >
                            <Text
                                fontSize={1}
                                fontWeight="500"
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Mobile number
                            </Text>
                            <Text
                                fontSize={1}
                                fontWeight="500"
                                letterSpacing="-0.4px"
                                color="text.lightGray"
                                mb="16px"
                            >
                                The number to receive booking and listing
                                confirmations, reminders, and other
                                notifications.
                            </Text>
                            <Field
                                name="phoneNumber"
                                render={props => {
                                    const handlePhoneNumberChange = event => {
                                        if (
                                            event.target &&
                                            event.target.value &&
                                            typeof parseInt(
                                                event.target.value
                                            ) === 'number'
                                        ) {
                                            props.form.setFieldValue(
                                                'notificationSettings',
                                                'both'
                                            );
                                        }

                                        props.field.onChange(event);
                                    };

                                    const newProps = {
                                        ...props,
                                        field: {
                                            ...props.field,
                                            onChange: handlePhoneNumberChange,
                                        },
                                    };

                                    return (
                                        <Onboarding.InputField
                                            {...newProps}
                                            placeholder="1232342342"
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box width={['100%', '', '340px']}>
                            <Text
                                fontSize={1}
                                fontWeight="500"
                                letterSpacing="-0.4px"
                                color="text.black"
                                mb="10px"
                            >
                                Email address
                            </Text>
                            <Text
                                fontSize={1}
                                fontWeight="500"
                                letterSpacing="-0.4px"
                                color="text.lightGray"
                                mb="16px"
                            >
                                Your email for login and notification purposes.
                                We won’t share this with anyone else.
                            </Text>
                            <Field
                                name="email"
                                type="email"
                                placeholder="joe@example.com"
                                component={Onboarding.InputField}
                            />
                        </Box>
                    </Flex>
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Date of birth
                    </Text>
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
                        fontWeight="500"
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
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Which languages do you speak?
                    </Text>
                    <Field
                        name="languages"
                        component={props => (
                            <SelectLanguage
                                value={props.field.value}
                                onSelect={languages =>
                                    props.form.setFieldValue(
                                        props.field.name,
                                        languages
                                    )
                                }
                            />
                        )}
                    />
                    <Box mb={20} />
                    <Text
                        fontSize={1}
                        fontWeight="500"
                        letterSpacing="-0.4px"
                        color="text.black"
                        mb="10px"
                    >
                        Notification settings
                    </Text>
                    <Box width={['100%', '', '500px']}>
                        <Field
                            name="notificationSettings"
                            component={props => (
                                <Onboarding.ChoicesField
                                    {...props}
                                    namesAndTexts={[
                                        {
                                            name: 'sms',
                                            text: 'Text Message',
                                        },
                                        {
                                            name: 'email',
                                            text: 'E-mail',
                                        },
                                        { name: 'both', text: 'Both' },
                                    ]}
                                />
                            )}
                        />
                    </Box>
                    <Flex width="100%" justifyContent="center" mt={28}>
                        <StyledNextButton
                            htmlType="submit"
                            loading={this.props.isSubmitting}
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
    }
}

UpdateProfileForm.defaultProps = {
    onSuccess: async () => {},
};

UpdateProfileForm.propTypes = {
    data: PropTypes.shape({
        imageUrl: PropTypes.string,
        firstName: PropTypes.string,
        middleName: PropTypes.string,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
        smsNotification: PropTypes.bool,
        emailNotification: PropTypes.bool,
        customName: PropTypes.string,
    }).isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
    newProfileImage: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    setNewProfileImage: PropTypes.func.isRequired,
};

export default withFormik({
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('Please fill out this field.'),
        lastName: Yup.string().required('Please fill out this field.'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]*$/, 'Please use a valid phone number')
            .length(10, 'Mobile number should be 10 digits')
            .required('Please fill out this field.'),
        email: Yup.string()
            .min(3, 'Email must be at least 3 characters.')
            .max(255)
            .email(`Please include an '@' and '.' in the email address.`),
        notificationSettings: Yup.string()
            .when('phoneNumber', (phoneNumber, schema) =>
                !phoneNumber
                    ? schema.oneOf(['email'], 'Please add your mobile number.')
                    : schema
            )
            .when('email', (email, schema) =>
                !email
                    ? schema.oneOf(['sms'], 'Please add your email.')
                    : schema
            ),
        birthMonth: Yup.string().required('Month is required'),
        birthDate: Yup.string().required('Date is required'),
        birthYear: Yup.date()
            .max(minAdultAge, 'Under minimum age')
            .required('Year is required'),
        gender: Yup.string()
            .required('Gender is required')
            .nullable(),
    }),
    mapPropsToValues: props => {
        const { data } = props;
        // Updating null values to undefined. This is for yup validation since
        // yup will throw a weird error if the value was null.
        return _mapValues(data, o => {
            if (o === null) return undefined;

            return o;
        });
    },
    handleSubmit: async (values, actions) => {
        const formattedValues = { ...values };

        if (values.email) {
            formattedValues.email = _trim(values.email).toLowerCase();
        }

        actions.setSubmitting(true);
        const result = await actions.props.onSuccess(formattedValues);
        actions.setSubmitting(false);

        if (result) {
            message.success('Account settings successfully updated!');
        }
    },
})(UpdateProfileForm);
