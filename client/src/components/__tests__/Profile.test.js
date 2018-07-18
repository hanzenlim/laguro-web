import React from 'react';
import { shallow } from 'enzyme';
import UserOfficeIndex from '../UserOfficeIndex';
import UserReservationIndex from '../UserReservationIndex';
import PatientAppointments from '../PatientAppointments';
import { Profile } from '../Profile';

describe('<Profile />', () => {
    const defaultProps = {
        auth: { id: 123 }
    };

    it('should not render offices, reviews, or reservations if user is not dentist', () => {
        const profilePage = shallow(<Profile {...defaultProps} />);
        profilePage.setState({ isFetching: false });

        expect(profilePage.find(UserOfficeIndex)).toHaveLength(0);
        expect(profilePage.find(UserReservationIndex)).toHaveLength(0);
        expect(profilePage.find(PatientAppointments)).toHaveLength(1);
    });

    it('should all components if user is a dentist', () => {
        let props = { ...defaultProps, auth: { id: 123, dentistId: 123 } };
        const profilePage = shallow(<Profile {...props} />);
        profilePage.setState({ isFetching: false });

        expect(profilePage.find(UserOfficeIndex)).toHaveLength(1);
        expect(profilePage.find(UserReservationIndex)).toHaveLength(1);
        expect(profilePage.find(PatientAppointments)).toHaveLength(1);
    });
});
