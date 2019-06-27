import { Box, Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';
import {
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_RESPIRATORYDISORDERS,
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_ASTHMA,
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_BRONCHITIS,
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_EMPHYSEMA,
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_SINUSTROUBLE,
    MEDICALHISTORYFORM_RESPIRATORYDISORDERS_TUBERCULOSIS,
    GENERAL_PLEASE_CHOOSE_CONDITIONS,
} from '../../../../../../../../strings/messageStrings';

const ASTHMA = 'Asthma';
const BRONCHITIS = 'Bronchitis';
const EMPHYSEMA = 'Emphysema';
const SINUS_TROUBLE = 'Sinus trouble';
const TUBERCULOSIS = 'Tuberculosis';
const list = [ASTHMA, BRONCHITIS, EMPHYSEMA, SINUS_TROUBLE, TUBERCULOSIS];

const texts = {
    [ASTHMA]: MEDICALHISTORYFORM_RESPIRATORYDISORDERS_ASTHMA,
    [BRONCHITIS]: MEDICALHISTORYFORM_RESPIRATORYDISORDERS_BRONCHITIS,
    [EMPHYSEMA]: MEDICALHISTORYFORM_RESPIRATORYDISORDERS_EMPHYSEMA,
    [SINUS_TROUBLE]: MEDICALHISTORYFORM_RESPIRATORYDISORDERS_SINUSTROUBLE,
    [TUBERCULOSIS]: MEDICALHISTORYFORM_RESPIRATORYDISORDERS_TUBERCULOSIS,
};

const getQuestionName = item => `Breathing (${item})`;

const questionConfigs = list.map(item => {
    const questionName = getQuestionName(item);
    return {
        name: questionName,
        value: false,
    };
});

class RespiratoryDisorders extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map(item => {
                const questionName = getQuestionName(item);
                return {
                    [questionName]: props => {
                        const key = `Breathing (${item})`;
                        return (
                            <Onboarding.Checkbox
                                key={key}
                                width="100%"
                                field={formatText(texts[item])}
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
            })
        );
    }

    render() {
        const props = this.props;
        const formatText = getFormatTextFromProps(this.props);
        const renderQuestions = [];
        for (let i = 0; i < questionConfigs.length; i++) {
            renderQuestions.push(
                renderQuestionComponent(
                    this.questionComponents,
                    questionConfigs,
                    i,
                    props
                )
            );
        }
        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        MEDICALHISTORYFORM_RESPIRATORYDISORDERS_RESPIRATORYDISORDERS
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASE_CHOOSE_CONDITIONS)}
                />
                <Box width={320} maxWidth="100%">
                    {renderQuestions}
                </Box>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(RespiratoryDisorders);
