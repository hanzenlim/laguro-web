import { Box, Flex } from '@laguro/basic-components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import {
    MEDICALHISTORYFORM_BLOODDISORDERS_ABNORMALBLEEDING,
    MEDICALHISTORYFORM_BLOODDISORDERS_ANEMIA,
    MEDICALHISTORYFORM_BLOODDISORDERS_BLOODTRANSFUSIONDATE,
    MEDICALHISTORYFORM_BLOODDISORDERS_HEMOPHILIA,
    MEDICALHISTORYFORM_BLOODDISORDERS_LIVERDISEASE,
    MEDICALHISTORYFORM_BLOODDISORDERS_JAUNDICE,
    MEDICALHISTORYFORM_BLOODDISORDERS_PERSISTENTSWOLLENGLANDS,
    MEDICALHISTORYFORM_BLOODDISORDERS_BLOODDISORDERS,
    GENERAL_PLEASE_CHOOSE_CONDITIONS,
} from '../../../../../../../../strings/messageStrings';

const ABNORMAL_BLEEDING = 'Abnormal bleeding';
const ANEMIA = 'Anemia';
const BLOOD_TRANSFUSION_DATE = 'Blood transfusion/date';
const HEMOPHILIA = 'Hemophilia';
const LIVER_DISEASE = 'Liver disease';
const JAUNDICE = 'Jaundice';
const PERSISTENT_SWOLLEN_GLANDS_IN_NECK = 'Persistent swollen glands in neck';

const list = [
    ABNORMAL_BLEEDING,
    ANEMIA,
    BLOOD_TRANSFUSION_DATE,
    HEMOPHILIA,
    LIVER_DISEASE,
    JAUNDICE,
    PERSISTENT_SWOLLEN_GLANDS_IN_NECK,
];

const texts = {
    [ABNORMAL_BLEEDING]: MEDICALHISTORYFORM_BLOODDISORDERS_ABNORMALBLEEDING,
    [ANEMIA]: MEDICALHISTORYFORM_BLOODDISORDERS_ANEMIA,
    [BLOOD_TRANSFUSION_DATE]: MEDICALHISTORYFORM_BLOODDISORDERS_BLOODTRANSFUSIONDATE,
    [HEMOPHILIA]: MEDICALHISTORYFORM_BLOODDISORDERS_HEMOPHILIA,
    [LIVER_DISEASE]: MEDICALHISTORYFORM_BLOODDISORDERS_LIVERDISEASE,
    [JAUNDICE]: MEDICALHISTORYFORM_BLOODDISORDERS_JAUNDICE,
    [PERSISTENT_SWOLLEN_GLANDS_IN_NECK]: MEDICALHISTORYFORM_BLOODDISORDERS_PERSISTENTSWOLLENGLANDS,
};

const getQuestionName = item => `Blood disorders (${item})`;

const questionConfigs = list.map(item => {
    const questionName = getQuestionName(item);
    return {
        name: questionName,
        value: false,
    };
});

class BloodDisorders extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map(item => {
                const questionName = getQuestionName(item);
                return {
                    [questionName]: props => {
                        const key = questionName;
                        return (
                            <Onboarding.Checkbox
                                key={key}
                                width="100%"
                                field={formatText(texts[item])}
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
            })
        );
    }

    render() {
        const props = this.props;
        const formatText = getFormatTextFromProps(this.props);

        const renderQuestions = [];
        for (let i = 0; i < questionConfigs.length; i++) {
            renderQuestions.push(
                renderQuestionComponent(
                    this.questionComponents,
                    questionConfigs,
                    i,
                    props
                )
            );
        }

        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        MEDICALHISTORYFORM_BLOODDISORDERS_BLOODDISORDERS
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(GENERAL_PLEASE_CHOOSE_CONDITIONS)}
                />
                <Box width={320} maxWidth="100%">
                    {renderQuestions}
                </Box>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(BloodDisorders);
