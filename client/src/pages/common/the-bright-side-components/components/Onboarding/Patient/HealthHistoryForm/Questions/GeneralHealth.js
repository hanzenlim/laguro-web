import { Box, Flex, TextArea } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import { injectIntl } from 'react-intl';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    getIntlMonth,
    getIntlYear,
    getFormatDateFromProps,
    getIntlYes,
    getIntlNo,
    getFormatTextFromProps,
    getIntlMonths,
} from '../../../../../../../../util/intlUtils';
import {
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_INGOODHEALTH,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_GENERALHEALTHCHANGES,
    GENERAL_PLEASEEXPLAIN,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_BEINGTREATED,
    GENERAL_PLEASE_LIST,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION4_HADANORTHOPEDICJOINT,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION4_TAKINGMEDICATION,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_GENERALMEDICALINFORMATION,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_PLEASECOMPLETE,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_LASTPHYSICALEXAM,
    GENERAL_NEXT,
} from '../../../../../../../../strings/messageStrings';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';

export const PHYSICAL_EXAM_MONTH = 'When was your last physical exam? (Month)';
export const PHYSICAL_EXAM_YEAR = 'When was your last physical exam? (Year)';
export const GOOD_HEALTH = 'Are you in good health?';
export const ANY_CHANGES =
    'Any changes in your general health within the past year?';
export const ANY_CHANGES_EXPLANATION =
    'Any changes in your general health within the past year? (Explanation)';
export const ANY_CONDITION =
    'Are you being treated for any conditions? If yes, please list';
export const ANY_CONDITION_LIST =
    'Are you being treated for any conditions? If yes, please list (List)';
export const HOSPITALIZED = 'Have you been hospitalized in the past 5 years?';
export const CURRENT_PRESCRIPTION =
    'Are you currently taking any prescription or over the counter medicine(s)?';

const years = _range(2019, 1900).map(i => i.toString());

const questionConfigs = [
    {
        name: PHYSICAL_EXAM_MONTH,
        value: undefined,
    },
    {
        name: PHYSICAL_EXAM_YEAR,
        value: undefined,
    },
    {
        name: GOOD_HEALTH,
        value: '',
    },
    {
        name: ANY_CHANGES,
        value: '',
    },
    {
        name: ANY_CHANGES_EXPLANATION,
        value: '',
    },
    {
        name: ANY_CONDITION,
        value: '',
    },
    {
        name: ANY_CONDITION_LIST,
        value: '',
    },
    {
        name: HOSPITALIZED,
        value: '',
    },
    {
        name: CURRENT_PRESCRIPTION,
        value: '',
    },
];

