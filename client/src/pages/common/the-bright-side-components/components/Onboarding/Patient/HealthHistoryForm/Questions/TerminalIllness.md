import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Recurrent infections',
        value: false,
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 1,
        name: 'Recurrent infections (Please specify)',
        value: '',
        component: props => {
            if (!props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[1].name;

            return (
                <TextArea
                    placeholder="Please specify"
                    value={props.formikProps.values[key]}
                    onChange={value => props.formikProps.setFieldValue(key, value.target.value)}
                    height="180px"
                />
            );
        }
    },
    {
        id: 2,
        name: 'HIV or AIDS',
        value: false,
        component: props => {
            const key = questions[2].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 3,
        name: 'Hepatitis',
        value: false,
        component: props => {
            const key = questions[3].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 4,
        name: 'Sexually transmitted diseases',
        value: false,
        component: props => {
            const key = questions[4].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 5,
        name: 'Sexually transmitted diseases (Please specify)',
        value: '',
        component: props => {
            if (!props.formikProps.values[questions[4].name]) {
                return null;
            }

            const key = questions[5].name;

            return (
                <TextArea
                    placeholder="Please specify"
                    value={props.formikProps.values[key]}
                    onChange={value => props.formikProps.setFieldValue(key, value.target.value)}
                    height="180px"
                />
            );
        }
    }
];

export default class TerminalIllness extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="Terminal illness" />
                <Onboarding.StepBlurbText text="Please choose the conditions that apply to you" />

                <Box>
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                    {questions[5].component(props)}
                </Box>

                <Onboarding.NextButton onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
