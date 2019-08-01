import { Box, Flex } from '../../../../../../../../components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { injectIntl } from 'react-intl';

const ARTIFICIAL_HEART_VALVE = 'Artificial (prosthetic heart value)';
const DAMAGED_VALVES = 'Damaged valves in transplanted heart';
const CHD_REPAIRED_COMPLETELY =
    'Congenital heart disease - Repaired (completely) in the last 6 months ';
const PREVIOUS_ENDOCARDITIS = 'Previous infective endocarditis';
const UNREPARIED_CHD = 'Congenital heart disease - Unrepaired, cyanotic CHD';
const REPAIRED_CHD =
    'Congenital heart disease - repaired CHD with residual defects';

const list = [
    ARTIFICIAL_HEART_VALVE,
    DAMAGED_VALVES,
    CHD_REPAIRED_COMPLETELY,
    PREVIOUS_ENDOCARDITIS,
    UNREPARIED_CHD,
    REPAIRED_CHD,
];

const texts = {
    [ARTIFICIAL_HEART_VALVE]:
        'medicalHistoryForm.urgentHeartConditions.artificialProstheticHeartValue',
    [DAMAGED_VALVES]:
        'medicalHistoryForm.urgentHeartConditions.damagedValvesInTransplantedHeart',
    [CHD_REPAIRED_COMPLETELY]:
        'medicalHistoryForm.urgentHeartConditions.congenitalHeartDiseaseRepairedCompletely',
    [PREVIOUS_ENDOCARDITIS]:
        'medicalHistoryForm.urgentHeartConditions.previousInfectiveEndocarditis',
    [UNREPARIED_CHD]:
        'medicalHistoryForm.urgentHeartConditions.congenitalHeartDiseaseUnrepaired',
    [REPAIRED_CHD]:
        'medicalHistoryForm.urgentHeartConditions.congenitalHeartDiseaseRepaired',
};

const getQuestionName = item => `Urgent heart conditions (${item})`;

const questionConfigs = list.map(item => {
    return {
        name: getQuestionName(item),
        value: false,
    };
});

class UrgentHeartConditions extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map(item => {
                return {
                    [getQuestionName(item)]: props => {
                        const key = getQuestionName(item);
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
                        'medicalHistoryForm.urgentHeartConditions.urgentHeartConditions'
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

export default injectIntl(UrgentHeartConditions);
