import React, { Component } from 'react';
import get from 'lodash/get';
import {
    SingleDocumentSelector,
    VerificationFormContainer,
} from './components';
import { InnerForm, Text } from '~/components';

class HostVerificationForm extends Component {
    render() {
        const { form, officeDocuments, ...rest } = this.props;
        return (
            <VerificationFormContainer>
                <InnerForm form={form} {...rest}>
                    <SingleDocumentSelector
                        {...this.props}
                        name="documents.businessLicense"
                        initialValue={get(officeDocuments, 'businessLicense')}
                        label={
                            <span>
                                <span>
                                    Upload your business license document&nbsp;
                                </span>
                                <Text display="inline" color="text.gray">
                                    (optional)
                                </Text>
                            </span>
                        }
                        optional={true}
                    />
                    <SingleDocumentSelector
                        {...this.props}
                        name="documents.generalInsurance"
                        initialValue={get(officeDocuments, 'generalInsurance')}
                        label={
                            <span>
                                <span>
                                    Upload your general insurance document&nbsp;
                                </span>
                                <Text display="inline" color="text.gray">
                                    (optional)
                                </Text>
                            </span>
                        }
                        optional={true}
                    />
                </InnerForm>
            </VerificationFormContainer>
        );
    }
}

export default HostVerificationForm;
