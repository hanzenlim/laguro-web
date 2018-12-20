import moment from 'moment';
import { STATUS, END_TIME, ACTIVE } from './strings';

export const filterActive = `
options: {
    sortKey: "${END_TIME}",
    rangeStart: "${moment().format()}",
    filters: [
        {
            filterKey: "${STATUS}",
            filterValues: ["${ACTIVE}"]
        }
    ]
}`;

export const userFragment = `
    id
    firstName
    lastName
    isVerified
    googleId
    imageUrl
    phoneNumber
    dateCreated
    dentistId
    payoutAccountId
    notificationSettings {
        general {
            email
            sms
        }
    }
    email
    intercomHash
`;

export const dentistFragment = `
    id
    bio
    location
    specialty
    isVerified
    procedures {
        name
        duration
    }
`;

export const listingFragment = `
    id
    officeId
    numChairsAvailable
    chairHourlyPrice
    cleaningFee
    status
    startTime
    endTime
    dateCreated
`;

export const officeFragment = `
    id
    name
    location
    equipment {
        name
        price
    }
    description
    reviews {
        id
        rating
    }
    imageUrls
    status
    dateCreated
`;

export const appointmentFragment = `
    id
    patient {
        id
        firstName
        lastName
    }
    procedure {
        name
        duration
    }
    reservationId
    dentist {
        id
        user {
            id
            firstName
            lastName
            imageUrl
        }
    }
    reservation {
        id
        office{
            ${officeFragment}
        }
    }
    location
    startTime
    endTime
    dateCreated
`;

export const reservationFragment = `
    id
    numChairsSelected
    listingId
    reservedBy {
        id
        user {
            id
            firstName
            lastName
        }
    }
    equipmentSelected
    status
    totalPaid
    payment {
      id
    }
    startTime
    endTime
    dateCreated
    location
`;

export const reviewFragment = `
    id
    type
    rating
    text
    title
    dateCreated
`;

export const reviewerFragment = `
    ${reviewFragment}
    reviewer {
        id
        firstName
        lastName
        imageUrl
    }
`;

export const revieweeFragment = `
    ${reviewerFragment}
    dentistReviewee {
      id
      user {
        id
        firstName
        lastName
        imageUrl
      }
      dateCreated
    }
    officeReviewee {
      id
      host {
        id
        user {
          id
          firstName
          lastName
        }
        specialty
        location
        procedures
        dateCreated
      }
    }
`;

export const paymentOptionFragment = `
    id
    address_city
    address_country
    last4
`;

export const paymentFragment = `
    id
    type
    status
    reservation {
        id
        location
        numChairsSelected
        startTime
        endTime
    }
    procedures {
        id
        name
    }
    appointment {
        id
        location
        procedure {
            name
        }
        startTime
        endTime
    }
    nominalAmount
    currency
    stripePayment {
        id
        amount
        source {
            id
            brand
            last4
        }
    }
    chargeStatus
    dateCreated
`;

export const patientProcedureFragment = `
    id
    patientId
    procedureNum
    dateCreated
    totalCost
    patientEstimate
    insuranceEstimate
    name
    status
    dentistId
`;

export const patientDocumentFragment = `
    id
    signatureRequestId
    healthInsuranceImages
    license
    dentistPhotoId
    stateDentalLicense
    deaRegistration
    warranty
`;
