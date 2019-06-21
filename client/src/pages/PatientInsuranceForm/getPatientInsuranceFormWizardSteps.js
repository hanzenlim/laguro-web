/* eslint-disable camelcase */
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import { execute } from '../../util/gqlUtils';
import { insuranceClient } from '../../util/apolloClients';
import { CHECK_ELIGIBILITY } from './queries';
import { KioskInsurance } from '../common/the-bright-side-components/components/Kiosk/KioskInsurance';

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
            isPrimaryHolder: !_get(user, 'insuranceInfo')
                ? undefined
                : _get(user, 'insuranceInfo.policyHolderUserId')
                ? 'yes'
                : 'no',
            policyHolderUser: !_get(user, 'insuranceInfo.policyHolderUserId')
                ? {
                      firstName:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.firstName'
                          ) || undefined,
                      lastName:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.lastName'
                          ) || undefined,
                      gender: !_get(
                          user,
                          'insuranceInfo.policyHolderUser.gender'
                      )
                          ? 'unknown'
                          : _get(user, 'insuranceInfo.policyHolderUser.gender'),
                      birthMonth:
                          _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.dob'
                          ).split('/')[0],
                      birthDate:
                          _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.dob'
                          ).split('/')[1],
                      birthYear:
                          _get(user, 'insuranceInfo.policyHolderUser.dob') &&
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.dob'
                          ).split('/')[2],
                      address1:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.address.streetAddress'
                          ) || undefined,
                      address2:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.address.addressDetails'
                          ) || undefined,
                      city:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.address.city'
                          ) || undefined,
                      state:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.address.state'
                          ) || undefined,
                      zipCode:
                          _get(
                              user,
                              'insuranceInfo.policyHolderUser.address.zipCode'
                          ) || undefined,
                  }
                : {
                      firstName: undefined,
                      lastName: undefined,
                      gender: undefined,
                      birthMonth: undefined,
                      birthDate: undefined,
                      birthYear: undefined,
                      address1: undefined,
                      address2: undefined,
                      city: undefined,
                      state: undefined,
                      zipCode: undefined,
                  },
        },
        validationSchema: Yup.object().shape({
            policyHolderUser: Yup.object().when(
                ['hasNoInsurance', 'isPrimaryHolder'],
                {
                    is: (hasNoInsurance, isPrimaryHolder) =>
                        hasNoInsurance === 'false' && isPrimaryHolder === 'no',
                    then: Yup.object().shape({
                        firstName: Yup.string().required(
                            'Please fill out this field.'
                        ),
                        lastName: Yup.string().required(
                            'Please fill out this field.'
                        ),
                        gender: Yup.string()
                            .required('Gender is required')
                            .nullable(),
                        birthMonth: Yup.string().required('Month is required'),
                        birthDate: Yup.string().required('Date is required'),
                        birthYear: Yup.string().required('Year is required'),
                        address1: Yup.string().required(
                            'Street address is required'
                        ),
                        city: Yup.string().required('City is required'),
                        state: Yup.string().required('State is required'),
                        zipCode: Yup.string().required(
                            'Postal code is required'
                        ),
                    }),
                }
            ),
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
                isPrimaryHolder,
                policyHolderUser,
            } = combinedObject;

            const hasNoInsurance = JSON.parse(
                _get(combinedObject, `${KioskInsurance.HAS_NO_INSURANCE}`)
            );

            const formattedValues = {
                userId,
                insuranceInfo: !hasNoInsurance
                    ? {
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
                                        dob: `${policyHolderUser.birthMonth}/${
                                            policyHolderUser.birthDate
                                        }/${policyHolderUser.birthYear}`,
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
                      }
                    : null,
            };

            formikProps.setSubmitting(true);
            const updateInsuranceHasNoError = await execute({
                reportGqlErrorOnly: true,
                beforeAction: async () => {
                    const isDependent = isPrimaryHolder === 'no';

                    const checkEligibilityWithoutDependentInput = {
                        patientId: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dob: user.dob,
                        insuranceInfo: {
                            insuranceProvider,
                            insuranceProviderId,
                            policyHolderId: patientInsuranceNum,
                        },
                    };

                    const checkEligibilityWithDependentInput = {
                        patientId: user.id,
                        firstName: policyHolderUser.firstName,
                        lastName: policyHolderUser.lastName,
                        dob: `${policyHolderUser.birthMonth}/${
                            policyHolderUser.birthDate
                        }/${policyHolderUser.birthYear}`,
                        insuranceInfo: {
                            insuranceProvider,
                            insuranceProviderId,
                            policyHolderId: patientInsuranceNum,
                        },
                        dependentFirstName: user.firstName,
                        dependentLastName: user.lastName,
                        dependentDob: user.dob,
                    };

                    const eligibility = !hasNoInsurance
                        ? await insuranceClient.query({
                              query: CHECK_ELIGIBILITY,
                              variables: {
                                  input: isDependent
                                      ? checkEligibilityWithDependentInput
                                      : checkEligibilityWithoutDependentInput,
                              },
                              fetchPolicy: 'network-only',
                          })
                        : null;

                    const isEligible = _get(
                        eligibility,
                        'data.checkEligibility.isEligible',
                        false
                    );

                    if (!isEligible && !hasNoInsurance) {
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
