// TODO consider creating a pluralize function
export const USER = 'user';
export const HOST = 'host';
export const DENTIST = 'DENTIST';
export const DENTISTS = 'dentists';
export const EQUIPMENT = 'equipment';
export const PATIENT = 'patient';
export const OFFICE = 'OFFICE';
export const OFFICES = 'offices';
export const LISTING = 'listing';
export const LISTINGS = 'listings';
export const LOCATION = 'LOCATION';
export const RESERVATION = 'reservation';
export const RESERVATIONS = 'reservations';
export const PROCEDURE = 'procedure';
export const PROCEDURES = 'procedures';
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
export const PAYER = 'payer';
export const PAYEE = 'payee';
export const START_TIME = 'startTime';
export const END_TIME = 'endTime';
export const DATE_CREATED = 'dateCreated';

// STATUSES
export const STATUS = 'status';
export const ACTIVE = 'ACTIVE';
export const PENDING_PATIENT_APPROVAL = 'PENDING_PATIENT_APPROVAL';
export const REJECTED_BY_PATIENT = 'REJECTED_BY_PATIENT';
export const CANCELLED_BY_DENTIST = 'CANCELLED_BY_DENTIST';
export const CANCELLED_BY_PATIENT = 'CANCELLED BY PATIENT';

export const TYPE = 'type';
export const RESERVATION_PAYMENT_TYPE = 'RESERVATION';
export const APPOINTMENT_PAYMENT_TYPE = 'APPOINTMENT';
export const PROCEDURE_PAYMENT_TYPE = 'PROCEDURE';
export const PROCEDURE_SET_HISTORY_PAYMENT_TYPE = 'PROCEDURE_SET_HISTORY';
export const EQUIPMENT_PAYMENT_TYPE = 'EQUIPMENT';
export const BOOKING_FEE_PAYMENT_TYPE = 'BOOKING_FEE';
export const MATERIAL_PAYMENT_TYPE = 'MATERIAL';
export const CLEANING_FEE_PAYMENT_TYPE = 'CLEANING_FEE';
export const CHAIR_TIME_PAYMENT_TYPE = 'CHAIR_TIME';

export const AVAILABLE = 'available';

export const CHARGED = 'CHARGED';
export const REFUNDED = 'REFUNDED';

export const REJECTED = 'rejected';

// Profile page
export const MY_INSURANCE = 'my_insurance';
export const MY_DOCUMENTS = 'my_documents';
export const MY_PROFILE = 'my_profile';
export const PAYMENT_REQUEST = 'payment_request';
export const MY_APPOINTMENTS = 'my_appointments';
export const PAYMENTS = 'payments';
export const BALANCE = 'balance';
export const PUBLIC_PROFILE = 'public_profile';
export const DENTIST_PROFILE = 'dentist_profile';
export const MY_LISTINGS = 'my_listings';
export const MY_BOOKINGS = 'my_bookings';
export const NEW_APPOINTMENT = 'new_appointment';
export const MY_PATIENTS = 'my_patients';

// menu items
export const HOME_MENU = 'Home';
export const LOG_OUT_MENU = 'Log Out';
export const MY_PAGE_MENU = 'My Page';
export const MY_ACCOUNT_MENU = 'My Account';
export const MY_INSURANCE_MENU = 'My Insurance';
export const MY_DOCUMENTS_MENU = 'My Documents';
export const MY_PROFILE_MENU = 'My Profile';
export const MY_APPOINTMENTS_MENU = 'My Appointments';
export const PAYMENT_HISTORY_MENU = 'Payment History';
export const LAGURO_BALANCE_MENU = 'Laguro Balance';
export const PREVIEW_PUBLIC_PROFILE_MENU = 'Preview Public Profile';
export const MY_LISTINGS_MENU = 'My Listings';
export const MY_BOOKINGS_MENU = 'My Bookings';
export const NEW_APPOINTMENT_MENU = 'New Appointment';
export const MY_PATIENTS_MENU = 'My Patients';
export const PAYMENT_REQUEST_MENU = 'Payment Request';
export const SEARCH_FOR_CHAIRS_MENU = 'Search for Chairs';
export const ADD_A_NEW_OFFICE_MENU = 'Add a New Office';
export const BECOME_A_HOST_MENU = 'Become a Host';
export const MY_CALENDAR_MENU = 'My Calendar';

// Payment method
export const NEW_CARD_PAYMENT_METHOD = 'NEW_CARD_PAYMENT_METHOD';

// Payment history
export const PAYMENT = 'PAYMENT';
export const PAYMENT_CARD = 'PAYMENT';
export const BALANCE_CARD = 'BALANCE';
export const PAID_OUT = 'PAID_OUT';
export const PAYMENT_REFUNDED = 'refunded';
export const PAYMENT_WITHDRAWN = 'withdrawn';
export const PAYMENT_AVAILABLE = 'available';
export const PAYMENT_PENDING = 'pending';
export const PAYMENT_MADE = 'Payment Made';
export const PAYMENT_RECEIVED = 'PAYMENT RECEIVED';
export const RESERVATION_CANCELLED_BY_DENTIST =
    'Reservation cancelled by dentist';
export const APPOINTMENT_CANCELLED_BY_PATIENT =
    'Appointment cancelled by patient';
export const RESERVATION_BOOKED = 'Reservation booked';
export const EQUIPMENT_ADDED = 'Equipment added';
export const APPOINTMENT_BOOKED = 'Appointment booked';
export const PROCEDURES_ASSIGNED = 'Procedures assigned';
export const CANCELLED = 'CANCELLED';

// Filestack container
export const USER_PHOTOS_CONTAINER = 'user-photos';

// Apollo TypeNames
export const ACTIVE_USER = 'ActiveUser';

export const APPOINTMENT_NUM = 'appointmentNum';
// PatientProcedure
export const PENDING = 'pending';

// Make a reservation
export const SELECT_APPOINTMENT_VIEW = 'select_appointment_view';
export const PAYMENT_VIEW = 'payment_view';
export const CONFIRMATION_VIEW = 'confirmation_view';
export const BOOKING_FEE_PERCENTAGE = 0.15;

// host onboarding
export const EDIT_OFFICE_MODE = 'edit-office';
export const ADD_LISTING_MODE = 'add-listing';
export const HOST_ONBOARDING_CREATE_MODE = 'onboarding-create';

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

// tooltips
export const STATE_DENTAL_LICENSE_TOOLTIP =
    'We accept valid state license credentials (varied from state to state).';
export const DENTIST_PHOTO_ID_TOOLTIP = 'We accept valid driver’s license.';
export const WARRANTY_TOOLTIP =
    'Commonly known as medical professional liability insurance. This insurance covers bodily injury, property damage, and personal injury such as mental anguish.';

export const hasSkippedMedicalHistoryFormCookieVariableName =
    'hasSkippedMedicalHistoryForm';
