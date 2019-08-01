import { Box, Flex } from '../../../../../../../components';
import { Field } from 'formik';
import _get from 'lodash/get';
import * as React from 'react';
import Onboarding from '../../../Onboarding';
import DentistIcon from '../../Assets/dentistIcon';
import { SelectLanguage } from '../../SelectLanguage';
import { getFormatTextFromProps } from '../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';

class SelectLanguagePage extends React.PureComponent {
    render() {
        const formatText = getFormatTextFromProps(this.props);
        return (
            <Box minWidth={329}>
                <Flex justifyContent="center">
                    <DentistIcon />
                </Flex>
                <Onboarding.StepTitleText
                    text={formatText('generalInformation.language.language')}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'generalInformation.language.whichLanguages'
                    )}
                />

                <Field
                    name="languages"
                    component={({ form, field }) => {
                        const hasError =
                            _get(form.touched, field.name) &&
                            _get(form.errors, field.name);
                        const errorMessage = form.errors[field.name];
                        return (
                            <Box className={hasError ? 'has-error' : ''}>
                                <SelectLanguage
                                    onSelect={languages => {
                                        form.setFieldTouched(field.name, true);
                                        form.setFieldValue(
                                            field.name,
                                            languages
                                        );
                                    }}
                                    value={field.value}
                                />
                                {hasError && (
                                    <Onboarding.ValidationMessage
                                        text={errorMessage}
                                    />
                                )}
                            </Box>
                        );
                    }}
                />

                <Onboarding.NextButton
                    onClick={() => this.props.formikProps.submitForm()}
                >
                    {formatText('general.next')}
                </Onboarding.NextButton>
            </Box>
        );
    }
}

export default injectIntl(SelectLanguagePage);
