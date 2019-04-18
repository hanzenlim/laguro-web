import React, { Component } from 'react';
import * as Yup from 'yup';
import {
    PreviousButton,
    Wizard,
    PurposeOfVisit,
    KioskLogIn,
    Progress,
} from '@laguro/the-bright-side-components';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import cookies from 'browser-cookies';
import { Flex, Box } from '../../components/index';
import { onLogoutWithoutRedirect } from '../../util/authUtils';
import { PatientName } from './StepComponents/GetPatientName';
import { RegisterStep } from './StepComponents/Register';
import { LoginStep } from './StepComponents/LogIn';
import { KIOSK_URL } from '../../util/urls';
import { getKioskPageWizardSteps } from '../KioskPage/getKioskPageWizardSteps';
import { redirect } from '../../history';
import {
    KIOSK_PAGE_PROGRESS_STEPS,
    addActionsToWizardSteps,
} from '../KioskPage/utils';
import { validatePhoneOrEmail } from '../../util/validationUtils';

// in order
// stage 1 registration
export const PURPOSE_OF_VISIT_WIZARD_STEP_ID = 'purpose-of-visit-step';
export const LOGIN_WIZARD_STEP_ID = 'login-step';
export const GET_PATIENT_NAME_WIZARD_STEP_ID = 'get-patient-name-step';
export const REGISTER_WIZARD_STEP_ID = 'register-step';

export const REGISTER_WIZARD_STEP_IDS = [
    GET_PATIENT_NAME_WIZARD_STEP_ID,
    REGISTER_WIZARD_STEP_ID,
];

export const kioskPurposeOfVisitCookieVariableName = 'kioskPurposeOfVisit';
export const kioskIsAccountNewCookieVariableName = 'kioskIsAccountNew';
export const KIOSK_PURPOSE_OF_VISIT_WALKIN = 'walkIn';

// depending on user, some steps will be optional
// onAction will return true if there is an error, return false if there isn't
// add graphql calls to onAction
// eslint-disable-next-line
export const KioskRegWizardSteps = [
    {
        id: PURPOSE_OF_VISIT_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            purposeOfVisit: Yup.string().required(
                'You must select your purpose of visit.'
            ),
        }),
        initialValues: {
            purposeOfVisit: KIOSK_PURPOSE_OF_VISIT_WALKIN,
        },
        onAction: stepValues => {
            cookies.set(
                kioskPurposeOfVisitCookieVariableName,
                stepValues.purposeOfVisit,
                {
                    expires: 0,
                }
            );
        },
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
                .required('This field is required')
                .test(
                    'is phone number or email valid',
                    'Please use a valid email or phone number',
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
                'You must provide a valid pin'
            ),
        }),
        onAction: () => {
            cookies.set(kioskIsAccountNewCookieVariableName, 'true', {
                expires: 0,
            });
        },
    },
    // TO do: allow onAction to be called even if on last step
    {
        id: 'empty-step',
    },
];

const redirectToKioskPage = () =>
    redirect({
        url: `${KIOSK_URL}/${
            getKioskPageWizardSteps({})[0].id // go to the first step of kiosk page
        }`,
    });

class KioskPage extends Component {
    constructor(props) {
        super(props);
        onLogoutWithoutRedirect();
        cookies.erase(kioskPurposeOfVisitCookieVariableName);
        cookies.erase(kioskIsAccountNewCookieVariableName);
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
        const steps = addActionsToWizardSteps({
            actions: [
                {
                    stepId: LOGIN_WIZARD_STEP_ID,
                    action: stepValues => {
                        // if current mode is logIn not register, skip register wizard steps and go to next stage
                        if (
                            _get(stepValues, 'mode') === KioskLogIn.LOGIN_MODE
                        ) {
                            redirectToKioskPage();
                            return true;
                        }
                        return false;
                    },
                },
                {
                    stepId: REGISTER_WIZARD_STEP_ID,
                    action: () => {
                        redirectToKioskPage();
                        return true;
                    },
                },
            ],
            wizardSteps: KioskRegWizardSteps,
        });

        const render = props => {
            let step;

            // in order
            switch (props.actions.currentStep) {
                case PURPOSE_OF_VISIT_WIZARD_STEP_ID:
                    step = <PurposeOfVisit {...props} />;
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
                    steps={KIOSK_PAGE_PROGRESS_STEPS}
                    step={1}
                    percent={20}
                />
                <Wizard
                    Form="form"
                    withRoutingHistory={true}
                    render={wizardProps => (
                        <React.Fragment>
                            {wizardProps.actions.canGoBack && (
                                <PreviousButton
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
export default KioskPage;
