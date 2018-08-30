import React from 'react';
import { Form, Input } from '../../../components';
import CardFieldView from './CardFieldView';

const { SubmitButton, FormItem } = Form;

const NewCardFormView = ({ btnText, handleSubmit }) => (
    <Form layout="vertical" onSuccess={handleSubmit}>
        <FormItem
            name="card"
            label="credit card"
            mb={1}
            input={<CardFieldView />}
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
        <SubmitButton width={'100%'} px={24} buttonText={btnText} />
    </Form>
);

export default NewCardFormView;
