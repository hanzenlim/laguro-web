import moment from 'moment';
import { STATUS, ACTIVE } from './strings';

export const filterActive = `
options: {
    sortKey: "startTime",
    rangeStart: "${moment().format()}",
    filters: [
        {
            filterKey: "${STATUS}",
            filterValue: "${ACTIVE}"
        }
    ]
}`;

export const userFragment = `
    id
    name
    googleId
    imageUrl
    dateCreated
    dentistId
    payoutAccountId
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
numChairs
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
            name
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
            name
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
        name
        imageUrl
    }
`;

export const revieweeFragment = `
    ${reviewerFragment}
    dentistReviewee {
      id
      user {
        id
        name
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
          name
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
