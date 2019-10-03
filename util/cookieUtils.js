import cookies from 'browser-cookies';
import { hasSkippedMedicalHistoryFormCookieVariableName } from './strings';

export const userHasSkippedMedicalHistory = () =>
    cookies.get(hasSkippedMedicalHistoryFormCookieVariableName) === 'true';

export const setSessionCookie = (name, value) =>
    cookies.set(name, value, {
        expires: 0,
    });
