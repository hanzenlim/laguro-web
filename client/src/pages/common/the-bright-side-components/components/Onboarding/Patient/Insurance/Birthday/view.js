import { Box, Flex, Grid } from '@laguro/basic-components';
import { Field } from 'formik';
import _range from 'lodash/range';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';

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
    'December',
];

const years = _range(2019, 1900).map(i => i.toString());

class AddressView extends React.PureComponent {
    render() {
        return (
            <Box minWidth={329}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText text="What is your birthday?" />
                <Onboarding.StepBlurbText />

                <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="11px">
                    <Field
                        name="patientBirthMonth"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                placeholder="Month"
                                options={months.map((i, index) => (
                                    <Onboarding.SelectOption
                                        value={(index + 1).toString()}
                                    >
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            />
                        )}
                    />

                    <Field
                        name="patientBirthDate"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                placeholder="Date"
                                options={dates.map((i, index) => (
                                    <Onboarding.SelectOption
                                        value={(index + 1).toString()}
                                    >
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            />
                        )}
                    />

                    <Field
                        name="patientBirthYear"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                placeholder="Year"
                                options={years.map(i => (
                                    <Onboarding.SelectOption
                                        value={i.toString()}
                                    >
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            />
                        )}
                    />
                </Grid>

                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    Next
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default AddressView;
