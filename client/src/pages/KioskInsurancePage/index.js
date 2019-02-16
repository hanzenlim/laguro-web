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
import { getIdQueryClient, updateInsuranceInfoMutation } from './queries';
import { Query, Mutation } from 'react-apollo';
import { RedirectErrorPage } from '../GeneralErrorPage';
import { adopt } from 'react-adopt';
import { attemptToRedirectBack } from '../../history';

const progressSteps = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
    '3 MEDICAL HISTORY FORM',
    '4 INSURANCE',
];

const steps = [
    {
        id: '0',
        initialValues: {},
        validationSchema: Yup.object().shape({
            insuranceProvider: Yup.string().required('Insurance is required'),
            patientInsuranceNum: Yup.string().required(
                'Insurance number is required'
            ),
        }),
    },
    {
        id: '1',
        validationSchema: Yup.object().shape({
            patientAddress1: Yup.string().required(
                'Street address is required'
            ),
            patientCity: Yup.string().required('City is required'),
            patientState: Yup.string().required('State is required'),
            patientZIP: Yup.string().required('Postal code is required'),
        }),
        initialValues: {},
    },
    {
        id: '2',
        validationSchema: Yup.object().shape({
            patientBirthMonth: Yup.string().required('Month is required'),
            patientBirthDate: Yup.string().required('Date is required'),
            patientBirthYear: Yup.string().required('Year is required'),
        }),
        initialValues: {},
    },
    {
        id: '3',
        validationSchema: Yup.object().shape({
            patientGender: Yup.string().required('Gender is required'),
        }),
        initialValues: {},
    },
];

const Composed = adopt({
    getIdQueryClient: ({ render }) => {
        return <Query query={getIdQueryClient}>{render}</Query>;
    },
    updateInsuranceInfoMutation: ({ render }) => {
        return (
            <Mutation mutation={updateInsuranceInfoMutation}>{render}</Mutation>
        );
    },
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
        <Flex justifyContent="center" mt="100px">
            {step}
        </Flex>
    );
};

const KioskInsurancePage = componentProps => {
    return (
        <Query query={getIdQueryClient}>
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
                const userId = _get(dataIdQueryClient, 'activeUser.id');

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
                                    userId: userId,
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
                                            planOrGroupNumber: planOrGroupNumber,
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
                            return (
                                <Box position="relative">
                                    {/* TODO: Move progress to a parent component */}
                                    <Progress
                                        step={4}
                                        steps={progressSteps}
                                        percent={22.5}
                                    />
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
