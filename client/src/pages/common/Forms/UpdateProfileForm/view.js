import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactFilestack from 'filestack-react';

import {
    Form,
    Input,
    Box,
    Checkbox,
    Text,
    Image,
    Icon,
    Button,
    Alert,
    Tooltip,
    MaskedInput,
} from '../../../../components';

import { filestackKey } from '../../../../config/keys';
import { profileImageRatio } from '../../../../util/uiUtil';
import { USER_PHOTOS_CONTAINER } from '../../../../util/strings';
import defaultUserImage from '../../../../components/Image/defaultUserImage.svg';

const { FormItem, SubmitButton } = Form;

const StyledForm = styled.div`
    && .ant-btn-ghost {
        background: rgba(255, 255, 255, 0.7);
    }

    && .form-item-custom-name {
        display: flex;

        .ant-form-item-label {
            margin: 0 15px 0 0;
            padding: 0;
            width: 225px;

            label {
                line-height: 50px;
            }
        }

        .ant-form-item-control-wrapper {
            width: 100%;
        }
    }
`;

const UpdateProfileForm = props => {
    const {
        data,
        error,
        isUpdated,
        loading,
        newProfileImage,
        onSuccess,
        setNewProfileImage,
        onSMSNotificationChange,
        smsNotificationStatus,
        onFormRef,
    } = props;

    return (
        <StyledForm>
            <Box mt={[22, '', 0]} mb={[42, '', 0]}>
                {(error || isUpdated) && (
                    <Box mb={20}>
                        <Alert
                            showIcon
                            message={error ? 'Error' : 'Success'}
                            description={
                                error || 'User profile successfully updated!'
                            }
                            type={error ? 'error' : 'success'}
                        />
                    </Box>
                )}

                <Box
                    mb={[22, '', 70]}
                    ml={['auto', '', 0]}
                    mr={['auto', '', 0]}
                    width={[118, '', 200]}
                    height={[118, '', 200]}
                    position="relative"
                >
                    <Image
                        alt="profile photo"
                        borderRadius="50%"
                        width={[118, '', 200]}
                        height={[118, '', 200]}
                        src={
                            newProfileImage || data.imageUrl || defaultUserImage
                        }
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
                            <Button
                                onClick={onPick}
                                type="ghost"
                                position="absolute"
                                bottom={0}
                                left={0}
                                right={0}
                                width="100%"
                                height={['24px', '', '40px']}
                                color="text.black"
                                fontSize={[0, '', 4]}
                                border="none"
                            >
                                <Icon type="form" />
                            </Button>
                        )}
                    />
                </Box>
                <Form
                    layout="vertical"
                    onSuccess={onSuccess}
                    wrappedComponentRef={ref => onFormRef(ref)}
                >
                    <FormItem
                        name="firstName"
                        label="First name"
                        initialValue={data.firstName}
                        mb={[18, '', 32]}
                        height={50}
                        input={<Input type="text" />}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    />
                    <FormItem
                        name="middleName"
                        label="Middle name"
                        initialValue={data.middleName}
                        mb={[18, '', 32]}
                        height={50}
                        normalize={value => value || null}
                        input={<Input type="text" />}
                    />
                    <FormItem
                        name="lastName"
                        label="Last name"
                        initialValue={data.lastName}
                        mb={[18, '', 32]}
                        height={50}
                        input={<Input type="text" />}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    />
                    <FormItem
                        name="phoneNumber"
                        label="Mobile number"
                        initialValue={data.phoneNumber}
                        normalize={value => value || null}
                        mb={[18, '', 32]}
                        height={50}
                        input={
                            <MaskedInput
                                mask={[
                                    '(',
                                    /[1-9]/,
                                    /\d/,
                                    /\d/,
                                    ')',
                                    ' ',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    '-',
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                    /\d/,
                                ]}
                                height={50}
                            />
                        }
                        rules={[
                            {
                                required: smsNotificationStatus,
                                message: 'Please input your mobile number!',
                            },
                        ]}
                    />
                    {data.customName && (
                        <Text
                            mb={20}
                            fontSize={[0, '', 4]}
                            fontWeight={['regular', '', 'bold']}
                        >
                            Create custom link for your profile
                        </Text>
                    )}
                    {data.customName && (
                        <FormItem
                            name="customName"
                            label="laguro.com/dentist/"
                            initialValue={data.customName}
                            mb={[18, '', 32]}
                            height={50}
                            className="form-item-custom-name"
                            input={<Input type="text" />}
                        />
                    )}
                    <Text
                        fontSize={[0, '', 4]}
                        fontWeight={['regular', '', 'bold']}
                        mb={20}
                    >
                        Notification Settings
                    </Text>
                    <FormItem
                        name="emailNotification"
                        valuePropName="checked"
                        initialValue={data.emailNotification}
                        mb={[18, '', 32]}
                        input={
                            <Checkbox>
                                <Text
                                    color="text.black"
                                    fontSize={[0, '', 3]}
                                    display="inline"
                                    ml={[12, '', 20]}
                                >
                                    Email
                                </Text>
                                <Tooltip
                                    inCheckbox
                                    size={22}
                                    text="By checking this box, I agree to receive updates about Laguro, my account, and appointments. This may contain special offers, information on local providers, and requests for feedback about your experience. Your personal data will be processed in accordance with our Privacy Policy."
                                />
                            </Checkbox>
                        }
                    />
                    <FormItem
                        name="smsNotification"
                        valuePropName="checked"
                        initialValue={data.smsNotification}
                        mb={[18, '', 32]}
                        input={
                            <Checkbox onChange={onSMSNotificationChange}>
                                <Text
                                    color="text.black"
                                    fontSize={[0, '', 3]}
                                    display="inline"
                                    ml={[12, '', 20]}
                                >
                                    Text Message
                                </Text>
                                <Tooltip
                                    inCheckbox
                                    size={22}
                                    text="By checking this box, I agree to receive text messages for information pertaining to my account and appointments."
                                />
                            </Checkbox>
                        }
                    />
                    <SubmitButton
                        buttonText="Save changes"
                        px={14}
                        fontSize={[1, '', 3]}
                        fontWeight="bold"
                        loading={loading}
                        textAlign="left"
                        width={['100%', '', 450]}
                        height={['50px', '', '60px']}
                    />
                </Form>
            </Box>
        </StyledForm>
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
    isUpdated: PropTypes.bool,
    loading: PropTypes.bool,
    newProfileImage: PropTypes.string,
    onSuccess: PropTypes.func.isRequired,
    setNewProfileImage: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
