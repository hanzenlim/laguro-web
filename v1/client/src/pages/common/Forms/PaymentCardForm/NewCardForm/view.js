import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { Form, Input } from '../../../../../components';

const { SubmitButton, FormItem } = Form;

const style = {
    base: {
        fontSize: '16px',
        color: '#424770',
        lineHeight: '22px',
        letterSpacing: '0.025em',
        '::placeholder': {
            color: '#aab7c4',
        },
        padding: '16px',
    },
    invalid: {
        color: '#f5222d',
    },
};

const NewCardFormView = ({ btnText, handleSubmit }) => (
    <Form layout="vertical" onSuccess={handleSubmit}>
        <FormItem
            name="card"
            label="credit card"
            mb={1}
            input={<CardElement className="ant-input" style={style} />}
        />
        <FormItem
            name="name"
            label="name"
            mb={1}
            rules={[
                {
                    required: true,
                    message: 'Please input your name!',
                },
            ]}
            validateTrigger="onBlur"
            input={<Input type="string" />}
        />

        <FormItem
            name="address"
            label="address"
            mb={1}
            rules={[
                {
                    required: true,
                    message: 'Please input your address!',
                },
            ]}
            input={<Input type="string" />}
        />
        <SubmitButton
            width="100%"
            height={60}
            px={24}
            mt={28}
            buttonText={btnText}
        />
    </Form>
);

export default NewCardFormView;
