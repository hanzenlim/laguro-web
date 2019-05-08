import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import queryString from 'query-string';
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import { Loading } from '../../../components';
import history from '../../../history';
import { appointmentClient } from '../../../util/apolloClients';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { execute } from '../../../util/gqlUtils';
import { stripTimezone } from '../../../util/timeUtil';
import NoAvailability from './NoAvailability';
import {
    createAppointmentMutation,
    getDentistAppointmentSlotsQuery,
    getDentistQuery,
    getSuggestedDentist,
} from './queries';
import BookAppointmentView from './view';

class BookAppointment extends PureComponent {
    constructor(props) {
        super(props);

        const urlParams = queryString.parse(history.location.search);
        const isOnOfficePage = history.location.pathname.includes('office');
        const isOnDentistPage = history.location.pathname.includes('dentist');

        this.state = {
            isOnOfficePage,
            isOnDentistPage,
            selectedTimeSlot: null,
            officeId: isOnOfficePage
                ? history.location.pathname.split('/')[2]
                : urlParams.officeId,
            dentistId: isOnDentistPage
                ? history.location.pathname.split('/')[1]
                : urlParams.dentistId,
            bookedAppointmentId: null,
            isBooking: false,
            hasAgreed: false,
        };
    }

    componentDidMount() {
        history.listen(location => {
            const nextParams = queryString.parse(location.search);
            if (this.state.officeId !== nextParams.officeId) {
                this.setState({
                    officeId: nextParams.officeId,
                });
            }
        });
    }

    handleBookNow = async () => {
        const user = getUser();
        // Show login modal if not logged in.
        if (!user) {
            emitter.emit('loginModal');
            return;
        }

        const { createAppointment, suggestedDentist } = this.props;
        const {
            selectedTimeSlot,
            isOnOfficePage,
            isOnDentistPage,
        } = this.state;
        const urlParams = queryString.parse(history.location.search);

        await execute({
            action: async () => {
                await this.setState({ isBooking: true });

                const officeId = isOnOfficePage
                    ? history.location.pathname.split('/')[2]
                    : urlParams.officeId;
                const dentistId = isOnDentistPage
                    ? history.location.pathname.split('/')[2]
                    : suggestedDentist.id;

                const createAppointmentResult = await createAppointment({
                    variables: {
                        input: {
                            patientId: user.id,
                            officeId,
                            dentistId,
                            localStartTime: stripTimezone(selectedTimeSlot),
                        },
                    },
                });

                const bookedAppointmentId = _get(
                    createAppointmentResult,
                    'data.createAppointment'
                );

                await this.setState({
                    isBooking: false,
                    bookedAppointmentId,
                });
            },
        });

        await this.setState({ isBooking: false });
    };

    handleToggleCheckbox = () => {
        this.setState({ hasAgreed: !this.state.hasAgreed });
    };

    handleSelectTimeSlot = utcFormattedTimeSlot => {
        this.setState({ selectedTimeSlot: utcFormattedTimeSlot });
    };

    render() {
        const {
            bookedAppointmentId,
            isBooking,
            officeId,
            hasAgreed,
            selectedTimeSlot,
        } = this.state;

        const {
            timeSlotList,
            locationList,
            suggestedDentist,
            onFindAnotherMatch,
            isFetchingNewData,
            totalDentists,
        } = this.props;

        const isButtonDisabled = !selectedTimeSlot || !hasAgreed;
        const isShowingSuggestedDentist = history.location.pathname.includes(
            'office'
        );
        const isShowingAvailableLocations = history.location.pathname.includes(
            'dentist'
        );

        return (
            <BookAppointmentView
                isFindAnotherMatchDisabled={totalDentists === 1}
                suggestedDentist={suggestedDentist}
                hasAgreed={hasAgreed}
                officeId={officeId}
                locationList={locationList}
                bookedAppointmentId={bookedAppointmentId}
                onBookNow={this.handleBookNow}
                isBooking={isBooking}
                timeSlotList={timeSlotList}
                isShowingSuggestedDentist={isShowingSuggestedDentist}
                isShowingAvailableLocations={isShowingAvailableLocations}
                onToggleCheckbox={this.handleToggleCheckbox}
                isButtonDisabled={isButtonDisabled}
                onSelectTimeSlot={this.handleSelectTimeSlot}
                onFindAnotherMatch={onFindAnotherMatch}
                isFetchingNewData={isFetchingNewData}
            />
        );
    }
}

const Composed = adopt({
    createAppointment: ({ render }) => (
        <Mutation
            mutation={createAppointmentMutation}
            client={appointmentClient}
        >
            {render}
        </Mutation>
    ),
    getDentist: ({ render, dentistId }) => (
        <Query query={getDentistQuery} variables={{ id: dentistId }}>
            {render}
        </Query>
    ),
    getDentistAppointmentSlots: ({ render, dentistId }) => {
        const input = {
            dentistId,
            rangeStart: moment()
                .add(1, 'hours')
                .startOf('hour')
                .utcOffset(0, true)
                .format(),
            rangeEnd: moment()
                .add(14, 'days')
                .startOf('hour')
                .utcOffset(0, true)
                .format(),
        };

        return (
            <Query
                query={getDentistAppointmentSlotsQuery}
                client={appointmentClient}
                fetchPolicy="network-only"
                variables={{
                    input,
                }}
            >
                {render}
            </Query>
        );
    },
});

