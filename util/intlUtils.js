import _get from 'lodash/get';
import _upperFirst from 'lodash/upperFirst';
import { reduceArrayOfObjects } from './arrayUtils';
// import messages from '../strings/messages.json';   // not sure what to do here

export const getFormatTextFromProps = props => (textId, values = {}) =>
    _get(props, 'intl.formatMessage')({ id: textId }, values);

export const getFormatDateFromProps = props => (date, options = {}) =>
    _get(props, 'intl.formatDate')(date, options);

export const getIntlLanguages = formatText => [
    {
        value: 'ENGLISH',
        label: formatText('generalInformation.language.english'),
    },
    {
        value: 'SPANISH',
        label: formatText('generalInformation.language.spanish'),
    },
    {
        value: 'CHINESE',
        label: formatText('generalInformation.language.chinese'),
    },
    {
        value: 'TAGALOG',
        label: formatText('generalInformation.language.tagalog'),
    },
    {
        value: 'VIETNAMESE',
        label: formatText('generalInformation.language.vietnamese'),
    },
    {
        value: 'KOREAN',
        label: formatText('generalInformation.language.korean'),
    },
    {
        value: 'ARMENIAN',
        label: formatText('generalInformation.language.armenian'),
    },
    {
        value: 'JAPANESE',
        label: formatText('generalInformation.language.japanese'),
    },
    {
        value: 'GERMAN',
        label: formatText('generalInformation.language.german'),
    },
    {
        value: 'PERSIAN',
        label: formatText('generalInformation.language.persian'),
    },
    {
        value: 'PORTUGUESE',
        label: formatText('generalInformation.language.portuguese'),
    },
    {
        value: 'RUSSIAN',
        label: formatText('generalInformation.language.russian'),
    },
];

export const getIntlLanguage = (language, formatText) => {
    const intlLanguages = getIntlLanguages(formatText);
    const intlLanguageMap = reduceArrayOfObjects(
        intlLanguages.map(l => ({ [l.value]: l.label }))
    );
    return intlLanguageMap[language.toUpperCase()];
};

export const getIntlMonths = formatDate =>
    [...Array(12).keys()].map(monthValue => {
        const thisYear = new Date().getFullYear();
        return _upperFirst(
            formatDate(new Date(thisYear, monthValue, 1), {
                month: 'long',
            })
        );
    });

export const getIntlMonth = formatText => formatText('general.month');
export const getIntlDate = formatText => formatText('general.date');
export const getIntlYear = formatText => formatText('general.year');

export const getIntlYes = formatText => formatText('general.yes');
export const getIntlNo = formatText => formatText('general.no');
