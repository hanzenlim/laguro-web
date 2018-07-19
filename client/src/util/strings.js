// TODO consider creating a pluralize function
export const USER = 'user';
export const HOST = 'host';
export const DENTIST = 'dentist';
export const DENTISTS = 'dentists';
export const OFFICE = 'office';
export const OFFICES = 'offices';
export const LISTING = 'listing';
export const LISTINGS = 'listings';
export const RESERVATION = 'reservation';
export const RESERVATIONS = 'reservations';
export const ALL_RESERVATIONS = 'all_reservations';
export const APPOINTMENT = 'appointment';
export const APPOINTMENTS = 'appointments';
export const REVIEW = 'review';
export const REVIEWS = 'reviews';
export const PAYMENT_OPTIONS = 'PAYMENT_OPTIONS';
export const PAYOUT_ACCOUNT = 'PAYMENT_ACCOUNT';
export const PAYOUT_LOGIN = 'PAYOUT_LOGIN';

export const OFFICE_ID = 'officeId';
export const DENTIST_ID = 'dentistId';
export const PATIENT_ID = 'patientId';
export const HOST_ID = 'hostId';
export const REVIEWEE_ID = 'revieweeId';
export const RESERVED_BY = 'reservedBy';
export const PAYER_ID = 'payerId';
export const PAYEE_ID = 'payeeId';
export const START_TIME = 'startTime';
export const END_TIME = 'endTime';
export const DATE_CREATED = 'dateCreated';

// STATUSES
export const STATUS = 'status';
export const ACTIVE = 'ACTIVE';
export const CANCELLED_BY_DENTIST = 'CANCELLED_BY_DENTIST';
export const CANCELLED_BY_PATIENT = 'CANCELLED BY PATIENT';

export const TYPE = 'type';
export const RESERVATION_PAYMENT_TYPE = 'RESERVATION';
export const APPOINTMENT_PAYMENT_TYPE = 'APPOINTMENT';

export const AVAILABLE = 'available';

export const CHARGED = 'CHARGED';
export const REFUNDED = 'REFUNDED';

// Payment history
export const PAYMENT_MADE = 'PAYMENT MADE';
export const PAYMENT_RECEIVED = 'PAYMENT RECEIVED';
export const RESERVATION_CANCELLED_BY_DENTIST =
    'Reservation cancelled by dentist';
export const APPOINTMENT_CANCELLED_BY_PATIENT =
    'Appointment cancelled by patient';
export const RESERVATION_BOOKED = 'Reservation booked';
export const APPOINTMENT_BOOKED = 'Appointment booked';
export const CANCELLED = 'CANCELLED';

// TODO delete following
// const pluralizeMap = {
//     USER: 'users',
//     DENTIST: 'dentists',
//     OFFICE: 'offices',
//     LISTING: 'listings',
//     RESERVATION: 'reservations',
//     APPOINTMENT: 'appointments',
//     REVIEW: 'reviews'
// };
// export const pluralize = singular => pluralizeMap[singular];
