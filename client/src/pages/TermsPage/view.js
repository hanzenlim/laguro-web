import React from 'react';
import { Box, Text } from '../../components/';
import { Terms } from '../common/Terms';

const TermsPageView = () => (
    <Box m="40px auto" px={25} width="100%" maxWidth={900}>
        <Text fontWeight="bold" mb={20} fontSize={3}>
            Terms of Service
        </Text>
        <Terms />
    </Box>
);

export default TermsPageView;
