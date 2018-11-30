import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import _get from 'lodash/get';
import { message } from 'antd';
import {
    Box,
    Container,
    Flex,
    Text,
    Link,
    Form,
    Input,
} from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';

const { FormItem, SubmitButton } = Form;

class Register extends PureComponent {
    handleSuccess = values => {
        const formValues = { ...values, email: values.email.toLowerCase() };
        const { signup } = this.props;
        const { password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error(
                'Your password and confirmation password do not match.'
            );
        } else {
            signup(formValues);
        }
    };

    render() {
        const {
            location,
            isSubmitting,
            openLoginModal,
            tabletMobileOnly,
        } = this.props;

        const search = _get(location, 'search');

        return (
            <Container>
                <Flex
                    mt={[36, '', 0]}
                    flexDirection="column"
                    justifyContent="space-around"
                    alignItems="center"
                >
                    <Flex>
                        <Text fontSize={[3, '', 5]}>welcome to&nbsp;</Text>
                        <Text fontSize={[3, '', 5]} fontWeight="bold">
                            laguro,
                        </Text>
                    </Flex>
                    <Text fontSize={[0, '', 4]} mb={40}>
                        let&#39;s get started on creating your profile
                    </Text>

                    <Box width={['100%', '', 300]}>
                        <Form
                            layout="vertical"
                            onSuccess={this.handleSuccess}
                            debounce="false"
                        >
                            <FormItem
                                name="firstName"
                                label="first name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
                                    },
                                ]}
                                input={<Input />}
                            />
                            <FormItem
                                name="middleName"
                                label="middle name"
                                normalize={value => value || null}
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
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 6,
                                        message:
                                            'Please enter at least 6 characters!',
                                    },
                                ]}
                                input={<Input type="password" />}
                            />
                            <FormItem
                                name="confirmPassword"
                                label="confirm password"
                                mb={[20, '', 40]}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please confirm your password!',
                                    },
                                    {
                                        min: 6,
                                        message:
                                            'Please enter at least 6 characters!',
                                    },
                                ]}
                                input={<Input type="password" />}
                            />

                            <SubmitButton
                                px={30}
                                width={['100%', '', 'auto']}
                                buttonText="create account"
                                fontSize={[1, '', 3]}
                                loading={isSubmitting}
                            />
                        </Form>
                    </Box>
                    <Flex mt={[28, '', 10]} mb={[40, '', 0]}>
                        <Text color="text.black">have an account?&nbsp;</Text>
                        <Link
                            to={
                                tabletMobileOnly
                                    ? `/login${search}`
                                    : { hash: '#', search }
                            }
                            onClick={openLoginModal}
                        >
                            <Text color="text.blue" fontWeight="bold">
                                login
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
            </Container>
        );
    }
}

export default withScreenSizes(withRouter(Register));
