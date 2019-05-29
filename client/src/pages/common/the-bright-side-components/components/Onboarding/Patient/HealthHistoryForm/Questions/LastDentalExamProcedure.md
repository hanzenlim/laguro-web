import { Box, Button, Flex, Grid, Input, Select, Text, TextArea } from '@laguro/basic-components';
import React from 'react';
import _sortBy from 'lodash/sortBy';
import Onboarding from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';

const list = _sortBy([
    'Braces',
    'Filling',
    'Root canal',
    'Wisdom teeth removal',
    'Bridges/Dentures',
    'Implants',
    'Tooth extraction',
    'Crown/Cap',
    'Nitrous sedation',
    'Whitening'
]);
list.push('Other');

const questions = list.map((item, i) => {
    return {
        id: i,
        name: `Last dental procedures (${item})`,
        value: false,
        component: props => {
            const key = `Last dental procedures (${item})`;

            return (
                <Onboarding.Checkbox
                    width={290}
                    key={key}
                    field={item}
                    value={props.formikProps.values[key]}
                    onClick={() => props.formikProps.setFieldValue(key, !props.formikProps.values[key])}
                />
            );
        }
    };
});

export default class LastDentalExamProcedure extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        const renderQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            renderQuestions.push(questions[i].component(props));
        }

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%" width="100%">
                <ToolsIcon />
                <Onboarding.StepTitleText text="What was done at that time?" />
                <Onboarding.StepBlurbText />

                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}>{...renderQuestions}</Grid>

                <Onboarding.NextButton
                    onClick={() => {
                        props.formikProps.submitForm();
                    }}
                >
                    {props.formikProps.dirty ? 'Next' : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}
