import React from 'react';
import { shallow } from 'enzyme';
import UserOfficeIndex from '../UserOfficeIndex';
import UserReservationIndex from '../UserReservationIndex';
import PatientAppointments from '../PatientAppointments';
import { NoReduxProfile, defaultProfilePhoto } from '../Profile';
import { PROFILE_IMAGE } from '../../testUtil/constants';

describe('<Profile />', () => {
    const defaultProps = {
        auth: { id: 123 }
    };

    it('should not render offices, reviews, or reservations if user is not dentist', () => {
        const profilePage = shallow(<NoReduxProfile {...defaultProps} />);
        profilePage.setState({ isFetching: false });

        expect(profilePage.find(UserOfficeIndex)).toHaveLength(0);
        expect(profilePage.find(UserReservationIndex)).toHaveLength(0);
        expect(profilePage.find(PatientAppointments)).toHaveLength(1);
    });

    it('should all components if user is a dentist', () => {
        let props = { ...defaultProps, auth: { id: 123, dentistId: 123 } };
        const profilePage = shallow(<NoReduxProfile {...props} />);
        profilePage.setState({ isFetching: false });

        expect(profilePage.find(UserOfficeIndex)).toHaveLength(1);
        expect(profilePage.find(UserReservationIndex)).toHaveLength(1);
        expect(profilePage.find(PatientAppointments)).toHaveLength(1);
    });

    it('should display the default user photo if auth.imageUrl is undefined', () => {
        const props = {
            auth: {},
            dentists: {}
        };

        const component = shallow(<NoReduxProfile {...props} />);

        const image = component.find('[data-name="profile-image"]');
        expect(image).toHaveLength(1);
        expect(image.prop('src')).toEqual(defaultProfilePhoto);
    });

    it('should display the user photo if auth.imageUrl is defined', () => {
        const props = {
            auth: { imageUrl: PROFILE_IMAGE },
            dentists: {}
        };

        const component = shallow(<NoReduxProfile {...props} />);

        const image = component.find('[data-name="profile-image"]');
        expect(image).toHaveLength(1);
        expect(image.prop('src')).toEqual(PROFILE_IMAGE);
    });

});
