import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';
import { Onboarding, SelectLanguage } from '@laguro/the-bright-side-components';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import _range from 'lodash/range';
import { message } from 'antd';

import { Box, Text, Image, Button, Flex } from '../../../../components';
import { filestackKey } from '../../../../config/keys';
import { profileImageRatio } from '../../../../util/uiUtil';
import { USER_PHOTOS_CONTAINER } from '../../../../util/strings';
import { setImageSizeToUrl } from '../../../../util/imageUtil';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';

const StyledNextButton = styled(Button)`
    && {
        border-radius: 29.5px;
        border: 1px solid;
        font-size: 16px;
    }
`;

const dates = _range(1, 32).map(i => i.toString());

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const years = _range(moment().format('YYYY'), 1900).map(i => i.toString());

const UpdateProfileForm = props => {
    const {
        data,
        newProfileImage,
        setNewProfileImage,
        removeProfileImage,
        hasRemovedProfileImage,
    } = props;

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
                            <Flex position="absolute" top="30px" left="100px">
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
                    Your profile will show your first name and the first initial
                    of your last name. When you book an appointment, your
                    dentist will see your full name.
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
                            confirmations, reminders, and other notifications.
                        </Text>
                        <Field
                            name="phoneNumber"
                            placeholder="1232342342"
                            component={Onboarding.InputField}
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
                            Your email for login and notification purposes. We
                            won’t share this with anyone else.
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
                            placeholder="Month"
                            component={props => (
                                <Onboarding.SelectField
                                    {...props}
                                    options={months.map((i, index) => (
                                        <Onboarding.SelectOption
                                            value={(index + 1).toString()}
                                        >
                                            {i}
                                        </Onboarding.SelectOption>
                                    ))}
                                />
                            )}
                        />
                    </Box>
                    <Box width={['100%', '', '160px']} mr="10px">
                        <Field
                            name="birthDate"
                            placeholder="Date"
                            component={props => (
                                <Onboarding.SelectField
                                    {...props}
                                    options={dates.map(i => (
                                        <Onboarding.SelectOption value={i}>
                                            {i}
                                        </Onboarding.SelectOption>
                                    ))}
                                />
                            )}
                        />
                    </Box>
                    <Box width={['100%', '', '160px']} mr="10px">
                        <Field
                            name="birthYear"
                            placeholder="Year"
                            component={props => (
                                <Onboarding.SelectField
                                    {...props}
                                    options={years.map(i => (
                                        <Onboarding.SelectOption value={i}>
                                            {i}
                                        </Onboarding.SelectOption>
                                    ))}
                                />
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
                                        name: 'I do not wish to answer',
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
};

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
        middleName: Yup.string(),
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
            message.success('Account settings successfully updated!');
        }
    },
})(UpdateProfileForm);
