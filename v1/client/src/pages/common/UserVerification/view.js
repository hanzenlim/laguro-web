import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Alert } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _isString from 'lodash/isString';

import PatientVerificationForm from '../../common/Forms/UserVerification/PatientVerificationForm';
import ProviderVerificationForm from '../../common/Forms/UserVerification/ProviderVerificationForm';
import HostVerificationForm from '../../common/Forms/UserVerification/HostVerificationForm';
import { Form } from '../../../components';

import { documentKinds } from '../../../staticData/documentTypeList';
import { HOST, DENTIST, PATIENT } from '../../../util/strings';

import {
    getActiveUser,
    queryPatientDocumentQuery,
    getFileStackPolicySignatureQuery,
    getDentistQuery,
    userInsurancePreferencesQuery,
    saveUploadedImagesMutation,
    createPatientDocumentMutation,
    saveUserMutation,
    updateDentistMutation,
} from './queries';

const { SubmitButton } = Form;

export const StyledAlert = styled(Alert)`
    && {
        margin-bottom: 20px;
    }
`;

class UserVerification extends Component {
    state = {
        isLoading: true,
        data: null,
        uploadPolicySignature: null,
        error: null,
        isSubmitting: false,
    };

    constructor(props) {
        super(props);

        this.signedURLs = {};
    }

    async componentDidMount() {
        const uploadFileStackKeys = await this.getUploadPolicySignature();

        await this.loadData();

        this.setState({
            isLoading: false,
            ...uploadFileStackKeys,
        });
    }

    async getUploadPolicySignature() {
        const { client } = this.props;
        const {
            data: { getFileStackPolicySignature },
        } = await client.query({
            query: gql(getFileStackPolicySignatureQuery),
            variables: {
                type: 'upload',
            },
        });

        return {
            uploadPolicySignature: getFileStackPolicySignature,
        };
    }

    async getViewPolicySignature(handle) {
        const { client } = this.props;
        const viewPolicySignature = await client.query({
            query: gql(getFileStackPolicySignatureQuery),
            variables: {
                type: 'view',
                handle,
            },
        });

        return _get(viewPolicySignature, 'data');
    }

    fetchSignedURL = async url => {
        const { signedURLs } = this;
        if (signedURLs[url]) {
            return signedURLs[url];
        }

        this.signedURLs[url] = await this.generateImageSignature(url);

        return this.signedURLs[url];
    };

    async loadData() {
        const {
            persona,
            user: { id },
            client,
        } = this.props;

        const documents = await this.fetchUserDocuments();

        if (persona === PATIENT) {
            const {
                data: { getUser },
            } = await client.query({
                query: userInsurancePreferencesQuery,
                variables: { id },
                fetchPolicy: 'network-only',
            });

            if (_get(getUser, 'insurancePreference')) {
                this.setState({
                    data: {
                        ...this.state.data,
                        ...documents,
                        insurancePreference: getUser.insurancePreference,
                    },
                });
            }
        }

        if (persona === DENTIST || persona === HOST) {
            const {
                data: { getUser },
            } = await client.query({
                query: getDentistQuery,
                variables: { id },
            });

            if (_get(getUser, 'dentist')) {
                const { dentist } = getUser;
                this.setState({
                    dentist,
                    data: {
                        ...this.state.data,
                        ...documents,
                        deaRegistrationNumber: dentist.deaRegistrationNumber,
                    },
                });
            }
        }

        // no host-specific documents required
    }

    // Fetch all documents
    // Request signatures for those relevant
    async fetchUserDocuments() {
        const { client, user } = this.props;

        const {
            data: { queryPatientDocument },
        } = await client.query({
            query: queryPatientDocumentQuery,
            variables: {
                input: {
                    partitionKey: 'patientId',
                    partitionValue: user.id,
                },
            },
            fetchPolicy: 'network-only',
        });

        if (_get(queryPatientDocument, '[0]')) {
            const {
                id,
                patientInsurance,
                ...restFields
            } = queryPatientDocument[0];
            // normalize documents format
            const normalizedDocData = await Object.keys(
                _pick(restFields, documentKinds)
            ).reduce(async (_acc, docKind) => {
                const acc = await _acc;
                const documents = restFields[docKind] || [];

                acc[docKind] = await Promise.all(
                    documents.map(
                        async (maybeDoc, _i) =>
                            _isString(maybeDoc)
                                ? {
                                      url: await this.fetchSignedURL(maybeDoc),
                                      side: _i === 0 ? 'front' : undefined,
                                  }
                                : {
                                      // graphql leaves __typename fields
                                      ..._pick(maybeDoc, 'side'),
                                      url: await this.fetchSignedURL(
                                          maybeDoc.url
                                      ),
                                  }
                    )
                );

                return acc;
            }, Promise.resolve({}));

            return {
                id,
                documents: normalizedDocData,
            };
        }

        return null;
    }

