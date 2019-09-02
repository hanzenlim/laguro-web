import { Box, Flex, Grid } from '../../../../../../../../components';
import { Field } from 'formik';
import _range from 'lodash/range';
import * as React from 'react';
import Onboarding from '../../..';
import InsuranceUmbrella from '../../../Assets/insuranceUmbrella';
import { injectIntl } from 'react-intl';
import {
    getFormatTextFromProps,
    getIntlMonths,
    getFormatDateFromProps,
} from '../../../../../../../../util/intlUtils';

const dates = _range(1, 32)
    .map(i => i.toString())
    .map(num => `0${num}`.slice(-2));
const years = _range(2019, 1900).map(i => i.toString());

class AddressView extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        const months = getIntlMonths(getFormatDateFromProps(this.props));

        return (
            <Box minWidth={329}>
                <Flex justifyContent="center">
                    <InsuranceUmbrella />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('generalInformation.birthday.birthday')}
                />
                <Onboarding.StepBlurbText />

                <Grid gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="11px">
                    <Field
                        name="patientBirthMonth"
                        component={props => (
                            <Onboarding.SelectField
                                {...props}
                                placeholder={formatText('general.month')}
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
                                placeholder={formatText('general.date')}
                                options={dates.map(i => (
                                    <Onboarding.SelectOption value={i}>
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
                                placeholder={formatText('general.year')}
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
                    {formatText('general.next')}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(AddressView);
