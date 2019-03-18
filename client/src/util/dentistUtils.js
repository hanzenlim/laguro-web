import _isEmpty from 'lodash/isEmpty';

// bio is ' '(a single space) when set by hostc creation in the backend
// used to distinguish between dentists created on web and on backend. isBioUpdated will return true for bios updated on frontEnd. bio is a required field in dentist profile form (must not be empty and must not be a ' '(a single space)
export const isBioUpdated = bio => !_isEmpty(bio) && bio !== ' ';
