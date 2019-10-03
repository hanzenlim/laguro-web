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
    { name: 'Yes', text: formatText('general.yes') },
    { name: 'No', text: formatText('general.no') },
];
