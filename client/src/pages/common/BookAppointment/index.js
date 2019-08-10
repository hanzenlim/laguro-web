import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _flatten from 'lodash/flatten';
import moment from 'moment';
import queryString from 'query-string';
import React, { PureComponent, Component } from 'react';
import { adopt } from 'react-adopt';
import { Mutation, Query } from 'react-apollo';
import _find from 'lodash/find';

import { Loading, Box } from '../../../components';
import history, { getSearchParamValueByKey } from '../../../history';
import { appointmentClient } from '../../../util/apolloClients';
import { getUser } from '../../../util/authUtils';
import emitter from '../../../util/emitter';
import { execute } from '../../../util/gqlUtils';
import { stripTimezone } from '../../../util/timeUtil';
import {
    trackSelectTimeSlot,
    trackBookAppointmentAttempt,
} from '../../../util/trackingUtils';
import NoAvailability from './NoAvailability';
import {
    createAppointmentMutation,
    getDentistAppointmentSlotsQuery,
    getDentistQuery,
    getSuggestedDentist,
    getUserQuery,
} from './queries';
import BookAppointmentView from './view';

export const wrapperStyles = {
    mt: [22, '', 44],
    border: ['none', '', '1px solid'],
    borderColor: ['', '', 'divider.gray'],
    boxShadow: ['none', '', 0],
    pt: [0, '', 16],
    pr: [0, '', 32],
    pl: [0, '', 32],
    pb: 32,
};

