import React, { Component } from 'react';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';

class Form extends Component {
    componentDidMount() {
        // Run form tests to make sure the form cant be submitted with failing tests
        this.props.form.validateFields();
    }

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
            <AntForm
                layout={layout}
                onSubmit={this.handleSubmit}
                hideRequiredMark={true}
            >
                {/* add form prop to each child element */}
                {React.Children.map(children, child =>
                    React.cloneElement(child, { form })
                )}
            </AntForm>
        );
    }
}

const StyledForm = styled(Form)`
    width: 100%;
`;

const WrappedForm = AntForm.create()(StyledForm);
export default WrappedForm;
