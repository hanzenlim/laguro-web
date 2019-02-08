import React, { Fragment } from 'react';
import * as Yup from 'yup';
import _get from 'lodash/get';
import {
    Wizard,
    Progress,
    Insurance,
    Address,
    Gender,
    Birthday,
} from '@laguro/the-bright-side-components';
import { Flex } from '@laguro/basic-components';
import { getIdQueryClient, updateInsuranceInfoMutation } from './queries';
import { Query, Mutation } from 'react-apollo';
import { Loading } from '../../components/';
import { RedirectErrorPage } from '../GeneralErrorPage';

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
                    updateInsuranceInfoMutation({
                        variables: {
                            input: {
                                userId: _get(
                                    getIdQueryClient,
                                    'data.activeUser.id'
                                ),
                                insuranceInfo: {
                                    useInsurance: false,
                                },
                            },
                        },
                    });
                    props.history.push(`/kiosk/confirmation`);
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
                                        planOrGroupNumber:
                                            'putPlanOrGroupNumberHere',
                                    },
                                };

                                updateInsuranceInfo({
                                    variables: {
                                        input: formattedValues,
                                    },
                                });
                            };
                            return (
                                <Fragment>
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
                                        render={props =>
                                            render({
                                                ...props,
                                                ...componentProps,
                                            })
                                        }
                                        steps={steps}
                                    />
                                </Fragment>
                            );
                        }}
                    </Mutation>
                );
            }}
        </Query>
    );
};

export default KioskInsurancePage;
