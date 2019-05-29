import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = ['Asthma', 'Bronchitis', 'Emphysema', 'Sinus trouble', 'Tuberculosis'];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Breathing (${item})`,
        value: false,
        component: props => {
            const key = `Breathing (${item})`;

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

export default class RespiratoryDisorders extends React.Component<any, any> {
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
                <Onboarding.StepTitleText text="Respiratory disorders" />
                <Onboarding.StepBlurbText text="Please choose the conditions that apply to you" />
                <Box>{...renderQuestions}</Box>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
