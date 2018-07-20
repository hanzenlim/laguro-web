import React from 'react';
import { shallow } from 'enzyme';
import UserReservation from '../UserReservation';

describe('<UserReservation />', () => {
    const defaultProps = {
        reservation: {
            id: 123,
            equipmentSelected: [],
            startTime: '2018-07-19',
            totalPaid: 10,
            appointments: [],
            office: {
                id: 123,
                name: 'Bell',
                location: 'San Leandro, CA',
                reviews: [],
                imageUrls: []
            }
        }
    };

    it('should render `none selected` message in selected equipment list if list is empty', () => {
        const userReservation = shallow(<UserReservation {...defaultProps} />);
        const equipmentList = userReservation.find('#equipment_list');

        // should render one child for the error message
        expect(equipmentList.children()).toHaveLength(1);
        // check for error message text (ie, not the name of an equipment)
        expect(equipmentList.children().props().children.props.secondary).toBe(
            'None Selected'
        );
    });

    it('should render selected equipment if selected equipment exists', () => {
        const equipmentSelected = ['CBCT', 'Pano', 'Cleaning Instruments'];
        const props = {
            ...defaultProps,
            reservation: { ...defaultProps.reservation, equipmentSelected }
        };

        const userReservation = shallow(<UserReservation {...props} />);
        const equipmentList = userReservation.find('#equipment_list');

        // should render one child for each equipment
        expect(equipmentList.children()).toHaveLength(equipmentSelected.length);
    });

    it('should render `no appointments` message in appointments list if list is empty', () => {
        const userReservation = shallow(<UserReservation {...defaultProps} />);
        const appointmentList = userReservation.find('#appointment_list');

        // should render one child for the error message
        expect(appointmentList.children()).toHaveLength(1);
        // check for error message text (ie, not the name of an equipment)
        expect(appointmentList.children().props().children).toBe(
            'No appointments have been scheduled yet'
        );
    });

    it('should render appointment details if appointments exist', () => {
        const appointments = [
            {
                patient: { firstName: 'Mike', lastName: 'Curry' },
                procedure: 'Cleaning',
                startTime: '2018-10-10',
                endTime: '2018-10-11'
            },
            {
                patient: { firstName: 'Hazel', lastName: 'Caramba' },
                procedure: 'Extraction',
                startTime: '2018-10-11',
                endTime: '2018-10-12'
            }
        ];
        const props = {
            ...defaultProps,
            reservation: { ...defaultProps.reservation, appointments }
        };

        const userReservation = shallow(<UserReservation {...props} />);
        const appointmentList = userReservation.find('#appointment_list');

        // should render one child for each equipment
        expect(appointmentList.children()).toHaveLength(appointments.length);
    });
});
