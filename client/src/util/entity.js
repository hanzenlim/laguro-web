import { DENTIST, OFFICE } from './strings';

// eslint-disable-next-line
export const getEntityName = (entity, type) => {
    if (entity && type === DENTIST) {
        return entity.user.name;
    } else if (entity && type === OFFICE) {
        return entity.name;
    }
    return null;
};
