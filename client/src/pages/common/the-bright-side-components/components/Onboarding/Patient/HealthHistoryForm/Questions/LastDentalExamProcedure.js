import { Flex, Grid } from '../../../../../../../../components';
import React from 'react';
import _sortBy from 'lodash/sortBy';
import Onboarding from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import { renderQuestionComponent } from '../../../../../../../../util/questionUtils';
import { reduceArrayOfObjects } from '../../../../../../../../util/arrayUtils';
import { injectIntl } from 'react-intl';

const list = _sortBy([
    'Braces',
    'Filling',
    'Root canal',
    'Wisdom teeth removal',
    'Bridges/Dentures',
    'Implants',
    'Tooth extraction',
    'Crown/Cap',
    'Nitrous sedation',
    'Whitening',
]);
list.push('Other');

const texts = {
    Braces: 'medicalHistoryForm.whatWasDone.braces',
    Filling: 'medicalHistoryForm.whatWasDone.filling',
    'Root canal': 'medicalHistoryForm.whatWasDone.rootCanal',
    'Wisdom teeth removal': 'medicalHistoryForm.whatWasDone.wisdomTeeth',
    'Bridges/Dentures': 'medicalHistoryForm.whatWasDone.bridges',
    Implants: 'medicalHistoryForm.whatWasDone.implants',
    'Tooth extraction': 'medicalHistoryForm.whatWasDone.toothExtractions',
    'Crown/Cap': 'medicalHistoryForm.whatWasDone.toothExtractions',
    'Nitrous sedation': 'medicalHistoryForm.whatWasDone.nitrousSedation',
    Whitening: 'medicalHistoryForm.whatWasDone.whitening',
    Other: 'medicalHistoryForm.allergies.other',
};

const getQuestionName = item => `Last dental procedures (${item})`;

const questionConfigs = list.map(item => {
    return {
        name: getQuestionName(item),
        value: false,
    };
});

class LastDentalExamProcedure extends React.Component {
    static questions = questionConfigs;
    constructor(props) {
        super(props);
        const formatText = getFormatTextFromProps(this.props);
        this.questionComponents = reduceArrayOfObjects(
            list.map((item, i) => {
                return {
                    [getQuestionName(item)]: props => {
                        const key = `Last dental procedures (${item})`;

                        return (
                            <Onboarding.Checkbox
                                width={290}
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
        for (
            let i = 0;
            i < Object.values(this.questionComponents).length;
            i++
        ) {
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
                width="100%"
            >
                <ToolsIcon />
                <Onboarding.StepTitleText
                    text={formatText(
                        'medicalHistoryForm.whatWasDone.whatWasDone'
                    )}
                />
                <Onboarding.StepBlurbText />

                <Grid gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}>
                    {renderQuestions}
                </Grid>

                <Onboarding.NextButton
                    onClick={() => {
                        props.formikProps.submitForm();
                    }}
                >
                    {props.formikProps.dirty
                        ? formatText('general.next')
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(LastDentalExamProcedure);
