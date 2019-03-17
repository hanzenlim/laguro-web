import _lowerCase from 'lodash/lowerCase';
import _capitalize from 'lodash/capitalize';

// keys are used in urls, texts are used in header menus and dashboard menus
export const getKeyFromText = text =>
    text && _lowerCase(text.split(' ').join('_'));
export const getTextFromKey = text =>
    text && _capitalize(text.split('_').join(' '));
