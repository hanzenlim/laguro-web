import React, { Component } from 'react';
import {
    Wizard,
    Numbers,
    Pictures,
    PreviousButton,
    Progress,
} from '@laguro/the-bright-side-components';
import { Flex, Box } from '@laguro/basic-components';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
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
import { getSearchParamValueByKey } from '../../../../history';
import { getProgressBarProps } from '../../../../components/utils';
import { execute } from '../../../../util/gqlUtils';

const SSN_FORM_ITEM_NAME = 'ssn';
const DEA_FORM_ITEM_NAME = 'dea'; // malpractice insurance
const NPI_NUM_FORM_ITEM_NAME = 'npiNum';

// these names will be used for backend calls as well
const DENTIST_PHOTO_ID_FORM_ITEM_NAME = 'dentistPhotoId';
const WARRANTY_FORM_ITEM_NAME = 'warranty'; // malpractice insurance
const STATE_DENTAL_LICENSE_FORM_ITEM_NAME = 'stateDentalLicense';

const progressSteps = ['Dentist Profile', 'Verification'];
const currentStep = progressSteps[1];

const Composed = adopt({
    activeUserResponse: ({ render }) => (
        <Query query={getIdQueryClient}>{render}</Query>
    ),
    requestDentistVerification: ({ render }) => (
        <Mutation mutation={requestDentistVerificationMutation}>
            {render}
        </Mutation>
    ),
});

const steps = [
    {
        id: '0',
        validationSchema: Yup.object().shape({
            [SSN_FORM_ITEM_NAME]: Yup.string()
                .required(`Please provide your SSN or EIN/TIN`)
                .concat(
                    Yup.string().matches(
                        /^\d{9}$/,
                        `Your SSN or EIN/TIN should be a 9-digit number`
                    )
                ),
            [DEA_FORM_ITEM_NAME]: Yup.string()
                .required('Please provide your DEA registration number')
                .concat(
                    Yup.string().matches(
                        /^[A-Za-z][A-Za-z9][0-9]{7}(-\w+)?/,
                        'Please double-check your DEA registration number'
                    )
                ),
            [NPI_NUM_FORM_ITEM_NAME]: Yup.string()
                .required('Please provide your NPI number')
                .concat(
                    Yup.string().matches(
                        /^[0-9]{10}(-\w+)?/,
                        'Please double-check your NPI number'
                    )
                ),
        }),
    },
    {
        id: '1',
        initialValues: {},
        validationSchema: Yup.object().shape({
            [DENTIST_PHOTO_ID_FORM_ITEM_NAME]: Yup.array().required(
                "You must provide a photo of your driver's license"
            ),
            [WARRANTY_FORM_ITEM_NAME]: Yup.array().required(
                'You must provide a proof of your malpractice insurance'
            ),
            [STATE_DENTAL_LICENSE_FORM_ITEM_NAME]: Yup.array().required(
                'You must provide a photo of dental license'
            ),
        }),
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
        let startStep;
        if (getSearchParamValueByKey('referer') === 'ReserveOffice') {
            startStep = progressSteps.indexOf(currentStep) + 1;
        } else if (
            getSearchParamValueByKey('referer') === 'KioskDentistProfilePage'
        ) {
            startStep = 1;
        }

        return (
            <Composed>
                {({ activeUserResponse, requestDentistVerification }) => (
                    <Box>
                        {startStep !== progressSteps.length && (
                            <Progress
                                {...getProgressBarProps({
                                    startStep,
                                    currentStep,
                                    progressSteps,
                                })}
                            />
                        )}
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

                                await execute({
                                    action: async () => {
                                        await requestDentistVerification({
                                            variables: {
                                                input: {
                                                    dentistId:
                                                        activeUserResponse.data
                                                            .activeUser
                                                            .dentistId,
                                                    deaRegistrationNumber: dea.toUpperCase(),
                                                    npiNumber: npiNum,
                                                    ssnOrEinOrTin: ssn,
                                                },
                                            },
                                        });

                                        const documents = _pick(
                                            objectOfValues,
                                            [
                                                DENTIST_PHOTO_ID_FORM_ITEM_NAME,
                                                STATE_DENTAL_LICENSE_FORM_ITEM_NAME,
                                                WARRANTY_FORM_ITEM_NAME,
                                            ]
                                        );

                                        let existingPatientDocument = await this.fetchUserDocuments(
                                            activeUserResponse.data.activeUser
                                                .id
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

                                            await this.props.saveUploadedImages(
                                                {
                                                    id:
                                                        existingPatientDocument.id,
                                                    documentList: kindDocuments,
                                                    documentType: documentKind,
                                                }
                                            );
                                        });

                                        await Promise.all(uploadResults);
                                    },
                                    afterAction: () => {
                                        const {
                                            redirectTo,
                                        } = queryString.parse(
                                            this.props.location.search
                                        );

                                        this.props.history.push(
                                            redirectTo || '/'
                                        );
                                    },
                                });
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
