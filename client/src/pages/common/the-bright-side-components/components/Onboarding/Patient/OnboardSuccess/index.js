import { Box, Button, Flex } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../../Onboarding';
import CongratsIcon from '../../Assets/congratsIcon';
import {
    FINAL_WELCOMEABOARD,
    FINAL_THANKYOU,
    FINAL_OFFICIALLYLAGUROPATIENT,
    FINAL_PLEASETAKEASEAT,
    GENERAL_DONE,
} from '../../../../../../../strings/messageStrings';
import { Text } from '../../../../../../../components';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../util/intlUtils';

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
                    text={`${formatText(FINAL_WELCOMEABOARD)}, ${name}`}
                />
                <Box mx="auto" mt="50px">
                    <CongratsIcon />
                </Box>
                <Box mb="20px" mt="60px">
                    <Text textAlign="center" fontSize="16px" color="#303449">
                        {formatText(FINAL_THANKYOU)}
                    </Text>
                    <Text textAlign="center" fontSize="16px" color="#303449">
                        {formatText(FINAL_OFFICIALLYLAGUROPATIENT)}
                    </Text>
                </Box>
                <Box>
                    <Text
                        multiline
                        textAlign="center"
                        fontSize="16px"
                        color="#303449"
                    >
                        {formatText(FINAL_PLEASETAKEASEAT)}
                    </Text>
                </Box>
                <Box mt="40px">
                    <Button onClick={this.props.onNext}>
                        {formatText(GENERAL_DONE)}
                    </Button>
                </Box>
            </Flex>
        );
    }
}

export const OnboardSuccess = injectIntl(OnboardSuccessClass);