class BookAppointmentContainer extends PureComponent {
    constructor(props) {
        super(props);

        const urlParams = queryString.parse(history.location.search);
        const isOnDentistPage = history.location.pathname.includes('dentist');
        const isOnOfficePage = history.location.pathname.includes('office');

        this.state = {
            dentistId: isOnDentistPage
                ? history.location.pathname.split('/')[2]
                : urlParams.dentistId,
            officeId: isOnOfficePage
                ? history.location.pathname.split('/')[2]
                : urlParams.officeId,
            suggestedDentist: null,
            isFetchingNewData: false,
            totalDentists: null,
        };
    }

    componentDidMount() {
        const isShowingSuggestedDentist = history.location.pathname.includes(
            'office'
        );

        if (isShowingSuggestedDentist) {
            this.fetchSuggestedDentist();
        }
    }

    fetchSuggestedDentist = async () => {
        const { officeId } = this.state;

        const suggestedDentist = await getSuggestedDentist({
            officeId,
        });

        if (suggestedDentist.dentist) {
            await this.setState({
                suggestedDentist: suggestedDentist.dentist,
                dentistId: suggestedDentist.dentist.id,
                totalDentists: suggestedDentist.total,
                isFetchingNewData: false,
            });
        } else {
            await this.setState({
                suggestedDentist: null,
                dentistId: null,
                totalDentists: [],
                isFetchingNewData: false,
            });
        }
    };

    getTimeSlotList = timeSlot => {
        let timeSlotList = [];
        timeSlot.forEach(dentistAppointmentSlot => {
            // Collect all unique days
            const dateStringList = [];
            dentistAppointmentSlot.appointmentTimeslots.forEach(
                appointmentTimeslot => {
                    const day = moment(
                        appointmentTimeslot.localStartTime
                    ).format('LL');

                    if (!dateStringList.includes(day)) {
                        dateStringList.push(day);
                    }
                }
            );

            // Create timeslot object for UI
            const timeSlotMap = dateStringList.map(dateString => ({
                day: new Date(dateString),
                time: [],
            }));

            // Populate time list
            dentistAppointmentSlot.appointmentTimeslots.forEach(
                appointmentTimeslot => {
                    const day = moment(
                        appointmentTimeslot.localStartTime
                    ).format('LL');

                    const index = timeSlotMap.findIndex(
                        t => moment(t.day).format('LL') === day
                    );

                    timeSlotMap[index].time.push(
                        new Date(appointmentTimeslot.localStartTime)
                    );
                }
            );

            timeSlotList = timeSlotMap;
        });

        return timeSlotList;
    };

    getAppointmentSlotsByOfficeId = getDentistAppointmentSlotsData => {
        const urlParams = queryString.parse(history.location.search);

        if (urlParams.officeId) {
            return getDentistAppointmentSlotsData.filter(
                timeSlot => timeSlot.office.id === urlParams.officeId
            );
        }

        return [getDentistAppointmentSlotsData[0]];
    };

    handleFindAnotherMatch = async () => {
        await this.setState({ isFetchingNewData: true });
        await this.fetchSuggestedDentist();
    };

    render() {
        const {
            dentistId,
            suggestedDentist,
            isFetchingNewData,
            totalDentists,
        } = this.state;

        if (!dentistId) return <NoAvailability />;

        return (
            <Composed dentistId={dentistId}>
                {({
                    createAppointment,
                    getDentist,
                    getDentistAppointmentSlots,
                }) => {
                    const getDentistData = getDentist.data.getDentist;
                    const officeAppointmentSlots = _get(
                        getDentistAppointmentSlots,
                        'data.getDentistAppointmentSlots'
                    );

                    if (!getDentistData) return null;

                    if (
                        getDentistAppointmentSlots.loading &&
                        !officeAppointmentSlots &&
                        !isFetchingNewData
                    ) {
                        return <Loading />;
                    }

                    if (
                        _isEmpty(officeAppointmentSlots) ||
                        _isEmpty(
                            officeAppointmentSlots
                                .map(oas => _get(oas, 'appointmentTimeslots'))
                                .flat()
                        )
                    ) {
                        return <NoAvailability />;
                    }

                    // TODO: refactor
                    // Get list of locations
                    const officeIdsWithAppointmentSlots = [];
                    officeAppointmentSlots.forEach(appointmentSlot => {
                        if (
                            appointmentSlot.appointmentTimeslots &&
                            appointmentSlot.appointmentTimeslots.length !== 0
                        ) {
                            officeIdsWithAppointmentSlots.push(
                                appointmentSlot.office.id
                            );
                        }
                    });
                    const locationList = getDentistData.preferredLocations.filter(
                        preferredLocation =>
                            officeIdsWithAppointmentSlots.includes(
                                preferredLocation.id
                            )
                    );

                    // TODO: refactor
                    const timeSlot = this.getAppointmentSlotsByOfficeId(
                        officeAppointmentSlots
                    );

                    if (timeSlot.length === 0) return <NoAvailability />;
                    const timeSlotList = this.getTimeSlotList(timeSlot);

                    return (
                        <BookAppointment
                            totalDentists={totalDentists}
                            suggestedDentist={suggestedDentist}
                            isFetchingNewData={isFetchingNewData}
                            locationList={locationList}
                            timeSlotList={timeSlotList}
                            getDentistData={getDentistData}
                            createAppointment={createAppointment}
                            onFindAnotherMatch={this.handleFindAnotherMatch}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default BookAppointmentContainer;
