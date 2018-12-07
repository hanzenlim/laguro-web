import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box } from '../src/components';
import UpdateDentistProfileForm from '../src/pages/common/Forms/UpdateDentistProfileForm/view';

const data = {
    imageUrl: 'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
    firstName: 'Paul Simon',
    middleName: 'Enriquez',
    lastName: 'Ongpin',
    phoneNumber: '',
    smsNotification: true,
    emailNotification: true,
    specialty: 'General Dentist',
    bio: 'I am a great dentist',
};

const props = {
    data,
    error: '',
    isUpdated: false,
    onSuccess: () => {},
    procedures: { hello: '', magic: '' },
    isSubmitting: false,
};

storiesOf('UpdateDentistProfileForm', module).add('default', () => (
    <Box maxWidth={720}>
        <UpdateDentistProfileForm {...props} />
    </Box>
));
