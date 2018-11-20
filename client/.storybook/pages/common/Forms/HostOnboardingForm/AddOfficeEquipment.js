import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Box } from '../../../../../src/components';
import AddOfficeEquipments from '../../../../../src/pages/common/Forms/HostOnboardingForm/AddOfficeEquipments';

storiesOf('AddOfficeEquipments', module).add('default', () => (
    <Form>
        <Box maxWidth={667}>
            <AddOfficeEquipments />
        </Box>
    </Form>
));
