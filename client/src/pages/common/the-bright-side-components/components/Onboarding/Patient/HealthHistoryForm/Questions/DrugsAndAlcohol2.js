import { Box, Flex, TextArea } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    getYesOrNoNamesAndTexts,
    renderQuestionComponent,
} from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';

const HAS_A_PHYSICIAN_OR_PREVIOUS_DENTIST_RECOMMENDED_THAT_YOU_TAKE_ANTIBIOTICS_PRIOR_TO_YOUR_DENTAL_TREATMENT =
    'Has a physician or previous dentist recommended that you take antibiotics prior to your dental treatment?';
const ANY_ADDITIONAL_DISEASE_CONDITION_OR_PROBLEMS_NOT_LISTED_ABOVE_THAT_YOU_THINK_WE_SHOULD_KNOW_ABOUT =
    'Any additional disease, condition, or problems not listed above that you think we should know about?';

const questionConfigs = [
    {
        name: HAS_A_PHYSICIAN_OR_PREVIOUS_DENTIST_RECOMMENDED_THAT_YOU_TAKE_ANTIBIOTICS_PRIOR_TO_YOUR_DENTAL_TREATMENT,
        value: '',
    },
    {
        name: ANY_ADDITIONAL_DISEASE_CONDITION_OR_PROBLEMS_NOT_LISTED_ABOVE_THAT_YOU_THINK_WE_SHOULD_KNOW_ABOUT,
        value: '',
    },
];

class DrugsAndAlcohol2 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [HAS_A_PHYSICIAN_OR_PREVIOUS_DENTIST_RECOMMENDED_THAT_YOU_TAKE_ANTIBIOTICS_PRIOR_TO_YOUR_DENTAL_TREATMENT]: props => {
                const key = HAS_A_PHYSICIAN_OR_PREVIOUS_DENTIST_RECOMMENDED_THAT_YOU_TAKE_ANTIBIOTICS_PRIOR_TO_YOUR_DENTAL_TREATMENT;
                return (
                    <Onboarding.Choices
                        size="small"
                        submitOnClick={false}
                        formKey={key}
                        namesAndTexts={getYesOrNoNamesAndTexts(formatText)}
                        {...props}
                    />
                );
            },
            [ANY_ADDITIONAL_DISEASE_CONDITION_OR_PROBLEMS_NOT_LISTED_ABOVE_THAT_YOU_THINK_WE_SHOULD_KNOW_ABOUT]: props => {
                const key = ANY_ADDITIONAL_DISEASE_CONDITION_OR_PROBLEMS_NOT_LISTED_ABOVE_THAT_YOU_THINK_WE_SHOULD_KNOW_ABOUT;
                return (
                    <TextArea
                        placeholder={formatText('general.pleaseExplain')}
                        value={props.formikProps.values[key]}
                        onChange={value =>
                            props.formikProps.setFieldValue(
                                key,
                                value.target.value
                            )
                        }
                        height="180px"
                    />
                );
            },
        };
    }

    render() {
        const props = this.props;
        const formatText = getFormatTextFromProps(this.props);

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        'medicalHistoryForm.drugsAlcohol2.drugsAlcohol'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'medicalHistoryForm.drugsAlcohol2.pleaseAnswer'
                    )}
                />
                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            HAS_A_PHYSICIAN_OR_PREVIOUS_DENTIST_RECOMMENDED_THAT_YOU_TAKE_ANTIBIOTICS_PRIOR_TO_YOUR_DENTAL_TREATMENT
                        )}
                    />
                    {renderQuestionComponent(
                        this.questionComponents,
                        questionConfigs,
                        0,
                        props
                    )}
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            'medicalHistoryForm.drugsAlcohol2.nameAnyAdditional'
                        )}
                    />
                    {renderQuestionComponent(
                        this.questionComponents,
                        questionConfigs,
                        1,
                        props
                    )}
                </Box>
                <Onboarding.NextButton
                    onClick={() => {
                        props.formikProps.submitForm();
                    }}
                    loading={this.props.formikProps.isSubmitting}
                >
                    {formatText('general.done')}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(DrugsAndAlcohol2);
