import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Do you use controlled substances (drugs)?',
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
        name: 'Do you use tobacco (smoking, snuff, chew, bidis)?',
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
        name: 'Interested in stopping?',
        value: false,
        component: props => {
            if (!props.formikProps.values[questions[1].name]) {
                return null;
            }

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
        name: 'Do you drink alcoholic beverages?',
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
        name: 'Do you use controlled substances (drugs)? (How much in the past day and how much typically in a week?)',
        value: false,
        component: props => {
            if (!props.formikProps.values[questions[3].name]) {
                return null;
            }

            const key = questions[4].name;

            return (
                <TextArea
                    placeholder="How much within the last 24 hours and how much typically in a week?"
                    value={props.formikProps.values[key]}
                    onChange={value => props.formikProps.setFieldValue(key, value.target.value)}
                    height="180px"
                />
            );
        }
    }
];

export default class DrugsAndAlcohol1 extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="Drugs & Alcohol" />
                <Onboarding.StepBlurbText text="Please choose from the following that applies to you" />

                <Flex maxWidth="700px" width={["100%", "100%", "700px"]} flexDirection="column">
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                </Flex>
                <Onboarding.NextButton onClick={() => props.formikProps.submitForm()}>Next</Onboarding.NextButton>
            </Flex>
        );
    }
}
