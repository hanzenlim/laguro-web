import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export const execute = async ({
    action,
    beforeAction = () => {},
    afterAction = () => {},
    onError = () => {},
    reportGqlErrorOnly = false,
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

        if (reportGqlErrorOnly && !_isEmpty(error)) {
            const gqlErrorOnly = _get(error, 'graphQLErrors[0].message');
            const parsedError = JSON.parse(gqlErrorOnly.replace('Error: ', ''));
            const clientErrorMessage = _get(error, 'clientErrorMessage', '');

            if (!_isEmpty(parsedError)) {
                if (parsedError.type === 'Onederful') {
                    message.error(
                        'The information that you have provided does not match our records. Please check your details and try again'
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
            message.error(gqlError);
        }

        return false;
    }
};
