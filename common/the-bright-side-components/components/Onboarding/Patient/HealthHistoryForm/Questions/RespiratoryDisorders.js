import { Box, Flex } from '~/components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { reduceArrayOfObjects } from '~/util/arrayUtils';
import { renderQuestionComponent } from '~/util/questionUtils';
import { injectIntl } from 'react-intl';

const ASTHMA = 'Asthma';
const BRONCHITIS = 'Bronchitis';
const EMPHYSEMA = 'Emphysema';
const SINUS_TROUBLE = 'Sinus trouble';
const TUBERCULOSIS = 'Tuberculosis';
const list = [ASTHMA, BRONCHITIS, EMPHYSEMA, SINUS_TROUBLE, TUBERCULOSIS];

const texts = {
    [ASTHMA]: 'medicalHistoryForm.respiratoryDisorders.asthma',
    [BRONCHITIS]: 'medicalHistoryForm.respiratoryDisorders.bronchitis',
    [EMPHYSEMA]: 'medicalHistoryForm.respiratoryDisorders.emphysema',
    [SINUS_TROUBLE]: 'medicalHistoryForm.respiratoryDisorders.sinusTrouble',
    [TUBERCULOSIS]: 'medicalHistoryForm.respiratoryDisorders.tuberculosis',
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
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        'medicalHistoryForm.respiratoryDisorders.respiratoryDisorders'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />
                <Box>{renderQuestions}</Box>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(RespiratoryDisorders);
