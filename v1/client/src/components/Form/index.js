import React, { Component } from 'react';
import { Form as AntdForm } from 'antd';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Button } from '../../components';

const StyledForm = styled(AntdForm)`
    width: 100%;

    .ant-form-item {
        margin-bottom: 20px;
    }

    .ant-form-item-label {
        margin-bottom: 10px;
        line-height: 22px;
    }

    .ant-form-item-label > label {
        font-size: 18px;
    }
`;

class Form extends Component {
    handleSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields(async (validationError, values) => {
            if (!validationError) {
                try {
                    await this.props.onSuccess(values);
                } catch (submissionError) {
                    if (submissionError && submissionError.message) {
                        // eslint-disable-next-line
                        console.log(
                            'Form sumbission error: ',
                            submissionError.message
                        );
                    }
                }
            }
        });
    };

    render() {
        const { form, layout, children } = this.props;

        return (
            <StyledForm
                layout={layout}
                onSubmit={this.handleSubmit}
                hideRequiredMark={true}
            >
                {/* add form prop to each child element */}
                {React.Children.map(children, child =>
                    React.cloneElement(child, { form })
                )}
            </StyledForm>
        );
    }
}

/**

    Form components

*/

const AntFormItem = AntdForm.Item;

const StyledFormItem = styled(AntFormItem)`
    text-align: center;
`;

const StyledFormInput = styled(AntFormItem)`
    &&.ant-form-item {
        font-family: 'Ubuntu', sans-serif;
        ${space};
    }
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

const FormItem = ({
    form,
    name,
    label,
    rules = [],
    input,
    validateTrigger = 'onChange',
    initialValue,
    ...rest
}) => {
    const { getFieldDecorator, getFieldError, isFieldValidating } = form;

    const error = !isFieldValidating(name) && getFieldError(name);

    return (
        <StyledFormInput
            colon={false}
            label={label}
            validateStatus={error ? 'error' : ''}
            help={error || ''}
            {...rest}
        >
            {getFieldDecorator(name, {
                rules,
                validateTrigger,
                initialValue,
            })(input)}
        </StyledFormInput>
    );
};

const WrappedForm = AntdForm.create()(Form);
WrappedForm.SubmitButton = SubmitButton;
WrappedForm.FormItem = FormItem;
export default WrappedForm;
