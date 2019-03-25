import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from '@laguro/the-bright-side-components';
import { Box } from '@laguro/basic-components';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import cookies from 'browser-cookies';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import {
    getSearchParamValueByKey,
    attemptToRedirectBack,
    redirect,
} from '../../history';
import { PATIENT_ONBOARDING_INSURANCE_FORM } from '../../util/urls';
import { getProgressBarProps } from '../../components/utils';
import HealthHistoryForm from './view';
import {
    UPDATE_PATIENT_HEALTH_DATA,
    GET_PATIENT_HEALTH_DATA_UNSTRUCTURED,
} from './queries';
import { hasSkippedMedicalHistoryFormCookieVariableName } from '../../util/strings';
import { execute } from '../../util/gqlUtils';
import { getUser } from '../../util/authUtils';

const progressSteps = [
    'REGISTRATION',
    'BOOK AN APPOINTMENT',
    'MEDICAL HISTORY FORM',
    'INSURANCE',
];

const currentStep = progressSteps[2];

const Composed = adopt({
    updatePatientHealthData: ({ render }) => (
        <Mutation mutation={UPDATE_PATIENT_HEALTH_DATA}>{render}</Mutation>
    ),
    getPatientHealthDataUnstructured: ({ render, patientId }) => (
        <Query
            query={GET_PATIENT_HEALTH_DATA_UNSTRUCTURED}
            variables={{ patientId }}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
});

const KioskMedicalHistoryFormPage = props => {
    const handleSkip = () => {
        cookies.set(hasSkippedMedicalHistoryFormCookieVariableName, 'true', {
            expires: 0,
        });
        redirect({
            url: PATIENT_ONBOARDING_INSURANCE_FORM,
            newSearchParamKey: 'referer',
            newSearchParamValue: 'KioskMedicalHistoryFormPage',
        });
    };

    let startStep;
    if (
        getSearchParamValueByKey('referer') === 'BookAppointment' ||
        getSearchParamValueByKey('referer') === 'PersonaSelection' ||
        getSearchParamValueByKey('referer') === 'GetPatientName'
    ) {
        startStep = progressSteps.indexOf(currentStep) + 1;
    } else {
        startStep = 1;
    }

    const user = getUser();

    return (
        <Composed patientId={user.id}>
            {({
                updatePatientHealthData,
                getPatientHealthDataUnstructured,
            }) => {
                if (getPatientHealthDataUnstructured.loading) return <div />;

                const answers = _get(
                    getPatientHealthDataUnstructured,
                    'data.getPatientHealthDataUnstructured.groupedItems'
                );

                return (
                    <Box position="relative">
                        {/* TODO: Move progress to a parent component */}
                        {!props.withoutProgressBar && (
                            <Progress
                                {...getProgressBarProps({
                                    startStep,
                                    currentStep,
                                    progressSteps,
                                })}
                            />
                        )}
                        <HealthHistoryForm
                            answers={answers}
                            canSkip={
                                _isEmpty(_get(user, 'insuranceInfo')) &&
                                !props.cannotSkip
                            }
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

                                await execute({
                                    action: async () => {
                                        const result = await updatePatientHealthData(
                                            {
                                                variables: {
                                                    input: {
                                                        patientId: _get(
                                                            user,
                                                            'id'
                                                        ),
                                                        patientHealthData: {
                                                            items: newArray,
                                                        },
                                                    },
                                                },
                                            }
                                        );

                                        const data = _get(
                                            result,
                                            'data.updatePatientHealthData'
                                        );

                                        const hasGoneThroughInsurancePage = _get(
                                            data,
                                            'insuranceInfo'
                                        );

                                        if (props.fromPatientDashboard) {
                                            props.onFinish();
                                        } else if (
                                            hasGoneThroughInsurancePage
                                        ) {
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
                                    },
                                });
                            }}
                            onSkip={handleSkip}
                        />
                    </Box>
                );
            }}
        </Composed>
    );
};

KioskMedicalHistoryFormPage.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    staticContext: PropTypes.object,
};

export default KioskMedicalHistoryFormPage;
