import React, { Component } from 'react';
import { Button } from '../../components';
import { StyledFormItem } from '../Form';

class BackButton extends Component {
    handleBack = event => {
        const { form } = this.props;
        event.preventDefault();
        form.validateFields(async (validationError, values) => {
            await this.props.onBack(values);
        });
    };

    render = () => {
        const { form, buttonText, ...rest } = this.props;
        const { getFieldsError } = form;
        const hasErrors = fieldsError =>
            Object.keys(fieldsError).some(field => fieldsError[field]);
        return (
            <StyledFormItem>
                <Button
                    onClick={this.handleBack}
                    disabled={hasErrors(getFieldsError())}
                    inverted
                    {...rest}
                >
                    {buttonText}
                </Button>
            </StyledFormItem>
        );
    };
}

export default BackButton;
