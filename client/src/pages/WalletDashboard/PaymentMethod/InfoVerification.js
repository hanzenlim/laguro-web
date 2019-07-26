import React from 'react';
// import PropTypes from 'prop-types';

import { Box, Text, Link, Button } from '../../../components';
// import { getUser } from '../../../util/authUtils';

const InfoVerification = () => (
    <Box textAlign="center">
        <Text fontSize={3} fontWeight="medium" mb={30}>
            Verification
        </Text>

        <Text mb={20}>
            Something is missing! Please see below and visit{' '}
            <Link to="/dashboard/patient?selectedTab=account%20settings">
                <Text is="span" color="text.blue">
                    My Profile
                </Text>
            </Link>{' '}
            to add the information needed to proceed
        </Text>

        <Box
            px={10}
            pt={30}
            pb={10}
            borderRadius={6}
            border="1px solid"
            borderColor="divider.gray"
            mb={16}
        >
            <InfoItem label="NAME" value="Paul Simon Ongpin" />
            <InfoItem label="DATE OF BIRTH" value="July 3rd, 1993" />
            <InfoItem label="EMAIL ADDRESS" value="abc123@gmail.com" />
            <InfoItem
                label="DATE OF BIRTH"
                value="201 Dolores Ave, San Leandro, CA 94577"
            />
        </Box>

        <Text fontSize={10} color="text.gray" mb={16}>
            If you’d like to modify the information, please visit{' '}
            <Link to="/dashboard/patient?selectedTab=account%20settings">
                <Text is="span" color="text.blue">
                    My profile
                </Text>
            </Link>
        </Text>

        <Button
            type="ghost"
            width="100%"
            style={{ border: '1px solid #3481f8', borderRadius: 25 }}
        >
            <Text color="text.blue">Confirm and next </Text>
        </Button>
    </Box>
);

const InfoItem = ({ label, value }) => (
    <Box mb={20}>
        <Text color="#245197" fontSize={0} fontWeight="medium" mb={5}>
            {label}
        </Text>
        <Text fontSize={0} fontWeight="medium" mb={5}>
            {value}
        </Text>
    </Box>
);

InfoVerification.propTypes = {};

export default InfoVerification;
