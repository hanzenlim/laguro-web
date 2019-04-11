/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
    PreviousButton,
    Wizard,
    Address,
    Birthday,
    Gender,
    SelectLanguagePage,
    KioskInsurance,
    ReasonOfVisit,
    KioskBookingConfirmation,
    SelectProcedure,
    AppointmentSelection,
    Onboarding,
    KioskTerms,
    KioskCheckInConfirmation,
    HealthHistoryForm,
    OnboardSuccess,
    Progress,
    KioskFlowSuccess,
} from '@laguro/the-bright-side-components';
import _get from 'lodash/get';
import _isNull from 'lodash/isNull';
import cookies from 'browser-cookies';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import { Alert } from 'antd';
import {
    getUser,
    onKioskLogout,
    eraseCookieSession,
} from '../../util/authUtils';
import { RedirectErrorPage } from '../GeneralErrorPage';
import {
    GET_USER,
    UPDATE_INSURANCE_INFO_MUTATION,
    UPDATE_USER_MUTATION,
    GET_APPOINTMENT,
    GET_OFFICE,
    CREATE_PATIENT_APPOINTMENT_ONBOARDING,
    UPDATE_PATIENT_HEALTH_DATA,
    GET_PATIENT_HEALTH_DATA_UNSTRUCTURED,
} from './queries';
import { Flex, Text, Loading, Box, Container } from '../../components/index';
import {
    getKioskPageWizardSteps,
    ADDRESS_WIZARD_STEP_ID,
    BIRTHDAY_WIZARD_STEP_ID,
    GENDER_WIZARD_STEP_ID,
    getNextWizardStepID,
    INSURANCE_WIZARD_STEP_ID,
    LANGUAGE_WIZARD_STEP_ID,
    REASON_OF_VISIT_WIZARD_STEP_ID,
    SELECT_PROCEDURE_WIZARD_STEP_ID,
    BOOKING_CONFIRMATION_WIZARD_STEP_ID,
    BOOK_APPOINTMENT_WIZARD_STEP_ID,
    TERMS_WIZARD_STEP_ID,
    KIOSK_APPT_ID_COOKIE_VARIABLE_NAME,
    CHECKIN_WIZARD_STEP_ID,
    HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS,
    LAST_DENTAL_EXAM_WIZARD_STEP_ID,
    LAST_DENTAL_EXAM_PROCEDURE_WIZARD_STEP_ID,
    DoctorGeneralInformation_WIZARD_STEP_ID,
    GeneralHealth_WIZARD_STEP_ID,
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
    GeneralMedicalInfo1_WIZARD_STEP_ID,
    KIOSK_CONFIRMATION_WIZARD_STEP_ID,
    GENERAL_INFO_STAGE_WIZARD_STEP_IDS,
    BOOK_APPT_STAGE_WIZARD_STEP_IDS,
    KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID,
} from './getKioskPageWizardSteps';
import {
    KIOSK_URL,
    KIOSK_REG_PAGE_URL,
    KIOSK_OFFICE_SETUP_PAGE_URL,
} from '../../util/urls';
import history, { redirect } from '../../history';
import {
    kioskPurposeOfVisitCookieVariableName,
    kioskIsAccountNewCookieVariableName,
    KIOSK_PURPOSE_OF_VISIT_WALKIN,
} from '../KioskRegPage';
import {
    addActionsToWizardSteps,
    getDentistTimes,
    KIOSK_PAGE_PROGRESS_STEPS,
} from './utils';
import defaultUserImage from '../../components/Image/defaultUserImage.svg';
import { hasSkippedMedicalHistoryFormCookieVariableName } from '../../util/strings';

export const KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME = 'kiosk-office-id';

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

const procedureList = {
    Fillings: false,
    'Crowns, Bridges, Veneers': false,
    'Root Canals': false,
    'Gum Surgery / Grafting': false,
    'Deep Cleaning': false,
    'Whitening / Cosmetic': false,
    'Implant placement': false,
    'Implant crown': false,
    'Extractions / Surgery': false,
    Dentures: false,
    Braces: false,
};

