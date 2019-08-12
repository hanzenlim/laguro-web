import { Flex, Grid } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';

const CARDIOVASCULAR_DISEASE = 'Cardiovascular disease';
const CONGESTIVE_HEART_FAILURE = 'Congestive heart failure';
const HEART_ATTACK = 'Heart attack';
const HIGH_BLOOD_PRESSURE = 'High blood pressure';
const RHEUMATIC_FEVER = 'Rheumatic fever';
const CHEST_PAIN_UPON_EXERTION = 'Chest pain upon exertion';
const ANGINA = 'Angina';
const DAMAGED_HEART_FAILURE = 'Damaged heart failure';
const HEART_MURMUR = 'Heart Murmur';
const MITRAL_VALVE_PROLAPSE = 'Mitral valve prolapse';
const RHEUMATIC_HEART_DISEASE = 'Rheumatic heart disease';
const ATERIOSCLEROSIS = 'Ateriosclerosis';
const DAMAGED_HEART_VALVES = 'Damaged heart valves';
const LOW_BLOOD_PRESSURE = 'Low blood pressure';
const PACEMAKER = 'Pacemaker';
const OTHER_CONGENITAL_HEART_DEFECTS = 'Other congenital heart defects';

const list = [
    CARDIOVASCULAR_DISEASE,
    CONGESTIVE_HEART_FAILURE,
    HEART_ATTACK,
    HIGH_BLOOD_PRESSURE,
    RHEUMATIC_FEVER,
    CHEST_PAIN_UPON_EXERTION,
    ANGINA,
    DAMAGED_HEART_FAILURE,
    HEART_MURMUR,
    MITRAL_VALVE_PROLAPSE,
    RHEUMATIC_HEART_DISEASE,
    ATERIOSCLEROSIS,
    DAMAGED_HEART_VALVES,
    LOW_BLOOD_PRESSURE,
    PACEMAKER,
    OTHER_CONGENITAL_HEART_DEFECTS,
];

const texts = {
    [CARDIOVASCULAR_DISEASE]:
        'medicalHistoryForm.otherHeartConditions.cardiovascularDisease',
    [CONGESTIVE_HEART_FAILURE]:
        'medicalHistoryForm.otherHeartConditions.congestiveHeartFailure',
    [HEART_ATTACK]: 'medicalHistoryForm.otherHeartConditions.heartAttack',
    [HIGH_BLOOD_PRESSURE]:
        'medicalHistoryForm.otherHeartConditions.highBloodPressure',
    [RHEUMATIC_FEVER]: 'medicalHistoryForm.otherHeartConditions.rheumaticFever',
    [CHEST_PAIN_UPON_EXERTION]:
        'medicalHistoryForm.otherHeartConditions.chestPainUponExertion',
    [ANGINA]: 'medicalHistoryForm.otherHeartConditions.angina',
    [DAMAGED_HEART_FAILURE]:
        'medicalHistoryForm.otherHeartConditions.damagedHeartFailure',
    [HEART_MURMUR]: 'medicalHistoryForm.otherHeartConditions.heartMurmur',
    [MITRAL_VALVE_PROLAPSE]:
        'medicalHistoryForm.otherHeartConditions.mitralValveProlapse',
    [RHEUMATIC_HEART_DISEASE]:
        'medicalHistoryForm.otherHeartConditions.rheumaticHeartDisease',
    [ATERIOSCLEROSIS]:
        'medicalHistoryForm.otherHeartConditions.ateriosclerosis',
    [DAMAGED_HEART_VALVES]:
        'medicalHistoryForm.otherHeartConditions.damagedHeartValves',
    [LOW_BLOOD_PRESSURE]:
        'medicalHistoryForm.otherHeartConditions.lowBloodPressure',
    [PACEMAKER]: 'medicalHistoryForm.otherHeartConditions.pacemaker',
    [OTHER_CONGENITAL_HEART_DEFECTS]:
        'medicalHistoryForm.otherHeartConditions.otherCongenitalHeartDefects',
};

const getQuestionName = item =>
    `Other heart/cardiovascular conditions (${item})`;

const questionConfigs = list.map((item, i) => {
    const questionName = getQuestionName(item);
    return {
        name: questionName,
        value: false,
    };
});

class OtherHeartConditions extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map((item, i) => {
                const questionName = getQuestionName(item);
                return {
                    [questionName]: props => {
                        const key = questionName;
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
                        'medicalHistoryForm.otherHeartConditions.otherHeartConditions'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />
                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}>
                    {renderQuestions}
                </Grid>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(OtherHeartConditions);
