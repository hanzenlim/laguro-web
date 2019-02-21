import React from 'react';
import * as Yup from 'yup';
import _get from 'lodash/get';
import {
    Wizard,
    Progress,
    Insurance,
    Address,
    Gender,
    Birthday,
    PreviousButton,
} from '@laguro/the-bright-side-components';
import { Box, Flex, Loading } from '@laguro/basic-components';
import _isEmpty from 'lodash/isEmpty';
import {
    getIdQueryClient,
    updateInsuranceInfoMutation,
    getUser,
} from './queries';
import { Query, Mutation } from 'react-apollo';
import { RedirectErrorPage } from '../GeneralErrorPage';
import { adopt } from 'react-adopt';
import {
    attemptToRedirectBack,
    getRedirectUrl,
    getSearchParamValueByKey,
} from '../../history';
import { getProgressBarProps } from '../../components/utils';
import cookies from 'browser-cookies';

const progressSteps = [
    'REGISTRATION',
    'BOOK AN APPOINTMENT',
    'MEDICAL HISTORY FORM',
    'INSURANCE',
];

const currentStep = progressSteps[3];

const Composed = adopt({
    getIdQueryClient: ({ render }) => (
        <Query query={getIdQueryClient}>{render}</Query>
    ),
    updateInsuranceInfoMutation: ({ render }) => (
        <Mutation mutation={updateInsuranceInfoMutation}>{render}</Mutation>
    ),
});

const Step0 = props => (
    <Composed>
        {({ getIdQueryClient, updateInsuranceInfoMutation }) => (
            <Insurance
                {...props}
                onSkip={() => {
                    const userId = _get(getIdQueryClient, 'data.activeUser.id');

                    updateInsuranceInfoMutation({
                        variables: {
                            input: {
                                userId,
                                insuranceInfo: {
                                    useInsurance: false,
                                },
                            },
                        },
                    });

                    if (!attemptToRedirectBack()) {
                        props.history.push(`/kiosk/confirmation/${userId}`);
                    }
                }}
            />
        )}
    </Composed>
);

const Step1 = props => <Address {...props} />;
const Step2 = props => <Birthday {...props} />;
const Step3 = props => <Gender {...props} />;

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case '0':
            step = Step0(props);
            break;
        case '1':
            step = Step1(props);
            break;
        case '2':
            step = Step2(props);
            break;
        case '3':
            step = Step3(props);
            break;
        default:
            step = Step1(props);
    }

    return (
        <Flex justifyContent="center" pt="100px">
            {step}
        </Flex>
    );
};

