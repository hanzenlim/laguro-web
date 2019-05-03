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
}) => {
    const gtmArgs = {
        dataLayer: {
            event: 'GA Event',
            eventAction: 'Conversion',
            eventCategory: 'Appointment',
            eventLabel: dentistId,
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
