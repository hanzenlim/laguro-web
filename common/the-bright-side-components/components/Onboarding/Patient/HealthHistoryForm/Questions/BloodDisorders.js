import { Box, Flex } from '~/components';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import { reduceArrayOfObjects } from '~/util/arrayUtils';
import { injectIntl } from 'react-intl';
import { getFormatTextFromProps } from '~/util/intlUtils';
import { renderQuestionComponent } from '~/util/questionUtils';

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
    [ABNORMAL_BLEEDING]: 'medicalHistoryForm.bloodDisorders.abnormalBleeding',
    [ANEMIA]: 'medicalHistoryForm.bloodDisorders.anemia',
    [BLOOD_TRANSFUSION_DATE]:
        'medicalHistoryForm.bloodDisorders.bloodTransfusionDate',
    [HEMOPHILIA]: 'medicalHistoryForm.bloodDisorders.hemophilia',
    [LIVER_DISEASE]: 'medicalHistoryForm.bloodDisorders.liverDisease',
    [JAUNDICE]: 'medicalHistoryForm.bloodDisorders.jaundice',
    [PERSISTENT_SWOLLEN_GLANDS_IN_NECK]:
        'medicalHistoryForm.bloodDisorders.persistentSwollenGlands',
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
                height="100%"
            >
                <DentistIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        'medicalHistoryForm.bloodDisorders.bloodDisorders'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'general.pleaseChooseTheConditionsThatApplyToYou'
                    )}
                />
                <Box>{renderQuestions}</Box>
                <Onboarding.NoneButton
                    list={props.formikProps.values}
                    onClick={() => props.formikProps.submitForm()}
                />
            </Flex>
        );
    }
}

export default injectIntl(BloodDisorders);
