import React from 'react';
import get from 'lodash/get';

import { Form, Select } from 'antd';
import styled from 'styled-components';

import { Input, Radio } from '../../../../components';
import { PreText, FrontBackDocumentsSelector } from './components';

import supportedPayerList from '../../../../staticData/supportedPayerList';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const InsuranceContainer = styled.div`
    border: 1px solid #cccccc;
    padding: 20px;
    border-radius: 2px;
    margin-bottom: 20px;

    display: ${props => (props.visible ? 'block' : 'none')};
`;

InsuranceContainer.Header = styled.div`
    font-weight: normal;
    font-size: 18px;
    margin-bottom: 22px;
`;

export const StyledForm = styled(Form)`
    .ant-input {
        height: 50px;
    }

    .ant-form-item {
        margin-bottom: 24px;
    }

    .ant-form-item-label {
        margin-bottom: 12px;
    }

    .ant-form-explain {
        margin-top: 2px;
    }

    .ant-form-item-label label {
        font-size: 18px;
    }
`;

class PatientVerificationForm extends React.Component {
    state = {
        useInsurance: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            useInsurance: get(
                this.props,
                'data.insurancePreference.useInsurance'
            ),
        };
    }

    componentDidUpdate(prevProps) {
        if (
            get(this.props, 'data.insurancePreference.useInsurance') !==
            get(prevProps, 'data.insurancePreference.useInsurance')
        ) {
            this.setState({
                useInsurance: get(
                    this.props,
                    'data.insurancePreference.useInsurance'
                ),
            });
        }
    }

    handleUseInsuranceChange = e => {
        this.setState({ useInsurance: e.target.value });
    };

    render() {
        const {
            props: {
                data,
                form: { getFieldDecorator },
                onSubmit,
            },
            props,
        } = this;

        const { useInsurance } = this.state;

        return (
            <div>
                <PreText>
                    Before you can book an appointment, we need you to upload
                    some documents for verification.
                </PreText>
                <StyledForm onSubmit={onSubmit}>
                    <FormItem>
                        {getFieldDecorator('insurancePreference.useInsurance', {
                            initialValue: get(
                                data,
                                'insurancePreference.useInsurance'
                            ),
                            rules: [
                                {
                                    required: true,
                                    message: 'Please select your option',
                                },
                            ],
                        })(
                            <RadioGroup
                                onChange={this.handleUseInsuranceChange}
                            >
                                <Radio
                                    fontSize="18px"
                                    style={radioStyle}
                                    value={false}
                                >
                                    I <b>do not have insurance</b> or{' '}
                                    <b>do not wish to use insurance</b>
                                </Radio>
                                <Radio
                                    fontSize="18px"
                                    style={radioStyle}
                                    value={true}
                                >
                                    I would like to <b>use insurance</b>
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <InsuranceContainer visible={useInsurance}>
                        <InsuranceContainer.Header>
                            Insurance Details
                        </InsuranceContainer.Header>
                        <FormItem label="Insurance Member ID">
                            {getFieldDecorator(
                                'insurancePreference.insurance.insuranceMemberId',
                                {
                                    initialValue: get(
                                        props.data,
                                        'insurancePreference.insurance.insuranceMemberId'
                                    ),
                                    rules: [
                                        {
                                            required: useInsurance,
                                            message:
                                                'Insurance Member ID is required',
                                        },
                                    ],
                                }
                            )(<Input mb={32} height={50} />)}
                        </FormItem>
                        <FormItem label="Birthdate">
                            {getFieldDecorator(
                                'insurancePreference.insurance.birthdate',
                                {
                                    initialValue: get(
                                        props.data,
                                        'insurancePreference.insurance.birthdate'
                                    ),
                                    rules: [
                                        {
                                            required: useInsurance,
                                            message: 'Birthdate',
                                        },
                                        {
                                            pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                                            message:
                                                'Birthdate must follow the format YYYY-MM-DD (e.g. 1996-03-09)',
                                        },
                                    ],
                                }
                            )(<Input mb={32} height={50} />)}
                        </FormItem>
                        <FormItem label="Insurance Provider">
                            {getFieldDecorator(
                                'insurancePreference.insurance.insuranceProvider',
                                {
                                    initialValue: get(
                                        props.data,
                                        'insurancePreference.insurance.insuranceProvider'
                                    ),
                                    rules: [
                                        {
                                            required: useInsurance,
                                            message:
                                                'Insurnace provider is required',
                                        },
                                    ],
                                }
                            )(
                                <Select
                                    showSearch
                                    placeholder="Select an Insurance Provider"
                                    mb={32}
                                    height={50}
                                >
                                    {supportedPayerList.map(payer => (
                                        <Option key={payer.id} value={payer.id}>
                                            {payer.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                    </InsuranceContainer>
                    <FrontBackDocumentsSelector
                        {...props}
                        name="documents.license"
                        initialValue={get(props.data, 'documents.license')}
                        label="Upload photos of your Government-Issued Photo ID"
                    />
                </StyledForm>
            </div>
        );
    }
}

export default Form.create()(PatientVerificationForm);