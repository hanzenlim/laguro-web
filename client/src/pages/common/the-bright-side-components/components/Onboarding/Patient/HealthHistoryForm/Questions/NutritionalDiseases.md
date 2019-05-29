import { Box, Button, Flex, Grid, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = [
    'Diabetes I',
    'Malnutrition',
    'Gastrointenstinal disease',
    'Ulcer',
    'Excessive urination',
    'Diabetes II',
    'Eating disorder',
    'GE Reflux or heartburn',
    'Severe or rapid weight loss'
];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Nutrition (${item})`,
        value: false,
        component: props => {
            const key = `Nutrition (${item})`;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={item}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    };
});

export default class NutritionalDiseases extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        const renderQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            renderQuestions.push(questions[i].component(props));
        }

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="Nutritional diseases" />
                <Onboarding.StepBlurbText text="Please choose the conditions that apply to you" />
                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}>{...renderQuestions}</Grid>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
