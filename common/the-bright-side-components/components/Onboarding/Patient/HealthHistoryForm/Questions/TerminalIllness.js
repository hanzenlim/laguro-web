import { Box, Flex, TextArea } from '~/components';
import React from 'react';
import _range from 'lodash/range';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '~/util/questionUtils';

const RECURRENT_INFECTIONS = 'Recurrent infections';
const RECURRENT_INFECTIONS_PLEASE_SPECIFY =
    'Recurrent infections (Please specify)';
const HIV_OR_AIDS = 'HIV or AIDS';
const HEPATITIS = 'Hepatitis';
const SEXUALLY_TRANSMITTED_DISEASES = 'Sexually transmitted diseases';
const SEXUALLY_TRANSMITTED_DISEASES_PLEASE_SPECIFY =
    'Sexually transmitted diseases (Please specify)';

const questionConfigs = [
    {
        name: RECURRENT_INFECTIONS,
        value: false,
    },
    {
        name: RECURRENT_INFECTIONS_PLEASE_SPECIFY,
        value: '',
    },
    {
        name: HIV_OR_AIDS,
        value: false,
    },
    {
        name: HEPATITIS,
        value: false,
    },
    {
        name: SEXUALLY_TRANSMITTED_DISEASES,
        value: false,
    },
    {
        name: SEXUALLY_TRANSMITTED_DISEASES_PLEASE_SPECIFY,
        value: '',
    },
];

class TerminalIllness extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [RECURRENT_INFECTIONS]: props => {
                const key = RECURRENT_INFECTIONS;

                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.terminalIllness.nameRecurrentInfections'
                        )}
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [RECURRENT_INFECTIONS_PLEASE_SPECIFY]: props => {
                if (!props.formikProps.values[RECURRENT_INFECTIONS]) {
                    return null;
                }

                const key = RECURRENT_INFECTIONS_PLEASE_SPECIFY;

                return (
                    <TextArea
                        placeholder={formatText('general.pleaseSpecify')}
                        value={props.formikProps.values[key]}
                        onChange={value =>
                            props.formikProps.setFieldValue(
                                key,
                                value.target.value
                            )
                        }
                        height="180px"
                    />
                );
            },
            [HIV_OR_AIDS]: props => {
                const key = HIV_OR_AIDS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.terminalIllness.hivOrAids'
                        )}
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [HEPATITIS]: props => {
                const key = HEPATITIS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.terminalIllness.hepatitis'
                        )}
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [SEXUALLY_TRANSMITTED_DISEASES]: props => {
                const key = SEXUALLY_TRANSMITTED_DISEASES;

                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.terminalIllness.sexuallyTransmittedDiseases'
                        )}
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [SEXUALLY_TRANSMITTED_DISEASES_PLEASE_SPECIFY]: props => {
                if (!props.formikProps.values[SEXUALLY_TRANSMITTED_DISEASES]) {
                    return null;
                }

                const key = SEXUALLY_TRANSMITTED_DISEASES_PLEASE_SPECIFY;

                return (
                    <TextArea
                        placeholder={formatText('general.pleaseSpecify')}
                        value={props.formikProps.values[key]}
                        onChange={value =>
                            props.formikProps.setFieldValue(
                                key,
                                value.target.value
                            )
                        }
                        height="180px"
                    />
                );
            },
        };
    }

    render() {
        const props = this.props;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        'medicalHistoryForm.terminalIllness.terminalIllness'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />

                <Box>
                    {_range(6).map(i =>
                        renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            i,
                            props
                        )
                    )}
                </Box>
                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(TerminalIllness);
