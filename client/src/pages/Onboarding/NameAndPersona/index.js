import React from 'react';
import {
    Wizard,
    PreviousButton,
    PersonaSelection,
} from '@laguro/the-bright-side-components';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Flex, Box } from '@laguro/basic-components';
import { getRedirectUrl, redirect } from '../../../history';
import {
    DENTIST_ONBOARDING_PROFILE_URL,
    PATIENT_WEB_ONBOARDING_PAGE_URL,
} from '../../../util/urls';
import { setSessionCookie } from '../../../util/cookieUtils';
import { PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME } from '../../PatientWebOnboardingPage';
import { KioskTerms } from '../../common/KioskTerms';

const PERSONA_SELECTION_WIZARD_STEP_ID = 'persona-selection';
const TERMS_WIZARD_STEP_ID = 'terms';

const steps = [
    {
        id: PERSONA_SELECTION_WIZARD_STEP_ID,
        validationSchema: Yup.object().shape({
            persona: Yup.string().required('Persona is required'),
        }),
    },
    {
        id: TERMS_WIZARD_STEP_ID,
    },
];

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
        case PERSONA_SELECTION_WIZARD_STEP_ID:
            step = <PersonaSelection {...props} />;
            break;
        case TERMS_WIZARD_STEP_ID:
            step = <KioskTerms {...props} />;
            break;
        default:
            step = <div />;
    }

    return (
        <Flex justifyContent="center" mt={50}>
            {step}
        </Flex>
    );
};

const StyledPreviousButtonContainer = styled(Box)`
    && .onboarding-previous-button {
        position: absolute;
        top: 72px;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
            top: 100px;
        }
    }
`;

const KioskNameAndPersonaPage = componentProps => (
    <Box pt={48}>
        <Wizard
            Form="form"
            render={props => (
                <React.Fragment>
                    {props.actions.canGoBack && (
                        <StyledPreviousButtonContainer>
                            <PreviousButton
                                goToPreviousStep={
                                    props.actions.goToPreviousStep
                                }
                            />
                        </StyledPreviousButtonContainer>
                    )}
                    {render({ ...props, ...componentProps })}
                </React.Fragment>
            )}
            onSubmit={objectOfObjectOfStepValues => {
                const objectOfValues = Object.values(
                    objectOfObjectOfStepValues
                ).reduce((objectOfValues, currentObject) => ({
                    ...objectOfValues,
                    ...currentObject,
                }));

                switch (objectOfValues.persona) {
                    case 'patient':
                        redirect({
                            url: PATIENT_WEB_ONBOARDING_PAGE_URL,
                        });
                        setSessionCookie(
                            PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME,
                            getRedirectUrl()
                        );
                        break;
                    case 'dentist':
                        redirect({
                            url: DENTIST_ONBOARDING_PROFILE_URL,
                            newSearchParamKey: 'referer',
                            newSearchParamValue: 'PersonaSelection',
                        });
                        break;
                    case 'host':
                        // hostOnboarding does not redirect
                        redirect({
                            url: '/host-onboarding/add-office',
                        });
                        break;
                    default:
                        break;
                }
            }}
            steps={steps}
        />
    </Box>
);

export default KioskNameAndPersonaPage;
