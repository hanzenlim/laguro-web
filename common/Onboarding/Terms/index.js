import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from '~/components';
import { getRedirectUrl, redirect } from '~/util/history';
import { PATIENT_WEB_ONBOARDING_PAGE_URL } from '~/util/urls';
import { setSessionCookie } from '~/util/cookieUtils';
import { PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME } from '~/routes/PatientWebOnboardingPage';
import { KioskTerms } from '~/common/KioskTerms';
import { Wizard, Onboarding } from '~/common/the-bright-side-components';

const TERMS_WIZARD_STEP_ID = 'terms';

const steps = [
    {
        id: TERMS_WIZARD_STEP_ID,
    },
];

const render = props => {
    let step = null;

    switch (props.actions.currentStep) {
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

const KioskTermsPage = componentProps => (
    <Box pt={48}>
        <Wizard
            Form="form"
            render={props => (
                <React.Fragment>
                    {props.actions.canGoBack && (
                        <StyledPreviousButtonContainer>
                            <Onboarding.PreviousButton
                                goToPreviousStep={
                                    props.actions.goToPreviousStep
                                }
                            />
                        </StyledPreviousButtonContainer>
                    )}
                    {render({ ...props, ...componentProps })}
                </React.Fragment>
            )}
            onSubmit={() => {
                redirect({
                    url: PATIENT_WEB_ONBOARDING_PAGE_URL,
                });
                setSessionCookie(
                    PATIENT_WEB_ONBOARDING_PAGE_REDIRECT_TO_COOKIE_VARIABLE_NAME,
                    getRedirectUrl()
                );
            }}
            steps={steps}
        />
    </Box>
);

export default KioskTermsPage;
