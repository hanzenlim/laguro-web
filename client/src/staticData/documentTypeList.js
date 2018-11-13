export const DOCUMENT_HEALTH_INSURANCE_IMAGES = 'healthInsuranceImages';
export const DOCUMENT_LICENSE = 'license';
export const DOCUMENT_DENTIST_PHOTO_ID = 'dentistPhotoId';
export const DOCUMENT_STATE_DENTAL_LICENSE = 'stateDentalLicense';
export const DOCUMENT_DEA_REGISTRATION = 'deaRegistration';
export const DOCUMENT_WARRANTY = 'warranty';
export const DOCUMENT_OFFICE_BUSINESS_LICENSE = 'businessLicense';
export const DOCUMENT_OFFICE_GENERAL_INSURANCE = 'generalInsurance';

export const patientDocumentKinds = [
    DOCUMENT_HEALTH_INSURANCE_IMAGES,
    DOCUMENT_LICENSE,
];

export const dentistDocumentKinds = [
    DOCUMENT_DENTIST_PHOTO_ID,
    DOCUMENT_STATE_DENTAL_LICENSE,
    DOCUMENT_DEA_REGISTRATION,
    DOCUMENT_WARRANTY,
];

export const officeDocumentKinds = [
    DOCUMENT_OFFICE_BUSINESS_LICENSE,
    DOCUMENT_OFFICE_GENERAL_INSURANCE,
];

export const documentKinds = [
    ...patientDocumentKinds,
    ...dentistDocumentKinds,
    ...officeDocumentKinds,
];

const documentTypeList = {
    patient: [DOCUMENT_HEALTH_INSURANCE_IMAGES, DOCUMENT_LICENSE],
    dentist: [
        DOCUMENT_DENTIST_PHOTO_ID,
        DOCUMENT_STATE_DENTAL_LICENSE,
        DOCUMENT_DEA_REGISTRATION,
        DOCUMENT_WARRANTY,
    ],
};

export default documentTypeList;
