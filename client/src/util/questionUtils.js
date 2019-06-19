import { GENERAL_YES, GENERAL_NO } from '../strings/messageStrings';

export const getNameAtIndexOfQuestionConfigs = (questionConfigs, i) => {
    return questionConfigs[i].name;
};

export const renderQuestionComponent = (
    questionComponents,
    questionConfigs,
    index,
    props
) =>
    questionComponents[getNameAtIndexOfQuestionConfigs(questionConfigs, index)](
        props
    );

export const getYesOrNoNamesAndTexts = formatText => [
    { name: 'Yes', text: formatText(GENERAL_YES) },
    { name: 'No', text: formatText(GENERAL_NO) },
];
