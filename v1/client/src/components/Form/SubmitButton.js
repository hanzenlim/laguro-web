import React from 'react';
import { Form } from 'antd';
import styled from 'styled-components';
import { Button } from '..';

const FormItem = Form.Item;

const StyledFormItem = styled(FormItem)`
    text-align: center;
`;

const SubmitButton = ({ form, buttonText, ...rest }) => {
    const { getFieldsError } = form;
    const hasErrors = fieldsError =>
        Object.keys(fieldsError).some(field => fieldsError[field]);

    return (
        <StyledFormItem>
            <Button
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                {...rest}
            >
                {buttonText}
            </Button>
        </StyledFormItem>
    );
};

export default SubmitButton;