const bellDentalOfficeId = 'e91ba710-2b37-11e9-998e-9da6024c6b32';
const WIZARD_STEP_IDS_WITHOUT_PREVIOUS_BUTTON = [
    BOOKING_CONFIRMATION_WIZARD_STEP_ID,
    KIOSK_CONFIRMATION_WIZARD_STEP_ID,
    KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID,
    CHECKIN_WIZARD_STEP_ID,
    HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS[0],
];

const getCurrentWizardStep = () => history.location.pathname.split('/')[2];

const Composed = adopt({
    getUserResponse: ({ render, userId }) => (
        <Query
            query={GET_USER}
            variables={{
                id: userId,
            }}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
    updateInsuranceInfoMutation: ({ render }) => (
        <Mutation mutation={UPDATE_INSURANCE_INFO_MUTATION}>{render}</Mutation>
    ),
    updateUserMutation: ({ render }) => (
        <Mutation mutation={UPDATE_USER_MUTATION}>{render}</Mutation>
    ),
    getAppointmentResponse: ({
        render,
        getUserResponse,
        appointmentId,
        currentWizardStepId,
    }) => {
        const upcomingApptId = _get(
            getUserResponse,
            'data.getUser.appointments[0].id'
        );
        return (
            <Query
                query={GET_APPOINTMENT}
                variables={{
                    id:
                        currentWizardStepId === CHECKIN_WIZARD_STEP_ID
                            ? upcomingApptId
                            : appointmentId,
                }}
                skip={
                    currentWizardStepId === CHECKIN_WIZARD_STEP_ID
                        ? _isEmpty(upcomingApptId)
                        : _isEmpty(appointmentId)
                }
                fetchPolicy="network-only"
            >
                {render}
            </Query>
        );
    },
    getOfficeWithDentistsWithApptSlots: ({ render, officeId }) => (
        <Query
            variables={{
                id: officeId,
            }}
            query={GET_OFFICE}
            skip={_isEmpty(officeId)}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
    createPatientAppointmentOnboarding: ({ render }) => (
        <Mutation mutation={CREATE_PATIENT_APPOINTMENT_ONBOARDING}>
            {render}
        </Mutation>
    ),
    updatePatientHealthData: ({ render }) => (
        <Mutation mutation={UPDATE_PATIENT_HEALTH_DATA}>{render}</Mutation>
    ),
    getPatientHealthDataUnstructured: ({ render, userId }) => (
        <Query
            query={GET_PATIENT_HEALTH_DATA_UNSTRUCTURED}
            variables={{ patientId: userId }}
            fetchPolicy="network-only"
            skip={_isEmpty(userId)}
        >
            {render}
        </Query>
    ),
});

class KioskPage extends Component {
    constructor(props) {
        super(props);
        // used for check in confirmation and booking confirmation pages
        cookies.erase(KIOSK_APPT_ID_COOKIE_VARIABLE_NAME);

        // KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME cookie is not set, set it to default
        if (_isEmpty(cookies.get(KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME))) {
            cookies.set(
                KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME,
                bellDentalOfficeId,
                {
                    expires: 0,
                }
            );
        }
    }

    render() {
        const appointmentId = cookies.get(KIOSK_APPT_ID_COOKIE_VARIABLE_NAME);
        const officeId = cookies.get(KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME);
        const userId = _get(getUser(), 'id');
        const currentWizardStepId = getCurrentWizardStep();

        return (
            <Composed
                {...{ appointmentId, officeId, userId, currentWizardStepId }}
            >
                {({
                    getUserResponse: {
                        loading: isGetUserLoading,
                        error: getUserHasError,
                        data: userData,
                    },
                    getAppointmentResponse: {
                        loading: isGetApptLoading,
                        error: getApptHasError,
                        data: apptData,
                    },
                    getOfficeWithDentistsWithApptSlots: {
                        loading: isGetOfficeWithDentistsWithApptSlotsLoading,
                        error: getOfficeWithDentistsWithApptSlotsHasError,
                        data: officeData,
                    },
                    getPatientHealthDataUnstructured: {
                        loading: isGetPatientHealthDataUnstructuredLoading,
                        error: getPatientHealthDataUnstructuredHasError,
                        data: healthDataData,
                    },
                    updateInsuranceInfoMutation,
                    updateUserMutation,
                    createPatientAppointmentOnboarding,
                    updatePatientHealthData,
                }) => {
                    if (
                        isGetUserLoading ||
                        isGetApptLoading ||
                        isGetOfficeWithDentistsWithApptSlotsLoading ||
                        isGetPatientHealthDataUnstructuredLoading
                    ) {
                        return <Loading />;
                    }

                    if (
                        getUserHasError ||
                        getApptHasError ||
                        getOfficeWithDentistsWithApptSlotsHasError ||
                        getPatientHealthDataUnstructuredHasError
                    ) {
                        return <RedirectErrorPage />;
                    }

                    this.userFromDB =
                        _get(userData, 'getUser') || this.userFromDB; // work around for userFromDB not getting set at random moments
                    const hasSubmittedHealthHistoryForm = _get(
                        this.userFromDB,
                        'hasSubmittedHealthHistoryForm'
                    );

                    const appt = _get(apptData, 'getAppointment');
                    const localStartTime = _get(appt, 'localStartTime');
                    const totalRating = _get(appt, 'dentist.totalRating');
                    const firstName = _get(appt, 'dentist.user.firstName');
                    const lastName = _get(appt, 'dentist.user.lastName');
                    const imageUrl = _get(appt, 'dentist.user.imageUrl');

                    const hasGoneThroughInsurancePage = _get(
                        appt,
                        'patient.insuranceInfo'
                    );

                    // default office id is production bell office
                    // if this id or other id doesn't exist in the backend, redirect to setUp page
                    const office = _get(officeData, 'getOffice');
                    if (_isNull(office)) {
                        redirect({ url: KIOSK_OFFICE_SETUP_PAGE_URL });
                    }

                    const activeDentistsWithAppointmentSlots = _get(
                        office,
                        'activeDentists'
                    );
                    const dentistTimes = getDentistTimes(
                        activeDentistsWithAppointmentSlots
                    );

                    const healthHistoryAnswers = _get(
                        healthDataData,
                        'getPatientHealthDataUnstructured.groupedItems'
                    );

                    const userAppt = _get(this.userFromDB, 'appointments');

                    const isCheckInButNoUpcomingAppt =
                        cookies.get(kioskPurposeOfVisitCookieVariableName) ===
                            'checkIn' && _isEmpty(userAppt);

                    const isCheckInAndHasUpcomingAppt =
                        cookies.get(kioskPurposeOfVisitCookieVariableName) ===
                            'checkIn' && !_isEmpty(userAppt);

                    const redirectFromHealthHistory = () => {
                        if (isCheckInAndHasUpcomingAppt) {
                            redirect({
                                url: `${KIOSK_URL}/${CHECKIN_WIZARD_STEP_ID}`,
                            });
                        } else if (
                            JSON.parse(
                                cookies.get(kioskIsAccountNewCookieVariableName)
                            )
                        ) {
                            redirect({
                                url: `${KIOSK_URL}/${KIOSK_CONFIRMATION_WIZARD_STEP_ID}`,
                            });
                        } else {
                            redirect({
                                url: `${KIOSK_URL}/${KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID}`,
                            });
                        }
                    };

                    const handleSkip = () => {
                        cookies.set(
                            hasSkippedMedicalHistoryFormCookieVariableName,
                            'true',
                            {
                                expires: 0,
                            }
                        );
                        redirectFromHealthHistory();
                    };

                    if (
                        currentWizardStepId ===
                            BOOK_APPT_STAGE_WIZARD_STEP_IDS[0] &&
                        isCheckInButNoUpcomingAppt
                    ) {
                        cookies.set(
                            kioskPurposeOfVisitCookieVariableName,
                            KIOSK_PURPOSE_OF_VISIT_WALKIN
                        );
                    }

                    // add redirects here
                    // if user has already filled out general information skip to insurance
                    if (
                        currentWizardStepId ===
                            GENERAL_INFO_STAGE_WIZARD_STEP_IDS[0] &&
                        !_isEmpty(_get(this.userFromDB, 'dob'))
                    ) {
                        redirect({
                            url: `${KIOSK_URL}/${INSURANCE_WIZARD_STEP_ID}`,
                        });
                        return null;
                    } else if (
                        currentWizardStepId === INSURANCE_WIZARD_STEP_ID &&
                        !_isEmpty(
                            _get(
                                this.userFromDB,
                                'insuranceInfo.policyHolderId'
                            )
                        )
                    ) {
                        redirect({
                            url: `${KIOSK_URL}/${
                                BOOK_APPT_STAGE_WIZARD_STEP_IDS[0]
                            }`,
                        });
                        return null;
                    } else if (
                        currentWizardStepId ===
                            BOOK_APPT_STAGE_WIZARD_STEP_IDS[0] &&
                        isCheckInAndHasUpcomingAppt
                    ) {
                        redirect({
                            url: `${KIOSK_URL}/${
                                HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS[0]
                            }`,
                        });
                        return null;
                    } else if (
                        currentWizardStepId ===
                            HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS[0] &&
                        hasSubmittedHealthHistoryForm
                    ) {
                        redirectFromHealthHistory();
                        return null;
                    }

                    // to prevent loading the wizard with empty initialValues
                    this.steps =
                        // add redirects at the end of action here
                        // an action will return true if it has a redirect and return false if it doesn't
                        // add backend calls to getKioskPageWizardStep.js onAction
                        addActionsToWizardSteps({
                            actions: [
                                {
                                    stepId: REASON_OF_VISIT_WIZARD_STEP_ID,
                                    action: stepValues => {
                                        if (
                                            _get(
                                                stepValues,
                                                'reasonOfVisit'
                                            ) === 'Exam/Check up/Cleaning'
                                        ) {
                                            // if reason of visit is exam, skip select procedure step
                                            redirect({
                                                url: `${KIOSK_URL}/${getNextWizardStepID(
                                                    {
                                                        currentStepID: REASON_OF_VISIT_WIZARD_STEP_ID,
                                                        skipIDs: [
                                                            SELECT_PROCEDURE_WIZARD_STEP_ID,
                                                        ],
                                                    }
                                                )}`,
                                            });

                                            return true;
                                        }
                                        return false;
                                    },
                                },
                                {
                                    stepId: CHECKIN_WIZARD_STEP_ID,
                                    action: () => {
                                        eraseCookieSession();
                                        redirect({
                                            url: KIOSK_REG_PAGE_URL,
                                        });

                                        return true;
                                    },
                                },
                            ],

                            wizardSteps: getKioskPageWizardSteps({
                                user: this.userFromDB,
                                activeDentistsWithAppointmentSlots,
                                mutations: {
                                    updateInsuranceInfoMutation,
                                    updateUserMutation,
                                    createPatientAppointmentOnboarding,
                                    updatePatientHealthData,
                                },
                                answers: healthHistoryAnswers,
                            }),
                        });

                    const render = props => {
                        let step;

                        // in order
                        switch (props.actions.currentStep) {
                            // stage 1: reg
                            // see KioskRegPage
                            // stage 2: general information
                            case BIRTHDAY_WIZARD_STEP_ID:
                                step = <Birthday {...props} />;
                                break;
                            case GENDER_WIZARD_STEP_ID:
                                step = <Gender {...props} />;
                                break;
                            case LANGUAGE_WIZARD_STEP_ID:
                                step = <SelectLanguagePage {...props} />;
                                break;
                            case ADDRESS_WIZARD_STEP_ID:
                                step = <Address {...props} />;
                                break;
                            // stage 3: insurance
                            case INSURANCE_WIZARD_STEP_ID:
                                step = <KioskInsurance {...props} />;
                                break;
                            // stage 4: book appointment
                            case REASON_OF_VISIT_WIZARD_STEP_ID:
                                step = <ReasonOfVisit {...props} />;
                                break;
                            case SELECT_PROCEDURE_WIZARD_STEP_ID:
                                step = (
                                    <SelectProcedure
                                        {...props}
                                        procedureList={procedureList}
                                    />
                                );
                                break;
                            case BOOK_APPOINTMENT_WIZARD_STEP_ID:
                                // To do: move no appts ui to AppointmentSelectoin component
                                if (!_isEmpty(dentistTimes)) {
                                    step = (
                                        <AppointmentSelection
                                            {...props}
                                            dentistTimes={dentistTimes}
                                        />
                                    );
                                } else {
                                    step = (
                                        <Flex
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Text mb="6px">
                                                There are no appointments
                                                available at this office this
                                                week
                                            </Text>
                                            <Onboarding.NextButton
                                                onClick={() =>
                                                    onKioskLogout(props.client)
                                                }
                                            >
                                                Log out
                                            </Onboarding.NextButton>
                                        </Flex>
                                    );
                                }
                                break;
                            case TERMS_WIZARD_STEP_ID:
                                step = <KioskTerms {...props} />;
                                break;
                            case BOOKING_CONFIRMATION_WIZARD_STEP_ID:
                                step = (
                                    <KioskBookingConfirmation
                                        imageUrl={imageUrl || defaultUserImage}
                                        date={moment(localStartTime).format(
                                            'MMM D, YYYY'
                                        )}
                                        rating={totalRating || 0}
                                        time={moment(localStartTime).format(
                                            'h:mm A'
                                        )}
                                        doctorName={`Dr. ${firstName} ${lastName}`}
                                        hasGoneThroughInsurancePage={
                                            hasGoneThroughInsurancePage
                                        }
                                        {...props}
                                    />
                                );
                                break;
                            case LAST_DENTAL_EXAM_WIZARD_STEP_ID:
                                step = <LastDentalExam {...props} />;
                                break;
                            case LAST_DENTAL_EXAM_PROCEDURE_WIZARD_STEP_ID:
                                step = <LastDentalExamProcedure {...props} />;
                                break;
                            case DoctorGeneralInformation_WIZARD_STEP_ID:
                                step = <DoctorGeneralInformation {...props} />;
                                break;
                            case GeneralHealth_WIZARD_STEP_ID:
                                step = <GeneralHealth {...props} />;
                                break;
                            case GeneralMedicalInfo1_WIZARD_STEP_ID:
                                step = <GeneralMedicalInfo1 {...props} />;
                                break;
                            case GeneralMedicalInfo2_WIZARD_STEP_ID:
                                step = <GeneralMedicalInfo2 {...props} />;
                                break;
                            case WomenOnly_WIZARD_STEP_ID:
                                step = <WomenOnly {...props} />;
                                break;
                            case GeneralDentalInfo1_WIZARD_STEP_ID:
                                step = <GeneralDentalInfo1 {...props} />;
                                break;
                            case GeneralDentalInfo2_WIZARD_STEP_ID:
                                step = <GeneralDentalInfo2 {...props} />;
                                break;
                            case DrugAllergies_WIZARD_STEP_ID:
                                step = <DrugAllergies {...props} />;
                                break;
                            case UrgentHeartConditions_WIZARD_STEP_ID:
                                step = <UrgentHeartConditions {...props} />;
                                break;
                            case OtherHeartConditions_WIZARD_STEP_ID:
                                step = <OtherHeartConditions {...props} />;
                                break;
                            case BloodDisorders_WIZARD_STEP_ID:
                                step = <BloodDisorders {...props} />;
                                break;
                            case NutritionalDiseases_WIZARD_STEP_ID:
                                step = <NutritionalDiseases {...props} />;
                                break;
                            case ImmuneAndCancer_WIZARD_STEP_ID:
                                step = <ImmuneAndCancer {...props} />;
                                break;
                            case RespiratoryDisorders_WIZARD_STEP_ID:
                                step = <RespiratoryDisorders {...props} />;
                                break;
                            case TerminalIllness_WIZARD_STEP_ID:
                                step = <TerminalIllness {...props} />;
                                break;
                            case BrainDisorders_WIZARD_STEP_ID:
                                step = <BrainDisorders {...props} />;
                                break;
                            case DrugsAndAlcohol1_WIZARD_STEP_ID:
                                step = <DrugsAndAlcohol1 {...props} />;
                                break;
                            case DrugsAndAlcohol2_WIZARD_STEP_ID:
                                step = <DrugsAndAlcohol2 {...props} />;
                                break;
                            case KIOSK_CONFIRMATION_WIZARD_STEP_ID:
                                step = (
                                    <OnboardSuccess
                                        name={`${_get(
                                            this.userFromDB,
                                            'firstName'
                                        )} ${_get(
                                            this.userFromDB,
                                            'lastName'
                                        )}`}
                                        onNext={() => {
                                            eraseCookieSession();
                                            redirect({
                                                url: KIOSK_REG_PAGE_URL,
                                            });
                                        }}
                                    />
                                );
                                break;
                            case CHECKIN_WIZARD_STEP_ID:
                                step = (
                                    <KioskCheckInConfirmation
                                        imageUrl={imageUrl || defaultUserImage}
                                        date={moment(localStartTime).format(
                                            'MMM D, YYYY'
                                        )}
                                        rating={totalRating || 0}
                                        time={moment(localStartTime).format(
                                            'h:mm A'
                                        )}
                                        doctorName={`Dr. ${firstName} ${lastName}`}
                                        {...props}
                                    />
                                );
                                break;
                            case KIOSK_FLOW_SUCCESS_WIZARD_STEP_ID:
                                step = (
                                    <KioskFlowSuccess
                                        {...props}
                                        name={`${_get(
                                            this.userFromDB,
                                            'firstName'
                                        )} ${_get(
                                            this.userFromDB,
                                            'lastName'
                                        )}`}
                                        onNext={() => {
                                            eraseCookieSession();
                                            redirect({
                                                url: KIOSK_REG_PAGE_URL,
                                            });
                                        }}
                                    />
                                );
                                break;
                            default:
                                step = null;
                        }

                        return (
                            <Flex justifyContent="center" pt="100px">
                                {!HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS.includes(
                                    props.actions.currentStep
                                ) ? (
                                    step
                                ) : (
                                    <Box width="330px" mx="auto" pt="100px">
                                        <Onboarding.SkipButton
                                            onSkip={handleSkip}
                                            text="Skip all"
                                        />
                                        {step}
                                    </Box>
                                )}
                            </Flex>
                        );
                    };

                    let currentStep = KIOSK_PAGE_PROGRESS_STEPS.length + 1;
                    if (
                        GENERAL_INFO_STAGE_WIZARD_STEP_IDS.includes(
                            currentWizardStepId
                        )
                    ) {
                        currentStep = 2;
                    } else if (
                        currentWizardStepId === INSURANCE_WIZARD_STEP_ID
                    ) {
                        currentStep = 3;
                    } else if (
                        BOOK_APPT_STAGE_WIZARD_STEP_IDS.includes(
                            currentWizardStepId
                        )
                    ) {
                        currentStep = 4;
                    } else if (
                        HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS.includes(
                            currentWizardStepId
                        )
                    ) {
                        currentStep = 5;
                    }

                    return (
                        <Box className="kiosk-pages">
                            <Progress
                                steps={KIOSK_PAGE_PROGRESS_STEPS}
                                step={currentStep}
                                percent={20}
                            />

                            {getCurrentWizardStep() ===
                                BOOK_APPT_STAGE_WIZARD_STEP_IDS[0] &&
                                isCheckInButNoUpcomingAppt && (
                                    <Container
                                        position="relative"
                                        maxWidth={['', '', 700]}
                                        px={[25, '', 0]}
                                        mt={30}
                                    >
                                        <Box mt={20} mb={-20}>
                                            <Alert
                                                type="info"
                                                showIcon
                                                message="It looks like you don't have an appointment scheduled. You can book a new appointment here."
                                            />
                                        </Box>
                                    </Container>
                                )}

                            {!_isEmpty(this.steps) && (
                                <Wizard
                                    onSubmit={() => {}}
                                    Form="form"
                                    withRoutingHistory={true}
                                    render={wizardProps => (
                                        <React.Fragment>
                                            {wizardProps.actions.canGoBack &&
                                                !WIZARD_STEP_IDS_WITHOUT_PREVIOUS_BUTTON.includes(
                                                    wizardProps.actions
                                                        .currentStep
                                                ) && (
                                                    <PreviousButton
                                                        goToPreviousStep={
                                                            wizardProps.actions
                                                                .goToPreviousStep
                                                        }
                                                    />
                                                )}
                                            {render({
                                                ...wizardProps,
                                                ...this.props,
                                            })}
                                        </React.Fragment>
                                    )}
                                    steps={this.steps}
                                />
                            )}
                        </Box>
                    );
                }}
            </Composed>
        );
    }
}
export default KioskPage;
