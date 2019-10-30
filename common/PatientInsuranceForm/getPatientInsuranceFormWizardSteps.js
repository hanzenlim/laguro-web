/* eslint-disable camelcase */
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { execute } from '~/util/gqlUtils';
import {
    KioskInsurance,
    getKioskInsuranceInitialValues,
} from '~/common/the-bright-side-components/components/Kiosk/KioskInsurance';
import { policyHolderUserValidationSchema } from '~/common/Family/FamilyMemberInsuranceForm/validators';

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
        initialValues: getKioskInsuranceInitialValues(user),
        validationSchema: Yup.object().shape({
            policyHolderUser: Yup.object().when(
                ['hasNoInsurance', 'isPrimaryHolder'],
                {
                    is: (hasNoInsurance, isPrimaryHolder) =>
                        hasNoInsurance === 'false' && isPrimaryHolder === 'no',
                    then: policyHolderUserValidationSchema,
                }
            ),
            hasNoInsurance: Yup.string(),
            insuranceProvider: Yup.string().when('hasNoInsurance', {
                is: 'false',
                then: Yup.string().required('Insurance is required'),
            }),
            patientInsuranceNum: Yup.string().when('hasNoInsurance', {
                is: 'false',
                then: Yup.string().required('Subscriber ID is required'),
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
                issueDate,
                insuranceProvider,
                insuranceProviderId,
                planOrGroupNumber,
                patientInsuranceNum,
                isPrimaryHolder,
                policyHolderUser,
            } = combinedObject;

            const hasNoInsurance = JSON.parse(
                _get(combinedObject, `${KioskInsurance.HAS_NO_INSURANCE}`)
            );

            const formattedValues = {
                userId,
                insuranceInfo: hasNoInsurance
                    ? null
                    : {
                         ...(!_isEmpty(issueDate) && {
                              issueDate,
                          }),
                          ...(!_isEmpty(insuranceProvider) && {
                              insuranceProvider,
                          }),
                          ...(!_isEmpty(insuranceProviderId) && {
                              insuranceProviderId,
                          }),
                          ...(!_isEmpty(patientInsuranceNum) && {
                              policyHolderId: patientInsuranceNum,
                          }),
                          ...(!_isEmpty(planOrGroupNumber) && {
                              planOrGroupNumber,
                          }),
                          policyHolderUser:
                              isPrimaryHolder === 'yes'
                                  ? null
                                  : {
                                        firstName: policyHolderUser.firstName,
                                        lastName: policyHolderUser.lastName,
                                        dob: `${policyHolderUser.birthMonth}/${policyHolderUser.birthDate}/${policyHolderUser.birthYear}`,
                                        gender:
                                            policyHolderUser.gender ===
                                            'unknown'
                                                ? null
                                                : policyHolderUser.gender,
                                        address: {
                                            streetAddress:
                                                policyHolderUser.address1,
                                            addressDetails:
                                                policyHolderUser.address2 ||
                                                null,
                                            city: policyHolderUser.city,
                                            zipCode: policyHolderUser.zipCode,
                                            state: policyHolderUser.state,
                                        },
                                    },
                      },
            };

            formikProps.setSubmitting(true);
            const updateInsuranceHasNoError = await execute({
                reportGqlErrorOnly: true,
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
