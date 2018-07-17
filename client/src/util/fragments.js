import moment from 'moment';
import { STATUS, END_TIME, ACTIVE } from './strings';

export const filterActive = `
options: {
    sortKey: "${END_TIME}",
    rangeStart: "${moment().format()}",
    filters: [
        {
            filterKey: "${STATUS}",
            filterValue: "${ACTIVE}"
        }
    ]
}`;

export const activeOfficeFilter = `
    options: {
        filters: [
            {
                filterKey: "${STATUS}",
                filterValue: "${ACTIVE}"
            }
        ]
    }
`;

export const userFragment = `
    id
    firstName
    lastName
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
`;

export const dentistFragment = `
    id
    bio
    location
    specialty
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
    }
    procedure {
        name
        duration
    }
    reservationId
    dentist {
        id
        user {
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
      location
      numChairsSelected
      startTime
      endTime
    }
    appointment {
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
      amount
      source {
        brand
        last4
      }
    }
    chargeStatus
    dateCreated
`;

export const dentistProfilePageFragment = `
    ${dentistFragment}
    offices(${activeOfficeFilter}) {
        ${officeFragment}
        listings(${filterActive}) {
            ${listingFragment}
            reservations(${filterActive}) {
                ${reservationFragment}
                reservedBy {
                    ${dentistFragment}
                }
            }
        }
    }
    reservations(${filterActive}) {
        ${reservationFragment}
        appointments(${filterActive}) {
            ${appointmentFragment}
        }
        office {
            ${officeFragment}
        }
        hostId
        reservedBy {
            id
        }
    }
    reviews {
        ${reviewerFragment}
    }
`;
