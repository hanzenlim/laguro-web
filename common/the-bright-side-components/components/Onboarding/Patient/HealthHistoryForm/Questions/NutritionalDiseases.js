import { Flex, Grid } from '~/components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { reduceArrayOfObjects } from '~/util/arrayUtils';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { renderQuestionComponent } from '~/util/questionUtils';
import { injectIntl } from 'react-intl';

const DIABETES_I = 'Diabetes I';
const MALNUTRITION = 'Malnutrition';
const GASTROINTENSTINAL_DISEASE = 'Gastrointenstinal disease';
const ULCER = 'Ulcer';
const EXCESSIVE_URINATION = 'Excessive urination';
const DIABETES_II = 'Diabetes II';
const EATING_DISORDER = 'Eating disorder';
const GE_REFLUX_OR_HEARTBURN = 'GE Reflux or heartburn';
const SEVERE_OR_RAPID_WEIGHT_LOSS = 'Severe or rapid weight loss';

const list = [
    DIABETES_I,
    MALNUTRITION,
    GASTROINTENSTINAL_DISEASE,
    ULCER,
    EXCESSIVE_URINATION,
    DIABETES_II,
    EATING_DISORDER,
    GE_REFLUX_OR_HEARTBURN,
    SEVERE_OR_RAPID_WEIGHT_LOSS,
];

const texts = {
    [DIABETES_I]: 'medicalHistoryForm.nutritionalDiseases.diabetesI',
    [MALNUTRITION]: 'medicalHistoryForm.nutritionalDiseases.malnutrition',
    [GASTROINTENSTINAL_DISEASE]:
        'medicalHistoryForm.nutritionalDiseases.gastrointestinalDisease',
    [ULCER]: 'medicalHistoryForm.nutritionalDiseases.ulcer',
    [EXCESSIVE_URINATION]:
        'medicalHistoryForm.nutritionalDiseases.excessiveUrination',
    [DIABETES_II]: 'medicalHistoryForm.nutritionalDiseases.diabetesIi',
    [EATING_DISORDER]: 'medicalHistoryForm.nutritionalDiseases.eatingDisorder',
    [GE_REFLUX_OR_HEARTBURN]:
        'medicalHistoryForm.nutritionalDiseases.geRefluxOrHeartburn',
    [SEVERE_OR_RAPID_WEIGHT_LOSS]:
        'medicalHistoryForm.nutritionalDiseases.severeOrRapidWeightLoss',
};

const getQuestionName = item => `Nutrition (${item})`;

const questionConfigs = list.map(item => {
    const questionName = getQuestionName(item);
    return {
        name: questionName,
        value: false,
    };
});

class NutritionalDiseases extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map(item => {
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
                        'medicalHistoryForm.nutritionalDiseases.nutritionalDiseases'
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

export default injectIntl(NutritionalDiseases);
