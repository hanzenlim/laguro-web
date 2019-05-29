import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const list = [
    'Abnormal bleeding',
    'Anemia',
    'Blood transfusion/date',
    'Hemophilia',
    'Liver disease',
    'Jaundice',
    'Persistent swollen glands in neck'
];

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Blood disorders (${item})`,
        value: false,
        component: props => {
            const key = `Blood disorders (${item})`;

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

export default class BloodDisorders extends React.Component<any, any> {
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
                <Onboarding.StepTitleText text="Blood disorders" />
                <Onboarding.StepBlurbText text="Please choose from the following that applies to you" />
                <Box>{...renderQuestions}</Box>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
