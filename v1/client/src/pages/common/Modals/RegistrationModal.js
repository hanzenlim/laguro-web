import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Box, Flex, Text, Form, Input, Link } from '../../../components';

const { FormItem, SubmitButton } = Form;

const ReservationModalView = ({
    closeModal,
    openLoginModal,
    visible,
    signup,
}) => (
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
                let&#39;s get started on creating your profile
            </Text>

            <Box width={300}>
                <Form layout="vertical" onSuccess={signup} debounce="true">
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
                        input={<Input type="password" />}
                    />

                    <SubmitButton px={30} buttonText="create account" />
                </Form>
            </Box>
            <Flex mt={10}>
                <Text color="text.black">have an account?&nbsp;</Text>
                <Link to={'#'} onClick={openLoginModal}>
                    <Text color="text.green" fontWeight="bold">
                        login
                    </Text>
                </Link>
            </Flex>
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
