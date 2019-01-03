import _get from 'lodash/get';
import { gql } from 'apollo-boost';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';
import _isString from 'lodash/isString';

import { documentKinds } from '../../staticData/documentTypeList';
import {
    queryPatientDocumentQuery,
    getFileStackPolicySignatureQuery,
} from '../common/Forms/HostOnboardingForm/queries';

class OfficeVerificationUtil {
    constructor(client, createPatientDocument, saveUploadedImages) {
        this.client = client;
        this.createPatientDocument = createPatientDocument;
        this.saveUploadedImages = saveUploadedImages;
        this.signedURLs = [];
    }

    async saveOfficeDocuments(documents, officeId, userId) {
        let existingPatientDocument = await this.fetchUserDocuments(userId);
        if (!existingPatientDocument) {
            existingPatientDocument = await this.createPatientDocument({
                patientId: userId,
            });

            existingPatientDocument =
                existingPatientDocument.data.createPatientDocument;
        }

        const uploadResults = Object.keys(documents).map(async documentKind => {
            const kindDocuments = documents[documentKind];

            if (!_isEmpty(kindDocuments[0])) {
                await this.saveUploadedImages({
                    id: existingPatientDocument.id,
                    documentList: {
                        ...kindDocuments[0],
                        officeId,
                    },
                    documentType: documentKind,
                });
            }
        });

        await Promise.all(uploadResults);
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

    async getViewPolicySignature(handle) {
        const viewPolicySignature = await this.client.query({
            query: gql(getFileStackPolicySignatureQuery),
            variables: {
                type: 'view',
                handle,
            },
        });

        return _get(viewPolicySignature, 'data');
    }

    async fetchSignedURL(url) {
        const { signedURLs } = this;
        if (signedURLs[url]) {
            return signedURLs[url];
        }

        this.signedURLs[url] = await this.generateImageSignature(url);

        return this.signedURLs[url];
    }

    // Fetch all documents
    // Request signatures for those relevant
    async fetchUserDocuments(userId) {
        const {
            data: { queryPatientDocument },
        } = await this.client.query({
            query: queryPatientDocumentQuery,
            variables: {
                input: {
                    partitionKey: 'patientId',
                    partitionValue: userId,
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
                                      officeId: maybeDoc.officeId,
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
}

export default OfficeVerificationUtil;