const getCurrentOfficeId = () =>
    history.location.pathname.includes('office')
        ? history.location.pathname.split('/')[2]
        : getSearchParamValueByKey('officeId');

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
            currentPatientId: _get(props, 'user.id'),
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

    getInternalPage = () => {
        const isOnOfficePage = history.location.pathname.includes('office');
        const isOnDentistPage = history.location.pathname.includes('dentist');

        if (isOnOfficePage) {
            return 'office';
        }

        if (isOnDentistPage) {
            return 'dentist';
        }

        return '';
    };

    // returns boolean for hasNoError
    handleBookNow = async () => {
        const { createAppointment, suggestedDentist } = this.props;
        const {
            selectedTimeSlot,
            isOnOfficePage,
            isOnDentistPage,
        } = this.state;
        const urlParams = queryString.parse(history.location.search);
        const localStartTime = stripTimezone(selectedTimeSlot);

        const officeId = isOnOfficePage
            ? history.location.pathname.split('/')[2]
            : urlParams.officeId;
        const dentistId = isOnDentistPage
            ? history.location.pathname.split('/')[2]
            : suggestedDentist.id;

        if (trackBookAppointmentAttempt) {
            trackBookAppointmentAttempt({
                dentistId,
                weekDay: moment(localStartTime).format('dddd'),
                hour: moment(localStartTime).format('hh:mm a'),
                internalPage: this.getInternalPage(),
                eventAction: 'Interaction',
                officeId,
            });
        }

        const user = getUser();
        // Show login modal if not logged in.
        if (!user) {
            emitter.emit('loginModal');
            return false;
        }

        return await execute({
            action: async () => {
                await this.setState({ isBooking: true });

                const createAppointmentResult = await createAppointment({
                    variables: {
                        input: {
                            patientId: this.state.currentPatientId,
                            officeId,
                            dentistId,
                            localStartTime,
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
            onError: () => this.setState({ isBooking: false }),
        });
    };

    handleToggleCheckbox = () => {
        this.setState({ hasAgreed: !this.state.hasAgreed });
    };

    handleSelectTimeSlot = utcFormattedTimeSlot => {
        this.setState({ selectedTimeSlot: utcFormattedTimeSlot });

        if (utcFormattedTimeSlot && trackSelectTimeSlot) {
            const { isOnOfficePage } = this.state;

            trackSelectTimeSlot({
                eventLabel: moment(stripTimezone(utcFormattedTimeSlot)).format(
                    'hh:mm a'
                ),
                internalPage: isOnOfficePage ? 'office' : 'dentist',
            });
        }
    };

    onPatientSelect = patientId =>
        this.setState({ currentPatientId: patientId });

    render() {
        const {
            bookedAppointmentId,
            isBooking,
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
            refetch,
        } = this.props;

        const isButtonDisabled = !selectedTimeSlot || !hasAgreed;
        const isShowingSuggestedDentist = history.location.pathname.includes(
            'office'
        );
        const isShowingAvailableLocations = history.location.pathname.includes(
            'dentist'
        );

        const officeId = getCurrentOfficeId();

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
                patient={
                    _find(_get(this.props.user, 'family.members'), [
                        'id',
                        this.state.currentPatientId,
                    ]) || this.props.user
                }
                apptStartTime={
                    this.state.selectedTimeSlot &&
                    stripTimezone(this.state.selectedTimeSlot)
                }
                dentist={this.props.dentist}
                office={_find(locationList, ['id', officeId])}
                user={this.props.user}
                currentPatientId={this.state.currentPatientId}
                onPatientSelect={this.onPatientSelect}
                refetch={refetch}
                selectedTimeSlot={selectedTimeSlot}
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
        <Query
            query={getDentistQuery}
            variables={{ id: dentistId }}
            fetchPolicy="network-only"
        >
            {render}
        </Query>
    ),
    getDentistAppointmentSlots: ({ render, dentistId }) => {
        const input = {
            dentistId,
            rangeStart: moment()
                .add(1, 'days')
                .startOf('day')
                .utc()
                .format(),
            rangeEnd: moment()
                .add(30, 'days')
                .startOf('day')
                .utc()
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
    getUser: ({ render }) => (
        <Query query={getUserQuery} variables={{ id: _get(getUser(), 'id') }}>
            {render}
        </Query>
    ),
});

class BookAppointmentContainer extends Component {
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

    componentDidUpdate(prev) {
        const { id } = this.props;
        if (prev.id !== id) {
            this.fetchSuggestedDentist(id);
        }
    }

    fetchSuggestedDentist = async latestOfficeId => {
        const { officeId } = this.state;
        const suggestedDentist = await getSuggestedDentist({
            officeId: latestOfficeId || officeId,
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
                        appointmentTimeslot.localStartTime
                    );
                }
            );

            timeSlotList = timeSlotMap;
        });

        return timeSlotList;
    };

    getAppointmentSlotsByOfficeId = (getDentistAppointmentSlotsData = []) => {
        const urlParams = queryString.parse(history.location.search);
        const isOnDentistPage = history.location.pathname.includes('dentist');

        if (urlParams.officeId) {
            return getDentistAppointmentSlotsData.filter(
                timeSlot => timeSlot.office.id === urlParams.officeId
            );
        }

        if (!urlParams.officeId && isOnDentistPage) {
            return [getDentistAppointmentSlotsData[0]];
        }

        return (
            getDentistAppointmentSlotsData.filter(
                timeSlot => timeSlot.office.id === this.props.id
            ) || []
        );
    };

    handleFindAnotherMatch = async latestOfficeId => {
        await this.setState({ isFetchingNewData: true });
        await this.fetchSuggestedDentist(latestOfficeId);
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
                    getUser,
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
                        return (
                            <Box {...wrapperStyles}>
                                <Loading />
                            </Box>
                        );
                    }

                    if (
                        _isEmpty(officeAppointmentSlots) ||
                        _isEmpty(
                            _flatten(
                                officeAppointmentSlots.map(oas =>
                                    _get(oas, 'appointmentTimeslots')
                                )
                            )
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
                            isFetchingNewData={
                                getDentistAppointmentSlots.loading
                            }
                            locationList={locationList}
                            timeSlotList={timeSlotList}
                            dentist={getDentistData}
                            createAppointment={createAppointment}
                            onFindAnotherMatch={async () => {
                                await this.handleFindAnotherMatch(
                                    this.props.id
                                );
                            }}
                            user={_get(getUser, 'data.getUser')}
                            refetch={_get(getUser, 'refetch', () => {})}
                        />
                    );
                }}
            </Composed>
        );
    }
}

export default BookAppointmentContainer;
