import React from 'react';
import { storiesOf } from '@storybook/react';
import PatientDashboardView from '../../src/pages/PatientDashboardPage/view';

// only display menus on the left and card on the right
storiesOf('pages', module).add('PatientDashboard', () => (
    <PatientDashboardView />
));
