import { Flex, Grid } from '../../../../../../../../components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';

const CANCER_CHEMOTHERAPY_RADIATION_TREATMENTS =
    'Cancer/Chemotherapy/Radiation treatments';
const ARTHIRITIS = 'Arthiritis';
const RHEUMATOID_ARTHRITIS = 'Rheumatoid arthritis';
const THYROID_PROBLEMS = 'Thyroid problems';
const AUTOIMMUNE_DISEASE = 'Autoimmune disease';
const SYSTEMIC_IUPUS_ERYTHEMATOSUS = 'Systemic Iupus erythematosus';
const OSTEOPOROSIS = 'Osteoporosis';
const KIDNEY_PROBLEMS = 'Kidney problems';

const list = [
    CANCER_CHEMOTHERAPY_RADIATION_TREATMENTS,
    ARTHIRITIS,
    RHEUMATOID_ARTHRITIS,
    THYROID_PROBLEMS,
    AUTOIMMUNE_DISEASE,
    SYSTEMIC_IUPUS_ERYTHEMATOSUS,
    OSTEOPOROSIS,
    KIDNEY_PROBLEMS,
];

const texts = {
    [CANCER_CHEMOTHERAPY_RADIATION_TREATMENTS]:
        'medicalHistoryForm.immuneAndCancer.cancerChemotherapyRadiationTreatments',
    [ARTHIRITIS]: 'medicalHistoryForm.immuneAndCancer.arthiritis',
    [RHEUMATOID_ARTHRITIS]:
        'medicalHistoryForm.immuneAndCancer.rheumatoidArthritis',
    [THYROID_PROBLEMS]: 'medicalHistoryForm.immuneAndCancer.thyroidProblems',
    [AUTOIMMUNE_DISEASE]:
        'medicalHistoryForm.immuneAndCancer.autoimmuneDisease',
    [SYSTEMIC_IUPUS_ERYTHEMATOSUS]:
        'medicalHistoryForm.immuneAndCancer.systemicIupusErythematosus',
    [OSTEOPOROSIS]: 'medicalHistoryForm.immuneAndCancer.osteoporosis',
    [KIDNEY_PROBLEMS]: 'medicalHistoryForm.immuneAndCancer.kidneyProblems',
};

const getQuestionName = item => `Immune and cancer (${item})`;

const questionConfigs = list.map(item => {
    const questionName = getQuestionName(item);
    return {
        name: questionName,
        value: false,
    };
});

class ImmuneAndCancer extends React.Component {
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
                                width={290}
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
                        'medicalHistoryForm.immuneAndCancer.immuneAndCancer'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />
                <Grid
                    alignItems="flex-start"
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
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

export default injectIntl(ImmuneAndCancer);
