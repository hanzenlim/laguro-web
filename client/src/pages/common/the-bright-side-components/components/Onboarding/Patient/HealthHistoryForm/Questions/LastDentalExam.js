import { Box, Flex } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../..';
import ToothIcon from '../../../Assets/toothIcon';
import {
    MEDICALHISTORYFORM_LASTDENTALEXAM_LASTDENTALEXAM,
    MEDICALHISTORYFORM_LASTDENTALEXAM_DENTALEXAM,
    MEDICALHISTORYFORM_LASTDENTALEXAM_DENTALXRAY,
    GENERAL_NEXT,
    GENERAL_MONTH,
    GENERAL_YEAR,
} from '../../../../../../../../strings/messageStrings';
import {
    getFormatTextFromProps,
    getFormatDateFromProps,
    getIntlMonths,
} from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';

const years = _range(2019, 1900).map(i => i.toString());

const LAST_DENTAL_EXAM_MONTH = 'Last dental exam month';
const LAST_DENTAL_EXAM_YEAR = 'Last dental exam year';
const LAST_DENTAL_XRAY_MONTH = 'Last dental x-ray month';
const LAST_DENTAL_XRAY_YEAR = 'Last dental x-ray year';

const questionConfigs = [
    {
        name: LAST_DENTAL_EXAM_MONTH,
        value: undefined,
    },
    {
        name: LAST_DENTAL_EXAM_YEAR,
        value: undefined,
    },
    {
        name: LAST_DENTAL_XRAY_MONTH,
        value: undefined,
    },
    {
        name: LAST_DENTAL_XRAY_YEAR,
        value: undefined,
    },
];

class LastDentalExam extends React.Component {
    static questions = questionConfigs;

    constructor(props) {
        super(props);
        const months = getIntlMonths(getFormatDateFromProps(this.props));
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [LAST_DENTAL_EXAM_MONTH]: props => {
                const key = questionConfigs[0].name;

                return (
                    <Box width="160px" height="46px" mr="10px">
                        <Onboarding.Select
                            placeholder={formatText(GENERAL_MONTH)}
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
            [LAST_DENTAL_EXAM_YEAR]: props => {
                const key = questionConfigs[1].name;

                return (
                    <Box width="160px" height="46px">
                        <Onboarding.Select
                            placeholder={formatText(GENERAL_YEAR)}
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
            [LAST_DENTAL_XRAY_MONTH]: props => {
                const key = questionConfigs[2].name;

                return (
                    <Box width="160px" height="46px" mr="10px">
                        <Onboarding.Select
                            placeholder={formatText(GENERAL_MONTH)}
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
            [LAST_DENTAL_XRAY_YEAR]: props => {
                const key = questionConfigs[3].name;

                return (
                    <Box width="160px" height="46px">
                        <Onboarding.Select
                            placeholder={formatText(GENERAL_YEAR)}
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
                <ToothIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        MEDICALHISTORYFORM_LASTDENTALEXAM_LASTDENTALEXAM
                    )}
                />
                <Onboarding.StepBlurbText />

                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_LASTDENTALEXAM_DENTALEXAM
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

                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_LASTDENTALEXAM_DENTALXRAY
                        )}
                    />
                    <Flex mb="25px">
                        {renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            2,
                            props
                        )}
                        {renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            3,
                            props
                        )}
                    </Flex>
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

export default injectIntl(LastDentalExam);
