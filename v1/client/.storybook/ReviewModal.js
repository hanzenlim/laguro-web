import React from 'react';
import { storiesOf } from '@storybook/react';
import ReviewModal from '../src/pages/common/Modals/ReviewModal/view';

const dentistInfo = {
  type: 'dentist',
  name: 'Hanzen Lim',
  imageUrl: 'https://lh6.googleusercontent.com/-iBrM-mQ1SR0/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaPofK0kM4e5arTKfl08j_W0jt2wiQ/mo/photo.jpg?sz=300',
  specialty: 'General Dentist',
}

const officeInfo = {
  type: 'office',
  name: `Paul's office`,
  imageUrl: 'http://kcdentalcorner.com/wp-content/uploads/DentalCorner3of7-1024x683.jpg',
}

storiesOf('ReviewModal', module).add('for Dentist', () => (
    <ReviewModal visible type='dentist' info={dentistInfo} />
));

storiesOf('ReviewModal', module).add('for Office', () => (
  <ReviewModal visible type='office' info={officeInfo} />
));
