import { Box, Flex, TextArea } from '../../../../../../../../components';
import _range from 'lodash/range';
import React from 'react';
import Onboarding from '../../../../Onboarding';
import DentistIcon from '../../../Assets/dentistIcon';
import {
    getIntlMonths,
    getIntlYear,
    getIntlMonth,
    getFormatTextFromProps,
    getFormatDateFromProps,
} from '../../../../../../../../util/intlUtils';
import { injectIntl } from 'react-intl';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';

const years = _range(2019, 1900).map(i => i.toString());

const ORTHOPEDIC_JOINT_REPLACEMENT =
    'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement?';
const ORTHOPEDIC_JOINT_REPLACEMENT_MONTH =
    'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Month)';
const ORTHOPEDIC_JOINT_REPLACEMENT_YEAR =
    'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Year)';
const ORTHOPEDIC_JOINT_REPLACEMENT_EXPLANATION =
    'Have you had an orthopedic joint (hip, knee, elbow, finger) replacement? (Explanation)';
const SPECIAL_MEDS =
    'Are you taking or scheduled to begin taking either of the medications, alendronate (Fosamax) or risedronate (Actonel) for osteoporosis or Pagets disease? ';
const SKELETAL_COMPLICATIONS =
    "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer?";
const SKELETAL_COMPLICATIONS_MONTH =
    "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer? (Month)";
const SKELETAL_COMPLICATIONS_YEAR =
    "Since 2001, were you treated or are you presently scheduled to begin treatment with the intravenous bisphosphonates (aredia or Zometa) for bone pain, hypercalcemia or skeletal complications resulting from Paget's disease, multiple myeloma or metastatic cancer? (Year)";

const questionConfigs = [
    {
        name: ORTHOPEDIC_JOINT_REPLACEMENT,
        value: false,
    },
    {
        name: ORTHOPEDIC_JOINT_REPLACEMENT_MONTH,
        value: undefined,
    },
    {
        name: ORTHOPEDIC_JOINT_REPLACEMENT_YEAR,
        value: undefined,
    },
    {
        name: ORTHOPEDIC_JOINT_REPLACEMENT_EXPLANATION,
        value: '',
    },
    {
        name: SPECIAL_MEDS,
        value: false,
    },
    {
        name: SKELETAL_COMPLICATIONS,
        value: false,
    },
    {
        name: SKELETAL_COMPLICATIONS_MONTH,
        value: undefined,
    },
    {
        name: SKELETAL_COMPLICATIONS_YEAR,
        value: undefined,
    },
];

