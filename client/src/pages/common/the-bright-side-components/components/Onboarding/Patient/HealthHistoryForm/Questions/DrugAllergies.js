import { Flex, Grid } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    MEDICALHISTORYFORM_ALLERGIES_LOCALANESTHETICS,
    MEDICALHISTORYFORM_ALLERGIES_BARBITURATES,
    MEDICALHISTORYFORM_ALLERGIES_SULFADRUGS,
    MEDICALHISTORYFORM_ALLERGIES_LATEX,
    MEDICALHISTORYFORM_ALLERGIES_ANIMALS,
    MEDICALHISTORYFORM_ALLERGIES_ASPIRIN,
    MEDICALHISTORYFORM_ALLERGIES_SEDATIVES,
    MEDICALHISTORYFORM_ALLERGIES_CODEINE,
    MEDICALHISTORYFORM_ALLERGIES_IODINE,
    MEDICALHISTORYFORM_ALLERGIES_FOOD,
    MEDICALHISTORYFORM_ALLERGIES_WHITENING,
    MEDICALHISTORYFORM_ALLERGIES_PENICILLIN,
    MEDICALHISTORYFORM_ALLERGIES_SLEEPINGPILLS,
    MEDICALHISTORYFORM_ALLERGIES_METALS,
    MEDICALHISTORYFORM_ALLERGIES_HAYFEVER,
    GENERAL_OTHER,
    MEDICALHISTORYFORM_ALLERGIES_ALLERGIES,
    MEDICALHISTORYFORM_ALLERGIES_ALLERGICREACTION,
} from '../../../../../../../../strings/messageStrings';
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
    'Local anesthetics': MEDICALHISTORYFORM_ALLERGIES_LOCALANESTHETICS,
    Barbiturates: MEDICALHISTORYFORM_ALLERGIES_BARBITURATES,
    'Sulfa drugs': MEDICALHISTORYFORM_ALLERGIES_SULFADRUGS,
    Latex: MEDICALHISTORYFORM_ALLERGIES_LATEX,
    Animals: MEDICALHISTORYFORM_ALLERGIES_ANIMALS,
    Aspirin: MEDICALHISTORYFORM_ALLERGIES_ASPIRIN,
    Sedatives: MEDICALHISTORYFORM_ALLERGIES_SEDATIVES,
    'Codeine or other narcotics': MEDICALHISTORYFORM_ALLERGIES_CODEINE,
    Iodine: MEDICALHISTORYFORM_ALLERGIES_IODINE,
    Food: MEDICALHISTORYFORM_ALLERGIES_FOOD,
    Whitening: MEDICALHISTORYFORM_ALLERGIES_WHITENING,
    'Penicillin or other antibiotics': MEDICALHISTORYFORM_ALLERGIES_PENICILLIN,
    'Sleeping pills': MEDICALHISTORYFORM_ALLERGIES_SLEEPINGPILLS,
    Metals: MEDICALHISTORYFORM_ALLERGIES_METALS,
    'Hay fever / seasonal': MEDICALHISTORYFORM_ALLERGIES_HAYFEVER,
    Other: GENERAL_OTHER,
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
                                width="100%"
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
                    text={formatText(MEDICALHISTORYFORM_ALLERGIES_ALLERGIES)}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        MEDICALHISTORYFORM_ALLERGIES_ALLERGICREACTION
                    )}
                />
                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
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

export default injectIntl(DrugAllergies);