class GeneralHealth extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        const months = getIntlMonths(getFormatDateFromProps(this.props));
        this.questionComponents = {
            [PHYSICAL_EXAM_MONTH]: props => {
                const key = PHYSICAL_EXAM_MONTH;
                return (
                    <Box width="160px" height="46px" mr="10px">
                        <Onboarding.Select
                            placeholder={getIntlMonth(formatText)}
                            value={props.formikProps.values[key]}
                            onSelect={value =>
                                props.formikProps.setFieldValue(key, value)
                            }
                        >
                            {months.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        </Onboarding.Select>
                    </Box>
                );
            },
            [PHYSICAL_EXAM_YEAR]: props => {
                const key = PHYSICAL_EXAM_YEAR;
                return (
                    <Box width="160px" height="46px">
                        <Onboarding.Select
                            placeholder={getIntlYear(formatText)}
                            value={props.formikProps.values[key]}
                            onSelect={value =>
                                props.formikProps.setFieldValue(key, value)
                            }
                        >
                            {years.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        </Onboarding.Select>
                    </Box>
                );
            },
            [GOOD_HEALTH]: props => {
                const key = GOOD_HEALTH;
                return (
                    <div>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_INGOODHEALTH
                            )}
                        />
                        <Onboarding.Choices
                            size="small"
                            formKey={key}
                            submitOnClick={false}
                            namesAndTexts={[
                                { name: 'Yes', text: getIntlYes(formatText) },
                                { name: 'No', text: getIntlNo(formatText) },
                            ]}
                            {...props}
                        />
                    </div>
                );
            },
            [ANY_CHANGES]: props => {
                const key = ANY_CHANGES;
                return (
                    <div>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_GENERALHEALTHCHANGES
                            )}
                        />
                        <Onboarding.Choices
                            size="small"
                            formKey={key}
                            submitOnClick={false}
                            namesAndTexts={[
                                { name: 'Yes', text: getIntlYes(formatText) },
                                { name: 'No', text: getIntlNo(formatText) },
                            ]}
                            {...props}
                        />
                    </div>
                );
            },
            [ANY_CHANGES_EXPLANATION]: props => {
                if (props.formikProps.values[ANY_CHANGES] !== 'Yes') {
                    return null;
                }
                const key = ANY_CHANGES_EXPLANATION;
                return (
                    <TextArea
                        placeholder={formatText(GENERAL_PLEASEEXPLAIN)}
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
            [ANY_CONDITION]: props => {
                const key = ANY_CONDITION;
                return (
                    <div>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_BEINGTREATED
                            )}
                            s
                        />
                        <Onboarding.Choices
                            size="small"
                            formKey={key}
                            submitOnClick={false}
                            namesAndTexts={[
                                { name: 'Yes', text: getIntlYes(formatText) },
                                { name: 'No', text: getIntlNo(formatText) },
                            ]}
                            {...props}
                        />
                    </div>
                );
            },
            [ANY_CONDITION_LIST]: props => {
                if ('Yes' !== props.formikProps.values[ANY_CONDITION]) {
                    return null;
                }
                const key = ANY_CONDITION_LIST;
                return (
                    <div>
                        <TextArea
                            placeholder={formatText(GENERAL_PLEASE_LIST)}
                            value={props.formikProps.values[key]}
                            onChange={value =>
                                props.formikProps.setFieldValue(
                                    key,
                                    value.target.value
                                )
                            }
                            height="180px"
                        />
                    </div>
                );
            },
            [HOSPITALIZED]: props => {
                const key = HOSPITALIZED;
                return (
                    <div>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                MEDICALHISTORYFORM_GENERALMEDICALINFORMATION4_HADANORTHOPEDICJOINT
                            )}
                        />
                        <Onboarding.Choices
                            size="small"
                            formKey={key}
                            submitOnClick={false}
                            namesAndTexts={[
                                { name: 'Yes', text: getIntlYes(formatText) },
                                { name: 'No', text: getIntlNo(formatText) },
                            ]}
                            {...props}
                        />
                    </div>
                );
            },
            [CURRENT_PRESCRIPTION]: props => {
                const key = CURRENT_PRESCRIPTION;
                return (
                    <div>
                        <Onboarding.FormItemLabelText
                            text={formatText(
                                MEDICALHISTORYFORM_GENERALMEDICALINFORMATION4_TAKINGMEDICATION
                            )}
                        />
                        <Onboarding.Choices
                            size="small"
                            formKey={key}
                            submitOnClick={false}
                            namesAndTexts={[
                                { name: 'Yes', text: getIntlYes(formatText) },
                                { name: 'No', text: getIntlNo(formatText) },
                            ]}
                            {...props}
                        />
                    </div>
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
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_GENERALMEDICALINFORMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_PLEASECOMPLETE
                    )}
                />

                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION2_LASTPHYSICALEXAM
                        )}
                    />
                    <Flex mb="25px">
                        {renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            0,
                            props
                        )}
                        {renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            1,
                            props
                        )}
                    </Flex>
                    {_range(2, 9).map(i =>
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
                    {formatText(GENERAL_NEXT)}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(GeneralHealth);
