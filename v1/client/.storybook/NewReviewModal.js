import React from 'react';
import { storiesOf } from '@storybook/react';
import NewReviewModal from '../src/pages/common/Modals/NewReviewModal/view';

const dentistInfo = {
  type: 'DENTIST',
  name: 'Hanzen Lim',
  imageUrl: 'https://lh6.googleusercontent.com/-iBrM-mQ1SR0/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaPofK0kM4e5arTKfl08j_W0jt2wiQ/mo/photo.jpg?sz=300',
  specialty: 'General Dentist',
}

const officeInfo = {
  type: 'OFFICE',
  name: `Paul's office`,
  imageUrl: 'http://kcdentalcorner.com/wp-content/uploads/DentalCorner3of7-1024x683.jpg',
}

storiesOf('NewReviewModal', module).add('for Dentist', () => (
    <NewReviewModal visible info={dentistInfo} />
));

storiesOf('NewReviewModal', module).add('for Office', () => (
  <NewReviewModal visible info={officeInfo} />
));
