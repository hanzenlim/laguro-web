import React from 'react';
import { Box, Container } from '../../components/';
import { Terms } from '../common/Terms';

const TermsPageView = () => (
    <Container>
        <Box m="20px auto" width={['unset', '', '50%']}>
            <p>Terms of Service</p>
            <Terms />
        </Box>
    </Container>
);

export default TermsPageView;
