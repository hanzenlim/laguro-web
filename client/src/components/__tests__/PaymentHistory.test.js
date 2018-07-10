import React from 'react';
import { shallow } from 'enzyme';
import { PaymentHistory } from '../PaymentHistory';
import {
    APPOINTMENT_BOOKED,
    APPOINTMENT_PAYMENT_TYPE,
    CHARGED,
    PAYMENT_MADE,
    RESERVATION_BOOKED,
    RESERVATION_PAYMENT_TYPE
} from '../../util/strings';
import {
    APPOINTMENT_END_TIME,
    APPOINTMENT_START_TIME,
    DENTIST,
    LANDLORD,
    OFFICE_IMAGE,
    OFFICE_LOCATION,
    OFFICE_NAME,
    PATIENT,
    PAYMENT_BRAND,
    PAYMENT_DATE,
    PAYMENT_LAST4,
    PAYMENT_NOMINAL_AMOUNT,
    PROCEDURE_NAME,
    RESERVATION_END_TIME,
    RESERVATION_START_TIME
} from '../../testUtil/constants';

describe('<PaymentHistory /> ', () => {
    let spy = jest.fn();
    let spy2 = jest.fn();

    const mockProps = {
        auth: {
            id: DENTIST,
            dentistID: DENTIST
        },
        isFetchingPaymentHistory: false,
        fetchUser: spy,
        loadPaymentHistory: spy2,
        payerPayments: []
    };
    let component;

    const dentistAuth = {
        id: DENTIST,
        dentistId: DENTIST
    };

    const patientAuth = {
        id: PATIENT
    };

    const reservationPayment = {
        nominalAmount: PAYMENT_NOMINAL_AMOUNT,
        payer: {
            id: DENTIST
        },
        payee: {
            id: LANDLORD
        },
        refundAmount: null,
        reservation: {
            startTime: RESERVATION_START_TIME,
            endTime: RESERVATION_END_TIME,
            office: {
                imageUrls: [OFFICE_IMAGE],
                location: OFFICE_LOCATION,
                name: OFFICE_NAME
            }
        },
        status: CHARGED,
        stripePayment: {
            amount: PAYMENT_NOMINAL_AMOUNT,
            created: PAYMENT_DATE,
            source: {
                brand: PAYMENT_BRAND,
                last4: PAYMENT_LAST4
            }
        },
        type: RESERVATION_PAYMENT_TYPE
    };

    const appointmentPayment = {
        nominalAmount: PAYMENT_NOMINAL_AMOUNT,
        payer: {
            id: PATIENT
        },
        payee: {
            id: DENTIST
        },
        refundAmount: null,
        appointment: {
            endTime: APPOINTMENT_END_TIME,
            procedure: {
                name: PROCEDURE_NAME
            },
            reservation: {
                office: {
                    imageUrls: [OFFICE_IMAGE],
                    location: OFFICE_LOCATION,
                    name: OFFICE_NAME
                }
            },
            startTime: APPOINTMENT_START_TIME
        },
        status: CHARGED,
        stripePayment: {
            amount: PAYMENT_NOMINAL_AMOUNT,
            created: PAYMENT_DATE,
            source: {
                brand: PAYMENT_BRAND,
                last4: PAYMENT_LAST4
            }
        },
        type: APPOINTMENT_PAYMENT_TYPE
    };

    beforeEach(() => {
        component = shallow(<PaymentHistory {...mockProps} />);
    });

    afterEach(() => {
        component = '';
        spy = jest.fn();
        spy2 = jest.fn();
    });

    it('should have a function called that returns processed payment object for dentist', () => {
        const processedPayment = component
            .instance()
            .processPayment(dentistAuth, reservationPayment);
        const expectedResult = {
            action: RESERVATION_BOOKED,
            auth: dentistAuth,
            date: Number(PAYMENT_DATE),
            description: PAYMENT_MADE,
            endTime: RESERVATION_END_TIME,
            office: {
                imageUrls: [OFFICE_IMAGE],
                location: OFFICE_LOCATION,
                name: OFFICE_NAME
            },
            paymentAmount: PAYMENT_NOMINAL_AMOUNT,
            payeeId: LANDLORD,
            payerId: DENTIST,
            procedureName: undefined,
            startTime: RESERVATION_START_TIME,
            source: {
                brand: PAYMENT_BRAND,
                last4: PAYMENT_LAST4
            },
            type: RESERVATION_PAYMENT_TYPE
        };
        expect(processedPayment).toEqual(expectedResult);
    });

    it('should have a function called that returns processed payment object for patient', () => {
        const processedPayment = component
            .instance()
            .processPayment(patientAuth, appointmentPayment);
        const expectedResult = {
            action: APPOINTMENT_BOOKED,
            auth: patientAuth,
            date: Number(PAYMENT_DATE),
            description: PAYMENT_MADE,
            endTime: APPOINTMENT_END_TIME,
            office: {
                imageUrls: [OFFICE_IMAGE],
                location: OFFICE_LOCATION,
                name: OFFICE_NAME
            },
            paymentAmount: PAYMENT_NOMINAL_AMOUNT,
            payeeId: DENTIST,
            payerId: PATIENT,
            procedureName: PROCEDURE_NAME,
            startTime: APPOINTMENT_START_TIME,
            source: {
                brand: PAYMENT_BRAND,
                last4: PAYMENT_LAST4
            },
            type: APPOINTMENT_PAYMENT_TYPE
        };
        expect(processedPayment).toEqual(expectedResult);
    });
});
