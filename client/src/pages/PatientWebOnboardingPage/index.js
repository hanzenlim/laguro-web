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
    Onboarding,
    HealthHistoryForm,
    Progress,
} from '@laguro/the-bright-side-components';
import styled from 'styled-components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import cookies from 'browser-cookies';
import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import { getUser } from '../../util/authUtils';
import { RedirectErrorPage } from '../GeneralErrorPage';
import {
    GET_USER,
    UPDATE_INSURANCE_INFO_MUTATION,
    UPDATE_USER_MUTATION,
    UPDATE_PATIENT_HEALTH_DATA,
    GET_PATIENT_HEALTH_DATA_UNSTRUCTURED,
} from './queries';
import { Flex, Loading, Box } from '../../components/index';
import {
    getPatientWebOnboardingPageWizardSteps,
    ADDRESS_WIZARD_STEP_ID,
    BIRTHDAY_WIZARD_STEP_ID,
    GENDER_WIZARD_STEP_ID,
    INSURANCE_WIZARD_STEP_ID,
    LANGUAGE_WIZARD_STEP_ID,
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
    GENERAL_INFO_STAGE_WIZARD_STEP_IDS,
    REDIRECT_WIZARD_STEP_ID,
} from './getPatientWebOnboardingPageWizardSteps';
import history from '../../history';

import { handleSkip } from './utils';
import { withScreenSizes } from '../../components/Responsive';

export const PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME =
    'patient-onboarding-redirectTo';

const StyledBox = styled(Box)`
    div {
        z-index: 1;
    }
`;
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

const WIZARD_STEP_IDS_WITHOUT_PREVIOUS_BUTTON = [
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
    updateInsuranceInfoMutation: ({ render }) => (
        <Mutation mutation={UPDATE_INSURANCE_INFO_MUTATION}>{render}</Mutation>
    ),
    updateUserMutation: ({ render }) => (
        <Mutation mutation={UPDATE_USER_MUTATION}>{render}</Mutation>
    ),
    updatePatientHealthData: ({ render }) => (
        <Mutation mutation={UPDATE_PATIENT_HEALTH_DATA}>{render}</Mutation>
    ),
});

class PatientWebOnboardingPage extends Component {
    render() {
        const userId = _get(getUser(), 'id');
        const currentWizardStepId = getCurrentWizardStep();

        return (
            <Composed {...{ userId, currentWizardStepId }}>
                {({
                    getUserResponse: {
                        loading: isGetUserLoading,
                        error: getUserHasError,
                        data: userData,
                    },
                    getPatientHealthDataUnstructured: {
                        loading: isGetPatientHealthDataUnstructuredLoading,
                        error: getPatientHealthDataUnstructuredHasError,
                        data: healthDataData,
                    },
                    updateInsuranceInfoMutation,
                    updateUserMutation,
                    updatePatientHealthData,
                }) => {
                    if (
                        isGetUserLoading ||
                        isGetPatientHealthDataUnstructuredLoading
                    ) {
                        return <Loading />;
                    }

                    if (
                        getUserHasError ||
                        getPatientHealthDataUnstructuredHasError
                    ) {
                        return <RedirectErrorPage />;
                    }

                    const PATIENT_WEB_ONBOARDING_PAGE_PROGRESS_STEPS = this
                        .props.tabletDesktopOnly
                        ? [
                              'GENERAL INFORMATION',
                              'INSURANCE',
                              'MEDICAL HISTORY FORM',
                          ]
                        : ['', '', ''];

                    this.userFromDB =
                        _get(userData, 'getUser') || this.userFromDB; // work around for userFromDB not getting set at random moments

                    const healthHistoryAnswers = _get(
                        healthDataData,
                        'getPatientHealthDataUnstructured.groupedItems'
                    );

                    // add redirects here
                    // redirect back when finished with flow
                    if (currentWizardStepId === REDIRECT_WIZARD_STEP_ID) {
                        window.location.href = cookies.get(
                            PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME
                        );
                    }

                    // to prevent loading the wizard with empty initialValues
                    this.steps =
                        // add redirects at the end of action here
                        // an action will return true if it has a redirect and return false if it doesn't
                        // add backend calls to getPatientWebOnboardingPageWizardStep.js onAction
                        getPatientWebOnboardingPageWizardSteps({
                            user: this.userFromDB,
                            mutations: {
                                updateInsuranceInfoMutation,
                                updateUserMutation,
                                updatePatientHealthData,
                            },
                            answers: healthHistoryAnswers,
                        });

                    const render = props => {
                        let step;

                        // in order
                        switch (props.actions.currentStep) {
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

                            default:
                                step = null;
                        }

                        return (
                            <Flex
                                justifyContent="center"
                                pt="100px"
                                position="relative"
                            >
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

                    let currentStep =
                        PATIENT_WEB_ONBOARDING_PAGE_PROGRESS_STEPS.length + 1;
                    if (
                        GENERAL_INFO_STAGE_WIZARD_STEP_IDS.includes(
                            currentWizardStepId
                        )
                    ) {
                        currentStep = 1;
                    } else if (
                        currentWizardStepId === INSURANCE_WIZARD_STEP_ID
                    ) {
                        currentStep = 2;
                    } else if (
                        HEALTH_HISTORY_STAGE_WIZARD_STEP_IDS.includes(
                            currentWizardStepId
                        )
                    ) {
                        currentStep = 3;
                    }

                    return (
                        <Box position="relative">
                            <Progress
                                steps={
                                    PATIENT_WEB_ONBOARDING_PAGE_PROGRESS_STEPS
                                }
                                step={currentStep}
                                percent={
                                    100.0 /
                                    PATIENT_WEB_ONBOARDING_PAGE_PROGRESS_STEPS.length
                                }
                            />

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
                                                    <StyledBox>
                                                        <PreviousButton
                                                            goToPreviousStep={
                                                                wizardProps
                                                                    .actions
                                                                    .goToPreviousStep
                                                            }
                                                        />
                                                    </StyledBox>
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
export default withScreenSizes(PatientWebOnboardingPage);
