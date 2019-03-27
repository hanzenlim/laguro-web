import React from 'react';
import * as Yup from 'yup';
import _get from 'lodash/get';
import { Insurance } from '@laguro/the-bright-side-components';
import { Flex } from '../../components/index';

export const INSURANCE_WIZARD_STEP_ID = 'insurance';

// depending on user, some steps will be optional
export const getStepThreeInsuranceWizardSteps = user => [
    {
        id: '0',
        initialValues: {
            patientInsuranceNum:
                _get(user, 'insuranceInfo.policyHolderId') || '',
            insuranceProvider: _get(user, 'insuranceInfo.insuranceProvider'),
            insuranceProviderId: _get(
                user,
                'insuranceInfo.insuranceProviderId'
            ),
            planOrGroupNumber: _get(user, 'insuranceInfo.planOrGroupNumber'),
        },
        validationSchema: Yup.object().shape({
            insuranceProvider: Yup.string().required('Insurance is required'),
            patientInsuranceNum: Yup.string().required(
                'Insurance number is required'
            ),
        }),
    },
];

export const renderGeneralInformationStep = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case INSURANCE_WIZARD_STEP_ID:
            step = <Insurance {...props} />;
            break;

        default:
            step = null;
    }

    return (
        <Flex justifyContent="center" pt="100px">
            {step}
        </Flex>
    );
};
