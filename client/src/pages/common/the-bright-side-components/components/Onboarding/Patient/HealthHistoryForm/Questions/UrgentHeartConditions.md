import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = [
    'Artificial (prosthetic heart value)',
    'Damaged valves in transplanted heart',
    'Congenital heart disease - Repaired (completely) in the last 6 months ',
    'Previous infective endocarditis',
    'Congenital heart disease - Unrepaired, cyanotic CHD',
    'Congenital heart disease - repaired CHD with residual defects'
];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Urgent heart conditions (${item})`,
        value: false,
        component: props => {
            const key = `Urgent heart conditions (${item})`;

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

export default class UrgentHeartConditions extends React.Component<any, any> {
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
                <Onboarding.StepTitleText text="Urgent heart conditions" />
                <Onboarding.StepBlurbText text="Please choose from the following that applies to you" />
                <Box>{...renderQuestions}</Box>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
