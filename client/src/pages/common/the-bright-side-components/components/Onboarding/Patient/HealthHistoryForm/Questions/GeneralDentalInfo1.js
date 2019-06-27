import { Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import _range from 'lodash/range';
import {
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_TEETHSENSITIVE,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_CATCHBETWEENTEETH,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ISYOURMOUTHDRY,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_PERIODONTALTREATMENTS,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ORTHODONTICTREATMENT,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ANYPROBLEMSASSOCIATED,
    MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_GENERALDENTALINFORMATION,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_PLEASECOMPLETE,
} from '../../../../../../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';

const SENSITIVE_TEETH =
    'Are your teeth sensitive to cold, hot, sweets or pressure?';
const CAUGHT_FOOD = 'Does food or floss catch between your teeth?';
const DRY_MOUTH = 'Is your mouth dry?';
const PERIO_TREATMENTS = 'Have you had any periodontal (gum) treatments?';
const ORTHO_TREATMENTS = 'Have you ever had orthodontic (braces) treatment?';
const PREVIOUS_PROBLEMS =
    'Have you had any problems associated with previous dental treatment?';

const questionConfigs = [
    {
        name: SENSITIVE_TEETH,
        value: false,
    },
    {
        name: CAUGHT_FOOD,
        value: false,
    },
    {
        name: DRY_MOUTH,
        value: false,
    },
    {
        name: PERIO_TREATMENTS,
        value: false,
    },
    {
        name: ORTHO_TREATMENTS,
        value: false,
    },
    {
        name: PREVIOUS_PROBLEMS,
        value: false,
    },
];

class GeneralDentalInfo1 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [SENSITIVE_TEETH]: props => {
                const key = SENSITIVE_TEETH;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_TEETHSENSITIVE
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
            [CAUGHT_FOOD]: props => {
                const key = CAUGHT_FOOD;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_CATCHBETWEENTEETH
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
            [DRY_MOUTH]: props => {
                const key = DRY_MOUTH;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ISYOURMOUTHDRY
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
            [PERIO_TREATMENTS]: props => {
                const key = PERIO_TREATMENTS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_PERIODONTALTREATMENTS
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
            [ORTHO_TREATMENTS]: props => {
                const key = ORTHO_TREATMENTS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ORTHODONTICTREATMENT
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
            [PREVIOUS_PROBLEMS]: props => {
                const key = PREVIOUS_PROBLEMS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_ANYPROBLEMSASSOCIATED
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
                        MEDICALHISTORYFORM_GENERALDENTALINFORMATION1_GENERALDENTALINFORMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_PLEASECOMPLETE
                    )}
                />
                <Flex maxWidth="700px" width="100%" flexDirection="column">
                    {_range(6).map(i =>
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

export default injectIntl(GeneralDentalInfo1);
