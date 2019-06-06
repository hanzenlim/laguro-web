import { Box, Flex, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Glaucoma',
        value: false,
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 1,
        name: 'Stroke',
        value: false,
        component: props => {
            const key = questions[1].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 2,
        name: 'Epilepsy',
        value: false,
        component: props => {
            const key = questions[2].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 3,
        name: 'Fainting spells or seizures',
        value: false,
        component: props => {
            const key = questions[3].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 4,
        name: 'Sleeping disorders',
        value: false,
        component: props => {
            const key = questions[4].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 5,
        name: 'Neurological disorders',
        value: false,
        component: props => {
            const key = questions[5].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 6,
        name: 'Neurological disorders (Please specify)',
        value: '',
        component: props => {
            if (!props.formikProps.values[questions[5].name]) {
                return null;
            }

            const key = questions[6].name;

            return (
                <TextArea
                    placeholder="Please specify"
                    value={props.formikProps.values[key]}
                    onChange={value =>
                        props.formikProps.setFieldValue(key, value.target.value)
                    }
                    height="180px"
                />
            );
        },
    },
    {
        id: 7,
        name: 'Night sweats',
        value: false,
        component: props => {
            const key = questions[7].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 8,
        name: 'Mental health disorders',
        value: false,
        component: props => {
            const key = questions[8].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
    {
        id: 9,
        name: 'Mental health disorders (Please specify)',
        value: '',
        component: props => {
            if (!props.formikProps.values[questions[8].name]) {
                return null;
            }

            const key = questions[9].name;

            return (
                <TextArea
                    placeholder="Please specify"
                    value={props.formikProps.values[key]}
                    onChange={value =>
                        props.formikProps.setFieldValue(key, value.target.value)
                    }
                    height="180px"
                />
            );
        },
    },
    {
        id: 10,
        name: 'Severe headaches or migraines',
        value: false,
        component: props => {
            const key = questions[10].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
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
    },
];

export default class BrainDisorders extends React.Component {
    static questions = questions;

    render() {
        const props = this.props;

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText text="Brain disorders" />
                <Onboarding.StepBlurbText text="Please choose the conditions that apply to you" />

                <Box>
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                    {questions[5].component(props)}
                    {questions[6].component(props)}
                    {questions[7].component(props)}
                    {questions[8].component(props)}
                    {questions[9].component(props)}
                    {questions[10].component(props)}
                </Box>

                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}
