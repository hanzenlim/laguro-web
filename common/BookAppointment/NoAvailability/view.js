import React from 'react';
import { useRouter } from 'next/router';

import { Flex, Text, Link, Box } from '~/components';
import { DENTIST_SEARCH_PAGE_URL, OFFICE_SEARCH_PAGE_URL } from '~/util/urls';

import { wrapperStyles } from '..';

const NoAvailabilityView = () => {
    const router = useRouter();
    const isOnDentistPage = router.asPath.includes('dentist');
    const isOnOfficePage = router.asPath.includes('office');

    let url = '';
    if (isOnDentistPage) {
        url = DENTIST_SEARCH_PAGE_URL;
    }
    if (isOnOfficePage) {
        url = OFFICE_SEARCH_PAGE_URL;
    }

    return (
        <Box {...wrapperStyles}>
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
                        Click here to search again
                    </Text>
                </Link>
            </Flex>
        </Box>
    );
};

export default NoAvailabilityView;
