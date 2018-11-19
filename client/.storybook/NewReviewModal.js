import React from 'react';
import { storiesOf } from '@storybook/react';
import NewReview from '../src/pages/common/NewReview/view';

const dentistInfo = {
    type: 'DENTIST',
    name: 'Hanzen Lim',
    imageUrl:
        'https://lh6.googleusercontent.com/-iBrM-mQ1SR0/AAAAAAAAAAI/AAAAAAAAAAA/APUIFaPofK0kM4e5arTKfl08j_W0jt2wiQ/mo/photo.jpg?sz=300',
    specialty: 'General Dentist',
};

const officeInfo = {
    type: 'OFFICE',
    name: `Paul's office`,
    imageUrl:
        'http://kcdentalcorner.com/wp-content/uploads/DentalCorner3of7-1024x683.jpg',
};

storiesOf('NewReview', module).add('for Dentist', () => (
    <NewReview visible info={dentistInfo} />
));

storiesOf('NewReview', module).add('for Office', () => (
    <NewReview visible info={officeInfo} />
));
