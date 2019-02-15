import React, { Fragment } from 'react';
import {
    HealthHistoryForm,
    Progress,
} from '@laguro/the-bright-side-components';
import { adopt } from 'react-adopt';
import { UPDATE_PATIENT_HEALTH_DATA, ACTIVE_USER } from './queries';
import { Query, Mutation } from 'react-apollo';
import cookies from 'browser-cookies';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { redirectWithSearchParams } from '../../history';
import { PATIENT_ONBOARDING_INSURANCE_FORM } from '../../util/urls';

const progressSteps = [
    '1 REGISTRATION',
    '2 BOOK AN APPOINTMENT',
    '3 MEDICAL HISTORY FORM',
    '4 INSURANCE',
];

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

    return (
        <Composed>
            {({ updatePatientHealthData, activeUser }) => {
                return (
                    <Fragment>
                        {/* TODO: Move progress to a parent component */}
                        <Progress
                            step={3}
                            steps={progressSteps}
                            percent={22.5}
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
                                    props.history.push(
                                        `/kiosk/medical-history-form-confirmation`
                                    );
                                } else {
                                    redirectWithSearchParams(
                                        PATIENT_ONBOARDING_INSURANCE_FORM
                                    );
                                }
                            }}
                            onSkip={handleSkip}
                        />
                    </Fragment>
                );
            }}
        </Composed>
    );
};

export default KioskMedicalHistoryFormPage;