const KioskInsurancePage = componentProps => {
    let user = cookies.get('user');
    if (user) {
        user = JSON.parse(user);
    }

    return (
        <Query
            query={getUser}
            variables={{ id: user.id }}
            fetchPolicy="network-only"
        >
            {({
                loading: loadingUserQueryClient,
                error: errorUserQueryClient,
                data: dataIdQueryClient,
            }) => {
                if (loadingUserQueryClient) {
                    return <Loading />;
                }

                if (errorUserQueryClient) {
                    return <RedirectErrorPage />;
                }

                const userId = _get(dataIdQueryClient, 'getUser.id');
                const user = _get(dataIdQueryClient, 'getUser');

                const steps = [
                    {
                        id: '0',
                        initialValues: {
                            patientInsuranceNum: _get(
                                user,
                                'insuranceInfo.policyHolderId'
                            ),
                            insuranceProvider: _get(
                                user,
                                'insuranceInfo.insuranceProvider'
                            ),
                            insuranceProviderId: _get(
                                user,
                                'insuranceInfo.insuranceProviderId'
                            ),
                            planOrGroupNumber: _get(
                                user,
                                'insuranceInfo.planOrGroupNumber'
                            ),
                        },
                        validationSchema: Yup.object().shape({
                            insuranceProvider: Yup.string().required(
                                'Insurance is required'
                            ),
                            patientInsuranceNum: Yup.string().required(
                                'Insurance number is required'
                            ),
                        }),
                    },
                    {
                        id: '1',
                        initialValues: {
                            patientAddress1: _get(
                                user,
                                'address.streetAddress'
                            ),
                            patientAddress2: _get(
                                user,
                                'address.addressDetails'
                            ),
                            patientCity: _get(user, 'address.city'),
                            patientState: _get(user, 'address.state'),
                            patientZIP: _get(user, 'address.zipCode'),
                        },
                        validationSchema: Yup.object().shape({
                            patientAddress1: Yup.string().required(
                                'Street address is required'
                            ),
                            patientCity: Yup.string().required(
                                'City is required'
                            ),
                            patientState: Yup.string().required(
                                'State is required'
                            ),
                            patientZIP: Yup.string().required(
                                'Postal code is required'
                            ),
                        }),
                    },
                    {
                        id: '2',
                        initialValues: {
                            patientBirthMonth:
                                (user && user.dob && user.dob.split('/')[0]) ||
                                '',
                            patientBirthDate:
                                (user && user.dob && user.dob.split('/')[1]) ||
                                '',
                            patientBirthYear:
                                (user && user.dob && user.dob.split('/')[2]) ||
                                '',
                        },
                        validationSchema: Yup.object().shape({
                            patientBirthMonth: Yup.string().required(
                                'Month is required'
                            ),
                            patientBirthDate: Yup.string().required(
                                'Date is required'
                            ),
                            patientBirthYear: Yup.string().required(
                                'Year is required'
                            ),
                        }),
                    },
                    {
                        id: '3',
                        initialValues: {
                            patientGender: _get(user, 'gender'),
                        },
                        validationSchema: Yup.object().shape({
                            patientGender: Yup.string().required(
                                'Gender is required'
                            ),
                        }),
                    },
                ];

                return (
                    <Mutation mutation={updateInsuranceInfoMutation}>
                        {updateInsuranceInfo => {
                            const handleSubmit = values => {
                                const combinedObject = Object.values(
                                    values
                                ).reduce((combinedObject, currentObject) => ({
                                    ...combinedObject,
                                    ...currentObject,
                                }));

                                const {
                                    patientAddress1,
                                    patientAddress2,
                                    patientBirthDate,
                                    patientBirthMonth,
                                    patientBirthYear,
                                    patientCity,
                                    patientGender,
                                    patientInsuranceNum,
                                    patientState,
                                    patientZIP,
                                    insuranceProvider,
                                    insuranceProviderId,
                                    planOrGroupNumber,
                                } = combinedObject;
                                const formattedValues = {
                                    userId,
                                    address: {
                                        streetAddress: patientAddress1,
                                        addressDetails: patientAddress2,
                                        city: patientCity,
                                        zipCode: patientZIP,
                                        state: patientState,
                                    },
                                    dob: `${patientBirthMonth}/${patientBirthDate}/${patientBirthYear}`,
                                    gender: patientGender,
                                    insuranceInfo: {
                                        useInsurance: true,
                                        insuranceProvider,
                                        insuranceProviderId,
                                        policyHolderId: patientInsuranceNum,
                                        ...(!_isEmpty(planOrGroupNumber) && {
                                            planOrGroupNumber,
                                        }),
                                    },
                                };

                                updateInsuranceInfo({
                                    variables: {
                                        input: formattedValues,
                                    },
                                });

                                if (!attemptToRedirectBack()) {
                                    componentProps.history.push(
                                        `/kiosk/confirmation/${userId}`
                                    );
                                }
                            };

                            let startStep;
                            if (
                                getSearchParamValueByKey('referer') ===
                                    'BookAppointment' ||
                                getSearchParamValueByKey('referer') ===
                                    'ProfilePage'
                            ) {
                                startStep =
                                    progressSteps.indexOf(currentStep) + 1;
                            } else if (
                                getSearchParamValueByKey('referer') ===
                                    'KioskMedicalHistoryFormPage' &&
                                !_isEmpty(getRedirectUrl())
                            ) {
                                startStep = 3;
                            }

                            return (
                                <Box position="relative">
                                    {/* TODO: Move progress to a parent component */}
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
                                        onSubmit={values =>
                                            handleSubmit(values)
                                        }
                                        Form="form"
                                        render={props => (
                                            <React.Fragment>
                                                {props.actions.canGoBack && (
                                                    <PreviousButton
                                                        goToPreviousStep={
                                                            props.actions
                                                                .goToPreviousStep
                                                        }
                                                    />
                                                )}
                                                {render({
                                                    ...props,
                                                    ...componentProps,
                                                })}
                                            </React.Fragment>
                                        )}
                                        steps={steps}
                                    />
                                </Box>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

export default KioskInsurancePage;
