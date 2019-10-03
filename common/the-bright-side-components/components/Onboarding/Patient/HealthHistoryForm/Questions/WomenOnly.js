import { Box, Flex } from '~/components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    getYesOrNoNamesAndTexts,
    renderQuestionComponent,
} from '~/util/questionUtils';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '~/util/intlUtils';

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
                if (props.formikProps.values[PREGNANT] !== 'Yes') {
                    return null;
                }
                const key = PREGNANCY_LENGTH;
                return (
                    <Box mb="5px">
                        <Onboarding.Select
                            placeholder={formatText('general.howManyWeeks')}
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
                if (props.formikProps.values[PREGNANT] !== 'Yes') {
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
                if (props.formikProps.values[PREGNANT] !== 'Yes') {
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
                    text={formatText('medicalHistoryForm.womenOnly.womenOnly')}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'medicalHistoryForm.womenOnly.pleaseCompleteIfPregnant'
                    )}
                />

                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            'medicalHistoryForm.womenOnly.areYouPregnant'
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
                        ? formatText('general.next')
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(WomenOnly);
