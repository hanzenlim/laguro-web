import React from 'react';

import { Form, Input, Flex, Box, Text } from '../../components';

const { FormItem, SubmitButton } = Form;

const ResetPassView = ({ resetPassword }) => (
    <Flex
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        px={40}
        width={1}
    >
        <Text fontSize={5} fontWeight="bold">
            reset password,
        </Text>
        <Text fontSize={4} mt={10} mb={40}>
            your password must have at least 6 characters
        </Text>

        <Box width={500}>
            <Form onSuccess={resetPassword}>
                <FormItem
                    name="password"
                    label="Password"
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
                <FormItem
                    name="passwordConfirmation"
                    label="confirm password"
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
                <SubmitButton px={30} buttonText="reset password" />
            </Form>
        </Box>
    </Flex>
);

export default ResetPassView;
