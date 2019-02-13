import React, { Component } from 'react';
import {
    Wizard,
    Numbers,
    Pictures,
    PreviousButton,
} from '@laguro/the-bright-side-components';
import { Flex, Box } from '@laguro/basic-components';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';
import { Query, Mutation, compose, withApollo } from 'react-apollo';
import * as Yup from 'yup';
import { adopt } from 'react-adopt';
import queryString from 'query-string';
import DocumentUploaderInputContainer from './DocumentUploaderInputContainer';
import {
    requestDentistVerificationMutation,
    getIdQueryClient,
    queryPatientDocumentQuery,
    createPatientDocumentMutation,
    saveUploadedImagesMutation,
} from './queries';
import { documentKinds } from '../../../../staticData/documentTypeList';
import { StyledPreviousButtonContainer } from '../../common';

const SSN_FORM_ITEM_NAME = 'ssn';
const DEA_FORM_ITEM_NAME = 'dea'; // malpractice insurance
const NPI_NUM_FORM_ITEM_NAME = 'npiNum';

// these names will be used for backend calls as well
const DENTIST_PHOTO_ID_FORM_ITEM_NAME = 'dentistPhotoId';
const WARRANTY_FORM_ITEM_NAME = 'warranty'; // malpractice insurance
const STATE_DENTAL_LICENSE_FORM_ITEM_NAME = 'stateDentalLicense';

const Composed = adopt({
    activeUserResponse: ({ render }) => {
        return <Query query={getIdQueryClient}>{render}</Query>;
    },
    requestDentistVerification: ({ render }) => {
        return (
            <Mutation mutation={requestDentistVerificationMutation}>
                {render}
            </Mutation>
        );
    },
});

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            [SSN_FORM_ITEM_NAME]: Yup.string()
                .required('You must provide SSN')
                .concat(Yup.string().matches(/^\d{9}$/)),
            [DEA_FORM_ITEM_NAME]: Yup.string()
                .required('You must provide DEA')
                .concat(Yup.string().matches(/^[A-Z][A-Z9][0-9]{7}(-\w+)?/)),
            [NPI_NUM_FORM_ITEM_NAME]: Yup.string()
                .required('You must provide NPI')
                .concat(Yup.string().matches(/^[0-9]{10}(-\w+)?/)),
        }),
    },
    {
        id: '1',
        initialValues: {},
        validationSchema: Yup.object().shape({}),
    },
];

const Step0 = props => <Numbers {...props} />;
const Step1 = props => (
    <Pictures
        {...props}
        renderDocumentUploaderInput={innerProps => (
            <DocumentUploaderInputContainer {...innerProps} {...props} />
        )}
    />
);

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        default:
            step = Step1(props);
    }

    return (
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

class RenderDentistOnboarding extends Component {
    // Fetch all documents
    // Request signatures for those relevant
    async fetchUserDocuments(userId) {
        const { client } = this.props;

        const {
            data: { queryPatientDocument },
        } = await client.query({
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
                    documents.map(async (maybeDoc, _i) => ({
                        // droppoing this.fetchSignedUrl
                        url: await maybeDoc,
                        side: _i === 0 ? 'front' : undefined,
                    }))
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

    render() {
        return (
            <Composed>
                {({ activeUserResponse, requestDentistVerification }) => (
                    <Box mt={140}>
                        <Wizard
                            render={props => (
                                <React.Fragment>
                                    {props.actions.canGoBack && (
                                        <StyledPreviousButtonContainer
                                            top={172}
                                        >
                                            <PreviousButton
                                                goToPreviousStep={
                                                    props.actions
                                                        .goToPreviousStep
                                                }
                                            />
                                        </StyledPreviousButtonContainer>
                                    )}
                                    {render({
                                        ...props,
                                        client: this.props.client,
                                    })}
                                </React.Fragment>
                            )}
                            onSubmit={async objectOfObjectOfStepValues => {
                                const objectOfValues = Object.values(
                                    objectOfObjectOfStepValues
                                ).reduce((objectOfValues, currentObject) => ({
                                    ...objectOfValues,
                                    ...currentObject,
                                }));

                                const { ssn, dea, npiNum } = objectOfValues;
                                if (
                                    !_isEmpty(ssn) ||
                                    !_isEmpty(dea) ||
                                    !_isEmpty(npiNum)
                                ) {
                                    await requestDentistVerification({
                                        variables: {
                                            input: {
                                                dentistId:
                                                    activeUserResponse.data
                                                        .activeUser.dentistId,
                                                deaRegistrationNumber: dea,
                                                npiNumber: npiNum,
                                                ssnOrEinOrTin: ssn,
                                            },
                                        },
                                    });
                                }

                                const documents = _pick(objectOfValues, [
                                    DENTIST_PHOTO_ID_FORM_ITEM_NAME,
                                    STATE_DENTAL_LICENSE_FORM_ITEM_NAME,
                                    WARRANTY_FORM_ITEM_NAME,
                                ]);

                                if (!_isEmpty(documents)) {
                                    let existingPatientDocument = await this.fetchUserDocuments(
                                        activeUserResponse.data.activeUser.id
                                    );
                                    if (!existingPatientDocument) {
                                        existingPatientDocument = await this.props.createPatientDocument(
                                            {
                                                patientId:
                                                    activeUserResponse.data
                                                        .activeUser.id,
                                            }
                                        );
                                        existingPatientDocument =
                                            existingPatientDocument.data
                                                .createPatientDocument;
                                    }

                                    const uploadResults = Object.keys(
                                        documents
                                    ).map(async documentKind => {
                                        const kindDocuments =
                                            documents[documentKind];

                                        // now only requiring front side of dentist photo id
                                        if (
                                            documentKind ===
                                            DENTIST_PHOTO_ID_FORM_ITEM_NAME
                                        ) {
                                            kindDocuments[0].side = 'front';
                                        }

                                        await this.props.saveUploadedImages({
                                            id: existingPatientDocument.id,
                                            documentList: kindDocuments,
                                            documentType: documentKind,
                                        });
                                    });

                                    await Promise.all(uploadResults);
                                }

                                const { redirectTo } = queryString.parse(
                                    this.props.location.search
                                );

                                this.props.history.push(redirectTo || '/');
                            }}
                            steps={steps}
                        />
                    </Box>
                )}
            </Composed>
        );
    }
}

export default compose(
    withApollo,
    createPatientDocumentMutation,
    saveUploadedImagesMutation
)(RenderDentistOnboarding);
