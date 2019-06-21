import { Box, Flex } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    getYesOrNoNamesAndTexts,
    renderQuestionComponent,
} from '../../../../../../../../util/questionUtils';
import {
    GENERAL_HOW_MANY_WEEKS,
    MEDICALHISTORYFORM_WOMENONLY_WOMENONLY,
    MEDICALHISTORYFORM_WOMENONLY_PLEASECOMPLETEIFPREGNANT,
    MEDICALHISTORYFORM_WOMENONLY_AREYOUPREGNANT,
    GENERAL_NEXT,
} from '../../../../../../../../strings/messageStrings';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

const weeks = _range(1, 40).map(i => i.toString());

const PREGNANT = 'Are you pregnant?';
const PREGNANCY_LENGTH = 'How many weeks pregnant?';
const BIRTH_CONTROL = 'Taking birth control or hormonal replacement?';
const NURSING = 'Are you nursing?';

const questionConfigs = [
    {
        name: PREGNANT,
        value: '',
    },
    {
        name: PREGNANCY_LENGTH,
        value: undefined,
    },
    {
        name: BIRTH_CONTROL,
        value: false,
    },
    {
        name: NURSING,
        value: false,
    },
];

class WomenOnly extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [PREGNANT]: props => {
                const key = PREGNANT;
                return (
                    <Onboarding.Choices
                        formKey={key}
                        size="small"
                        submitOnClick={false}
                        namesAndTexts={getYesOrNoNamesAndTexts(formatText)}
                        {...props}
                    />
                );
            },
            [PREGNANCY_LENGTH]: props => {
                if ('Yes' !== props.formikProps.values[PREGNANT]) {
                    return null;
                }
                const key = PREGNANCY_LENGTH;
                return (
                    <Box mb="5px">
                        <Onboarding.Select
                            placeholder={formatText(GENERAL_HOW_MANY_WEEKS)}
                            value={props.formikProps.values[key]}
                            onSelect={value =>
                                props.formikProps.setFieldValue(key, value)
                            }
                        >
                            {weeks.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        </Onboarding.Select>
                    </Box>
                );
            },
            [BIRTH_CONTROL]: props => {
                if ('Yes' !== props.formikProps.values[PREGNANT]) {
                    return null;
                }
                const key = BIRTH_CONTROL;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={key}
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
            [NURSING]: props => {
                if ('Yes' !== props.formikProps.values[PREGNANT]) {
                    return null;
                }
                const key = NURSING;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={key}
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[NURSING]
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
                    text={formatText(MEDICALHISTORYFORM_WOMENONLY_WOMENONLY)}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        MEDICALHISTORYFORM_WOMENONLY_PLEASECOMPLETEIFPREGNANT
                    )}
                />

                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_WOMENONLY_AREYOUPREGNANT
                        )}
                    />
                    {_range(4).map(i =>
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
                >
                    {props.formikProps.dirty
                        ? formatText(GENERAL_NEXT)
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(WomenOnly);