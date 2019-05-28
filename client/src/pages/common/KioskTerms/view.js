import * as React from 'react';
import { Box } from '../../../components';
import { Terms } from '../Terms';
import { Onboarding } from '../the-bright-side-components';

const KioskTermsView = props => (
    <Box height={['calc(100vh - 170px)', '', 'calc(100vh - 200px)']}>
        <Onboarding.StepTitleText text="Terms & Conditions" />
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
            loading={props.isSubmitting}
            onClick={() => props.formikProps.submitForm()}
        >
            Agree
        </Onboarding.NextButton>
    </Box>
);

export default KioskTermsView;
