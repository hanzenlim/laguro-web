import React from 'react';
import get from 'lodash/get';
import {
    PreText,
    FrontBackDocumentsSelector,
    SingleDocumentSelector,
    VerificationFormContainer,
} from './components';
import { Form, Input, InnerForm, Text } from '../../../../components';
import {
    WARRANTY_TOOLTIP,
    STATE_DENTAL_LICENSE_TOOLTIP,
    DENTIST_PHOTO_ID_TOOLTIP,
} from '../../../../util/strings';

const { FormItem } = Form;

const HostVerificationForm = props => (
    <VerificationFormContainer>
        <Text fontWeight="bold" fontSize={[3, '', 5]} mb={10}>
            Verification
        </Text>
        <PreText>
            Before you can book a reservation, we need you to upload some
            documents for verification.
        </PreText>
        <InnerForm {...props}>
            <FormItem
                name="deaRegistrationNumber"
                label="DEA Registration Number"
                input={<Input mb={[0, '', 32]} height={50} />}
                normalize={
                    get(props.data, 'deaRegistrationNumber')
                        ? value => value || null
                        : null
                }
                rules={[
                    {
                        pattern: /^[A-Z][A-Z9][0-9]{7}(-\w+)?/,
                        message: 'DEA Registration Number must appear valid',
                    },
                ]}
                validateTrigger="onBlur"
                initialValue={get(props.data, 'deaRegistrationNumber')}
            />
            <SingleDocumentSelector
                {...props}
                name="documents.stateDentalLicense"
                initialValue={get(props.data, 'documents.stateDentalLicense')}
                label="Upload a front of your State Dental License"
                tooltip={STATE_DENTAL_LICENSE_TOOLTIP}
            />
            <FrontBackDocumentsSelector
                {...props}
                name="documents.dentistPhotoId"
                initialValue={get(props.data, 'documents.dentistPhotoId')}
                label="Upload a front and back photo of your Government-Issued ID"
                tooltip={DENTIST_PHOTO_ID_TOOLTIP}
            />
            <SingleDocumentSelector
                {...props}
                name="documents.warranty"
                initialValue={get(props.data, 'documents.warranty')}
                label="Upload a document of your Malpractice Insurance"
                tooltip={WARRANTY_TOOLTIP}
            />
        </InnerForm>
    </VerificationFormContainer>
);

export default HostVerificationForm;
