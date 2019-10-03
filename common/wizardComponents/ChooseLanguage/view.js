import * as React from 'react';
import Onboarding from '~/common/the-bright-side-components/components/Onboarding';
import AppleIcon from '~/common/the-bright-side-components/components/Onboarding/Assets/appleIcon';
import { Flex } from '~/components';
import { ENGLISH_CODE, SPANISH_CODE } from '~/strings/languageStrings';

export const KIOSK_FLOW_LANGUAGE_FORM_KEY = 'kioskFlowLanguage';

class ChooseLanguageView extends React.PureComponent {
    render() {
        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <AppleIcon />
                <Onboarding.StepTitleText text="Welcome!" />
                <Onboarding.StepBlurbText text="Select your preferred language" />

                <Onboarding.Choices
                    formKey={KIOSK_FLOW_LANGUAGE_FORM_KEY}
                    namesAndTexts={[
                        {
                            name: ENGLISH_CODE,
                            text: 'English',
                        },
                        {
                            name: SPANISH_CODE,
                            text: 'Español',
                        },
                    ]}
                    {...this.props}
                />
                <Onboarding.NextButton
                    onClick={() => {
                        this.props.formikProps.submitForm();
                    }}
                />
            </Flex>
        );
    }
}

export default ChooseLanguageView;
