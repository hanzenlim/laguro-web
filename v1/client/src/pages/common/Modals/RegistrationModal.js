import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Box, Flex, Text, Form, Input } from '../../../components';

const { FormItem, SubmitButton } = Form;

const ReservationModalView = ({ closeModal, visible, signup }) => (
    <Modal onCancel={closeModal} destroyOnClose={true} visible={visible}>
        <Flex
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
        >
            <Flex>
                <Text fontSize={5}>welcome to&nbsp;</Text>
                <Text fontSize={5} fontWeight="bold">
                    laguro,
                </Text>
            </Flex>
            <Text fontSize={4} mb={40}>
                let's get started on creating your profile
            </Text>

            <Box width={300}>
                <Form layout="vertical" onSuccess={signup}>
                    <FormItem
                        name="firstName"
                        label="first name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                        input={<Input />}
                    />
                    <FormItem
                        name="middleName"
                        label="middle name"
                        input={<Input />}
                    />
                    <FormItem
                        name="lastName"
                        label="last name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                        input={<Input />}
                    />
                    <FormItem
                        name="email"
                        label="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please input a valid email!',
                            },
                        ]}
                        validateTrigger="onBlur"
                        input={<Input type="email" />}
                    />
                    <FormItem
                        name="password"
                        label="password"
                        mb={40}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Please enter at least 6 characters!',
                            },
                        ]}
                        validateTrigger="onBlur"
                        input={<Input type="password" />}
                    />

                    <SubmitButton px={14} buttonText="create account" />
                </Form>
            </Box>
        </Flex>
    </Modal>
);

ReservationModalView.defaultProps = {
    closeModal: () => {},
    signup: () => {},
    visible: false,
};

ReservationModalView.propTypes = {
    closeModal: PropTypes.func,
    signup: PropTypes.func,
    visible: PropTypes.bool,
};

export default ReservationModalView;