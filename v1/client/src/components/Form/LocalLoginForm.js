import React from 'react';
import { Form, Input } from '..';
import FormItem from './FormItem';
import SubmitButton from './SubmitButton';

const LocalLoginForm = props => (
    <Form layout="vertical" {...props}>
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
            ]}
            input={<Input type="password" />}
        />
        <SubmitButton px={14} buttonText="log in" />
    </Form>
);

export default LocalLoginForm;
