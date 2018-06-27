import React from 'react';
import { shallow } from 'enzyme';
import AppointmentDetails from '../AppointmentDetails'

describe('Login Component', () => {
    const appointment = {
        reservation: {
            office: {
            }
        },
        dentist: {
            user: {
                imageUrl: 'http://myimage.com'
            },
        },
        procedure: {
            name: {}
        }
    };

    let component = '';
    let spy = jest.fn();

    beforeEach(() => {
        spy = jest.fn();
        component = shallow(<AppointmentDetails 
            appointment={appointment} 
            cancelAppointment={spy}
        />);
    });

    afterEach(() => {
        component = '';
        spy = jest.fn();
    });

    it('should call cancelAppointment props when click cancel', () => {
        component.instance().handleCancelAppointment();
        expect(spy.mock.calls[0][0]).toBe(appointment);
    });

    it('should render the image', () => {
        const imgSrc = component.find('.image').prop('src');
        expect(imgSrc).toEqual(appointment.dentist.user.imageUrl);
    });
})