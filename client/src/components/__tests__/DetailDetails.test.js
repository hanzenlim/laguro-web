import React from 'react';
import { shallow } from 'enzyme';
import { DetailDetails } from '../DetailsPage/DetailDetails';
import { Modal } from '../common';

describe('<DetailDetails />', () => {
    const defaultProps = {
        auth: null,
        obj: {},
        type: 'office',
        reviews: [],
        reservations: [],
        ownPage: false,
        isUserVerified: false
    };

    it('should have visibleModal set to null by default', () => {
        const detailsPage = shallow(<DetailDetails {...defaultProps} />);

        expect(detailsPage.state('visibleModal')).toBe(null);
    });

    it('should have all modals closed by default', () => {
        const detailsPage = shallow(<DetailDetails {...defaultProps} />);

        let reservationOptions = detailsPage.find(Modal);
        let newDentist = detailsPage.find('#newDentistForm');

        expect(reservationOptions.props().open).toBe(false);
        expect(newDentist.props().open).toBe(false);
    });

    it('should change state.visibleModal when openModal function is called', () => {
        const detailsPage = shallow(<DetailDetails {...defaultProps} />);

        detailsPage.instance().openModal('modal_name');
        expect(detailsPage.state('visibleModal')).toBe('modal_name');
    });

    it('should null state.visibleModal when closeModal function is called', () => {
        const detailsPage = shallow(<DetailDetails {...defaultProps} />);

        detailsPage.instance().openModal('modal_name');
        expect(detailsPage.state('visibleModal')).toBe('modal_name');

        detailsPage.instance().closeModal();
        expect(detailsPage.state('visibleModal')).toBe(null);
    });

    it('should open reservationOptions wrapper modal when visibleModal === reservationOptions', () => {
        const detailsPage = shallow(<DetailDetails {...defaultProps} />);

        //Only one modal on DetailDetails page, this wraps the reservationOptions form
        let reservationOptions = detailsPage.find(Modal);
        expect(reservationOptions.props().open).toBe(false);

        detailsPage.instance().openModal('reservationOptions');
        detailsPage.update();

        reservationOptions = detailsPage.find(Modal);
        expect(reservationOptions.props().open).toBe(true);
    });

    it('should call toggleLoginModal if attempting to book listing when logged out', () => {
        let props = { ...defaultProps, toggleLoginModal: jest.fn() };
        const detailsPage = shallow(<DetailDetails {...props} />);
        const listing = { id: '123' };

        expect(
            detailsPage.instance().props.toggleLoginModal
        ).toHaveBeenCalledTimes(0);

        detailsPage.instance().handleBookReservation(listing);

        expect(
            detailsPage.instance().props.toggleLoginModal
        ).toHaveBeenCalledTimes(1);
    });

    it('should open newDentist modal if attempting to book listing with no dentist', () => {
        let props = {
            ...defaultProps,
            toggleLoginModal: jest.fn(),
            auth: { id: 123 }
        };
        const detailsPage = shallow(<DetailDetails {...props} />);
        const listing = { id: '123' };

        detailsPage.instance().handleBookReservation(listing);
        detailsPage.update();

        // login modal wasn't called
        expect(
            detailsPage.instance().props.toggleLoginModal
        ).toHaveBeenCalledTimes(0);
        // reservationOptions modal wasn't opened
        let reservationOptions = detailsPage.find(Modal);
        expect(reservationOptions.props().open).toBe(false);

        // newDentist was opened
        let newDentist = detailsPage.find('#newDentistForm');
        expect(newDentist.props().open).toBe(true);
    });

    it('should open reservationOptions modal if attempting to book listing with dentist', () => {
        let props = {
            ...defaultProps,
            toggleLoginModal: jest.fn(),
            auth: { id: 123, dentistId: 123 }
        };
        const detailsPage = shallow(<DetailDetails {...props} />);
        const listing = { id: '123' };

        detailsPage.instance().handleBookReservation(listing);
        detailsPage.update();

        // login modal wasn't called
        expect(
            detailsPage.instance().props.toggleLoginModal
        ).toHaveBeenCalledTimes(0);
        // newDentist wasn't opened
        let newDentist = detailsPage.find('#newDentistForm');
        expect(newDentist.props().open).toBe(false);

        // reservationOptions modal was opened
        let reservationOptions = detailsPage.find(Modal);
        expect(reservationOptions.props().open).toBe(true);
    });
});
