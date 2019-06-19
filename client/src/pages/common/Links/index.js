import React from 'react';
import { Text, Link } from '../../../components/index';
import {
    HOST_ONBOARDING_PAGE_URL_PREFIX,
    DENTIST_ONBOARDING_PROFILE_URL,
} from '../../../util/urls';

export const BecomeADentistLink = (
    <Link to={DENTIST_ONBOARDING_PROFILE_URL}>
        <Text
            color="text.blue"
            fontSize={3}
            letterSpacing="-0.49px"
            textAlign={['', '', 'center']}
        >
            Become a{' '}
            <Text is="span" color="inherit" fontWeight="medium">
                Laguro Dentist{' '}
            </Text>
            >
        </Text>
    </Link>
);

export const BecomeAHostLink = (
    <Link to={`${HOST_ONBOARDING_PAGE_URL_PREFIX}/add-office`}>
        <Text
            color="text.blue"
            fontSize={3}
            letterSpacing="-0.49px"
            textAlign={['', '', 'center']}
        >
            Become a{' '}
            <Text is="span" color="inherit" fontWeight="medium">
                Laguro Host{' '}
            </Text>
            >
        </Text>
    </Link>
);

export const GenericLink = ({ text, url }) => (
    <Link to={url}>
        <Text
            color="text.blue"
            fontSize={3}
            letterSpacing="-0.49px"
            textAlign={['', '', 'center']}
        >
            {text} >
        </Text>
    </Link>
);

export const NewTabLink = ({ to, children }) => (
    <Link to={to} isExternal target="_blank">
        {children}
    </Link>
);
