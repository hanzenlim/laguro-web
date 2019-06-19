import * as React from 'react';
import { Box } from '../../../components';
import { Terms } from '../Terms';
import { Onboarding } from '../the-bright-side-components';
import {
    BOOKAPPOINTMENT_TERMS_TERMS,
    BOOKAPPOINTMENT_TERMS_AGREE,
} from '../../../strings/messageStrings';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../util/intlUtils';

class KioskTermsView extends React.Component {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box height={['calc(100vh - 170px)', '', 'calc(100vh - 200px)']}>
                <Onboarding.StepTitleText
                    text={formatText(BOOKAPPOINTMENT_TERMS_TERMS)}
                />
                <Box
                    p="16px"
                    background="#f9f9f9"
                    m="20px auto"
                    width="80%"
                    height="calc(100% - 138px)"
                    style={{ overflow: 'scroll' }}
                >
                    <Terms />
                </Box>
                <Onboarding.NextButton
                    loading={this.props.isSubmitting}
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    {formatText(BOOKAPPOINTMENT_TERMS_AGREE)}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(KioskTermsView);
