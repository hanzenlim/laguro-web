import { Flex, Grid } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_DIABETESI,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_MALNUTRITION,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_GASTROINTESTINALDISEASE,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_ULCER,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_DIABETESII,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_EATINGDISORDER,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_GEREFLUXORHEARTBURN,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_SEVEREORRAPIDWEIGHTLOSS,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_EXCESSIVEURINATION,
    MEDICALHISTORYFORM_NUTRITIONALDISEASES_NUTRITIONALDISEASES,
    GENERAL_PLEASE_CHOOSE_CONDITIONS,
} from '../../../../../../../../strings/messageStrings';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
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
    [DIABETES_I]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_DIABETESI,
    [MALNUTRITION]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_MALNUTRITION,
    [GASTROINTENSTINAL_DISEASE]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_GASTROINTESTINALDISEASE,
    [ULCER]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_ULCER,
    [EXCESSIVE_URINATION]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_EXCESSIVEURINATION,
    [DIABETES_II]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_DIABETESII,
    [EATING_DISORDER]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_EATINGDISORDER,
    [GE_REFLUX_OR_HEARTBURN]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_GEREFLUXORHEARTBURN,
    [SEVERE_OR_RAPID_WEIGHT_LOSS]: MEDICALHISTORYFORM_NUTRITIONALDISEASES_SEVEREORRAPIDWEIGHTLOSS,
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
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        MEDICALHISTORYFORM_NUTRITIONALDISEASES_NUTRITIONALDISEASES
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASE_CHOOSE_CONDITIONS)}
                />
                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}
                    style={{ maxWidth: 900, width: '100%' }}
                >
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
