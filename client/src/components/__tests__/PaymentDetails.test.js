import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import PaymentDetails from '../PaymentDetails';
import { PAYMENT_MADE, RESERVATION_BOOKED } from '../../util/strings';
import {
    FORMATTED_PAYMENT_NOMINAL_AMOUNT,
    OFFICE_IMAGE,
    OFFICE_LOCATION,
    OFFICE_NAME,
    PAYMENT_BRAND,
    PAYMENT_DATE,
    PAYMENT_LAST4,
    PAYMENT_NOMINAL_AMOUNT,
    PROCEDURE_NAME,
    RESERVATION_END_TIME,
    RESERVATION_START_TIME
} from '../../testUtil/constants';

describe('<PaymentDetails />', () => {
    let component;

    afterEach(() => {
        component = '';
    });

    it('should display one payment card when passing in a payment prop', () => {
        const mockProps = {
            index: 1,
            payment: {
                action: RESERVATION_BOOKED,
                date: PAYMENT_DATE,
                description: PAYMENT_MADE,
                endTime: RESERVATION_END_TIME,
                office: {
                    imageUrls: [OFFICE_IMAGE],
                    location: OFFICE_LOCATION,
                    name: OFFICE_NAME
                },
                paymentAmount: PAYMENT_NOMINAL_AMOUNT,
                procedureName: PROCEDURE_NAME,
                startTime: RESERVATION_START_TIME,
                source: {
                    brand: PAYMENT_BRAND,
                    last4: PAYMENT_LAST4
                }
            }
        };

        component = mount(<PaymentDetails {...mockProps} />);
        const image = component.find('[data-name="office-image"]');
        const name = component.find('[data-name="office-name"]');
        const location = component.find('[data-name="office-location"]');
        const action = component.find('[data-name="action"]');
        const startEndTime = component.find('[data-name="start-end-time"]');
        const procedures = component.find('[data-name="procedures"]');
        const paymentAmount = component.find('[data-name="payment-amount"]');
        const description = component.find('[data-name="description"]');
        const date = component.find('[data-name="date"]');
        const source = component.find('[data-name="source"]');

        expect(image).toHaveLength(1);
        expect(name).toHaveLength(1);
        expect(location).toHaveLength(1);
        expect(action).toHaveLength(1);
        expect(startEndTime).toHaveLength(1);
        expect(procedures).toHaveLength(1);
        expect(paymentAmount).toHaveLength(1);
        expect(description).toHaveLength(1);
        expect(date).toHaveLength(1);
        expect(source).toHaveLength(1);

        expect(image.find('img').prop('src')).toEqual(OFFICE_IMAGE);
        expect(name.find('span').text()).toEqual(OFFICE_NAME);
        expect(location.find('span').text()).toEqual(OFFICE_LOCATION);
        expect(action.text()).toEqual(RESERVATION_BOOKED);
        expect(startEndTime.text()).toEqual(
            moment(RESERVATION_START_TIME).format('MMM DD h:mm a - ') +
                moment(RESERVATION_END_TIME).format('h:mm a')
        );
        expect(paymentAmount.text()).toEqual(FORMATTED_PAYMENT_NOMINAL_AMOUNT);
        expect(
            description
                .children()
                .find('div')
                .text()
        ).toEqual(PAYMENT_MADE);
        expect(date.find('span').text()).toEqual(
            moment.unix(PAYMENT_DATE).format('MMMM Do, YYYY h:mm A')
        );
        expect(source.find('span').text()).toEqual(
            `${PAYMENT_BRAND} - ${PAYMENT_LAST4}`
        );
    });
});
