import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name:
            'Has a physician or previous dentist recommended that you take antibiotics prior to your dental treatment?',
        value: '',
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Choices
                    size="small"
                    formKey={key}
                    namesAndTexts={[{ name: 'Yes', text: 'Yes' }, { name: 'No', text: 'No' }]}
                    {...props}
                />
            );
        }
    },
    {
        id: 1,
        name: 'Any additional disease, condition, or problems not listed above that you think we should know about?',
        value: '',
        component: props => {
            const key = questions[1].name;

            return (
                <TextArea
                    placeholder="Please explain"
                    value={props.formikProps.values[key]}
                    onChange={value => props.formikProps.setFieldValue(key, value.target.value)}
                    height="180px"
                />
            );
        }
    }
];

export default class DrugsAndAlcohol2 extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="Drugs & Alcohol" />
                <Onboarding.StepBlurbText text="Please answer the following questions" />
                <Box>
                    <Onboarding.FormItemLabelText text="Has a physician or previous dentist recommended that you take antibiotics prior to your dental treatment?" />
                    {questions[0].component(props)}
                    <Onboarding.FormItemLabelText text="Any additional disease, condition, or problems not listed above that you think we should know about?" />
                    {questions[1].component(props)}
                </Box>
                <Onboarding.NextButton
                    onClick={() => {
                        props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    Done
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
