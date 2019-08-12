import { Box, Flex, Grid } from '@laguro/basic-components';
import * as React from 'react';
import Onboarding from '../..';
import AppleIcon from '../../Assets/appleIcon';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../util/intlUtils';

const FIRST_NAME_FORM_INPUT_NAME = 'firstName';
const MIDDLE_NAME_FORM_INPUT_NAME = 'middleName';
const LAST_NAME_FORM_INPUT_NAME = 'lastName';

class GetPatientNameView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Box width={329} maxWidth="100%">
                <Flex justifyContent="center">
                    <AppleIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('registration.stepOne.stepOne')}
                />
                <Onboarding.StepBlurbText
                    text={formatText('registration.stepOne.typeLegalName')}
                />

                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}
                    gridColumnGap="11px"
                >
                    <Box>
                        <Onboarding.FormItemLabelText
                            text={formatText('registration.stepOne.firstName')}
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
                            text={formatText('registration.stepOne.middleName')}
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
                    text={formatText('registration.stepOne.lastName')}
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
                    {formatText('general.next')}
                </Onboarding.NextButton>
                {this.props.formikProps.submitCount !== 0 &&
                    Object.keys(this.props.formikProps.errors).length !== 0 && (
                        <Onboarding.RequiredFieldsMessage
                            text={formatText('general.pleaseFill')}
                        />
                    )}
            </Box>
        );
    }
}

export default injectIntl(GetPatientNameView);
