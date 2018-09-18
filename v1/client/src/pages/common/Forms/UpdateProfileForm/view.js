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
    MaskedInput,
} from '../../../../components';

import { filestackKey } from '../../../../config/keys';
import { profileImageRatio } from '../../../../util/uiUtil';
import { USER_PHOTOS_CONTAINER } from '../../../../util/strings';

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
    } = props;
    return (
        <StyledForm>
            <Box>
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

                <Box mb={70} width={200} height={200} position="relative">
                    <Image
                        alt="profile photo"
                        borderRadius="50%"
                        width={200}
                        height={200}
                        src={newProfileImage || data.imageUrl}
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
                                height={40}
                                color="text.black"
                                fontSize={4}
                                border="none"
                            >
                                <Icon type="form" />
                            </Button>
                        )}
                    />
                </Box>
                <Form layout="vertical" onSuccess={onSuccess}>
                    <FormItem
                        name="firstName"
                        label="First name"
                        initialValue={data.firstName}
                        mb={32}
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
                        mb={32}
                        height={50}
                        input={<Input type="text" />}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your middle name!',
                            },
                        ]}
                    />
                    <FormItem
                        name="lastName"
                        label="Last name"
                        initialValue={data.lastName}
                        mb={32}
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
                        mb={32}
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
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                        ]}
                    />
                    {data.customName && (
                        <Text mb={20} fontSize={4} fontWeight="bold">
                            Create custom link for your profile
                        </Text>
                    )}
                    {data.customName && (
                        <FormItem
                            name="customName"
                            label="laguro.com/dentist/"
                            initialValue={data.customName}
                            mb={32}
                            height={50}
                            className="form-item-custom-name"
                            input={<Input type="text" />}
                        />
                    )}
                    <Text fontSize={4} fontWeight="bold" mb={20}>
                        Notification Settings
                    </Text>
                    <FormItem
                        name="emailNotification"
                        valuePropName="checked"
                        initialValue={data.emailNotification}
                        mb={32}
                        input={
                            <Checkbox>
                                <Text
                                    color="text.black"
                                    fontSize={3}
                                    display="inline"
                                    ml={20}
                                >
                                    Email
                                </Text>
                            </Checkbox>
                        }
                    />
                    <FormItem
                        name="smsNotification"
                        valuePropName="checked"
                        initialValue={data.smsNotification}
                        mb={32}
                        input={
                            <Checkbox>
                                <Text
                                    color="text.black"
                                    fontSize={3}
                                    display="inline"
                                    ml={20}
                                >
                                    Text Message
                                </Text>
                            </Checkbox>
                        }
                    />
                    <SubmitButton
                        px={14}
                        buttonText={
                            <Text
                                color="text.white"
                                fontWeight="bold"
                                display="inline"
                                ml={loading ? 8 : 0}
                            >
                                Save changes
                            </Text>
                        }
                        loading={loading}
                        textAlign="left"
                        width={450}
                        height={60}
                    />
                </Form>
            </Box>
        </StyledForm>
    );
};

UpdateProfileForm.defaultProps = {
    onSuccess: () => {},
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
