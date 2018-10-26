import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { Form, Input, Button } from '../../../../../components';
import { withScreenSizes } from '../../../../../components/Responsive';

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

const NewCardFormView = ({
    btnText,
    isButtonOutside,
    handleSubmit,
    onBackButton,
    hasBackButton,
    isSubmitting,
    tabletMobileOnly,
}) => (
    <Form layout="vertical" onSuccess={handleSubmit} debounce={false}>
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
            mb={35}
            rules={[
                {
                    required: true,
                    message: 'Please input your address!',
                },
            ]}
            input={<Input type="string" />}
        />
        {hasBackButton &&
            onBackButton && (
                // Temporary solution before we can figure out
                // how to connect an external button to a form
                <Button
                    ghost={true}
                    height={['50px', '', '60px']}
                    fontSize={[1, '', 3]}
                    mb={10}
                    width={'100%'}
                    color="text.blue"
                    onClick={onBackButton}
                >
                    Back
                </Button>
            )}
        <SubmitButton
            width="100%"
            height={['50px', '', '60px']}
            fontSize={[1, '', 3]}
            px={24}
            buttonText={btnText}
            loading={isSubmitting}
            style={
                // Temporary solution before we can figure out
                // how to connect an external button to a form
                isButtonOutside
                    ? {
                          position: tabletMobileOnly ? 'auto' : 'absolute',
                          width: tabletMobileOnly ? '100%' : '200px',
                          top: tabletMobileOnly ? '0' : '80px',
                          left: tabletMobileOnly ? '0' : '135px',
                      }
                    : {}
            }
        />
    </Form>
);

export default withScreenSizes(NewCardFormView);
