export const DOCUMENT_HEALTH_INSURANCE_IMAGES = 'healthInsuranceImages';
export const DOCUMENT_LICENSE = 'license';
export const DOCUMENT_DENTIST_PHOTO_ID = 'dentistPhotoId';
export const DOCUMENT_STATE_DENTAL_LICENSE = 'stateDentalLicense';
export const DOCUMENT_DEA_REGISTRATION = 'deaRegistration';
export const DOCUMENT_WARRANTY = 'warranty';

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

export const documentKinds = [...patientDocumentKinds, ...dentistDocumentKinds];

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
