import * as React from 'react';
import styled from 'styled-components';

import { Box, Flex, Grid } from '@laguro/basic-components';
import Onboarding, { LastMargin } from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import { injectIntl } from 'react-intl';
import {
    BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT,
    BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW,
} from '../../../../../../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { PROCEDURE_TEXTS } from '../../../../../../../../util/procedureUtils';

const CustomGrid = styled(Grid)`
    grid-template-columns: 1fr 1fr 1fr;

    @media only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
        grid-template-columns: 1fr 1fr;
    }

    @media only screen and (min-device-width: 834px) and (max-device-width: 834px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
        grid-template-columns: 1fr 1fr;
    }
`;

class SelectProcedureClass extends React.Component {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box mx="auto">
                <Flex justifyContent="center">
                    <ToolsIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(
                        BOOKAPPOINTMENT_REASONOFVISIT_REASONOFVISIT
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(BOOKAPPOINTMENT_REASONOFVISIT_LETUSKNOW)}
                />
                <Box mb={LastMargin}>
                    <CustomGrid>
                        {Object.keys(this.props.procedureList).map(p => (
                            <Onboarding.Checkbox
                                key={p}
                                field={formatText(PROCEDURE_TEXTS[p])}
                                value={this.props.formikProps.values[p]}
                                onClick={() =>
                                    this.props.formikProps.setFieldValue(
                                        p,
                                        !this.props.formikProps.values[p]
                                    )
                                }
                            />
                        ))}
                    </CustomGrid>
                </Box>
                <Onboarding.NextButton
                    onClick={() => {
                        // TODO: Move this validation to laguro-web
                        if (
                            !Object.values(
                                this.props.formikProps.values
                            ).includes(true)
                        ) {
                            return;
                        }
                        this.props.formikProps.submitForm();
                    }}
                />
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage />
                    )}
            </Box>
        );
    }
}

export const SelectProcedure = injectIntl(SelectProcedureClass);
