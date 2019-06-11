import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { ACCOUNT_ALREADY_EXISTS_ERROR } from '../strings/errorStrings';
import { GENERAL_ACCOUNTALREADY_EXISTS } from '../strings/messageStrings';

// returns true if there is no error in execution
// TODO: simplify function by removing reporting non-general errors
export const execute = async ({
    action,
    beforeAction = () => {},
    afterAction = () => {},
    onError = () => {},
    reportGqlErrorOnly = false,
    formatText = text => text,
    errorMessages = {}, // in order to simplify this function, from now on, error messages can provide mapping between backend error messages and frontend error messages
}) => {
    try {
        await beforeAction();
        await action();
        await afterAction();
        return true;
    } catch (error) {
        onError(error);

        const gqlError =
            _get(error, 'networkError.result.result.errors[0].message') ||
            _get(error, 'graphQLErrors[0].message') ||
            _get(error, 'message');

        if (errorMessages.hasOwnProperty(gqlError)) {
            message.error(errorMessages[gqlError]);
            return false;
        }

        if (reportGqlErrorOnly && !_isEmpty(error)) {
            const gqlErrorOnly = _get(error, 'graphQLErrors[0].message');
            const parsedError = JSON.parse(gqlErrorOnly.replace('Error: ', ''));
            const clientErrorMessage = _get(error, 'clientErrorMessage', '');

            if (!_isEmpty(parsedError)) {
                if (parsedError.type === 'Onederful') {
                    message.error(
                        'The information that you have provided does not match our records. Please check your details and try again',
                        10
                    );
                }

                if (parsedError.type === 'Laguro') {
                    message.error(parsedError.message);
                }
            } else if (clientErrorMessage) {
                message.error(clientErrorMessage);
            }
        }

        if (!_isEmpty(gqlError) && !reportGqlErrorOnly) {
            if (gqlError === ACCOUNT_ALREADY_EXISTS_ERROR) {
                message.error(formatText(GENERAL_ACCOUNTALREADY_EXISTS));
            } else {
                message.error(gqlError);
            }
        }

        return false;
    }
};
