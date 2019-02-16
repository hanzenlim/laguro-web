import React from 'react';
import {
    HealthHistoryForm,
    Progress,
} from '@laguro/the-bright-side-components';
import { Box } from '@laguro/basic-components';
import { adopt } from 'react-adopt';
import { UPDATE_PATIENT_HEALTH_DATA, ACTIVE_USER } from './queries';
import { Query, Mutation } from 'react-apollo';
import cookies from 'browser-cookies';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import {
    redirectWithSearchParams,
    getSearchParamValueByKey,
    attemptToRedirectBack,
    redirect,
} from '../../history';
import { PATIENT_ONBOARDING_INSURANCE_FORM } from '../../util/urls';
import { getProgressBarProps } from '../../components/utils';

const progressSteps = [
    'REGISTRATION',
    'BOOK AN APPOINTMENT',
    'MEDICAL HISTORY FORM',
    'INSURANCE',
];

const currentStep = progressSteps[2];

const Composed = adopt({
    activeUser: ({ render }) => {
        return <Query query={ACTIVE_USER}>{render}</Query>;
    },
    updatePatientHealthData: ({ render }) => {
        return (
            <Mutation mutation={UPDATE_PATIENT_HEALTH_DATA}>{render}</Mutation>
        );
    },
});

const KioskMedicalHistoryFormPage = props => {
    const handleSkip = () => {
        redirectWithSearchParams(PATIENT_ONBOARDING_INSURANCE_FORM);
    };

    const startStep =
        getSearchParamValueByKey('referer') === 'BookAppointment'
            ? progressSteps.indexOf(currentStep) + 1
            : 1;

    return (
        <Composed>
            {({ updatePatientHealthData, activeUser }) => {
                return (
                    <Box position="relative">
                        {/* TODO: Move progress to a parent component */}
                        <Progress
                            {...getProgressBarProps({
                                startStep,
                                currentStep,
                                progressSteps,
                            })}
                        />
                        <HealthHistoryForm
                            canSkip={_isEmpty(
                                _get(
                                    activeUser,
                                    'data.activeUser.insuranceInfo'
                                )
                            )}
                            onFinishForm={async values => {
                                const valuesKeys = Object.keys(values);

                                const newArray = [];
                                valuesKeys.forEach(valueKey => {
                                    const innerKeys = Object.keys(
                                        values[valueKey]
                                    );

                                    innerKeys.forEach(innerKey => {
                                        newArray.push({
                                            key: innerKey,
                                            value: values[valueKey][innerKey],
                                        });
                                    });
                                });

                                const user = JSON.parse(cookies.get('user'));

                                const result = await updatePatientHealthData({
                                    variables: {
                                        input: {
                                            patientId: user.id,
                                            patientHealthData: {
                                                items: newArray,
                                            },
                                        },
                                    },
                                });

                                const data = _get(
                                    result,
                                    'data.updatePatientHealthData'
                                );

                                const hasGoneThroughInsurancePage = _get(
                                    data,
                                    'insuranceInfo'
                                );

                                if (hasGoneThroughInsurancePage) {
                                    if (!attemptToRedirectBack()) {
                                        props.history.push(
                                            `/kiosk/medical-history-form-confirmation`
                                        );
                                    }
                                } else {
                                    redirect({
                                        url: PATIENT_ONBOARDING_INSURANCE_FORM,
                                        newSearchParamKey: 'referer',
                                        newSearchParamValue:
                                            'KioskMedicalHistoryFormPage',
                                    });
                                }
                            }}
                            onSkip={handleSkip}
                        />
                    </Box>
                );
            }}
        </Composed>
    );
};

export default KioskMedicalHistoryFormPage;
