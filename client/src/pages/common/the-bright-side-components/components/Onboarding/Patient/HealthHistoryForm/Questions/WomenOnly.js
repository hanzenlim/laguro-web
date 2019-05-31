import { Box, Flex } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

const weeks = _range(1, 40).map(i => i.toString());

const questions = [
    {
        id: 0,
        name: 'Are you pregnant?',
        value: '',
        component: props => {
            const key = questions[0].name;

            return (
                <Onboarding.Choices
                    formKey={key}
                    size="small"
                    namesAndTexts={[
                        { name: 'Yes', text: 'Yes' },
                        { name: 'No', text: 'No' },
                    ]}
                    {...props}
                />
            );
        },
    },
    {
        id: 1,
        name: 'How many weeks pregnant?',
        value: undefined,
        component: props => {
            if ('Yes' !== props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[1].name;

            return (
                <Box mb="5px">
                    <Onboarding.Select
                        placeholder="How many weeks?"
                        value={props.formikProps.values[key]}
                        onSelect={value =>
                            props.formikProps.setFieldValue(key, value)
                        }
                    >
                        {weeks.map(i => (
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
        name: 'Taking birth control or hormonal replacement?',
        value: false,
        component: props => {
            if ('Yes' !== props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[2].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() =>
                        props.formikProps.setFieldValue(
                            key,
                            !props.formikProps.values[questions[2].name]
                        )
                    }
                />
            );
        },
    },
    {
        id: 3,
        name: 'Are you nursing?',
        value: false,
        component: props => {
            if ('Yes' !== props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[3].name;

            return (
                <Onboarding.Checkbox
                    key={key}
                    field={key}
                    value={props.formikProps.values[key]}
                    onClick={() =>
                        props.formikProps.setFieldValue(
                            key,
                            !props.formikProps.values[questions[3].name]
                        )
                    }
                />
            );
        },
    },
];

export default class WomenOnly extends React.Component {
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
                <Onboarding.StepTitleText text="Women only" />
                <Onboarding.StepBlurbText text="Please complete the information below if you are expecting or nursing" />

                <Box>
                    <Onboarding.FormItemLabelText text="Are you pregnant?" />
                    {questions[0].component(props)}
                    {questions[1].component(props)}
                    {questions[2].component(props)}
                    {questions[3].component(props)}
                </Box>

                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                >
                    {props.formikProps.dirty ? 'Next' : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
