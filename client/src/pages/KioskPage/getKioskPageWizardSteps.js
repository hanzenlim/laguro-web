/* eslint-disable camelcase */
import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import cookies from 'browser-cookies';
import moment from 'moment-timezone';

import { execute } from '../../util/gqlUtils';
import { getDentistTimes, redirectFromHealthHistory } from './utils';
import { insuranceClient } from '../../util/apolloClients';
import { trackBookAppointment } from '../../util/trackingUtils';
import { CHECK_ELIGIBILITY } from './queries';
import { ENGLISH } from '../../util/strings';
import { KioskInsurance } from '../common/the-bright-side-components/components/Kiosk/KioskInsurance';
import { HealthHistoryForm } from '../common/the-bright-side-components/components/Onboarding/Patient/HealthHistoryForm';
import {
    GENERALINFORMATION_BIRTHDAY_MONTHISREQUIRED,
    GENERALINFORMATION_BIRTHDAY_YEARISREQUIRED,
    GENERALINFORMATION_BIRTHDAY_DATEISREQUIRED,
    GENERALINFORMATION_BIRTHDAY_UNDERAGE,
    GENERALINFORMATION_LANGUAGE_ATLEASTONE,
    GENERAL_PLEASEFILL,
    GENERALINFORMATION_ADDRESS_CITYISREQUIRED,
    GENERALINFORMATION_ADDRESS_STATEISREQUIRED,
    GENERALINFORMATION_ADDRESS_POSTACODEISREQUIRED,
    GENERALINFORMATION_ADDRESS_STREETADDRESS,
    GENERAL_REQUIRED,
    BOOKAPPOINTMENT_BOOKANAPPOINTMENT_YOUMUSTSELECTAPPT,
} from '../../strings/messageStrings';

// contains renderRegistrationStage which renders correct step within Registation stage of kiosk flow
// contains getStageOneRegWizardSteps which return an array of step information objects, which contain step id(id), validations(validationSchema), and initialValues, given a user object. This user object is from getUser in Kiosk/index.js.

// in order
// stage 1 registration
// KioskRegPage

// stage 2 general information
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
// stage 4 book appointment
export const REASON_OF_VISIT_WIZARD_STEP_ID = 'reason-of-visit-step';
export const SELECT_PROCEDURE_WIZARD_STEP_ID = 'select-procedure-step';
export const BOOK_APPOINTMENT_WIZARD_STEP_ID = 'book-appointment-step';
export const BOOKING_CONFIRMATION_WIZARD_STEP_ID = 'booking-confirmation-step';

export const BOOK_APPT_WIZARD_STEP_IDS = [
    REASON_OF_VISIT_WIZARD_STEP_ID,
    SELECT_PROCEDURE_WIZARD_STEP_ID,
    BOOK_APPOINTMENT_WIZARD_STEP_ID,
    BOOKING_CONFIRMATION_WIZARD_STEP_ID,
];

export const BOOK_APPT_STAGE_WIZARD_STEP_IDS = [...BOOK_APPT_WIZARD_STEP_IDS];

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

export const KIOSK_CONFIRMATION_WIZARD_STEP_ID = 'kiosk-confirmation-step';
export const KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID = 'kiosk-flow-success-step';
export const CHECKIN_WIZARD_STEP_ID = 'checkIn-step';

export const KIOSK_APPT_ID_COOKIE_VARIABLE_NAME = 'kiosk-appt-id';

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

const minAdultAge = moment()
    .subtract(18, 'years')
    .format();

const LOCAL_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

