import React from 'react';
import { shallow } from 'enzyme';
import Appointments from '../Appointments';
import { DEFAULT_APPOINTMENT_WINDOW_SIZE } from '../../util/timeUtil';

describe('<Appointments />', () => {
    it('should render all time slots as available', () => {
        const reservation = {
            appointments: [],
            startTime: '2118-07-13T12:00:29Z',
            endTime: '2118-07-13T16:00:29Z'
        };
        // duration of reservation in minutes
        const reservationDuration = 240;
        const numAvailableSlots =
            reservationDuration / DEFAULT_APPOINTMENT_WINDOW_SIZE;
        const component = shallow(<Appointments reservation={reservation} />);
        expect(component.find('[data-name="available-slot"]')).toHaveLength(
            numAvailableSlots
        );
    });

    it('should render past time slots as unavailable', () => {
        const reservation = {
            appointments: [],
            startTime: '2008-07-13T12:00:29Z',
            endTime: '2008-07-13T16:00:29Z'
        };
        // duration of reservation in minutes
        const reservationDuration = 240;
        const numAvailableSlots =
            reservationDuration / DEFAULT_APPOINTMENT_WINDOW_SIZE;
        const component = shallow(<Appointments reservation={reservation} />);
        expect(component.find('[data-name="unavailable-slot"]')).toHaveLength(
            numAvailableSlots
        );
    });
});
