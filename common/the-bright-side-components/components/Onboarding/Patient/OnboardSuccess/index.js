import { Box, Button, Flex , Text } from '~/components';
import * as React from 'react';
import Onboarding from '../../../Onboarding';
import CongratsIcon from '../../Assets/congratsIcon';

import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '~/util/intlUtils';

class OnboardSuccessClass extends React.Component {
    render() {
        const { name = '' } = this.props;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <Onboarding.StepTitleText
                    text={`${formatText('final.welcomeAboard')}, ${name}`}
                />
                <Box mx="auto" mt="50px">
                    <CongratsIcon />
                </Box>
                <Box mb="20px" mt="60px">
                    <Text textAlign="center" fontSize="16px" color="#303449">
                        {formatText('final.thankYou')}
                    </Text>
                    <Text textAlign="center" fontSize="16px" color="#303449">
                        {formatText('final.officiallyLaguroPatient')}
                    </Text>
                </Box>
                <Box>
                    <Text
                        multiline
                        textAlign="center"
                        fontSize="16px"
                        color="#303449"
                    >
                        {formatText('final.pleaseTakeASeat')}
                    </Text>
                </Box>
                <Box mt="40px">
                    <Button onClick={this.props.onNext}>
                        {formatText('general.done')}
                    </Button>
                </Box>
            </Flex>
        );
    }
}

export const OnboardSuccess = injectIntl(OnboardSuccessClass);
