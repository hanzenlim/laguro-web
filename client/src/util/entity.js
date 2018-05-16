import { DENTIST, OFFICE } from './strings';

// eslint-disable-next-line
export const getEntityName = (entity, type) => {
    if (type === DENTIST) {
        return entity.user.name;
    } else if (type === OFFICE) {
        return entity.name;
    } else {
        return null;
    }
};
