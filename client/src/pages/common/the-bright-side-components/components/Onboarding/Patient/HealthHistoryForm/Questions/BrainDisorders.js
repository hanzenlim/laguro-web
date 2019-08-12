import { Box, Flex, TextArea } from '@laguro/basic-components';
import React from 'react';
import _range from 'lodash/range';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';

const GLAUCOMA = 'Glaucoma';
const STROKE = 'Stroke';
const EPILEPSY = 'Epilepsy';
const FAINTING_SPELLS_OR_SEIZURES = 'Fainting spells or seizures';
const SLEEPING_DISORDERS = 'Sleeping disorders';
const NEUROLOGICAL_DISORDERS = 'Neurological disorders';
const NEUROLOGICAL_DISORDERS_PLEASE_SPECIFY =
    'Neurological disorders (Please specify)';
const NIGHT_SWEATS = 'Night sweats';
const MENTAL_HEALTH_DISORDERS = 'Mental health disorders';
const MENTAL_HEALTH_DISORDERS_PLEASE_SPECIFY =
    'Mental health disorders (Please specify)';
const SEVERE_HEADACHES_OR_MIGRAINES = 'Severe headaches or migraines';

const questionConfigs = [
    {
        name: GLAUCOMA,
        value: false,
    },
    {
        name: STROKE,
        value: false,
    },
    {
        name: EPILEPSY,
        value: false,
    },
    {
        name: FAINTING_SPELLS_OR_SEIZURES,
        value: false,
    },
    {
        name: SLEEPING_DISORDERS,
        value: false,
    },
    {
        name: NEUROLOGICAL_DISORDERS,
        value: false,
    },
    {
        name: NEUROLOGICAL_DISORDERS_PLEASE_SPECIFY,
        value: '',
    },
    {
        name: NIGHT_SWEATS,
        value: false,
    },
    {
        name: MENTAL_HEALTH_DISORDERS,
        value: false,
    },
    {
        name: MENTAL_HEALTH_DISORDERS_PLEASE_SPECIFY,
        value: '',
    },
    {
        name: SEVERE_HEADACHES_OR_MIGRAINES,
        value: false,
    },
];

class BrainDisorders extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [GLAUCOMA]: props => {
                const key = GLAUCOMA;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.glaucoma'
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
            [STROKE]: props => {
                const key = STROKE;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.stroke'
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
            [EPILEPSY]: props => {
                const key = EPILEPSY;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.epilepsy'
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
            [FAINTING_SPELLS_OR_SEIZURES]: props => {
                const key = FAINTING_SPELLS_OR_SEIZURES;

                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.faintingSpells'
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
            [SLEEPING_DISORDERS]: props => {
                const key = SLEEPING_DISORDERS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.sleepingDisorders'
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
            [NEUROLOGICAL_DISORDERS]: props => {
                const key = NEUROLOGICAL_DISORDERS;

                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.neurologicalDisorders'
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
            [NEUROLOGICAL_DISORDERS_PLEASE_SPECIFY]: props => {
                if (!props.formikProps.values[NEUROLOGICAL_DISORDERS]) {
                    return null;
                }

                const key = NEUROLOGICAL_DISORDERS_PLEASE_SPECIFY;

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
            [NIGHT_SWEATS]: props => {
                const key = NIGHT_SWEATS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.nightSweats'
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
            [MENTAL_HEALTH_DISORDERS]: props => {
                const key = MENTAL_HEALTH_DISORDERS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.mentalHealthDisorders'
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
            [MENTAL_HEALTH_DISORDERS_PLEASE_SPECIFY]: props => {
                if (!props.formikProps.values[MENTAL_HEALTH_DISORDERS]) {
                    return null;
                }
                const key = MENTAL_HEALTH_DISORDERS_PLEASE_SPECIFY;

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
            [SEVERE_HEADACHES_OR_MIGRAINES]: props => {
                const key = SEVERE_HEADACHES_OR_MIGRAINES;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.brainDisorders.severeHeadaches'
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
                        'medicalHistoryForm.brainDisorders.brainDisorders'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />

                <Box>
                    {_range(11).map(i =>
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

export default injectIntl(BrainDisorders);
