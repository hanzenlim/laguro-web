import React from 'react';
import { storiesOf } from '@storybook/react';
import UpdateProfileForm from '../src/pages/common/Forms/UpdateProfileForm/view';

const data = {
  imageUrl: 'https://cdn.filestackcontent.com/JXbUNxZqTLivfioMfCwV',
  firstName: 'Paul Simon',
  middleName: 'Enriquez',
  lastName: 'Ongpin',
  phoneNumber: '',
  smsNotification: true,
  emailNotification: true,
}

storiesOf('UpdateProfileForm', module).add('default', () => <UpdateProfileForm data={data} />);
