import { Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import _range from 'lodash/range';
import {
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVEEARACHES,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVEANYCLICKING,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_GRINDTEETH,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVESORES,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_WEARDENTURES,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_ACTIVERECREATIONALACTIVITIES,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_SERIOUSINJURY,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_GENERALDENTALINFORMATION,
    GENERAL_PLEASE_CHOOSE,
} from '../../../../../../../../strings/messageStrings';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

const EARACHES = 'Do you have earaches or neck pains?';
const JAW_ISSUE = 'Do you have any clicking, popping or discomfort in the jaw?';
const TEETH_GRINDING = 'Do you brux or grind your teeth?';
const MOUTH_SORES = 'Do you have sores or ulcers in your mouth?';
const DENTURES = 'Do you wear dentures or partials?';
const ACTIVE_REC_ACTIVITIES =
    'Do you participate in active recreational activities?';
const MOUTH_INJURY =
    'Have you ever had a serious injury to your head or mouth?';

const questionConfigs = [
    {
        name: EARACHES,
        value: false,
    },
    {
        name: JAW_ISSUE,
        value: false,
    },
    {
        name: TEETH_GRINDING,
        value: false,
    },
    {
        name: MOUTH_SORES,
        value: false,
    },
    {
        name: DENTURES,
        value: false,
    },
    {
        name: ACTIVE_REC_ACTIVITIES,
        value: false,
    },
    {
        name: MOUTH_INJURY,
        value: false,
    },
];

class GeneralDentalInfo2 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [EARACHES]: props => {
                const key = EARACHES;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVEEARACHES
                        )}
                        width="100%"
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
            [JAW_ISSUE]: props => {
                const key = JAW_ISSUE;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVEANYCLICKING
                        )}
                        width="100%"
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
            [TEETH_GRINDING]: props => {
                const key = TEETH_GRINDING;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_GRINDTEETH
                        )}
                        width="100%"
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
            [MOUTH_SORES]: props => {
                const key = MOUTH_SORES;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_HAVESORES
                        )}
                        width="100%"
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
            [DENTURES]: props => {
                const key = DENTURES;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_WEARDENTURES
                        )}
                        width="100%"
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

            [ACTIVE_REC_ACTIVITIES]: props => {
                const key = ACTIVE_REC_ACTIVITIES;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_ACTIVERECREATIONALACTIVITIES
                        )}
                        width="100%"
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
            [MOUTH_INJURY]: props => {
                const key = MOUTH_INJURY;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_SERIOUSINJURY
                        )}
                        width="100%"
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
                        MEDICALHISTORYFORM_GENERALDENTALINFORMATION2_GENERALDENTALINFORMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASE_CHOOSE)}
                />
                <Flex maxWidth="700px" width="100%" flexDirection="column">
                    {_range(7).map(i =>
                        renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            i,
                            props
                        )
                    )}
                </Flex>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(GeneralDentalInfo2);
