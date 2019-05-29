import { Box, Button, Flex, Grid, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = [
    'Cardiovascular disease',
    'Congestive heart failure',
    'Heart attack',
    'High blood pressure',
    'Rheumatic fever',
    'Chest pain upon exertion',
    'Angina',
    'Damaged heart failure',
    'Heart Murmur',
    'Mitral valve prolapse',
    'Rheumatic heart disease',
    'Ateriosclerosis',
    'Damaged heart valves',
    'Low blood pressure',
    'Pacemaker',
    'Other congenital heart defects'
];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Other heart/cardiovascular conditions (${item})`,
        value: false,
        component: props => {
            const key = `Other heart/cardiovascular conditions (${item})`;

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

export default class OtherHeartConditions extends React.Component<any, any> {
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
                <Onboarding.StepTitleText text="Other heart/cardiovascular conditions" />
                <Onboarding.StepBlurbText text="Please choose from the following that applies to you" />
                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr']}>{...renderQuestions}</Grid>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
