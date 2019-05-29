import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const questions = [
    {
        id: 0,
        name: 'Physician name',
        value: '',
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={props.formikProps.values[key]}
                    onChange={e => props.formikProps.setFieldValue(key, e.target.value)}
                />
            );
        }
    },
    {
        id: 1,
        name: 'Physician phone number',
        value: '',
        component: props => {
            const key = questions[1].name;

            return (
                <Onboarding.Input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={props.formikProps.values[key]}
                    onChange={e => props.formikProps.setFieldValue(key, e.target.value)}
                />
            );
        }
    },
    {
        id: 2,
        name: 'Physician address',
        value: '',
        component: props => {
            const key = questions[2].name;

            return (
                <Onboarding.Input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={props.formikProps.values[key]}
                    onChange={e => props.formikProps.setFieldValue(key, e.target.value)}
                />
            );
        }
    }
];

export default class DoctorGeneralInformation extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="General medical information" />
                <Onboarding.StepBlurbText text="Please fill out the boxes below" />

                <Box>
                    <Onboarding.FormItemLabelText text="General information about your doctor" />
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                </Box>

                <Onboarding.NextButton onClick={() => props.formikProps.submitForm()}>
                    {props.formikProps.dirty ? 'Next' : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
