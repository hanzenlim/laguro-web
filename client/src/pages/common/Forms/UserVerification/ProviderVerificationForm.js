import React from 'react';
import get from 'lodash/get';
import {
    PreText,
    FrontBackDocumentsSelector,
    SingleDocumentSelector,
    VerificationFormContainer,
} from './components';
import { Form, Input, InnerForm, Text } from '../../../../components';

const { FormItem } = Form;

const ProviderVerificationForm = props => {
    const { form } = props;
    return (
        <VerificationFormContainer>
            <PreText>
                Before you can book a reservation, we need you to upload some
                documents for verification.
            </PreText>
            <InnerForm form={form}>
                <FormItem
                    mb={40}
                    name="ssnOrEinOrTin"
                    label="SSN or EIN/TIN Number"
                    input={<Input height={50} />}
                    normalize={
                        get(props.data, 'ssnOrEinOrTin')
                            ? value => value || null
                            : null
                    }
                    rules={[
                        {
                            required: true,
                            message: 'SSN or EIN/TIN is required',
                        },
                        {
                            pattern: /^\d{9}$/,
                            message: 'SSN or EIN/TIN number must appear valid',
                        },
                    ]}
                    validateTrigger="onBlur"
                    initialValue={get(props.data, 'ssnOrEinOrTin')}
                />
                <SingleDocumentSelector
                    {...props}
                    name="documents.stateDentalLicense"
                    initialValue={get(
                        props.data,
                        'documents.stateDentalLicense'
                    )}
                    label="Upload a front of your State Dental License"
                    tooltip="We accept valid state license credentials, [varied from state to state.]"
                />
                <FrontBackDocumentsSelector
                    {...props}
                    name="documents.dentistPhotoId"
                    initialValue={get(props.data, 'documents.dentistPhotoId')}
                    label="Upload a front and back photo of your Government-Issued ID"
                    tooltip="We accept valid driver’s license."
                />
                <SingleDocumentSelector
                    {...props}
                    name="documents.warranty"
                    initialValue={get(props.data, 'documents.warranty')}
                    label="Upload a document of your Malpractice Insurance"
                    tooltip="Commonly known as medical professional liability insurance.
                    This insurance covers bodily injury, property damage, and personal injury such as
                    mental anguish."
                />
                <FormItem
                    mt={40}
                    name="deaRegistrationNumber"
                    label={
                        <span>
                            <span>DEA Registration Number </span>
                            <Text display="inline" color="text.gray">
                                (optional)
                            </Text>
                        </span>
                    }
                    input={<Input height={50} />}
                    normalize={
                        get(props.data, 'deaRegistrationNumber')
                            ? value => value || null
                            : null
                    }
                    rules={[
                        {
                            pattern: /^[A-Z][A-Z9][0-9]{7}(-\w+)?/,
                            message:
                                'DEA Registration Number must appear valid',
                        },
                    ]}
                    validateTrigger="onBlur"
                    initialValue={get(props.data, 'deaRegistrationNumber')}
                />
                <FormItem
                    name="npiNumber"
                    label={
                        <span>
                            <span>NPI Number </span>
                            <Text display="inline" color="text.gray">
                                (optional)
                            </Text>
                        </span>
                    }
                    input={<Input height={50} />}
                    normalize={
                        get(props.data, 'npiNumber')
                            ? value => value || null
                            : null
                    }
                    rules={[
                        {
                            pattern: /^[0-9]{10}(-\w+)?/,
                            message: 'NPI number must appear valid',
                        },
                    ]}
                    validateTrigger="onBlur"
                    initialValue={get(props.data, 'npiNumber')}
                />
            </InnerForm>
        </VerificationFormContainer>
    );
};

export default ProviderVerificationForm;
