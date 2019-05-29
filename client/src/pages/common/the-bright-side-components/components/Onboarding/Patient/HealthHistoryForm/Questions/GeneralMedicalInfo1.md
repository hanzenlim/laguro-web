import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Active Tuberculosis',
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
        name: 'Persistent cough lasted for more than 3 weeks',
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
        name: 'Persistent cough that produces blood',
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
        name: 'Been exposed to anyone with tuberculosis',
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
    }
];

export default class GeneralMedicalInfo1 extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="General medical information" />
                <Onboarding.StepBlurbText text="Please choose from the following that applies to you" />
                <Flex maxWidth="700px" width={['100%', '100%', '700px']} flexDirection="column">
                    <Onboarding.FormItemLabelText text="Do you have any of the following diseases or problems:" />
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                </Flex>
                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
