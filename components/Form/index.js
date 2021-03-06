import React, { Component } from 'react';
import PropTypes from 'prop-types';

import isObject from 'lodash/isObject';
import debounce from 'lodash/debounce';
import delay from 'lodash/delay';

import { Form as AntdForm } from 'antd';
import styled from 'styled-components';
import {
    space,
    // Fix naming issue with text align prop
    textAlign as styledTextAlign,
    height,
    width,
} from 'styled-system';
import { Button, Tooltip, Box } from '~/components';
import BackButton from './BackButton';

const StyledForm = styled(AntdForm)`
    width: 100%;
    &&,
    && .ant-radio-wrapper,
    && .ant-form-item,
    && .ant-select,
    && .ant-input {
        font-family: ${props => props.theme.fontFamily};
    }

    .ant-form-item {
        margin-bottom: 0px;
    }

    && .ant-input,
    && .ant-form-explain {
        font-size: ${props => props.theme.fontSizes[0]};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            font-size: ${props => props.theme.fontSizes[1]};
        }
    }

    .ant-form-item .ant-input::placeholder {
        font-size: ${props => props.theme.fontSizes[0]};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            font-size: ${props => props.theme.fontSizes[3]};
        }
    }

    .ant-form-item-label {
        padding-bottom: 8px;
        line-height: 18px;
        text-align: left;
        white-space: normal;

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            padding-bottom: 10px;
            line-height: 22px;
        }
    }

    .ant-form-item-label > label {
        font-size: ${props => props.theme.fontSizes[0]};

        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            font-size: ${props => props.theme.fontSizes[3]};
        }
    }
`;

// use this component and pass in a 'form' prop to allow multiple forms within an outer form
export class InnerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { submitting: false };

        this.debouncedSuccess = debounce(this.handleSuccess, 3000, {
            leading: true,
            trailing: false,
        });
    }

    handleSuccess = values => {
        this.props.onSuccess(values);
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props.form.validateFields(async (validationError, values) => {
            if (!validationError) {
                if (this.props.debounce === 'true') {
                    this.setState({ submitting: true });
                }

                try {
                    if (this.props.debounce === 'true') {
                        await this.debouncedSuccess(values);
                    } else {
                        this.handleSuccess(values);
                    }
                } catch (submissionError) {
                    if (submissionError && submissionError.message) {
                        // eslint-disable-next-line
                        throw new Error(submissionError.message);
                    }
                }
                delay(() => {
                    this.setState({ submitting: false });
                }, 750);
            }
        });
    };

    componentDidMount() {
        const { form, onSuccess, children, ...rest } = this.props;
        this.props.form.setFieldsValue({ ...rest });
    }

    renderWrappedChildren(children) {
        const { form } = this.props;
        // Traverse through all children with pretty functional way
        return React.Children.map(children, child => {
            // This is support for non-node elements (eg. pure text), they have no props
            if (!child || !child.props) {
                return child;
            }

            // If current component has additional children, traverse through them as well!
            if (child.props.children) {
                // You have to override also children here
                return React.cloneElement(child, {
                    children: this.renderWrappedChildren(child.props.children),
                    form,
                });
            }

            // Return new component with overridden `onChange` callback
            return React.cloneElement(child, {
                state: this.state,
                form,
            });
        });
    }

    render() {
        const { form, children, onSuccess, ...rest } = this.props;

        return (
            <StyledForm
                onSubmit={this.handleSubmit}
                hideRequiredMark={true}
                {...rest}
            >
                {/* add form prop to each descendent element */}
                {this.renderWrappedChildren(children)}
            </StyledForm>
        );
    }
}

/**

    Form components

*/

const AntFormItem = AntdForm.Item;

export const StyledFormItem = styled(AntFormItem)`
    text-align: center;
    &&.ant-form-item {
        ${styledTextAlign};
    }
`;

const StyledFormInput = styled(AntFormItem)`
    &&.ant-form-item {
        font-family: 'Silka', sans-serif;
        ${space};
        ${width};
    }
    && .ant-input {
        ${height};
    }
`;

StyledFormInput.defaultProps = {
    mb: 20,
};

// handle nested forms properly
// eslint-disable-next-line
const SubmitButton = ({
    form,
    state,
    buttonText,
    textAlign: textAlignStyle,
    dynamicDisable = true,
    ...rest
}) => {
    const { getFieldsError } = form;
    const hasErrors = fieldsError =>
        Object.keys(fieldsError).some(field =>
            isObject(fieldsError[field])
                ? hasErrors(fieldsError[field])
                : fieldsError[field] !== undefined
        );

    return (
        <StyledFormItem textAlign={textAlignStyle}>
            <Button
                htmlType="submit"
                loading={state.submitting}
                disabled={dynamicDisable && hasErrors(getFieldsError())}
                {...rest}
            >
                {state.submitting ? 'submitting' : buttonText}
            </Button>
        </StyledFormItem>
    );
};

const FormItem = ({
    form,
    name,
    label,
    tooltip,
    rules = null,
    input,
    initialValue,
    validateTrigger,
    valuePropName = 'value',
    normalize,
    ...rest
}) => {
    const { getFieldDecorator, getFieldError, isFieldValidating } = form;

    const error = !isFieldValidating(name) && getFieldError(name);

    const tooltipSize = [18, '', 22];
    return (
        <StyledFormInput
            colon={false}
            label={
                label && (
                    <Box display="inline-flex">
                        <Box is="span">{label}</Box>
                        {tooltip && (
                            <Box ml="12px" height={tooltipSize}>
                                <Tooltip
                                    inForm
                                    size={tooltipSize}
                                    text={tooltip}
                                />
                            </Box>
                        )}
                    </Box>
                )
            }
            validateStatus={error ? 'error' : ''}
            help={error || ''}
            {...rest}
        >
            {getFieldDecorator(name, {
                rules,
                validateTrigger,
                initialValue,
                valuePropName,
                normalize,
                ...rest,
            })(input)}
        </StyledFormInput>
    );
};

const WrappedForm = AntdForm.create()(InnerForm);

InnerForm.SubmitButton = SubmitButton;
InnerForm.BackButton = BackButton;
InnerForm.FormItem = FormItem;
WrappedForm.SubmitButton = SubmitButton;
WrappedForm.BackButton = BackButton;
WrappedForm.FormItem = FormItem;

WrappedForm.defaultProps = {
    onSuccess: () => {},
    debounce: 'true',
};

WrappedForm.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    // Using a boolean causes an error
    debounce: PropTypes.string,
};

export default WrappedForm;
