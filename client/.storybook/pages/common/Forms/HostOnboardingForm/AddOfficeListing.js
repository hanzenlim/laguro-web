import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Box } from '../../../../../src/components';
import AddOfficeListing from '../../../../../src/pages/common/Forms/HostOnboardingForm/AddOfficeListing';

storiesOf('AddOfficeListing', module).add('default', () => (
    <Form>
        <Box maxWidth={667}>
            <AddOfficeListing />
        </Box>
    </Form>
));
