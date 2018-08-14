import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '../src/components/Box';

storiesOf('Box', module)
    .add('Padding', () => <Box p={8}>Hello</Box>)
    .add('Margin', () => <Box m={8}>Hello</Box>);
