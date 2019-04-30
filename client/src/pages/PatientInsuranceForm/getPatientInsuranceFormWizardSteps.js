/* eslint-disable camelcase */
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { KioskInsurance } from '@laguro/the-bright-side-components';

import { execute } from '../../util/gqlUtils';
import { insuranceClient } from '../../util/apolloClients';
import { CHECK_ELIGIBILITY } from './queries';

// contains renderRegistrationStage which renders correct step within Registation stage of kiosk flow
// contains getStageOneRegWizardSteps which return an array of step information objects, which contain step id(id), validations(validationSchema), and initialValues, given a user object. This user object is from getUser in Kiosk/index.js.

export const INSURANCE_WIZARD_STEP_ID = 'insurance-step';
export const PATIENT_INSURANCE_FORM_LAST_WIZARD_STEP_ID = 'last';

// depending on user, some steps will be optional
// onAction will return true if there is an error, return false if there isn't
// add backend calls here. add redirects in index.js
// eslint-disable-next-line
export const getPatientInsuranceFormWizardSteps = ({ user, mutations }) => [
    {
        id: INSURANCE_WIZARD_STEP_ID,
        initialValues: {
            patientInsuranceNum:
                _get(user, 'insuranceInfo.policyHolderId') || undefined,
            insuranceProvider:
                _get(user, 'insuranceInfo.insuranceProvider') || undefined,
            insuranceProviderId: _get(
                user,
                'insuranceInfo.insuranceProviderId' || undefined
            ),
            planOrGroupNumber:
                _get(user, 'insuranceInfo.planOrGroupNumber') || undefined,
            hasNoInsurance: 'false',
        },
        validationSchema: Yup.object().shape({
            hasNoInsurance: Yup.string(),
            insuranceProvider: Yup.string().when('hasNoInsurance', {
                is: 'false',
                then: Yup.string().required('Insurance is required'),
            }),
            patientInsuranceNum: Yup.string().when('hasNoInsurance', {
                is: 'false',
                then: Yup.string().required('Insurance number is required'),
            }),
        }),
        onAction: async (stepValues, allValues, formikProps) => {
            // combinedObject is an object of all values
            const combinedObject = Object.values(allValues).reduce(
                (aggObject, currentObject) => ({
                    ...aggObject,
                    ...currentObject,
                })
            );
            const updateInsuranceInfoMutation = _get(
                mutations,
                'updateInsuranceInfoMutation'
            );
            const userId = _get(user, 'id');

            const {
                insuranceProvider,
                insuranceProviderId,
                planOrGroupNumber,
                patientInsuranceNum,
            } = combinedObject;

            const hasNoInsurance = JSON.parse(
                _get(combinedObject, `${KioskInsurance.HAS_NO_INSURANCE}`)
            );

            const formattedValues = {
                userId,
                insuranceInfo: {
                    useInsurance: !hasNoInsurance,
                    ...(!hasNoInsurance &&
                        !_isEmpty(insuranceProvider) && {
                            insuranceProvider,
                        }),
                    ...(!hasNoInsurance &&
                        !_isEmpty(insuranceProviderId) && {
                            insuranceProviderId,
                        }),
                    ...(!hasNoInsurance &&
                        !_isEmpty(patientInsuranceNum) && {
                            policyHolderId: patientInsuranceNum,
                        }),
                    ...(!hasNoInsurance &&
                        !_isEmpty(planOrGroupNumber) && {
                            planOrGroupNumber,
                        }),
                },
            };

            formikProps.setSubmitting(true);
            const updateInsuranceHasNoError = await execute({
                reportGqlErrorOnly: true,
                beforeAction: async () => {
                    const { firstName, lastName, dob } = user;

                    const eligibility = await insuranceClient.query({
                        query: CHECK_ELIGIBILITY,
                        variables: {
                            input: {
                                patientId: user.id,
                                firstName,
                                lastName,
                                dob,
                                insuranceInfo: {
                                    insuranceProvider,
                                    insuranceProviderId,
                                    policyHolderId: patientInsuranceNum,
                                },
                            },
                        },
                        fetchPolicy: 'network-only',
                    });

                    const isEligible = _get(
                        eligibility,
                        'data.checkEligibility.isEligible',
                        false
                    );

                    if (!isEligible) {
                        const errorMessage =
                            'Your insurance information has expired. Please contact your insurance provider to resolve this issue';

                        throw new Error({ clientErrorMessage: errorMessage });
                    }
                },
                action: async () => {
                    await updateInsuranceInfoMutation({
                        variables: {
                            input: formattedValues,
                        },
                    });
                },
            });

            formikProps.setSubmitting(false);
            return !updateInsuranceHasNoError;
        },
    },
    // step to help with redirect
    {
        id: PATIENT_INSURANCE_FORM_LAST_WIZARD_STEP_ID,
    },
];

// given current stepID and skipIDS(ids that are going to be skipped), return next stepID
export const getNextWizardStepID = ({ currentStepID, skipIDs }) => {
    // list of stepID
    const stepIDs = getPatientInsuranceFormWizardSteps({}).map(step =>
        _get(step, 'id')
    );

    const filteredStepIDs = stepIDs.filter(stepID => !skipIDs.includes(stepID));

    // get stepID that comes directly after current stepID
    return filteredStepIDs[filteredStepIDs.indexOf(currentStepID) + 1];
};
