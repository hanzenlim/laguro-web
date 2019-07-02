import { Box, Flex, Grid } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../..';
import AppleIcon from '../../Assets/appleIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../util/intlUtils';
import {
    GENERAL_NEXT,
    GENERAL_PLEASEFILL,
} from '../../../../../../../strings/messageStrings';

const FIRST_NAME_FORM_INPUT_NAME = 'firstName';
const MIDDLE_NAME_FORM_INPUT_NAME = 'middleName';
const LAST_NAME_FORM_INPUT_NAME = 'lastName';

const REGISTRATION_STEPONE_STEPONE = 'registration.stepOne.stepOne';
const REGISTRATION_STEPONE_TYPELEGALNAME = 'registration.stepOne.typeLegalName';
const REGISTRATION_STEPONE_FIRSTNAME = 'registration.stepOne.firstName';
const REGISTRATION_STEPONE_MIDDLENAME = 'registration.stepOne.middleName';
const REGISTRATION_STEPONE_LASTNAME = 'registration.stepOne.lastName';

class GetPatientNameView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Box width={329} maxWidth="100%">
                <Flex justifyContent="center">
                    <AppleIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText(REGISTRATION_STEPONE_STEPONE)}
                />
                <Onboarding.StepBlurbText
                    text={formatText(REGISTRATION_STEPONE_TYPELEGALNAME)}
                />

                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}
                    gridColumnGap="11px"
                >
                    <Box>
                        <Onboarding.FormItemLabelText
                            text={formatText(REGISTRATION_STEPONE_FIRSTNAME)}
                        />
                        <Onboarding.Input
                            type="text"
                            name={FIRST_NAME_FORM_INPUT_NAME}
                            value={
                                this.props.formikProps.values[
                                    FIRST_NAME_FORM_INPUT_NAME
                                ]
                            }
                            onChange={e =>
                                this.props.formikProps.setFieldValue(
                                    FIRST_NAME_FORM_INPUT_NAME,
                                    e.target.value
                                )
                            }
                        />
                    </Box>

                    <Box>
                        <Onboarding.FormItemLabelText
                            text={formatText(REGISTRATION_STEPONE_MIDDLENAME)}
                        />
                        <Onboarding.Input
                            type="text"
                            name={MIDDLE_NAME_FORM_INPUT_NAME}
                            value={
                                this.props.formikProps.values[
                                    MIDDLE_NAME_FORM_INPUT_NAME
                                ]
                            }
                            onChange={e =>
                                this.props.formikProps.setFieldValue(
                                    MIDDLE_NAME_FORM_INPUT_NAME,
                                    e.target.value
                                )
                            }
                        />
                    </Box>
                </Grid>

                <Onboarding.FormItemLabelText
                    text={formatText(REGISTRATION_STEPONE_LASTNAME)}
                />
                <Onboarding.Input
                    type="text"
                    name={LAST_NAME_FORM_INPUT_NAME}
                    value={
                        this.props.formikProps.values[LAST_NAME_FORM_INPUT_NAME]
                    }
                    onChange={e =>
                        this.props.formikProps.setFieldValue(
                            LAST_NAME_FORM_INPUT_NAME,
                            e.target.value
                        )
                    }
                />

                <Onboarding.NextButton
                    onClick={async () => {
                        await this.props.formikProps.submitForm();
                        await this.props.onNext();
                    }}
                >
                    {formatText(GENERAL_NEXT)}
                </Onboarding.NextButton>
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage
                            text={formatText(GENERAL_PLEASEFILL)}
                        />
                    )}
            </Box>
        );
    }
}

export default injectIntl(GetPatientNameView);