class GeneralMedicalInfo2 extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);

        this.questionComponents = {
            [ORTHOPEDIC_JOINT_REPLACEMENT]: props => {
                const key = ORTHOPEDIC_JOINT_REPLACEMENT;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.generalMedicalInformation4.hadAnOrthopedicJoint'
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
            [ORTHOPEDIC_JOINT_REPLACEMENT_MONTH]: props => {
                if (!props.formikProps.values[ORTHOPEDIC_JOINT_REPLACEMENT]) {
                    return null;
                }
                const key = ORTHOPEDIC_JOINT_REPLACEMENT_MONTH;
                return (
                    <div>
                        <Box width="160px" height="46px" mr="10px">
                            <Onboarding.Select
                                placeholder={getIntlMonth(formatText)}
                                value={props.formikProps.values[key]}
                                onSelect={value =>
                                    props.formikProps.setFieldValue(key, value)
                                }
                            >
                                {getIntlMonths(
                                    getFormatDateFromProps(this.props)
                                ).map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            </Onboarding.Select>
                        </Box>
                    </div>
                );
            },
            [ORTHOPEDIC_JOINT_REPLACEMENT_YEAR]: props => {
                if (!props.formikProps.values[ORTHOPEDIC_JOINT_REPLACEMENT]) {
                    return null;
                }
                const key = ORTHOPEDIC_JOINT_REPLACEMENT_YEAR;
                return (
                    <Box width="160px" height="46px" mr="10px">
                        <Onboarding.Select
                            placeholder={getIntlYear(formatText)}
                            value={props.formikProps.values[key]}
                            onSelect={value =>
                                props.formikProps.setFieldValue(key, value)
                            }
                        >
                            {years.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        </Onboarding.Select>
                    </Box>
                );
            },
            [ORTHOPEDIC_JOINT_REPLACEMENT_EXPLANATION]: props => {
                if (!props.formikProps.values[ORTHOPEDIC_JOINT_REPLACEMENT]) {
                    return null;
                }
                const key = ORTHOPEDIC_JOINT_REPLACEMENT_EXPLANATION;
                return (
                    <TextArea
                        placeholder={formatText('general.anyComplications')}
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
            [SPECIAL_MEDS]: props => {
                const key = SPECIAL_MEDS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.generalMedicalInformation4.takingMedication'
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
            [SKELETAL_COMPLICATIONS]: props => {
                const key = SKELETAL_COMPLICATIONS;
                return (
                    <Onboarding.Checkbox
                        key={key}
                        field={formatText(
                            'medicalHistoryForm.generalMedicalInformation4.intravenousBisphosphonates'
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
            [SKELETAL_COMPLICATIONS_MONTH]: props => {
                if (!props.formikProps.values[SKELETAL_COMPLICATIONS]) {
                    return null;
                }
                const key = SKELETAL_COMPLICATIONS_MONTH;
                return (
                    <div>
                        <Box width="160px" height="46px" mr="10px">
                            <Onboarding.Select
                                placeholder={getIntlMonth(formatText)}
                                value={props.formikProps.values[key]}
                                onSelect={value =>
                                    props.formikProps.setFieldValue(key, value)
                                }
                            >
                                {getIntlMonths(
                                    getFormatDateFromProps(this.props)
                                ).map(i => (
                                    <Onboarding.SelectOption value={i}>
                                        {i}
                                    </Onboarding.SelectOption>
                                ))}
                            </Onboarding.Select>
                        </Box>
                    </div>
                );
            },
            [SKELETAL_COMPLICATIONS_YEAR]: props => {
                if (!props.formikProps.values[SKELETAL_COMPLICATIONS]) {
                    return null;
                }
                const key = SKELETAL_COMPLICATIONS_YEAR;
                return (
                    <Box width="160px" height="46px" mr="10px">
                        <Onboarding.Select
                            placeholder={getIntlYear(formatText)}
                            value={props.formikProps.values[key]}
                            onSelect={value =>
                                props.formikProps.setFieldValue(key, value)
                            }
                        >
                            {years.map(i => (
                                <Onboarding.SelectOption value={i}>
                                    {i}
                                </Onboarding.SelectOption>
                            ))}
                        </Onboarding.Select>
                    </Box>
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
                        'medicalHistoryForm.generalMedicalInformation3.generalMedicalInformation'
                    )}
                />
                <Onboarding.StepBlurbText
                    text={formatText(
                        'medicalHistoryForm.generalMedicalInformation4.pleaseChooseFollowingQuestions'
                    )}
                />

                <Flex
                    maxWidth="700px"
                    width={['100%', '100%', '700px']}
                    flexDirection="column"
                >
                    {renderQuestionComponent(
                        this.questionComponents,
                        questionConfigs,
                        0,
                        props
                    )}

                    {!props.formikProps.values[
                        ORTHOPEDIC_JOINT_REPLACEMENT
                    ] ? null : (
                        <Box mt="6px">
                            <Onboarding.FormItemLabelText
                                text={formatText('general.doneWhen')}
                            />
                            <Flex mb="6px">
                                {renderQuestionComponent(
                                    this.questionComponents,
                                    questionConfigs,
                                    1,
                                    props
                                )}
                                {renderQuestionComponent(
                                    this.questionComponents,
                                    questionConfigs,
                                    2,
                                    props
                                )}
                            </Flex>
                            {renderQuestionComponent(
                                this.questionComponents,
                                questionConfigs,
                                3,
                                props
                            )}
                        </Box>
                    )}
                    {renderQuestionComponent(
                        this.questionComponents,
                        questionConfigs,
                        4,
                        props
                    )}
                    {renderQuestionComponent(
                        this.questionComponents,
                        questionConfigs,
                        5,
                        props
                    )}

                    {!props.formikProps.values[
                        SKELETAL_COMPLICATIONS
                    ] ? null : (
                        <Box mt="6px">
                            <Onboarding.FormItemLabelText
                                text={formatText('general.treatmentStart')}
                            />
                            <Flex>
                                {renderQuestionComponent(
                                    this.questionComponents,
                                    questionConfigs,
                                    6,
                                    props
                                )}
                                {renderQuestionComponent(
                                    this.questionComponents,
                                    questionConfigs,
                                    7,
                                    props
                                )}
                            </Flex>
                        </Box>
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

export default injectIntl(GeneralMedicalInfo2);
