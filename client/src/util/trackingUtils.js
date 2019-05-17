import TagManager from 'react-gtm-module';
import { gtmTrackingId } from '../config/keys';

export const trackUserAuth = ({ userId }) => {
    const gtmArgs = {
        dataLayer: {
            userID: userId,
        },
    };
    TagManager.dataLayer(gtmArgs);
};

export const trackUserSignup = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Sign Up',
        },
    };
    TagManager.dataLayer(gtmArgs);
};

export const initializeTagManager = () => {
    const tagManagerArgs = {
        gtmId: gtmTrackingId,
    };

    TagManager.initialize(tagManagerArgs);
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
    TagManager.dataLayer(gtmArgs);
};

export const trackPageview = ({ urlPath, pageName }) => {
    const gtmArgs = {
        dataLayer: {
            event: 'virtualPageview',
            eventAction: urlPath,
            eventCategory: pageName,
        },
    };

    TagManager.dataLayer(gtmArgs);
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
    TagManager.dataLayer(gtmArgs);
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
    TagManager.dataLayer(gtmArgs);
};

export const trackSignupAttempt = () => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Interaction',
            eventCategory: 'Sign Up - Attempt',
        },
    };
    TagManager.dataLayer(gtmArgs);
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
    TagManager.dataLayer(gtmArgs);
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
    TagManager.dataLayer(gtmArgs);
};
