import React, { Component } from 'react';

import * as Yup from 'yup';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _flowRight from 'lodash/flowRight';
import cookies from 'browser-cookies';
import { injectIntl } from 'react-intl';
import { Flex, Box } from '../../components/index';
import { onLogoutWithoutRedirect } from '~/util/authUtils';
import { PatientName } from './StepComponents/GetPatientName';
import { RegisterStep } from './StepComponents/Register';
import { LoginStep } from './StepComponents/LogIn';
import { withRouter } from 'next/router';
import browserCookies from 'browser-cookies';

import {
    KIOSK_URL,
    KIOSK_REG_PAGE_URL,
    KIOSK_OFFICE_SETUP_PAGE_URL,
} from '~/util/urls';
import { getKioskPageWizardSteps } from '../KioskPage/getKioskPageWizardSteps';
import { redirect } from '~/util/history';
import {
    addActionsToWizardSteps,
    getKioskPageProgressSteps,
} from '../KioskPage/utils';
import { validatePhoneOrEmail } from '~/util/validationUtils';
import { KioskTerms } from '~/common/KioskTerms';
import { Progress } from '~/common/the-bright-side-components/components/Onboarding/Patient/Progress';
import { KioskLogIn } from '~/common/the-bright-side-components/components/Kiosk/KioskLogIn';
import { PurposeOfVisit } from '~/common/the-bright-side-components/components/Onboarding/Registration/Patient/PurposeOfVisit';
import { Onboarding, Wizard } from '~/common/the-bright-side-components';
import CheckInWithAppointmentCode from '~/common/CheckInWithAppointmentCode';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { ChooseLanguage } from '~/common/wizardComponents/ChooseLanguage';
import { KIOSK_FLOW_LANGUAGE_FORM_KEY } from '~/common/wizardComponents/ChooseLanguage/view';
import { ENGLISH_CODE } from '~/strings/languageStrings';
import { KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME } from '../KioskPage';
import SelectAppointmentForCheckIn from './StepComponents/SelectAppointmentForCheckIn';

// in order
// stage 1 registration
export const CHOOSE_LANGUAGE_WIZARD_STEP_ID = 'choose-language-step';
export const CHECK_IN_WITH_APPOINTMENT_CODE_STEP_ID =
    'check-in-with-appointment-code-step';
export const PURPOSE_OF_VISIT_WIZARD_STEP_ID = 'purpose-of-visit-step';
export const LOGIN_WIZARD_STEP_ID = 'login-step';
export const GET_PATIENT_NAME_WIZARD_STEP_ID = 'get-patient-name-step';
export const TERMS_WIZARD_STEP_ID = 'terms';
export const REGISTER_WIZARD_STEP_ID = 'register-step';
export const SELECT_APPOINTMENT_TO_CHECK_IN_STEP_ID =
    'select-appointment-to-check-in-step';

export const REGISTER_WIZARD_STEP_IDS = [
    GET_PATIENT_NAME_WIZARD_STEP_ID,
    REGISTER_WIZARD_STEP_ID,
];

export const kioskPurposeOfVisitCookieVariableName = 'kioskPurposeOfVisit';
export const kioskIsAccountNewCookieVariableName = 'kioskIsAccountNew';
export const KIOSK_PURPOSE_OF_VISIT_WALKIN = 'walkIn';
export const KIOSK_SELECTED_FAMILY_MEMBER = 'kioskSelectedFamilyMember';

