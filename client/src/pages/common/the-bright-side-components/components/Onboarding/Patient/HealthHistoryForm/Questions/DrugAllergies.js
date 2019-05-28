import { Flex, Grid } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

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

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Allergies (${item})`,
        value: false,
        component: props => {
            const key = `Allergies (${item})`;

            return (
                <Onboarding.Checkbox
                    width={290}
                    key={key}
                    field={item}
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
});

export default class DrugAllergies extends React.Component {
    static questions = questions;

    render() {
        const props = this.props;

        const renderQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            renderQuestions.push(questions[i].component(props));
        }

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText text="Allergies" />
                <Onboarding.StepBlurbText text="Please choose the substances that you are allergic or had reaction to" />
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
