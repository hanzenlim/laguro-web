export const userFragment = `
    id
    name
    googleId
    imageUrl
    dateCreated
    dentistId
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

export const officeFragment = `
    id
    name
    location
    equipment {
        name
        price
    }
    imageUrls
    numChairs
    status
    dateCreated
`;

export const listingFragment = `
    id
    staffAvailable {
      role
      price
      count
    }
    officeId
    numChairsAvailable
    chairHourlyPrice
    startTime
    endTime
    dateCreated
`;

export const appointmentFragment = `
    patient {
        id
    }
    procedure {
        name
        duration
    }
    reservationId
    location
    startTime
    endTime
    dateCreated
`;

export const reservationFragment = `
    id
    numChairsSelected
    listingId
    office {
        ${officeFragment}
    }
    listing {
        ${listingFragment}
    }
    appointments {
        ${appointmentFragment}
    }
    staffSelected {
      role
      price
      count
    }
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
