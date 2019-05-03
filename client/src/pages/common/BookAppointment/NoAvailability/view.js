import React from 'react';
import { Flex, Text, Link } from '../../../../components';
import history from '../../../../history';
import {
    DENTIST_SEARCH_PAGE_URL,
    OFFICE_SEARCH_PAGE_URL,
} from '../../../../util/urls';

const NoAvailabilityView = () => {
    const isOnDentistPage = history.location.pathname.includes('dentist');
    const isOnOfficePage = history.location.pathname.includes('office');

    let url = '';
    if (isOnDentistPage) {
        url = DENTIST_SEARCH_PAGE_URL;
    }
    if (isOnOfficePage) {
        url = OFFICE_SEARCH_PAGE_URL;
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            pt="16px"
        >
            <Text
                fontSize="14px"
                fontWeight="500"
                letterSpacing="-0.3px"
                mb="9px"
                color="text.lightGray"
            >
                There is no availability at this time
            </Text>
            <Link to={url}>
                <Text fontSize="14px" color="#3481f8">
                    Redo search
                </Text>
            </Link>
        </Flex>
    );
};

export default NoAvailabilityView;
