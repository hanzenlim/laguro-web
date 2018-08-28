import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';

const AntFormItem = Form.Item;

const StyledFormItem = styled(AntFormItem)`
    &&.ant-form-item {
        margin-bottom: 14px;
        font-family: 'Ubuntu', sans-serif;
        font-weight: bold;
    }
`;

const FormItem = ({ form, name, label, rules, input }) => {
    const {
        getFieldDecorator,
        isFieldTouched,
        getFieldError,
        isFieldValidating,
    } = form;

    const error =
        isFieldTouched(name) && !isFieldValidating(name) && getFieldError(name);

    return (
        <StyledFormItem
            label={label}
            validateStatus={error ? 'error' : ''}
            help={error || ''}
        >
            {getFieldDecorator(name, { rules })(input)}
        </StyledFormItem>
    );
};

export default FormItem;
