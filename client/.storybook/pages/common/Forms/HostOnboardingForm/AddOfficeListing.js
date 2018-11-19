import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Box } from '../../../../../src/components';
import AddOfficeListing from '../../../../../src/pages/common/Forms/HostOnboardingForm/AddOfficeListing';
import { ContainerPaddingInPixels } from '../../../../../src/components/Container';

storiesOf('AddOfficeListing', module).add('default', () => (
    <Form>
        <Box px={[ContainerPaddingInPixels, '', 28]} maxWidth={667}>
            <AddOfficeListing />
        </Box>
    </Form>
));
