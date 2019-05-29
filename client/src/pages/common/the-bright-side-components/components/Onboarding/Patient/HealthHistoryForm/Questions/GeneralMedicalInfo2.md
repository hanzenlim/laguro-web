import { Box, Button, Flex, Input, Select, Text, TextArea } from '@laguro/basic-components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';

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
        name: 'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement?',
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
        name: 'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Month)',
        value: undefined,
        component: props => {
            if (!props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[1].name;

            return (
                <div>
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
                </div>
            );
        }
    },
    {
        id: 2,
        name: 'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Year)',
        value: undefined,
        component: props => {
            if (!props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[2].name;

            return (
                <Box width="160px" height="46px" mr="10px">
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
        id: 3,
        name: 'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Explanation)',
        value: '',
        component: props => {
            if (!props.formikProps.values[questions[0].name]) {
                return null;
            }

            const key = questions[3].name;

            return (
                <TextArea
                    placeholder="Any complications?"
                    value={props.formikProps.values[key]}
                    onChange={value => props.formikProps.setFieldValue(key, value.target.value)}
                    height="180px"
                />
            );
        }
    },
    {
        id: 4,
        name:
            'Are you taking or scheduled to begin taking either of the medications, alendronate (Fosamax) or risedronate (Actonel) for osteoporosis or Pagets disease? ',
        value: false,
        component: props => {
            const key = questions[4].name;

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
        id: 5,
        name:
            "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer?",
        value: false,
        component: props => {
            const key = questions[5].name;

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
        id: 6,
        name:
            "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer? (Month)",
        value: undefined,
        component: props => {
            if (!props.formikProps.values[questions[5].name]) {
                return null;
            }

            const key = questions[6].name;

            return (
                <div>
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
                </div>
            );
        }
    },
    {
        id: 7,
        name:
            "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer? (Year)",
        value: undefined,
        component: props => {
            if (!props.formikProps.values[questions[5].name]) {
                return null;
            }

            const key = questions[7].name;

            return (
                <Box width="160px" height="46px" mr="10px">
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

export default class GeneralMedicalInfo2 extends React.Component<any, any> {
    public static questions = questions;

    public render() {
        const props = this.props;

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <DentistIcon />
                <Onboarding.StepTitleText text="General medical information" />
                <Onboarding.StepBlurbText text="Please choose from the following questions that apply to you" />

                <Flex maxWidth="700px" width={['100%', '100%', '700px']} flexDirection="column">
                    {questions[0].component(props)}

                    {!props.formikProps.values[questions[0].name] ? null : (
                        <Box mt="6px">
                            <Onboarding.FormItemLabelText text="When was it done?" />
                            <Flex mb="6px">
                                {questions[1].component(props)}
                                {questions[2].component(props)}
                            </Flex>
                            {questions[3].component(props)}
                        </Box>
                    )}

                    {questions[4].component(props)}
                    {questions[5].component(props)}

                    {!props.formikProps.values[questions[5].name] ? null : (
                        <Box mt="6px">
                            <Onboarding.FormItemLabelText text="When was the start of treatment?" />
                            <Flex>
                                {questions[6].component(props)}
                                {questions[7].component(props)}
                            </Flex>
                        </Box>
                    )}
                </Flex>

                <Onboarding.NoneButton list={props.formikProps.values} onClick={() => props.formikProps.submitForm()} />
            </Flex>
        );
    }
}
