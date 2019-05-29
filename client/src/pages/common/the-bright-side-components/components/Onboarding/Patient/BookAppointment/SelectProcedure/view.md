import * as React from 'react';
import styled from 'styled-components';

import { Box, Flex, Grid } from '@laguro/basic-components';
import Onboarding, { LastMargin } from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';

const CustomGrid = styled(Grid)`
    grid-template-columns: 1fr 1fr 1fr;

    @media only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
        grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-device-width: 834px) and (max-device-width: 834px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
        grid-template-columns: 1fr 1fr;
    }
`;

const SelectProcedureView = props => {
    return (
        <Box mx="auto">
            <Flex justifyContent="center">
                <ToolsIcon />
            </Flex>
            <Onboarding.StepTitleText text="What is your reason of visit today?" />
            <Onboarding.StepBlurbText text="Let us know what you need so that we could find you the best dentists around according to your needs." />

            <Box mb={LastMargin}>
                <CustomGrid>
                    {Object.keys(props.procedureList).map(p => (
                        <Onboarding.Checkbox
                            key={p}
                            field={p}
                            value={props.formikProps.values[p]}
                            onClick={() => props.formikProps.setFieldValue(p, !props.formikProps.values[p])}
                        />
                    ))}
                </CustomGrid>
            </Box>
            <Onboarding.NextButton
                onClick={() => {
                    // TODO: Move this validation to laguro-web
                    if (!Object.values(props.formikProps.values).includes(true)) {
                        return;
                    }

                    props.formikProps.submitForm();
                }}
            />
            {props.formikProps.submitCount !== 0 && Object.keys(props.formikProps.errors).length !== 0 && (
                <Onboarding.RequiredFieldsMessage />
            )}
        </Box>
    );
};

export default SelectProcedureView;
