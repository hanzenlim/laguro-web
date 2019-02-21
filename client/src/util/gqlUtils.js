import { message } from 'antd';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

export const execute = async ({
    action,
    beforeAction = () => {},
    afterAction = () => {},
    onError = () => {},
}) => {
    try {
        beforeAction();
        await action();
        afterAction();
        return true;
    } catch (error) {
        console.log('1232', error);
        onError();
        const gqlError =
            _get(error, 'networkError.result.result.errors[0].message') ||
            _get(error, 'graphQLErrors[0].message') ||
            _get(error, 'message');
        !_isEmpty(gqlError) && message.error(gqlError);
        return false;
    }
};
