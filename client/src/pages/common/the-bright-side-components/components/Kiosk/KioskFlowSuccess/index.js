import { Box, Button, Flex, Text } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../../Onboarding';
import CongratsIcon from '../../Onboarding/Assets/congratsIcon';
import { injectIntl } from 'react-intl';
import {
    FINAL_CONGRATS,
    FINAL_THANKYOUFORCOMPLETING,
    FINAL_PLEASETAKEASEAT,
    GENERAL_DONE,
} from '../../../../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../../../../util/intlUtils';

class KioskFlowSuccessClass extends React.Component {
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
                    text={`${formatText(FINAL_CONGRATS)}, ${name}`}
                />
                <Box mx="auto" mt="50px">
                    <CongratsIcon />
                </Box>
                <Box mb="20px" mt="60px">
                    <Text textAlign="center" fontSize="16px" color="#303449">
                        {formatText(FINAL_THANKYOUFORCOMPLETING)}
                    </Text>
                </Box>
                <Box>
                    <Text textAlign="center" fontSize="16px" color="#303449">
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

export const KioskFlowSuccess = injectIntl(KioskFlowSuccessClass);
