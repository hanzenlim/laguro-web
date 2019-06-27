import { Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { injectIntl } from 'react-intl';
import _range from 'lodash/range';
import {
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_GENERALMEDICALINFORMATION,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PLEASECHOOSE,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_ANYOFFOLLOWING,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_ACTIVETUBERCULOSIS,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PERSISTENTCOUGH,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PERSISTENTCOUGHTHATPRODUCESBLOOD,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_BEENEXPOSEDTOANYONEWITHTUBERCULOSIS,
} from '../../../../../../../../strings/messageStrings';

const ACTIVE_TUBERCULOSIS = 'Active Tuberculosis';
const PERSISTENT_COUGH_THREE_WEEKS =
    'Persistent cough lasted for more than 3 weeks';
const PERSISTENT_COUGH_BLOOD = 'Persistent cough that produces blood';
const EXPOSED_TUBERCULOSIS = 'Been exposed to anyone with tuberculosis';

const questionConfigs = [
    {
        name: ACTIVE_TUBERCULOSIS,
        value: false,
    },
    {
        name: PERSISTENT_COUGH_THREE_WEEKS,
        value: false,
    },
    {
        name: PERSISTENT_COUGH_BLOOD,
        value: false,
    },
    {
        name: EXPOSED_TUBERCULOSIS,
        value: false,
    },
];

class GeneralMedicalInfo1 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [ACTIVE_TUBERCULOSIS]: props => {
                const key = ACTIVE_TUBERCULOSIS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_ACTIVETUBERCULOSIS
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
            [PERSISTENT_COUGH_THREE_WEEKS]: props => {
                const key = PERSISTENT_COUGH_THREE_WEEKS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PERSISTENTCOUGH
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
            [PERSISTENT_COUGH_BLOOD]: props => {
                const key = PERSISTENT_COUGH_BLOOD;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PERSISTENTCOUGHTHATPRODUCESBLOOD
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
            [EXPOSED_TUBERCULOSIS]: props => {
                const key = EXPOSED_TUBERCULOSIS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_BEENEXPOSEDTOANYONEWITHTUBERCULOSIS
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
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_GENERALMEDICALINFORMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_PLEASECHOOSE
                    )}
                />
                <Flex maxWidth="700px" width="100%" flexDirection="column">
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION3_ANYOFFOLLOWING
                        )}
                    />
                    {_range(4).map(i =>
                        renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            i,
                            props
                        )
                    )}
                </Flex>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(GeneralMedicalInfo1);
