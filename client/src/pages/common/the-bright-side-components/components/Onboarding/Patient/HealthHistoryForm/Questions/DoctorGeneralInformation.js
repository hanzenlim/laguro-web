import { Box, Flex } from '../../../../../../../../components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { range } from '../../../../../../../../util/uiUtil';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';

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
                            'medicalHistoryForm.generalMedicalInformation1.name'
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
                            'medicalHistoryForm.generalMedicalInformation1.phoneNumber'
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
                            'medicalHistoryForm.generalMedicalInformation1.address'
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
                        'medicalHistoryForm.generalMedicalInformation1.generalMedicalInformation'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText('general.pleaseFill')}
                />
                <Box>
                    <Onboarding.FormItemLabelText
                        text={formatText(
                            'medicalHistoryForm.generalMedicalInformation1.generalInformation'
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
                        ? formatText('general.next')
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(DoctorGeneralInformation);
