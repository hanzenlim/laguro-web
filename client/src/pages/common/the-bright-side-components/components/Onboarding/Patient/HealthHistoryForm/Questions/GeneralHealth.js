import { Box, Flex, TextArea } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

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
    'December',
];

const years = _range(2019, 1900).map(i => i.toString());

const questions = [
    {
        id: 0,
        name: 'When was your last physical exam? (Month)',
        value: undefined,
        component: props => {
            const key = questions[0].name;

            return (
                <Box width="160px" height="46px" mr="10px">
                    <Onboarding.Select
                        placeholder="Month"
                        value={props.formikProps.values[key]}
                        onSelect={value =>
                            props.formikProps.setFieldValue(key, value)
                        }
                    >
                        {months.map(i => (
                            <Onboarding.SelectOption value={i}>
                                {i}
                            </Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        },
    },
    {
        id: 1,
        name: 'When was your last physical exam? (Year)',
        value: undefined,
        component: props => {
            const key = questions[1].name;

            return (
                <Box width="160px" height="46px">
                    <Onboarding.Select
                        placeholder="Year"
                        value={props.formikProps.values[key]}
                        onSelect={value =>
                            props.formikProps.setFieldValue(key, value)
                        }
                    >
                        {years.map(i => (
                            <Onboarding.SelectOption value={i}>
                                {i}
                            </Onboarding.SelectOption>
                        ))}
                    </Onboarding.Select>
                </Box>
            );
        },
    },
    {
        id: 2,
        name: 'Are you in good health?',
        value: '',
        component: props => {
            const key = questions[2].name;

            return (
                <div>
                    <Onboarding.FormItemLabelText text="Are you in good health?" />
                    <Onboarding.Choices
                        size="small"
                        formKey={key}
                        namesAndTexts={[
                            { name: 'Yes', text: 'Yes' },
                            { name: 'No', text: 'No' },
                        ]}
                        {...props}
                    />
                </div>
            );
        },
    },
    {
        id: 3,
        name: 'Any changes in your general health within the past year?',
        value: '',
        component: props => {
            const key = questions[3].name;

            return (
                <div>
                    <Onboarding.FormItemLabelText text="Any changes in your general health within the past year?" />
                    <Onboarding.Choices
                        size="small"
                        formKey={key}
                        namesAndTexts={[
                            { name: 'Yes', text: 'Yes' },
                            { name: 'No', text: 'No' },
                        ]}
                        {...props}
                    />
                </div>
            );
        },
    },
    {
        id: 4,
        name:
            'Any changes in your general health within the past year? (Explanation)',
        value: '',
        component: props => {
            if ('Yes' !== props.formikProps.values[questions[3].name]) {
                return null;
            }

            const key = questions[4].name;

            return (
                <TextArea
                    placeholder="Please explain"
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
        id: 5,
        name: 'Are you being treated for any conditions? If yes, please list',
        value: '',
        component: props => {
            const key = questions[5].name;

            return (
                <div>
                    <Onboarding.FormItemLabelText text="Are you being treated for any conditions? If yes, please list." />
                    <Onboarding.Choices
                        size="small"
                        formKey={key}
                        namesAndTexts={[
                            { name: 'Yes', text: 'Yes' },
                            { name: 'No', text: 'No' },
                        ]}
                        {...props}
                    />
                </div>
            );
        },
    },
    {
        id: 6,
        name:
            'Are you being treated for any conditions? If yes, please list (List)',
        value: '',
        component: props => {
            if ('Yes' !== props.formikProps.values[questions[5].name]) {
                return null;
            }

            const key = questions[6].name;

            return (
                <div>
                    <TextArea
                        placeholder="Please list"
                        value={props.formikProps.values[key]}
                        onChange={value =>
                            props.formikProps.setFieldValue(
                                key,
                                value.target.value
                            )
                        }
                        height="180px"
                    />
                </div>
            );
        },
    },
    {
        id: 7,
        name: 'Have you been hospitalized in the past 5 years?',
        value: '',
        component: props => {
            const key = questions[7].name;

            return (
                <div>
                    <Onboarding.FormItemLabelText text="Have you had a serious illness or been hospitalized in the past 5 years?" />
                    <Onboarding.Choices
                        size="small"
                        formKey={key}
                        namesAndTexts={[
                            { name: 'Yes', text: 'Yes' },
                            { name: 'No', text: 'No' },
                        ]}
                        {...props}
                    />
                </div>
            );
        },
    },
    {
        id: 8,
        name:
            'Are you currently taking any prescription or over the counter medicine(s)?',
        value: '',
        component: props => {
            const key = questions[8].name;

            return (
                <div>
                    <Onboarding.FormItemLabelText text="Are you currently taking any prescription or over the counter medicine(s)?" />
                    <Onboarding.Choices
                        size="small"
                        formKey={key}
                        namesAndTexts={[
                            { name: 'Yes', text: 'Yes' },
                            { name: 'No', text: 'No' },
                        ]}
                        {...props}
                    />
                </div>
            );
        },
    },
];

export default class GeneralHealth extends React.Component {
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
                <Onboarding.StepTitleText text="General medical information" />
                <Onboarding.StepBlurbText text="Please complete the information below about your general health" />

                <Box>
                    <Onboarding.FormItemLabelText text="When was your last physical exam?" />
                    <Flex mb="25px">
                        {questions[0].component(props)}
                        {questions[1].component(props)}
                    </Flex>

                    {questions[2].component(props)}
                    {questions[3].component(props)}
                    {questions[4].component(props)}
                    {questions[5].component(props)}
                    {questions[6].component(props)}
                    {questions[7].component(props)}
                    {questions[8].component(props)}
                </Box>

                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                >
                    Next
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
