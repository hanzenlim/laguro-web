import { Box, Button, Flex, Grid, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = [
    'Cancer/Chemotherapy/Radiation treatments',
    'Arthiritis',
    'Rheumatoid arthritis',
    'Thyroid problems',
    'Autoimmune disease',
    'Systemic Iupus erythematosus',
    'Osteoporosis',
    'Kidney problems'
];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Immune and cancer (${item})`,
        value: false,
        component: props => {
            const key = `Immune and cancer (${item})`;

            return (
                <Onboarding.Checkbox
                    width={290}
                    key={key}
                    field={item}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    };
});

export default class ImmuneAndCancer extends React.Component<any, any> {
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
                <Onboarding.StepTitleText text="Immune and cancer" />
                <Onboarding.StepBlurbText text="Please choose the conditions that apply to you" />
                <Grid alignItems="flex-start" gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}>
                    {...renderQuestions}
                </Grid>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