    async generateImageSignature(url) {
        // Extracting the file handle from the urlArr. The urlArr has this format https://cdn.filestackcontent.com/yF9AgWbSTHyWbMGZDiow
        const viewPolicySignature = await this.getViewPolicySignature(
            url.split('/')[3]
        );

        const {
            policy,
            signature,
        } = viewPolicySignature.getFileStackPolicySignature;

        return `${url}?policy=${policy}&signature=${signature}`;
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    processFormData = async formData => {
        const { user, persona } = this.props;
        const { documents } = formData;

        let existingPatientDocument = await this.fetchUserDocuments();
        if (!existingPatientDocument) {
            existingPatientDocument = await this.props.createPatientDocument({
                patientId: user.id,
            });

            existingPatientDocument =
                existingPatientDocument.data.createPatientDocument;

            // return false;
        }

        const uploadResults = Object.keys(documents).map(async documentKind => {
            const kindDocuments = documents[documentKind];

            await this.props.saveUploadedImages({
                id: existingPatientDocument.id,
                documentList: kindDocuments,
                documentType: documentKind,
            });
        });

        await Promise.all(uploadResults);

        if (persona === PATIENT) {
            const {
                insurancePreference: { useInsurance },
                insurancePreference,
            } = formData;

            await this.props.saveUser({
                id: user.id,
                sentVerificationDocuments: true,
                insurancePreference: {
                    ...insurancePreference,
                    insurance: useInsurance
                        ? {
                              ...insurancePreference.insurance,
                              birthdate: moment(
                                  insurancePreference.insurance.birthdate,
                                  'MM/DD/YYYY'
                              ).format('YYYY-MM-DD'),
                          }
                        : null,
                },
            });
        }

        if (persona === DENTIST) {
            const { dentist } = this.state;
            const { deaRegistrationNumber } = formData;

            await this.props.updateDentist({
                id: dentist.id,
                deaRegistrationNumber,
                sentVerificationDocuments: true,
            });
        }

        if (persona === HOST) {
            const { dentist } = this.state;
            const { deaRegistrationNumber } = formData;

            await this.props.updateDentist({
                id: dentist.id,
                deaRegistrationNumber,
                isHostVerified: true,
            });
        }

        this.setState({ hasUpdated: true, isSubmitting: false });
        window.scrollTo(0, 0);

        await this.loadData();
        if (this.props.onComplete) {
            this.props.onComplete({ persona, verified: true });
        }
    };

    handleSubmit = async formData => {
        try {
            this.setState({ isSubmitting: true });
            await this.processFormData(formData);
        } catch (e) {
            this.setState({ error: e, isSubmitting: false });
        }
    };

    render() {
        const { persona } = this.props;
        const { hasUpdated, error } = this.state;

        const FormRender = props => {
            if (persona === DENTIST) {
                return <ProviderVerificationForm {...props} />;
            }

            if (persona === PATIENT) {
                return <PatientVerificationForm {...props} />;
            }

            if (persona === HOST) {
                return <HostVerificationForm {...props} />;
            }

            return null;
        };

        return (
            <Form onSuccess={this.handleSubmit} debounce="false">
                {hasUpdated && (
                    <StyledAlert
                        showIcon
                        message={
                            'Your request for verification has been submitted.'
                        }
                        type="success"
                    />
                )}
                {error && (
                    <StyledAlert
                        showIcon
                        type="error"
                        message="There was an issue processing your verification. Please try again later"
                    />
                )}
                <FormRender
                    {...this.state}
                    wrappedComponentRef={this.saveFormRef}
                    fetchSignedURL={this.fetchSignedURL}
                />
                <SubmitButton
                    dynamicDisable={false}
                    width="100%"
                    textAlign="center"
                    buttonText="Submit Verification"
                    loading={this.state.isSubmitting}
                />
            </Form>
        );
    }
}

export default compose(
    withApollo,
    getActiveUser,
    createPatientDocumentMutation,
    saveUploadedImagesMutation,
    saveUserMutation,
    updateDentistMutation
)(UserVerification);
