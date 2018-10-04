import React from 'react';
import get from 'lodash/get';
import {
    PreText,
    FrontBackDocumentsSelector,
    SingleDocumentSelector,
    VerificationFormContainer,
} from './components';
import { Form, Input, InnerForm } from '../../../../components';

const { FormItem } = Form;

const HostVerificationForm = props => (
    <VerificationFormContainer>
        <PreText>
            Before you can book a reservation, we need you to upload some
            documents for verification.
        </PreText>
        <InnerForm {...props}>
            <FormItem
                name="deaRegistrationNumber"
                label="DEA Registration Number"
                input={<Input mb={32} height={50} />}
                rules={[
                    {
                        required: true,
                        message: 'DEA Registration Number is required',
                    },
                    {
                        pattern: /^[A-Z][A-Z9][0-9]{7}(-\w+)?/,
                        message: 'DEA Registration Number must appear valid',
                    },
                ]}
                validateTrigger="onBlur"
                initialValue={get(props.data, 'deaRegistrationNumber')}
            />
            <FrontBackDocumentsSelector
                {...props}
                name="documents.stateDentalLicense"
                initialValue={get(props.data, 'documents.stateDentalLicense')}
                label="Upload a front and back of your State Dental License"
            />
            <FrontBackDocumentsSelector
                {...props}
                name="documents.dentistPhotoId"
                initialValue={get(props.data, 'documents.dentistPhotoId')}
                label="Upload a front and back photo of your Government-Issued ID"
            />
            <SingleDocumentSelector
                {...props}
                name="documents.warranty"
                initialValue={get(props.data, 'documents.warranty')}
                label="Upload a document of your Malpractice Insurance"
            />
        </InnerForm>
    </VerificationFormContainer>
);

export default HostVerificationForm;
