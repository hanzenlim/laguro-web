/* eslint-disable camelcase */
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import { execute } from '../../util/gqlUtils';
import { insuranceClient } from '../../util/apolloClients';
import { CHECK_ELIGIBILITY } from './queries';
import { ENGLISH } from '../../util/strings';
import { KioskInsurance } from '../common/the-bright-side-components/components/Kiosk/KioskInsurance';
import { HealthHistoryForm } from '../common/the-bright-side-components/components/Onboarding/Patient/HealthHistoryForm';

// contains getPatientWebOnboardingPageWizardSteps which return an array of step information objects, which contain step id(id), validations(validationSchema), and initialValues, given a user object. This user object is from getUser in PatientWebOnboardingPage/index.js.

// in order
// stage 1 general information
export const BIRTHDAY_WIZARD_STEP_ID = 'birthday-step';
export const GENDER_WIZARD_STEP_ID = 'gender-step';
export const LANGUAGE_WIZARD_STEP_ID = 'language-step';
export const ADDRESS_WIZARD_STEP_ID = 'address-step';

export const GENERAL_INFO_STAGE_WIZARD_STEP_IDS = [
    BIRTHDAY_WIZARD_STEP_ID,
    GENDER_WIZARD_STEP_ID,
    LANGUAGE_WIZARD_STEP_ID,
    ADDRESS_WIZARD_STEP_ID,
];

// stage 3 insurance
export const INSURANCE_WIZARD_STEP_ID = 'insurance-step';

// stage 4 health history
export const LAST_DENTAL_EXAM_WIZARD_STEP_ID = 'LastDentalExam-step';
export const LAST_DENTAL_EXAM_PROCEDURE_WIZARD_STEP_ID =
    'LastDentalExamProcedure-step';
export const DoctorGeneralInformation_WIZARD_STEP_ID =
    'DoctorGeneralInformation-step';
export const GeneralHealth_WIZARD_STEP_ID = 'GeneralHealth-step';
export const GeneralMedicalInfo1_WIZARD_STEP_ID = 'GeneralMedicalInfo1-step';
export const GeneralMedicalInfo2_WIZARD_STEP_ID = 'GeneralMedicalInfo2-step';
export const WomenOnly_WIZARD_STEP_ID = 'WomenOnly-step';
export const GeneralDentalInfo1_WIZARD_STEP_ID = 'GeneralDentalInfo1-step';
export const GeneralDentalInfo2_WIZARD_STEP_ID = 'GeneralDentalInfo2-step';
export const DrugAllergies_WIZARD_STEP_ID = 'DrugAllergies-step';
export const UrgentHeartConditions_WIZARD_STEP_ID =
    'UrgentHeartConditions-step';
export const OtherHeartConditions_WIZARD_STEP_ID = 'OtherHeartConditions-step';
export const BloodDisorders_WIZARD_STEP_ID = 'BloodDisorders-step';
export const NutritionalDiseases_WIZARD_STEP_ID = 'NutritionalDiseases-step';
export const ImmuneAndCancer_WIZARD_STEP_ID = 'ImmuneAndCancer-step';
export const RespiratoryDisorders_WIZARD_STEP_ID = 'RespiratoryDisorders-step';
export const TerminalIllness_WIZARD_STEP_ID = 'TerminalIllness-step';
export const BrainDisorders_WIZARD_STEP_ID = 'BrainDisorders-step';
export const DrugsAndAlcohol1_WIZARD_STEP_ID = 'DrugsAndAlcohol1-step';
export const DrugsAndAlcohol2_WIZARD_STEP_ID = 'DrugsAndAlcohol2-step';

export const HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS = [
    LAST_DENTAL_EXAM_WIZARD_STEP_ID,
    LAST_DENTAL_EXAM_PROCEDURE_WIZARD_STEP_ID,
    DoctorGeneralInformation_WIZARD_STEP_ID,
    GeneralHealth_WIZARD_STEP_ID,
    GeneralMedicalInfo1_WIZARD_STEP_ID,
    GeneralMedicalInfo2_WIZARD_STEP_ID,
    WomenOnly_WIZARD_STEP_ID,
    GeneralDentalInfo1_WIZARD_STEP_ID,
    GeneralDentalInfo2_WIZARD_STEP_ID,
    DrugAllergies_WIZARD_STEP_ID,
    UrgentHeartConditions_WIZARD_STEP_ID,
    OtherHeartConditions_WIZARD_STEP_ID,
    BloodDisorders_WIZARD_STEP_ID,
    NutritionalDiseases_WIZARD_STEP_ID,
    ImmuneAndCancer_WIZARD_STEP_ID,
    RespiratoryDisorders_WIZARD_STEP_ID,
    TerminalIllness_WIZARD_STEP_ID,
    BrainDisorders_WIZARD_STEP_ID,
    DrugsAndAlcohol1_WIZARD_STEP_ID,
    DrugsAndAlcohol2_WIZARD_STEP_ID,
];

