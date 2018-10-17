import React from 'react';
import { storiesOf } from '@storybook/react';
import ListingConfirmation from '../src/pages/common/ListingConfirmation';
import { Box } from '../src/components';

storiesOf('ListingConfirmation', module).add('default', () => (
    <Box p={20}>
        <ListingConfirmation />
    </Box>
));