// depending on user, some steps will be optional
// onAction will return true if there is an error, return false if there isn't
// add graphql calls to onAction
export const getKioskRegWizardSteps = ({ formatText = text => text }) => [
    {
        id: CHOOSE_LANGUAGE_WIZARD_STEP_ID,
        initialValues: {
            [KIOSK_FLOW_LANGUAGE_FORM_KEY]: ENGLISH_CODE,
        },
        onAction: stepValues => {
            const language = _get(stepValues, KIOSK_FLOW_LANGUAGE_FORM_KEY);

            browserCookies.set('locale', language);

            window.location.href = `${KIOSK_REG_PAGE_URL}/${PURPOSE_OF_VISIT_WIZARD_STEP_ID}?lang=${language}`;
            return true;
        },
    },
    {
        id: PURPOSE_OF_VISIT_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            purposeOfVisit: Yup.string().required(
                formatText('registration.likeTodo.selectPurpose')
            ),
        }),
        initialValues: {
            purposeOfVisit: KIOSK_PURPOSE_OF_VISIT_WALKIN,
        },
        onAction: (stepValues, formValues, stepFormActions, wizard) => {
            cookies.set(
                kioskPurposeOfVisitCookieVariableName,
                stepValues.purposeOfVisit,
                {
                    expires: 0,
                }
            );

            if (stepValues.purposeOfVisit === 'checkIn') {
                wizard.push(CHECK_IN_WITH_APPOINTMENT_CODE_STEP_ID);
                return true;
            }

            wizard.push(LOGIN_WIZARD_STEP_ID);
            return true;
        },
    },
    {
        id: CHECK_IN_WITH_APPOINTMENT_CODE_STEP_ID,
    },
    {
        id: LOGIN_WIZARD_STEP_ID,
        initialValues: {
            isPinValid: false,
            emailOrPhoneNumber: '',
            isCodeSent: false,
            code: '',
            firstName: '',
            middleName: '',
            lastName: '',
        },
        validationSchema: Yup.object().shape({
            mode: Yup.string().required(),
            emailOrPhoneNumber: Yup.string()
                .required(formatText('registration.signIn.fieldIsRequired'))
                .test(
                    'is phone number or email valid',
                    formatText('registration.signIn.useValid'),
                    validatePhoneOrEmail
                ),
        }),
    },
    // only if user clicks sign-up in login
    {
        id: GET_PATIENT_NAME_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
        }),
    },
    { id: TERMS_WIZARD_STEP_ID },
    // only if user clicks sign-up in login
    {
        id: REGISTER_WIZARD_STEP_ID,
        initialValues: {
            isPinValid: false,
            isCodeSent: false,
            code: '',
            firstName: '',
            middleName: '',
            lastName: '',
        },
        validationSchema: Yup.object().shape({
            isPinValid: Yup.mixed().oneOf(
                [true],
                formatText('registration.stepTwo.provideValidPin')
            ),
        }),
        onAction: () => {
            cookies.set(kioskIsAccountNewCookieVariableName, 'true', {
                expires: 0,
            });
        },
    },
    {
        id: SELECT_APPOINTMENT_TO_CHECK_IN_STEP_ID,
    },
    // TO do: allow onAction to be called even if on last step
    {
        id: 'empty-step',
    },
];

const redirectToKioskPage = router =>
    router.push(
        `${KIOSK_URL}/${
            getKioskPageWizardSteps({})[0].id // go to the first step of kiosk page
        }`
    );

class KioskRegPage extends Component {
    constructor(props) {
        super(props);
        onLogoutWithoutRedirect();
        cookies.erase(kioskPurposeOfVisitCookieVariableName);
        cookies.erase(kioskIsAccountNewCookieVariableName);
        cookies.erase(KIOSK_SELECTED_FAMILY_MEMBER);

        // KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME cookie is not set, redirect to office set-up page
        if (
            _isEmpty(cookies.get(KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME)) &&
            !localStorage.getItem(KIOSK_OFFICE_ID_COOKIE_VARIABLE_NAME)
        ) {
            this.props.router.push(KIOSK_OFFICE_SETUP_PAGE_URL);
        }
    }

    setReference = node => {
        this.pinInputRef = node;
    };

    clear = () => {
        if (!_isEmpty(this.pinInputRef)) {
            this.pinInputRef.clear();
        }
    };

