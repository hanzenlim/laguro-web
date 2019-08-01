import { Flex, Grid } from '../../../../../../../../components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';

const list = [
    'Local anesthetics',
    'Barbiturates',
    'Sulfa drugs',
    'Latex',
    'Animals',
    'Aspirin',
    'Sedatives',
    'Codeine or other narcotics',
    'Iodine',
    'Food',
    'Whitening',
    'Penicillin or other antibiotics',
    'Sleeping pills',
    'Metals',
    'Hay fever / seasonal',
    'Other',
];

const texts = {
    'Local anesthetics': 'medicalHistoryForm.allergies.localAnesthetics',
    Barbiturates: 'medicalHistoryForm.allergies.barbiturates',
    'Sulfa drugs': 'medicalHistoryForm.allergies.sulfaDrugs',
    Latex: 'medicalHistoryForm.allergies.latex',
    Animals: 'medicalHistoryForm.allergies.animals',
    Aspirin: 'medicalHistoryForm.allergies.aspirin',
    Sedatives: 'medicalHistoryForm.allergies.sedatives',
    'Codeine or other narcotics': 'medicalHistoryForm.allergies.codeine',
    Iodine: 'medicalHistoryForm.allergies.iodine',
    Food: 'medicalHistoryForm.allergies.food',
    Whitening: 'medicalHistoryForm.allergies.whitening',
    'Penicillin or other antibiotics':
        'medicalHistoryForm.allergies.penicillin',
    'Sleeping pills': 'medicalHistoryForm.allergies.sleepingPills',
    Metals: 'medicalHistoryForm.allergies.metals',
    'Hay fever / seasonal': 'medicalHistoryForm.allergies.hayFever',
    Other: 'general.other',
};

const getQuestionName = item => `Allergies (${item})`;

const questionConfigs = list.map(item => {
    return {
        name: getQuestionName(item),
        value: false,
    };
});

class DrugAllergies extends React.Component {
    static questions = questionConfigs;

    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = list
            .map(item => {
                return {
                    [getQuestionName(item)]: props => {
                        const key = `Allergies (${item})`;
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
            .reduce((acc, val) => ({ ...acc, ...val }), {});
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
                    text={formatText('medicalHistoryForm.allergies.allergies')}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'medicalHistoryForm.allergies.allergicReaction'
                    )}
                />
                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}>
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

export default injectIntl(DrugAllergies);
