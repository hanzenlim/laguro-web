import { message } from 'antd';
import { Field, Form, withFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as yup from 'yup';
import {
    Button,
    Container,
    Flex,
    Input,
    Text,
    Box,
    Icon,
} from '../../../components';

const StyledForm = styled(Form)`
    && {
        display: flex;
        width: 100%;
        text-align: center;

        .ant-input {
            height: 50px;
            flex: 1;
            background: white;
            color: black;
            font-size: 16px;
            padding: 15px 25px;
            margin-right: 10px;
        }
    }
`;

const StyledButton = styled(Button)`
    && {
        border: none;
        min-width: 94px;

        :hover,
        :focus {
            border: none;
        }
    }
`;

const NewsletterView = props => (
    <Flex bg="background.navyBlue" width="100%x" py={[36, '', 75]}>
        <Container>
            <Text
                fontFamily="IowanOldStyle"
                fontWeight="bold"
                color="text.white"
                fontSize={[3, '', 40]}
                textAlign="center"
                mb={[12, '', 34]}
            >
                Subscribe to our newsletter
            </Text>

            <Text
                fontWeight="light"
                color="text.white"
                fontSize={[1, '', 2]}
                mb={[26, '', 34]}
                textAlign="center"
            >
                Join our newsletter for latest updates and special offers.
            </Text>

            <Flex width="100%" justifyContent="center">
                <Box width={['100%', '', '535px']}>
                    <StyledForm noValidate onSubmit={props.handleSubmit}>
                        <Box width="100%">
                            <Flex width="100%">
                                <Field
                                    name="email"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="Email address"
                                        />
                                    )}
                                />
                                <StyledButton
                                    htmlType="submit"
                                    height="50px"
                                    loading={props.isSubmitting}
                                    fontSize={[1, '', 2]}
                                >
                                    Join
                                </StyledButton>
                            </Flex>

                            {props.submitCount > 0 &&
                                props.touched.email &&
                                props.errors.email && (
                                    <Flex
                                        width="100%"
                                        height="15px"
                                        mt="24px"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon type="alert" />
                                        <Text
                                            style={{
                                                'white-space': 'pre',
                                            }}
                                            color="white"
                                            fontSize="12px"
                                            ml="8px"
                                            lineHeight="1"
                                        >
                                            {props.errors.email}
                                        </Text>
                                    </Flex>
                                )}
                        </Box>
                    </StyledForm>
                </Box>
            </Flex>
        </Container>
    </Flex>
);

export default withFormik({
    validationSchema: yup.object().shape({
        email: yup
            .string()
            .min(3, 'Email must be at least 3 characters.')
            .max(255)
            .email(`Please include an '@' and '.' in the email address.`)
            .required('Please fill out this field.'),
    }),
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (values, actions) => {
        actions.setSubmitting(true);
        const result = await actions.props.onSuccess(values);
        actions.setSubmitting(false);
        actions.resetForm();

        if (result) {
            message.success('Email successfully added to our newsletter.');
        } else {
            message.error('Something went wrong.');
        }
    },
})(NewsletterView);
