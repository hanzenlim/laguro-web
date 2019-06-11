import { Box, Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { range } from '../../../../../../../../util/uiUtil';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';
import {
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_GENERALMEDICALINFORMATION,
    GENERAL_PLEASEFILL,
    GENERAL_NEXT,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_GENERALINFORMATION,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_NAME,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_ADDRESS,
    MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_PHONENUMBER,
} from '../../../../../../../../strings/messageStrings';

export const PHYSICIAN_NAME = 'Physician name';
export const PHYSICIAN_PHONE_NUMBER = 'Physician phone number';
export const PHYSICIAN_ADDRESS = 'Physician address';

const questionConfigs = [
    {
        name: PHYSICIAN_NAME,
        value: '',
    },
    {
        name: PHYSICIAN_PHONE_NUMBER,
        value: '',
    },
    {
        name: PHYSICIAN_ADDRESS,
        value: '',
    },
];

class DoctorGeneralInformation extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = {
            [PHYSICIAN_NAME]: props => {
                const key = PHYSICIAN_NAME;
                return (
                    <Onboarding.Input
                        type="text"
                        name="name"
                        placeholder={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_NAME
                        )}
                        value={props.formikProps.values[key]}
                        onChange={e =>
                            props.formikProps.setFieldValue(key, e.target.value)
                        }
                    />
                );
            },
            [PHYSICIAN_PHONE_NUMBER]: props => {
                const key = PHYSICIAN_PHONE_NUMBER;
                return (
                    <Onboarding.Input
                        type="text"
                        name="phoneNumber"
                        placeholder={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_PHONENUMBER
                        )}
                        value={props.formikProps.values[key]}
                        onChange={e =>
                            props.formikProps.setFieldValue(key, e.target.value)
                        }
                    />
                );
            },
            [PHYSICIAN_ADDRESS]: props => {
                const key = PHYSICIAN_ADDRESS;
                return (
                    <Onboarding.Input
                        type="text"
                        name="address"
                        placeholder={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_ADDRESS
                        )}
                        value={props.formikProps.values[key]}
                        onChange={e =>
                            props.formikProps.setFieldValue(key, e.target.value)
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
                        MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_GENERALMEDICALINFORMATION
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASEFILL)}
                />
                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            MEDICALHISTORYFORM_GENERALMEDICALINFORMATION1_GENERALINFORMATION
                        )}
                    />
                    {range(3).map(i =>
                        renderQuestionComponent(
                            this.questionComponents,
                            questionConfigs,
                            i,
                            props
                        )
                    )}
                </Box>
                <Onboarding.NextButton
                    onClick={() => props.formikProps.submitForm()}
                >
                    {props.formikProps.dirty
                        ? formatText(GENERAL_NEXT)
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(DoctorGeneralInformation);