    render() {
        // add redirects here
        const formatText = getFormatTextFromProps(this.props);
        const steps = addActionsToWizardSteps({
            actions: [
                {
                    stepId: SELECT_APPOINTMENT_TO_CHECK_IN_STEP_ID,
                    action: () => {
                        redirectToKioskPage(this.props.router);
                        return true;
                    },
                },
                {
                    stepId: LOGIN_WIZARD_STEP_ID,
                    action: (
                        stepValues,
                        formValues,
                        stepFormActions,
                        wizard
                    ) => {
                        const { purposeOfVisit } = formValues[
                            PURPOSE_OF_VISIT_WIZARD_STEP_ID
                        ];

                        if (
                            _get(stepValues, 'hasFamilyMembers') &&
                            purposeOfVisit === 'checkIn'
                        ) {
                            wizard.push(SELECT_APPOINTMENT_TO_CHECK_IN_STEP_ID);
                            return true;
                        }

                        // if current mode is logIn not register, skip register wizard steps and go to next stage
                        if (
                            _get(stepValues, 'mode') === KioskLogIn.LOGIN_MODE
                        ) {
                            redirectToKioskPage(this.props.router);
                            return true;
                        }
                        return false;
                    },
                },
                {
                    stepId: REGISTER_WIZARD_STEP_ID,
                    action: () => {
                        redirectToKioskPage(this.props.router);
                        return true;
                    },
                },
                {
                    stepId: CHECK_IN_WITH_APPOINTMENT_CODE_STEP_ID,
                    action: (
                        stepValues,
                        formValues,
                        stepFormActions,
                        wizard
                    ) => {
                        if (stepValues.hasAppointmentCode) {
                            redirectToKioskPage(this.props.router);
                        } else {
                            wizard.push(LOGIN_WIZARD_STEP_ID);
                        }
                        return true;
                    },
                },
            ],
            wizardSteps: getKioskRegWizardSteps({ formatText }),
        });

        const render = props => {
            let step;

            // in order
            switch (props.actions.currentStep) {
                case CHOOSE_LANGUAGE_WIZARD_STEP_ID:
                    step = <ChooseLanguage {...props} />;
                    break;
                case PURPOSE_OF_VISIT_WIZARD_STEP_ID:
                    step = <PurposeOfVisit {...props} />;
                    break;
                case CHECK_IN_WITH_APPOINTMENT_CODE_STEP_ID:
                    step = <CheckInWithAppointmentCode {...props} />;
                    break;
                case LOGIN_WIZARD_STEP_ID:
                    step = (
                        <LoginStep
                            setReference={this.setReference}
                            clear={this.clear}
                            {...props}
                        />
                    );
                    break;
                // optional
                case GET_PATIENT_NAME_WIZARD_STEP_ID:
                    step = <PatientName {...props} />;
                    break;
                // optional
                case TERMS_WIZARD_STEP_ID:
                    step = <KioskTerms {...props} />;
                    break;
                // optional
                case REGISTER_WIZARD_STEP_ID:
                    step = (
                        <RegisterStep
                            defaultNumberEmailValue={
                                props.values[LOGIN_WIZARD_STEP_ID]
                                    .emailOrPhoneNumber
                            }
                            setReference={this.setReference}
                            clear={this.clear}
                            {...props}
                        />
                    );
                    break;
                case SELECT_APPOINTMENT_TO_CHECK_IN_STEP_ID:
                    step = <SelectAppointmentForCheckIn {...props} />;
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

        return (
            <Box className="kiosk-reg-page">
                <Progress
                    steps={getKioskPageProgressSteps(formatText)}
                    step={1}
                    percent={20}
                />
                <Wizard
                    Form="form"
                    withRoutingHistory
                    render={wizardProps => (
                        <React.Fragment>
                            {wizardProps.actions.canGoBack && (
                                <Onboarding.PreviousButton
                                    goToPreviousStep={
                                        wizardProps.actions.goToPreviousStep
                                    }
                                />
                            )}
                            {render({
                                ...wizardProps,
                                ...this.props,
                            })}
                        </React.Fragment>
                    )}
                    steps={steps}
                />
            </Box>
        );
    }
}
export default _flowRight(withRouter, injectIntl)(KioskRegPage);
