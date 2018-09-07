import React from 'react';
import { Form, Input } from '../../../components';

const { SubmitButton, FormItem } = Form;

const LocalLoginForm = props => (
    <Form layout="vertical" {...props}>
        <FormItem
            name="email"
            label="email"
            mb={14}
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
            mb={14}
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
            input={<Input type="password" />}
        />
        <SubmitButton px={30} buttonText="log in" />
    </Form>
);

export default LocalLoginForm;
