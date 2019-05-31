import { Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Are your teeth sensitive to cold, hot, sweets or pressure?',
        value: false,
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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
        name: 'Does food or floss catch between your teeth?',
        value: false,
        component: props => {
            const key = questions[1].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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
        name: 'Is your mouth dry?',
        value: false,
        component: props => {
            const key = questions[2].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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
        name: 'Have you had any periodontal (gum) treatments?',
        value: false,
        component: props => {
            const key = questions[3].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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
        name: 'Have you ever had orthodontic (braces) treatment?',
        value: false,
        component: props => {
            const key = questions[4].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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
        name:
            'Have you had any problems associated with previous dental treatment?',
        value: false,
        component: props => {
            const key = questions[5].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    width="100%"
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

export default class GeneralDentalInfo1 extends React.Component {
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
                <Onboarding.StepTitleText text="General dental information" />
                <Onboarding.StepBlurbText text="Please choose from the following questions that apply to you" />
                <Flex
                    maxWidth="700px"
                    width={['100%', '100%', '700px']}
                    flexDirection="column"
                >
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                    {questions[5].component(props)}
                </Flex>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}
