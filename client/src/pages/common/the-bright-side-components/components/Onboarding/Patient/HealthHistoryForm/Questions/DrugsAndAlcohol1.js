import { Flex, TextArea } from '@laguro/basic-components';
import React from 'react';
import _range from 'lodash/range';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    MEDICALHISTORYFORM_DRUGSALCOHOL1_DOYOUUSECONTROLLEDSUBSTANCES,
    MEDICALHISTORYFORM_DRUGSALCOHOL1_DOYOUUSETOBACCO,
    MEDICALHISTORYFORM_DRUGSALCOHOL1_INTERESTEDINSTOPPING,
    MEDICALHISTORYFORM_DRUGSALCOHOL1_NAMEDOYOUDRINKALCOHOLICBEVERAGES,
    MEDICALHISTORYFORM_DRUGSALCOHOL1_HOWMUCHWITHINLAST,
    GENERAL_NEXT,
    MEDICALHISTORYFORM_DRUGSALCOHOL1_DRUGSALCOHOL,
    GENERAL_PLEASE_CHOOSE,
} from '../../../../../../../../strings/messageStrings';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';

const DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS =
    'Do you use controlled substances (drugs)?';
const DO_YOU_USE_TOBACCO_SMOKING_SNUFF_CHEW_BIDIS =
    'Do you use tobacco (smoking, snuff, chew, bidis)?';
const INTERESTED_IN_STOPPING = 'Interested in stopping?';
const DO_YOU_DRINK_ALCOHOLIC_BEVERAGES = 'Do you drink alcoholic beverages?';
const DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS_HOW_MUCH_IN_THE_PAST_DAY_AND_HOW_MUCH_TYPICALLY_IN_A_WEEK =
    'Do you use controlled substances (drugs)? (How much in the past day and how much typically in a week?)';

const questionConfigs = [
    {
        name: DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS,
        value: false,
    },
    {
        name: DO_YOU_USE_TOBACCO_SMOKING_SNUFF_CHEW_BIDIS,
        value: false,
    },
    {
        name: INTERESTED_IN_STOPPING,
        value: false,
    },
    {
        name: DO_YOU_DRINK_ALCOHOLIC_BEVERAGES,
        value: false,
    },
    {
        name: DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS_HOW_MUCH_IN_THE_PAST_DAY_AND_HOW_MUCH_TYPICALLY_IN_A_WEEK,
        value: false,
    },
];

class DrugsAndAlcohol1 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS]: props => {
                const key = DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_DRUGSALCOHOL1_DOYOUUSECONTROLLEDSUBSTANCES
                        )}
                        width="100%"
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [DO_YOU_USE_TOBACCO_SMOKING_SNUFF_CHEW_BIDIS]: props => {
                const key = DO_YOU_USE_TOBACCO_SMOKING_SNUFF_CHEW_BIDIS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_DRUGSALCOHOL1_DOYOUUSETOBACCO
                        )}
                        width="100%"
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [INTERESTED_IN_STOPPING]: props => {
                if (
                    !props.formikProps.values[
                        DO_YOU_USE_TOBACCO_SMOKING_SNUFF_CHEW_BIDIS
                    ]
                ) {
                    return null;
                }
                const key = INTERESTED_IN_STOPPING;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_DRUGSALCOHOL1_INTERESTEDINSTOPPING
                        )}
                        width="100%"
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [DO_YOU_DRINK_ALCOHOLIC_BEVERAGES]: props => {
                const key = DO_YOU_DRINK_ALCOHOLIC_BEVERAGES;

                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_DRUGSALCOHOL1_NAMEDOYOUDRINKALCOHOLICBEVERAGES
                        )}
                        width="100%"
                        value={props.formikProps.values[key]}
                        onClick={() =>
                            props.formikProps.setFieldValue(
                                key,
                                !props.formikProps.values[key]
                            )
                        }
                    />
                );
            },
            [DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS_HOW_MUCH_IN_THE_PAST_DAY_AND_HOW_MUCH_TYPICALLY_IN_A_WEEK]: props => {
                if (
                    !props.formikProps.values[DO_YOU_DRINK_ALCOHOLIC_BEVERAGES]
                ) {
                    return null;
                }

                const key = DO_YOU_USE_CONTROLLED_SUBSTANCES_DRUGS_HOW_MUCH_IN_THE_PAST_DAY_AND_HOW_MUCH_TYPICALLY_IN_A_WEEK;

                return (
                    <TextArea
                        placeholder={formatText(
                            MEDICALHISTORYFORM_DRUGSALCOHOL1_HOWMUCHWITHINLAST
                        )}
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
                        MEDICALHISTORYFORM_DRUGSALCOHOL1_DRUGSALCOHOL
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASE_CHOOSE)}
                />
                <Flex
                    maxWidth="700px"
                    width={['100%', '100%', '700px']}
                    flexDirection="column"
                >
                    {_range(5).map(i =>
                        renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            i,
                            props
                        )
                    )}
                </Flex>
                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                >
                    {formatText(GENERAL_NEXT)}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(DrugsAndAlcohol1);