export const REDIRECT_WIZARD_STEP_ID = 'redirect-page';

const {
    BloodDisorders,
    BrainDisorders,
    DoctorGeneralInformation,
    DrugAllergies,
    DrugsAndAlcohol1,
    DrugsAndAlcohol2,
    GeneralDentalInfo1,
    GeneralDentalInfo2,
    GeneralHealth,
    GeneralMedicalInfo1,
    GeneralMedicalInfo2,
    ImmuneAndCancer,
    LastDentalExam,
    LastDentalExamProcedure,
    NutritionalDiseases,
    OtherHeartConditions,
    RespiratoryDisorders,
    TerminalIllness,
    UrgentHeartConditions,
    WomenOnly,
} = HealthHistoryForm;

const getAnswer = answer => {
    if (answer === 'true') {
        return true;
    } else if (answer === 'false') {
        return false;
    } else if (answer === null) {
        return '';
    }
    return answer;
};

const getInitialValues = (questions, answers = []) => {
    const initialValues = {};

    questions.forEach(q => {
        const answer = _find(answers, ['question', q.name]);
        if (answer) {
            initialValues[q.name] = getAnswer(answer.answer);
        } else {
            initialValues[q.name] = q.value;
        }
    });

    return initialValues;
};

// depending on user, some steps will be optional
// onAction will return true if there is an error, return false if there isn't
// add backend calls here. add redirects in index.js
// eslint-disable-next-line
export const getPatientWebOnboardingPageWizardSteps = ({
    user,
    mutations,
    healthHistoryAnswers,
}) => [
    // stage 1: general information
    {
        id: BIRTHDAY_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            patientBirthMonth: Yup.string().required('Month is required'),
            patientBirthDate: Yup.string().required('Date is required'),
            patientBirthYear: Yup.string().required('Year is required'),
        }),
        initialValues: {
            patientBirthMonth:
                (user && user.dob && user.dob.split('/')[0]) || '',
            patientBirthDate:
                (user && user.dob && user.dob.split('/')[1]) || '',
            patientBirthYear:
                (user && user.dob && user.dob.split('/')[2]) || '',
        },
    },
    {
        id: GENDER_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            patientGender: Yup.string().required('Gender is required'),
        }),
        initialValues: {
            patientGender: _get(user, 'gender') || '',
        },
    },
    {
        id: LANGUAGE_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            languages: Yup.array().required(
                'At least one language is required.'
            ),
        }),
        initialValues: {
            languages: _get(user, 'languages') || [ENGLISH],
        },
    },
    {
        id: ADDRESS_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            patientAddress1: Yup.string().required(
                'Street address is required'
            ),
            patientCity: Yup.string().required('City is required'),
            patientState: Yup.string().required('State is required'),
            patientZIP: Yup.string().required('Postal code is required'),
        }),
        initialValues: {
            patientAddress1: _get(user, 'address.streetAddress'),
            patientAddress2: _get(user, 'address.addressDetails'),
            patientCity: _get(user, 'address.city'),
            patientState: _get(user, 'address.state'),
            patientZIP: _get(user, 'address.zipCode'),
        },
    },
    // stage 2: insurance
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
            const updateUserMutation = _get(mutations, 'updateUserMutation');
            const userId = _get(user, 'id');

            const {
                patientAddress1,
                patientAddress2,
                patientBirthDate,
                patientBirthMonth,
                patientBirthYear,
                patientCity,
                patientGender,
                patientState,
                patientZIP,
                insuranceProvider,
                insuranceProviderId,
                planOrGroupNumber,
                patientInsuranceNum,
                languages,
            } = combinedObject;

            const hasNoInsurance = JSON.parse(
                _get(combinedObject, `${KioskInsurance.HAS_NO_INSURANCE}`)
            );

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
                    const { firstName, lastName } = user;

                    const eligibility = !hasNoInsurance
                        ? await insuranceClient.query({
                              query: CHECK_ELIGIBILITY,
                              variables: {
                                  input: {
                                      patientId: user.id,
                                      firstName: firstName,
                                      lastName: lastName,
                                      dob: `${patientBirthMonth}/${patientBirthDate}/${patientBirthYear}`,
                                      insuranceInfo: {
                                          insuranceProvider,
                                          insuranceProviderId,
                                          policyHolderId: patientInsuranceNum,
                                      },
                                  },
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

            const updateUserHasNoError = await execute({
                action: async () => {
                    await updateUserMutation({
                        variables: {
                            input: {
                                id: userId,
                                languages,
                            },
                        },
                    });
                },
            });

            formikProps.setSubmitting(false);
            return !(updateInsuranceHasNoError && updateUserHasNoError);
        },
    },
    // stage 3: health history
    {
        id: LAST_DENTAL_EXAM_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            LastDentalExam.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: LAST_DENTAL_EXAM_PROCEDURE_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            LastDentalExamProcedure.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: DoctorGeneralInformation_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            'Physician address': Yup.string(),
            'Physician name': Yup.string(),
            'Physician phone number': Yup.string(),
        }),
        component: null,
        initialValues: getInitialValues(
            DoctorGeneralInformation.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: GeneralHealth_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            'Any changes in your general health within the past year?': Yup.string().required(
                'Required'
            ),
            'Any changes in your general health within the past year? (Explanation)': Yup.string(),
            'Are you being treated for any conditions? If yes, please list': Yup.string().required(
                'Required'
            ),
            'Are you currently taking any prescription or over the counter medicine(s)?': Yup.string().required(
                'Required'
            ),
            'Are you in good health?': Yup.string().required('Required'),
            'Have you been hospitalized in the past 5 years?': Yup.string().required(
                'Required'
            ),
            'When was your last physical exam? (Month)': Yup.string(),
            'When was your last physical exam? (Year)': Yup.string(),
        }),
        component: null,
        initialValues: getInitialValues(
            GeneralHealth.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: GeneralMedicalInfo1_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            GeneralMedicalInfo1.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: GeneralMedicalInfo2_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            GeneralMedicalInfo2.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: WomenOnly_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            WomenOnly.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: GeneralDentalInfo1_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            GeneralDentalInfo1.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: GeneralDentalInfo2_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            GeneralDentalInfo2.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: DrugAllergies_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            DrugAllergies.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: UrgentHeartConditions_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            UrgentHeartConditions.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: OtherHeartConditions_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            OtherHeartConditions.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: BloodDisorders_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            BloodDisorders.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: NutritionalDiseases_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            NutritionalDiseases.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: ImmuneAndCancer_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            ImmuneAndCancer.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: RespiratoryDisorders_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            RespiratoryDisorders.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: TerminalIllness_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            TerminalIllness.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: BrainDisorders_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            BrainDisorders.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: DrugsAndAlcohol1_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        component: null,
        initialValues: getInitialValues(
            DrugsAndAlcohol1.questions,
            healthHistoryAnswers
        ),
    },
    {
        id: DrugsAndAlcohol2_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            'Has a physician or previous dentist recommended that you take antibiotics prior to your dental treatment?': Yup.string().required(
                'Required'
            ),
        }),
        component: null,
        initialValues: getInitialValues(
            DrugsAndAlcohol2.questions,
            healthHistoryAnswers
        ),
        onAction: async (stepValues, allValues) => {
            const valuesKeys = Object.keys(allValues).filter(k =>
                HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS.includes(k)
            );

            const newArray = [];
            valuesKeys.forEach(valueKey => {
                const innerKeys = Object.keys(allValues[valueKey]);

                innerKeys.forEach(innerKey => {
                    newArray.push({
                        key: innerKey,
                        value: allValues[valueKey][innerKey],
                    });
                });
            });

            return !(await execute({
                action: async () => {
                    await _get(mutations, 'updatePatientHealthData')({
                        variables: {
                            input: {
                                patientId: _get(user, 'id'),
                                patientHealthData: {
                                    items: newArray,
                                },
                            },
                        },
                    });
                },
            }));
        },
    },
    // empty step to redirect to another page
    {
        id: REDIRECT_WIZARD_STEP_ID,
    },
];

// given current stepID and skipIDS(ids that are going to be skipped), return next stepID
export const getNextWizardStepID = ({ currentStepID, skipIDs }) => {
    // list of stepID
    const stepIDs = getPatientWebOnboardingPageWizardSteps({}).map(step =>
        _get(step, 'id')
    );

    const filteredStepIDs = stepIDs.filter(stepID => !skipIDs.includes(stepID));

    // get stepID that comes directly after current stepID
    return filteredStepIDs[filteredStepIDs.indexOf(currentStepID) + 1];
};
