import _get from 'lodash/get';

export const getUserFullName = user =>
    `${_get(user, 'firstName', '')} ${_get(user, 'lastName')}`;
export const getUserId = user => _get(user, 'id');
