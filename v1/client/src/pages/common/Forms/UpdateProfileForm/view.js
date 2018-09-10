import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    Form,
    Input,
    Box,
    Checkbox,
    Text,
    Image,
    Icon,
    Button,
} from '../../../../components';

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
    const { onSuccess, data } = props;
    return (
        <StyledForm>
            <Box>
                <Box mb={70} width={200} height={200} position="relative">
                    <Image
                        alt="profile photo"
                        borderRadius="50%"
                        width={200}
                        height={200}
                        src={data.imageUrl}
                    />
                    <Button
                        type="ghost"
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        width="100%"
                        height={40}
                        color="text.black"
                        fontSize={4}
                    >
                        <Icon type="form" />
                    </Button>
                </Box>
                <Form layout="vertical" onSuccess={onSuccess}>
                    <FormItem
                        name="firstName"
                        label="First name"
                        initialValue={data.firstName}
                        mb={32}
                        height={50}
                        input={<Input type="text" />}
                    />
                    <FormItem
                        name="lastName"
                        label="Last name"
                        initialValue={data.lastName}
                        mb={32}
                        height={50}
                        input={<Input type="text" />}
                    />
                    <FormItem
                        name="phoneNumber"
                        label="Mobile number"
                        initialValue={data.phoneNumber}
                        mb={32}
                        height={50}
                        input={<Input type="text" />}
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
                            <Text color="text.white" fontWeight="bold">
                                Save changes
                            </Text>
                        }
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
    data: {
        imageUrl:
            'https://lh4.googleusercontent.com/-PKui8IQzV0U/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaM6RN8lgfFTL4bJGQIvmdMqcaFn-Q/mo/photo.jpg?sz=300',
        firstName: 'Paul Simon',
        lastName: 'Ongpin',
        phoneNumber: '+1-541-754-3010',
        smsNotification: false,
        emailNotification: true,
        customName: 'paulsimon',
    },
    onSuccess: () => {},
};

UpdateProfileForm.propTypes = {
    data: PropTypes.shape({
        imageUrl: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phoneNumber: PropTypes.string,
        smsNotification: PropTypes.bool,
        emailNotification: PropTypes.bool,
        customName: PropTypes.string,
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default UpdateProfileForm;
