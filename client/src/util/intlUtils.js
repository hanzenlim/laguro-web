import _get from 'lodash/get';
import _upperFirst from 'lodash/upperFirst';
import {
    GENERALINFORMATION_LANGUAGE_ENGLISH,
    GENERALINFORMATION_LANGUAGE_SPANISH,
    GENERALINFORMATION_LANGUAGE_CHINESE,
    GENERALINFORMATION_LANGUAGE_TAGALOG,
    GENERALINFORMATION_LANGUAGE_VIETNAMESE,
    GENERALINFORMATION_LANGUAGE_KOREAN,
    GENERALINFORMATION_LANGUAGE_ARMENIAN,
    GENERALINFORMATION_LANGUAGE_JAPANESE,
    GENERALINFORMATION_LANGUAGE_GERMAN,
    GENERALINFORMATION_LANGUAGE_PERSIAN,
    GENERALINFORMATION_LANGUAGE_PORTUGUESE,
    GENERALINFORMATION_LANGUAGE_RUSSIAN,
    GENERAL_MONTH,
    GENERAL_DATE,
    GENERAL_YEAR,
    GENERAL_YES,
    GENERAL_NO,
} from '../strings/messageStrings';
import { reduceArrayOfObjects } from './arrayUtils';

export const getFormatTextFromProps = props => (textId, values = {}) =>
    _get(props, 'intl.formatMessage')({ id: textId }, values);

export const getFormatDateFromProps = props => (date, options = {}) =>
    _get(props, 'intl.formatDate')(date, options);

export const getIntlLanguages = formatText => [
    {
        value: 'ENGLISH',
        label: formatText(GENERALINFORMATION_LANGUAGE_ENGLISH),
    },
    {
        value: 'SPANISH',
        label: formatText(GENERALINFORMATION_LANGUAGE_SPANISH),
    },
    {
        value: 'CHINESE',
        label: formatText(GENERALINFORMATION_LANGUAGE_CHINESE),
    },
    {
        value: 'TAGALOG',
        label: formatText(GENERALINFORMATION_LANGUAGE_TAGALOG),
    },
    {
        value: 'VIETNAMESE',
        label: formatText(GENERALINFORMATION_LANGUAGE_VIETNAMESE),
    },
    {
        value: 'KOREAN',
        label: formatText(GENERALINFORMATION_LANGUAGE_KOREAN),
    },
    {
        value: 'ARMENIAN',
        label: formatText(GENERALINFORMATION_LANGUAGE_ARMENIAN),
    },
    {
        value: 'JAPANESE',
        label: formatText(GENERALINFORMATION_LANGUAGE_JAPANESE),
    },
    {
        value: 'GERMAN',
        label: formatText(GENERALINFORMATION_LANGUAGE_GERMAN),
    },
    {
        value: 'PERSIAN',
        label: formatText(GENERALINFORMATION_LANGUAGE_PERSIAN),
    },
    {
        value: 'PORTUGUESE',
        label: formatText(GENERALINFORMATION_LANGUAGE_PORTUGUESE),
    },
    {
        value: 'RUSSIAN',
        label: formatText(GENERALINFORMATION_LANGUAGE_RUSSIAN),
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

export const getIntlMonth = formatText => formatText(GENERAL_MONTH);
export const getIntlDate = formatText => formatText(GENERAL_DATE);
export const getIntlYear = formatText => formatText(GENERAL_YEAR);

export const getIntlYes = formatText => formatText(GENERAL_YES);
export const getIntlNo = formatText => formatText(GENERAL_NO);
