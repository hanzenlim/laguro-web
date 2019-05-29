import { Box, Button, Flex, Input, Select, Text } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../..';
import ToothIcon from '../../../Assets/toothIcon';

const dates = _range(1, 32).map(i => i.toString());

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const years = _range(2019, 1900).map(i => i.toString());

const questions = [
    {
        id: 0,
        name: 'Last dental exam month',
        value: undefined,
        component: props => {
            const key = questions[0].name;

            return (
                <Box width="160px" height="46px" mr="10px">
                    <Onboarding.Select
                        placeholder="Month"
                        value={props.formikProps.values[key]}
                        onSelect={value => props.formikProps.setFieldValue(key, value)}
                    >
                        {months.map(i => (
                            <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        }
    },
    {
        id: 1,
        name: 'Last dental exam year',
        value: undefined,
        component: props => {
            const key = questions[1].name;

            return (
                <Box width="160px" height="46px">
                    <Onboarding.Select
                        placeholder="Year"
                        value={props.formikProps.values[key]}
                        onSelect={value => props.formikProps.setFieldValue(key, value)}
                    >
                        {years.map(i => (
                            <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        }
    },
    {
        id: 2,
        name: 'Last dental x-ray month',
        value: undefined,
        component: props => {
            const key = questions[2].name;

            return (
                <Box width="160px" height="46px" mr="10px">
                    <Onboarding.Select
                        placeholder="Month"
                        value={props.formikProps.values[key]}
                        onSelect={value => props.formikProps.setFieldValue(key, value)}
                    >
                        {months.map(i => (
                            <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        }
    },
    {
        id: 3,
        name: 'Last dental x-ray year',
        value: undefined,
        component: props => {
            const key = questions[3].name;

            return (
                <Box width="160px" height="46px">
                    <Onboarding.Select
                        placeholder="Year"
                        value={props.formikProps.values[key]}
                        onSelect={value => props.formikProps.setFieldValue(key, value)}
                    >
                        {years.map(i => (
                            <Onboarding.SelectOption value={i}>{i}</Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        }
    }
];

export default class LastDentalExam extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <ToothIcon />
                <Onboarding.StepTitleText text="When was your last dental exam and x-rays?" />
                <Onboarding.StepBlurbText />

                <Box>
                    <Onboarding.FormItemLabelText text="Dental exam" />
                    <Flex mb="25px">
                        {questions[0].component(props)}
                        {questions[1].component(props)}
                    </Flex>

                    <Onboarding.FormItemLabelText text="Dental x-ray" />
                    <Flex mb="25px">
                        {questions[2].component(props)}
                        {questions[3].component(props)}
                    </Flex>
                </Box>

                <Onboarding.NextButton onClick={() => props.formikProps.submitForm()}>
                    {props.formikProps.dirty ? 'Next' : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
