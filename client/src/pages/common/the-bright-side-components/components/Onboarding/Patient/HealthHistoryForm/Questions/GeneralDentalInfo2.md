import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Do you have earaches or neck pains?',
        value: false,
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 1,
        name: 'Do you have any clicking, popping or discomfort in the jaw?',
        value: false,
        component: props => {
            const key = questions[1].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 2,
        name: 'Do you brux or grind your teeth?',
        value: false,
        component: props => {
            const key = questions[2].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 3,
        name: 'Do you have sores or ulcers in your mouth?',
        value: false,
        component: props => {
            const key = questions[3].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 4,
        name: 'Do you wear dentures or partials?',
        value: false,
        component: props => {
            const key = questions[4].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 5,
        name: 'Do you participate in active recreational activities?',
        value: false,
        component: props => {
            const key = questions[5].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    },
    {
        id: 6,
        name: 'Have you ever had a serious injury to your head or mouth?',
        value: false,
        component: props => {
            const key = questions[6].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    }
];

export default class GeneralDentalInfo2 extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="General dental information" />
                <Onboarding.StepBlurbText text="Please choose from the following questions that apply to you" />
                <Flex maxWidth="700px" width={['100%', '100%', '700px']} flexDirection="column">
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                    {questions[5].component(props)}
                    {questions[6].component(props)}
                </Flex>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
