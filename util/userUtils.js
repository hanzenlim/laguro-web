import _get from 'lodash/get';
import { relationshipList } from '~/data/relationshipList';

export const getUserFullName = user =>
    `${_get(user, 'firstName', '')} ${_get(user, 'lastName')}`;
export const getUserId = user => _get(user, 'id');
export const getUserRelationshipToPrimary = user => {
    const relationshipToPrimary = _get(user, 'relationshipToPrimary');
    if (relationshipToPrimary === 'SELF') {
        return 'Myself';
    }
    if (relationshipToPrimary && relationshipToPrimary !== 'SELF') {
        return relationshipList.filter(r => r.key === relationshipToPrimary)[0]
            .name;
    }
    return '';
};
