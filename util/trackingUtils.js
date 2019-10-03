import TagManager from 'react-gtm-module';
import { gtmTrackingId } from '../keys';

export const trackUserAuth = ({ userId }) => {
    const gtmArgs = {
        dataLayer: {
            userID: userId,
        },
    };

    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackUserSignup = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Sign Up',
        },
    };

    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const initializeTagManager = () => {
    const tagManagerArgs = {
        gtmId: gtmTrackingId,
    };

    if (typeof window !== 'undefined') {
        TagManager.initialize(tagManagerArgs);
    }
};

export const trackBookAppointment = ({
    dentistId,
    officeId,
    appointmentId,
    city,
    weekDay,
    internalPage,
    hour,
    eventAction,
}) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventCategory: 'Appointment',
            eventLabel: dentistId,
            eventAction,
            hour,
            city,
            weekDay,
            officeId,
            internalPage,
            appointmentId,
        },
    };

    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackBookAppointmentAttempt = ({
    dentistId,
    officeId,
    weekDay,
    internalPage,
    hour,
    eventAction,
}) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventCategory: 'Appointment - Attempt',
            eventLabel: dentistId,
            eventAction,
            hour,
            weekDay,
            officeId,
            internalPage,
        },
    };

    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackPageview = ({ urlPath, pageName }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'virtualPageview',
            eventAction: urlPath,
            eventCategory: pageName,
        },
    };

    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSelectProcedure = ({ eventLabel }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Price',
            eventLabel,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSelectInsurance = ({ eventLabel }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Insurance',
            eventLabel,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSignupAttempt = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Sign Up - Attempt',
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackCheckOutOfPocketAttempt = ({ internalPage }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Check out of pocket',
            internalPage,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSelectTimeSlot = ({ eventLabel, internalPage }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Time slot',
            eventLabel,
            internalPage,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackAddReview = ({ eventLabel }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Review',
            eventLabel,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackNewsletterSignup = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Newsletter',
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSearch = ({ eventLabel = '', internalPage = '' }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Search',
            eventLabel,
            internalPage,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackSearchFilter = ({ eventLabel = '' }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Search Filter',
            eventLabel,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackAddFamilyMember = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Add Family Member',
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackPriceEstimationQuizAttempt = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Price Estimation Quiz - Attempt',
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};

export const trackPriceEstimationQuizStep = ({ eventLabel }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Price Estimation Quiz - Step',
            eventLabel,
        },
    };
    if (typeof window !== 'undefined') {
        TagManager.dataLayer(gtmArgs);
    }
};