// depending on user, some steps will be optional
// onAction will return true if there is an error, return false if there isn't
// add backend calls here. add redirects in index.js
// eslint-disable-next-line
export const getKioskPageWizardSteps = ({
    user,
    officeId,
    activeDentistsWithAppointmentSlots,
    mutations,
    healthHistoryAnswers,
    formatText = text => text,
}) => [
    // stage 1: registration
    // see KioskRegPage
    // stage 2: general information
    {
        id: BIRTHDAY_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            patientBirthMonth: Yup.string().required(
                formatText(GENERALINFORMATION_BIRTHDAY_MONTHISREQUIRED)
            ),
            patientBirthDate: Yup.string().required(
                formatText(GENERALINFORMATION_BIRTHDAY_DATEISREQUIRED)
            ),
            patientBirthYear: Yup.date()
                .max(
                    minAdultAge,
                    formatText(GENERALINFORMATION_BIRTHDAY_UNDERAGE)
                )
                .required(
                    formatText(GENERALINFORMATION_BIRTHDAY_YEARISREQUIRED)
                ),
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
            patientGender: Yup.string().required(GENERAL_PLEASEFILL),
        }),
        initialValues: {
            patientGender: _get(user, 'gender') || '',
        },
    },
    {
        id: LANGUAGE_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            languages: Yup.array().required(
                formatText(GENERALINFORMATION_LANGUAGE_ATLEASTONE)
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
                formatText(GENERALINFORMATION_ADDRESS_STREETADDRESS)
            ),
            patientCity: Yup.string().required(
                formatText(GENERALINFORMATION_ADDRESS_CITYISREQUIRED)
            ),
            patientState: Yup.string().required(
                formatText(GENERALINFORMATION_ADDRESS_STATEISREQUIRED)
            ),
            patientZIP: Yup.string().required(
                formatText(GENERALINFORMATION_ADDRESS_POSTACODEISREQUIRED)
            ),
        }),
        initialValues: {
            patientAddress1: _get(user, 'address.streetAddress'),
            patientAddress2: _get(user, 'address.addressDetails'),
            patientCity: _get(user, 'address.city'),
            patientState: _get(user, 'address.state'),
            patientZIP: _get(user, 'address.zipCode'),
        },
    },
    // stage 3: insurance
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
                : {},
        },
        validationSchema: Yup.object().shape({
            policyHolderUser: Yup.string().when(
                ['hasNoInsurance', 'isPrimaryHolder'],
                {
                    is: (hasNoInsurance, isPrimaryHolder) =>
                        hasNoInsurance === 'no' && isPrimaryHolder === 'no',
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
                then: Yup.string().required(formatText(GENERAL_REQUIRED)),
            }),
            patientInsuranceNum: Yup.string().when('hasNoInsurance', {
                is: 'false',
                then: Yup.string().required(formatText(GENERAL_REQUIRED)),
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
                isPrimaryHolder,
                policyHolderUser,
            } = combinedObject;

            const hasNoInsurance = JSON.parse(
                _get(combinedObject, `${KioskInsurance.HAS_NO_INSURANCE}`)
            );

            formikProps.setSubmitting(true);
            const updateInsuranceHasNoError = await execute({
                reportGqlErrorOnly: true,
                beforeAction: async () => {
                    const isDependent = isPrimaryHolder === 'no';

                    const checkEligibilityWithoutDependentInput = {
                        patientId: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        dob: `${patientBirthMonth}/${patientBirthDate}/${patientBirthYear}`,
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
                        dependentDob: `${patientBirthMonth}/${patientBirthDate}/${patientBirthYear}`,
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
                    const formattedValues = {
                        userId,
                        address: {
                            streetAddress: patientAddress1,
                            addressDetails: _isEmpty(patientAddress2)
                                ? undefined
                                : patientAddress2,
                            city: patientCity,
                            zipCode: patientZIP,
                            state: patientState,
                        },
                        dob: `${patientBirthMonth}/${patientBirthDate}/${patientBirthYear}`,
                        gender:
                            patientGender === 'unknown' ? null : patientGender,
                        insuranceInfo: {
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
                            policyHolderUser:
                                isPrimaryHolder === 'yes'
                                    ? null
                                    : {
                                          firstName: policyHolderUser.firstName,
                                          lastName: policyHolderUser.lastName,
                                          dob: `${
                                              policyHolderUser.birthMonth
                                          }/${policyHolderUser.birthDate}/${
                                              policyHolderUser.birthYear
                                          }`,
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
    // stage 4: book an appointment
    // if purpose-of-visit is walkin, visit reason-of-visit, select-procedure, book appt, and booking confirmation, if it's check-in, only visit check-in
    {
        id: REASON_OF_VISIT_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            reasonOfVisit: Yup.string().required(
                formatText(GENERAL_PLEASEFILL)
            ),
        }),
        initialValues: {
            reasonOfVisit: 'Exam/Check up/Cleaning',
        },
    },
    // only if reason-of-visit is special treatment
    {
        id: SELECT_PROCEDURE_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({}),
        initialValues: {
            reasonOfVisit: '',
        },
    },
    {
        id: BOOK_APPOINTMENT_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            appointmentSelected: Yup.string().required(
                formatText(BOOKAPPOINTMENT_BOOKANAPPOINTMENT_YOUMUSTSELECTAPPT)
            ),
        }),
        initialValues: {},
        onAction:
            !_isEmpty(activeDentistsWithAppointmentSlots) &&
            (async (stepValues, allValues, formikProps) => {
                const dentistTime = getDentistTimes(
                    activeDentistsWithAppointmentSlots
                ).find(
                    dt =>
                        dt.id ===
                        _get(
                            allValues,
                            `[${BOOK_APPOINTMENT_WIZARD_STEP_ID}].appointmentSelected`
                        )
                );
                const selectProcedureValues = _get(
                    allValues,
                    `[${SELECT_PROCEDURE_WIZARD_STEP_ID}]`
                );

                const selectProcedureListOfProcedures = Object.keys(
                    selectProcedureValues
                )
                    .filter(k => selectProcedureValues[k])
                    .toString();

                return !(await execute({
                    beforeAction: () => {
                        formikProps.setSubmitting(true);
                    },
                    action: async () => {
                        const result = await _get(
                            mutations,
                            'createAppointmentFromKiosk'
                        )({
                            variables: {
                                input: {
                                    officeId,
                                    dentistId: dentistTime.dentistId,
                                    patientId: _get(user, 'id'),
                                    localStartTime: moment(
                                        dentistTime.startTime
                                    ).format(LOCAL_TIME_FORMAT),
                                    reasonOfVisit: !_isEmpty(
                                        selectProcedureListOfProcedures
                                    )
                                        ? selectProcedureListOfProcedures
                                        : _get(
                                              allValues,
                                              `[${REASON_OF_VISIT_WIZARD_STEP_ID}].reasonOfVisit`
                                          ),
                                },
                            },
                        });

                        // Track the appointment creation.
                        if (_get(result, 'data.createAppointment')) {
                            trackBookAppointment({
                                appointmentId: result.data.createAppointment,
                                dentistId: dentistTime.dentistId,
                                weekDay: moment(dentistTime.startTime).format(
                                    'dddd'
                                ),
                                hour: moment(dentistTime.startTime).format(
                                    'hh:mm a'
                                ),
                                internalPage: 'kiosk',
                                eventAction: 'Conversion',
                            });
                        }

                        cookies.set(
                            KIOSK_APPT_ID_COOKIE_VARIABLE_NAME,
                            result.data.createAppointment,
                            {
                                expires: 0,
                            }
                        );
                    },
                    afterAction: () => {
                        formikProps.setSubmitting(false);
                    },
                }));
            }),
    },
    {
        id: BOOKING_CONFIRMATION_WIZARD_STEP_ID,
    },
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
                formatText(GENERAL_REQUIRED)
            ),
            'Any changes in your general health within the past year? (Explanation)': Yup.string(),
            'Are you being treated for any conditions? If yes, please list': Yup.string().required(
                formatText(GENERAL_REQUIRED)
            ),
            'Are you currently taking any prescription or over the counter medicine(s)?': Yup.string().required(
                formatText(GENERAL_REQUIRED)
            ),
            'Are you in good health?': Yup.string().required(
                formatText(GENERAL_REQUIRED)
            ),
            'Have you been hospitalized in the past 5 years?': Yup.string().required(
                formatText(GENERAL_REQUIRED)
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
                formatText(GENERAL_REQUIRED)
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

            await execute({
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
                afterAction: () => redirectFromHealthHistory(),
            });
            return true;
        },
    },
    {
        id: KIOSK_CONFIRMATION_WIZARD_STEP_ID,
    },
    {
        id: CHECKIN_WIZARD_STEP_ID,
    },
    {
        id: KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID,
    },
];

// given current stepID and skipIDS(ids that are going to be skipped), return next stepID
export const getNextWizardStepID = ({ currentStepID, skipIDs }) => {
    // list of stepID
    const stepIDs = getKioskPageWizardSteps({}).map(step => _get(step, 'id'));

    const filteredStepIDs = stepIDs.filter(stepID => !skipIDs.includes(stepID));

    // get stepID that comes directly after current stepID
    return filteredStepIDs[filteredStepIDs.indexOf(currentStepID) + 1];
};
