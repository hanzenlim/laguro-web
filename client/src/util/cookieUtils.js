import cookies from 'browser-cookies';
import { hasSkippedMedicalHistoryFormCookieVariableName } from './strings';

export const userHasSkippedMedicalHistory = () =>
    cookies.get(hasSkippedMedicalHistoryFormCookieVariableName) === 'true';
