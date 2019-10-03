import React, { Component, useEffect, useContext } from 'react';
import { withRouter } from 'next/router';
import cookies from 'browser-cookies';
import { Flex, Box } from '~/components';
import _isEmpty from 'lodash/isEmpty';
import { Mutation, withApollo } from 'react-apollo';
import * as Yup from 'yup';
import { adopt } from 'react-adopt';
import compose from 'lodash/flowRight';

import DocumentUploaderInputContainer from './DocumentUploaderInputContainer';
import {
    requestDentistVerificationMutation,
    queryPatientDocumentQuery,
    createPatientDocumentMutation,
    saveUploadedImagesMutation,
} from './queries';
import { getSearchParamValueByKey } from '~/util/history';
import { getProgressBarProps } from '~/components/utils';
import { execute } from '~/util/gqlUtils';
import Numbers from '~/common/the-bright-side-components/components/Onboarding/Dentist/Verification/Numbers';
import { Progress } from '~/common/the-bright-side-components/components/Onboarding/Patient/Progress';
import { Pictures } from '~/common/the-bright-side-components/components/Onboarding/Dentist/Verification/Pictures';
import { Wizard, Onboarding } from '~/common/the-bright-side-components';
import { AppContext } from '../../../../appContext';

const SSN_FORM_ITEM_NAME = 'ssn';
const DEA_NUM_FORM_ITEM_NAME = 'deaNum';
const NPI_NUM_FORM_ITEM_NAME = 'npiNum';
const LIC_NUM_FORM_ITEM_NAME = 'license';

// these names will be used for backend calls as well
const DENTIST_PHOTO_ID_FORM_ITEM_NAME = 'dentistPhotoId';
const WARRANTY_FORM_ITEM_NAME = 'warranty'; // malpractice insurance
const STATE_DENTAL_LICENSE_FORM_ITEM_NAME = 'stateDentalLicense';
const DEA_FORM_ITEM_NAME = 'dea';

const progressSteps = ['Dentist Profile', 'Verification'];
const currentStep = progressSteps[1];

const Composed = adopt({
    requestDentistVerification: ({ render }) => (
        <Mutation mutation={requestDentistVerificationMutation}>
            {render}
        </Mutation>
    ),
});

