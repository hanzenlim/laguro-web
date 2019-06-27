import { Flex, Grid } from '@laguro/basic-components';
import React from 'react';
import _sortBy from 'lodash/sortBy';
import Onboarding from '../../../../Onboarding';
import ToolsIcon from '../../../Assets/toolsIcon';
import { getFormatTextFromProps } from '../../../../../../../../util/intlUtils';
import {
    MEDICALHISTORYFORM_WHATWASDONE_BRACES,
    MEDICALHISTORYFORM_WHATWASDONE_FILLING,
    MEDICALHISTORYFORM_WHATWASDONE_ROOTCANAL,
    MEDICALHISTORYFORM_WHATWASDONE_WISDOMTEETH,
    MEDICALHISTORYFORM_WHATWASDONE_BRIDGES,
    MEDICALHISTORYFORM_WHATWASDONE_IMPLANTS,
    MEDICALHISTORYFORM_WHATWASDONE_TOOTHEXTRACTIONS,
    MEDICALHISTORYFORM_WHATWASDONE_NITROUSSEDATION,
    MEDICALHISTORYFORM_WHATWASDONE_WHITENING,
    MEDICALHISTORYFORM_ALLERGIES_OTHER,
    MEDICALHISTORYFORM_WHATWASDONE_WHATWASDONE,
    GENERAL_NEXT,
} from '../../../../../../../../strings/messageStrings';
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
    Braces: MEDICALHISTORYFORM_WHATWASDONE_BRACES,
    Filling: MEDICALHISTORYFORM_WHATWASDONE_FILLING,
    'Root canal': MEDICALHISTORYFORM_WHATWASDONE_ROOTCANAL,
    'Wisdom teeth removal': MEDICALHISTORYFORM_WHATWASDONE_WISDOMTEETH,
    'Bridges/Dentures': MEDICALHISTORYFORM_WHATWASDONE_BRIDGES,
    Implants: MEDICALHISTORYFORM_WHATWASDONE_IMPLANTS,
    'Tooth extraction': MEDICALHISTORYFORM_WHATWASDONE_TOOTHEXTRACTIONS,
    'Crown/Cap': MEDICALHISTORYFORM_WHATWASDONE_TOOTHEXTRACTIONS,
    'Nitrous sedation': MEDICALHISTORYFORM_WHATWASDONE_NITROUSSEDATION,
    Whitening: MEDICALHISTORYFORM_WHATWASDONE_WHITENING,
    Other: MEDICALHISTORYFORM_ALLERGIES_OTHER,
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
                                width="100%"
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
                        MEDICALHISTORYFORM_WHATWASDONE_WHATWASDONE
                    )}
                />
                <Onboarding.StepBlurbText />

                <Grid
                    gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                    style={{ maxWidth: 900, width: '100%' }}
                >
                    {renderQuestions}
                </Grid>

                <Onboarding.NextButton
                    onClick={() => {
                        props.formikProps.submitForm();
                    }}
                >
                    {props.formikProps.dirty
                        ? formatText(GENERAL_NEXT)
                        : 'Skip'}
                </Onboarding.NextButton>
            </Flex>
        );
    }
}

export default injectIntl(LastDentalExamProcedure);
