import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ReservationOptions } from '../../forms/ReservationOptions';

describe('<ReservationOptions />', () => {
    const defaultProps = {
        listing: {
            startTime: moment('2018-07-20T18:00Z'),
            endTime: moment('2018-07-20T22:00Z'),
            reservations: []
        },
        office: {
            equipment: []
        },
        auth: { id: 123 },
        handleSubmit: jest.fn(),
        initialize: jest.fn(),
        startTime: moment(),
        submitting: false,
        error: undefined,
        equipmentSelected: undefined
    };

    describe('onOpeningTimeChange function', () => {
        it('should advance only startTime if startTime and endTime dont overlap', () => {
            const props = {
                ...defaultProps,
                startTime: moment().add(1, 'hour'),
                endTime: moment().add(2, 'hour'),
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(3, 'hour'),
                    reservations: []
                },
                dispatch: jest.fn()
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            reservationOptions
                .instance()
                .onOpeningTimeChange(moment(props.startTime).add(30, 'minutes'));

            expect(props.dispatch).toHaveBeenCalledTimes(1);
            expect(props.dispatch).toHaveBeenCalledWith(
                expect.objectContaining({
                    meta: {
                        field: 'startTime',
                        form: 'reservationOptions',
                        persistentSubmitErrors: undefined,
                        touch: undefined
                    }
                })
            );
        });

        it('should advance both startTime and endTime if startTime and endTime overlap', () => {
            const props = {
                ...defaultProps,
                startTime: moment().add(1, 'hour'),
                endTime: moment().add(2, 'hour'),
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(3, 'hour'),
                    reservations: []
                },
                dispatch: jest.fn()
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            reservationOptions
                .instance()
                .onOpeningTimeChange(moment(props.startTime).add(90, 'minutes'));

            expect(props.dispatch).toHaveBeenCalledTimes(2);
            expect(props.dispatch).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    meta: {
                        field: 'endTime',
                        form: 'reservationOptions',
                        persistentSubmitErrors: undefined,
                        touch: undefined
                    }
                })
            );
        });

        it('should not advance endTime past end of listing window', () => {
            const props = {
                ...defaultProps,
                startTime: moment().add(1, 'hour'),
                endTime: moment().add(2, 'hour'),
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(3, 'hour'),
                    reservations: []
                },
                dispatch: jest.fn()
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            reservationOptions
                .instance()
                .onOpeningTimeChange(moment(props.startTime).add(24, 'hours'));

            expect(props.dispatch).toHaveBeenCalledTimes(2);
            expect(props.dispatch).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    meta: {
                        field: 'endTime',
                        form: 'reservationOptions',
                        persistentSubmitErrors: undefined,
                        touch: undefined
                    },
                    payload: moment(props.listing.endTime)
                })
            );
        });
    });

    describe('getFirstAvailReservation function', () => {
        it('should return the listing start time if no reservations and current time is before listing startTime', () => {
            const props = {
                ...defaultProps,
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(3, 'hour'),
                    reservations: []
                }
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            expect(
                reservationOptions.instance().getFirstAvailReservation()
            ).toEqual(moment(props.listing.startTime));
        });

        it('should return the nearest start time if no reservations and current time is within listing start and end', () => {
            const props = {
                ...defaultProps,
                listing: {
                    startTime: moment().subtract(1, 'hour'),
                    endTime: moment().add(3, 'hour'),
                    reservations: []
                }
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            const TIMESLOT_INTERVAL = 15;

            // the next avail reservation would be the slot 15 min ahead, because the 'current' timeslot is in the past, if timeslot windows later shrink or grow and cause this test to fail, adjust the 15 to equal the new timeslot interval
            expect(
                moment(
                    reservationOptions.instance().getFirstAvailReservation()
                ).isSame(moment().add(TIMESLOT_INTERVAL, 'minute'), 'minute')
            ).toBe(true);
        });
    });

    describe('initTimeslots function', () => {
        it('should set duration = 0 for reservation windows that are booked', () => {
            const props = {
                ...defaultProps,
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(4, 'hour'),
                    reservations: [
                        {
                            startTime: moment().add(1, 'hour'),
                            endTime: moment().add(2, 'hour'),
                            status: 'ACTIVE'
                        }
                    ]
                }
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            let timeslots = reservationOptions.instance().initTimeslots();
            let durations = timeslots.map(timeslot => timeslot.durationToNext);
            let zeroDurations = durations.filter(duration => duration === 0);

            // there will be 4 slots marked zero because the existing reservation is 1 hour long and the interval is set to 15 minutes, adjust acordingly if this test starts to fail
            expect(zeroDurations.length).toEqual(4);
        });

        it('should not set duration = 0 for reservation windows that were booked, then cancelled', () => {
            const props = {
                ...defaultProps,
                listing: {
                    startTime: moment().add(1, 'hour'),
                    endTime: moment().add(4, 'hour'),
                    reservations: [
                        {
                            startTime: moment().add(1, 'hour'),
                            endTime: moment().add(2, 'hour'),
                            status: 'CANCELLED'
                        }
                    ]
                }
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            let timeslots = reservationOptions.instance().initTimeslots();
            let durations = timeslots.map(timeslot => timeslot.durationToNext);
            let zeroDurations = durations.filter(duration => duration === 0);

            expect(zeroDurations.length).toEqual(0);
        });

        it('should set duration = 0 for reservation windows that are in the past', () => {
            const props = {
                ...defaultProps,
                listing: {
                    startTime: moment().subtract(59, 'minutes'),
                    endTime: moment().add(4, 'hour'),
                    reservations: []
                }
            };
            const reservationOptions = shallow(
                <ReservationOptions {...props} />
            );

            let timeslots = reservationOptions.instance().initTimeslots();
            let durations = timeslots.map(timeslot => timeslot.durationToNext);
            let zeroDurations = durations.filter(duration => duration === 0);

            // expect 4 because 59 min have elapsed, ie the 12pm, 12:15, 12:30, 12:45 slots are in the past and no longer reservable (if 1 hour had passed, it would be 5 slots, the 1pm slot would also be set to 0)
            expect(zeroDurations.length).toEqual(4);
        });
    });
});