const steps = dentist => [
    {
        id: '0',
        initialValues: dentist
            ? {
                  [DEA_NUM_FORM_ITEM_NAME]: dentist.deaRegistrationNumber,
                  [NPI_NUM_FORM_ITEM_NAME]: dentist.npiNumber,
                  [SSN_FORM_ITEM_NAME]: dentist.ssnOrEinOrTin,
                  [LIC_NUM_FORM_ITEM_NAME]: dentist.licenseNumber,
              }
            : {},
        validationSchema: Yup.object().shape({
            [SSN_FORM_ITEM_NAME]: Yup.string()
                .required(`Please provide your SSN or EIN/TIN`)
                .nullable()
                .concat(
                    Yup.string().matches(
                        /^\d{9}$/,
                        `Your SSN or EIN/TIN should be a 9-digit number`
                    )
                ),
            [DEA_NUM_FORM_ITEM_NAME]: Yup.string()
                .notRequired()
                .nullable()
                .concat(
                    Yup.string().matches(
                        /^[A-Za-z][A-Za-z9][0-9]{7}(-\w+)?/,
                        'Please double-check your DEA registration number'
                    )
                ),
            [NPI_NUM_FORM_ITEM_NAME]: Yup.string()
                .required('Please provide your NPI number')
                .nullable()
                .concat(
                    Yup.string().matches(
                        /^[0-9]{10}(-\w+)?/,
                        'Please double-check your NPI number'
                    )
                ),
            [LIC_NUM_FORM_ITEM_NAME]: Yup.string()
                .required('Please provide your dental license number')
                .nullable()
                .concat(
                    Yup.string().matches(
                        /^\d{5,6}$/,
                        'Please double-check your dental license number'
                    )
                ),
        }),
    },
    {
        id: '1',
        initialValues:
            dentist && dentist.documents
                ? {
                      [DENTIST_PHOTO_ID_FORM_ITEM_NAME]:
                          dentist.documents.dentistPhotoId,
                      [WARRANTY_FORM_ITEM_NAME]: dentist.documents.warranty,
                      [STATE_DENTAL_LICENSE_FORM_ITEM_NAME]:
                          dentist.documents.stateDentalLicense,
                      [DEA_FORM_ITEM_NAME]:
                          dentist.documents.dea && dentist.documents.dea.length
                              ? dentist.documents.dea
                              : null,
                  }
                : {},
        validationSchema: Yup.object().shape({
            [DENTIST_PHOTO_ID_FORM_ITEM_NAME]: Yup.array().required(
                "You must provide a photo of your driver's license"
            ),
            [STATE_DENTAL_LICENSE_FORM_ITEM_NAME]: Yup.array().required(
                'You must provide a photo of your dental license'
            ),
            [WARRANTY_FORM_ITEM_NAME]: Yup.array().required(
                'You must provide a proof of your malpractice insurance'
            ),
            [DEA_FORM_ITEM_NAME]: Yup.array()
                .nullable()
                .notRequired(),
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
    async fetchUserDocuments(userId) {
        const docs = await this.props.client.query({
            query: queryPatientDocumentQuery,
            variables: {
                input: {
                    partitionKey: 'patientId',
                    partitionValue: userId,
                },
            },
            fetchPolicy: 'network-only',
        });

        if (docs.data.queryPatientDocument)
            return docs.data.queryPatientDocument[0];
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
                {({ requestDentistVerification }) => (
                    <Box>
                        {!this.props.withoutProgressBar &&
                            startStep !== progressSteps.length && (
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
                                <Flex
                                    width="100%"
                                    flexDirection="column"
                                    position="relative"
                                >
                                    {props.actions.canGoBack && (
                                        <Onboarding.PreviousButton
                                            goToPreviousStep={
                                                props.actions.goToPreviousStep
                                            }
                                        />
                                    )}
                                    {render({
                                        ...props,
                                        client: this.props.client,
                                    })}
                                </Flex>
                            )}
                            onSubmit={async objectOfObjectOfStepValues => {
                                const objectOfValues = Object.values(
                                    objectOfObjectOfStepValues
                                ).reduce((objectOfValues, currentObject) => ({
                                    ...objectOfValues,
                                    ...currentObject,
                                }));

                                let user = cookies.get('user');
                                if (user) {
                                    user = JSON.parse(user);
                                }

                                const {
                                    ssn,
                                    deaNum,
                                    npiNum,
                                    license,
                                    dentistPhotoId,
                                    warranty,
                                    stateDentalLicense,
                                    dea,
                                } = objectOfValues;

                                await execute({
                                    action: async () => {
                                        await requestDentistVerification({
                                            variables: {
                                                input: {
                                                    dentistId: user.dentistId,
                                                    deaRegistrationNumber: _isEmpty(
                                                        deaNum
                                                    )
                                                        ? null
                                                        : deaNum.toUpperCase(),
                                                    npiNumber: npiNum,
                                                    ssnOrEinOrTin: ssn,
                                                    licenseNumber: license,
                                                },
                                            },
                                        });

                                        let existingDocs = await this.fetchUserDocuments(
                                            user.id
                                        );

                                        if (!existingDocs) {
                                            existingDocs = await this.props.createPatientDocument(
                                                { patientId: user.id }
                                            );
                                            existingDocs =
                                                existingDocs.data
                                                    .createPatientDocument;
                                        }

                                        const new_docs = {
                                            [DENTIST_PHOTO_ID_FORM_ITEM_NAME]: dentistPhotoId,
                                            [WARRANTY_FORM_ITEM_NAME]: warranty,
                                            [STATE_DENTAL_LICENSE_FORM_ITEM_NAME]: stateDentalLicense,
                                            [DEA_FORM_ITEM_NAME]: dea || [{}],
                                        };

                                        // find the diff between persisted documents and new ones
                                        const diffDocs = {};

                                        Object.keys(new_docs).forEach(
                                            docType => {
                                                const _doc = new_docs[docType];

                                                if (
                                                    !existingDocs[docType] ||
                                                    !existingDocs[docType]
                                                        .length
                                                ) {
                                                    if (
                                                        _doc.length &&
                                                        _doc[0].url
                                                    ) {
                                                        // it is a new document
                                                        diffDocs[
                                                            docType
                                                        ] = _doc;
                                                    }
                                                } else if (
                                                    _doc.length &&
                                                    _doc[0].url &&
                                                    _doc[0].url !==
                                                        existingDocs[docType][0]
                                                            .url
                                                ) {
                                                    // the document has changed
                                                    diffDocs[docType] = _doc;
                                                } else if (
                                                    !_doc.length ||
                                                    !_doc[0].url
                                                ) {
                                                    // document was deleted
                                                    diffDocs[docType] = [];
                                                }

                                                // force side only in this case
                                                if (
                                                    docType ===
                                                        DENTIST_PHOTO_ID_FORM_ITEM_NAME &&
                                                    diffDocs[docType]
                                                )
                                                    diffDocs[docType][0].side =
                                                        'front';
                                            }
                                        );

                                        // save only new documents
                                        const uploadResults = Object.keys(
                                            diffDocs
                                        ).map(async docType => {
                                            await this.props.saveUploadedImages(
                                                {
                                                    id: existingDocs.id,
                                                    documentType: docType,
                                                    documentList:
                                                        diffDocs[docType],
                                                }
                                            );
                                        });

                                        await Promise.all(uploadResults);
                                    },
                                    afterAction: () => {
                                        // this will trigger a render of a confirmation panel in dentist dashboard
                                        if (this.props.fromDentistDashboard) {
                                            this.props.onFinish();
                                        } else {
                                            const {
                                                redirectTo,
                                            } = this.props.router.query;

                                            this.props.router.push(
                                                redirectTo || '/'
                                            );
                                        }
                                    },
                                });
                            }}
                            steps={steps(this.props.dentist)}
                        />
                    </Box>
                )}
            </Composed>
        );
    }
}

const Verification = compose(
    withRouter,
    withApollo,
    createPatientDocumentMutation,
    saveUploadedImagesMutation
)(RenderDentistOnboarding);

export default () => {
    const { isAuth, mounted } = useContext(AppContext);

    useEffect(() => {
        const redirectToHome = () => {
            if (!isAuth) {
                window.location.href = '/';
            }
        };

        redirectToHome();
    }, [isAuth]);

    if (!mounted) return null;

    return <Verification />;
};
