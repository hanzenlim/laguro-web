import moment from 'moment-timezone';
import React, { PureComponent } from 'react';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import { withRouter } from 'next/router';

import AvailableTimesView from './view';

class AvailableTimes extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTimeSlot: null,
            activeTimeSlotList: [],
            timeSlotStartIndex: 0,
            dateSlotStartIndex: 0,
            dateCount: 3,
            timeCount: 4,
        };
    }

    async componentDidMount() {
        const { router } = this.props;
        const { timeSlotList } = this.props;
        const urlParams = router.query;

        if (urlParams && urlParams.startTime) {
            const time = urlParams.startTime;
            this.handleSelectTimeSlot(time);

            let numberOfCalls = null;

            if (!_isEmpty(timeSlotList)) {
                timeSlotList.forEach(item => {
                    const itemIndex = item.time.findIndex(
                        strTime => strTime.toString() === time.toString()
                    );

                    if (itemIndex > this.state.timeCount) {
                        const possibleNumberOfCalls = Math.floor(
                            itemIndex / this.state.timeCount
                        );

                        if (possibleNumberOfCalls > numberOfCalls) {
                            numberOfCalls = possibleNumberOfCalls;
                        }
                    }
                });
            }

            if (numberOfCalls > 0) {
                const callArrays = new Array(numberOfCalls);

                callArrays.fill(this.handleShowNextTimeSlots);

                for (const callShowNextTimeSlots of callArrays) {
                    await callShowNextTimeSlots();
                }
            }
        }

        if (timeSlotList && timeSlotList.length !== 0) {
            this.updateActiveTimeSlots();
        }
    }

    componentDidUpdate(prevProps) {
        if (!_isEqual(prevProps.timeSlotList, this.props.timeSlotList)) {
            this.updateActiveTimeSlots();
        }

        if (
            prevProps.selectedTimeSlot !== this.props.selectedTimeSlot &&
            !this.props.selectedTimeSlot
        ) {
            this.updateActiveTimeSlots();
            this.setState({ selectedTimeSlot: null });
        }
    }

    handleSelectTimeSlot = time => {
        this.setState({ selectedTimeSlot: time });

        const utcFormattedTime = moment(time)
            .utcOffset(0, true)
            .format();

        if (this.props.onSelectTimeSlot && time) {
            this.props.onSelectTimeSlot(utcFormattedTime);
        } else {
            this.props.onSelectTimeSlot(null);
        }
    };

    handleShowPrevTimeSlots = async () => {
        const { timeCount, timeSlotStartIndex } = this.state;
        const nextTimeSlotStartIndex = timeSlotStartIndex - timeCount;
        await this.setState({ timeSlotStartIndex: nextTimeSlotStartIndex });
        this.updateActiveTimeSlots();
    };

    handleShowNextTimeSlots = async () => {
        const { timeCount, timeSlotStartIndex } = this.state;
        const nextTimeSlotStartIndex = timeSlotStartIndex + timeCount;
        await this.setState({ timeSlotStartIndex: nextTimeSlotStartIndex });
        this.updateActiveTimeSlots();
    };

    updateActiveTimeSlots = () => {
        const { timeSlotList } = this.props;
        const {
            dateCount,
            timeCount,
            timeSlotStartIndex,
            dateSlotStartIndex,
        } = this.state;

        const filteredByStartDateIndex = timeSlotList.slice(
            dateSlotStartIndex,
            dateSlotStartIndex + dateCount
        );

        const filteredByStartTimeIndex = filteredByStartDateIndex.map(
            timeSlotObject => ({
                ...timeSlotObject,
                time: timeSlotObject.time.slice(
                    timeSlotStartIndex,
                    timeSlotStartIndex + timeCount
                ),
            })
        );

        const nextActiveTimeSlotList = this.populateEmptySlots(
            filteredByStartTimeIndex
        );

        this.setState({ activeTimeSlotList: nextActiveTimeSlotList });
    };

    populateEmptySlots = activeTimeSlotList => {
        const { dateCount, timeCount } = this.state;

        const nextActiveTimeSlotList = [];
        for (let i = 0; i < dateCount; i++) {
            // If day is blank, create an empty day
            if (_isEmpty(activeTimeSlotList[i])) {
                // Generate the next empty day
                let emptyNextDay = moment()
                    .add(1, 'days')
                    .toDate();

                if (i === 0) {
                    nextActiveTimeSlotList[i] = {
                        day: emptyNextDay,
                        time: new Array(timeCount).fill(null),
                    };
                } else {
                    emptyNextDay = moment(nextActiveTimeSlotList[i - 1].day)
                        .add(1, 'days')
                        .toDate();

                    nextActiveTimeSlotList[i] = {
                        day: emptyNextDay,
                        time: new Array(timeCount).fill(null),
                    };
                }
            } else {
                // If day is not blank, copy the day
                nextActiveTimeSlotList[i] = activeTimeSlotList[i];
            }

            // If time slot is undefined, replaced undefined with null
            for (let a = 0; a < timeCount; a++) {
                if (nextActiveTimeSlotList[i].time[a] === undefined) {
                    nextActiveTimeSlotList[i].time[a] = null;
                }
            }
        }

        return nextActiveTimeSlotList;
    };

    handleShowNextDays = async () => {
        const { dateCount, dateSlotStartIndex } = this.state;
        const nextDateSlotStartIndex = dateSlotStartIndex + dateCount;
        await this.setState({ dateSlotStartIndex: nextDateSlotStartIndex });
        this.updateActiveTimeSlots();
    };

    handleShowPrevDays = async () => {
        const { dateCount, dateSlotStartIndex } = this.state;
        const nextDateSlotStartIndex = dateSlotStartIndex - dateCount;
        await this.setState({ dateSlotStartIndex: nextDateSlotStartIndex });
        this.updateActiveTimeSlots();
    };

    checkIfHasNextDays = () => {
        const { dateSlotStartIndex, dateCount } = this.state;
        const { timeSlotList } = this.props;

        if (timeSlotList[dateSlotStartIndex + dateCount] === undefined) {
            return false;
        }
        return true;
    };

    checkIfHasPrevDays = () => {
        const { dateSlotStartIndex, dateCount } = this.state;
        const { timeSlotList } = this.props;

        if (timeSlotList[dateSlotStartIndex - dateCount] === undefined) {
            return false;
        }
        return true;
    };

    checkIfHasPrevTimeSlots = () => {
        const {
            timeSlotStartIndex,
            dateCount,
            dateSlotStartIndex,
        } = this.state;
        const { timeSlotList } = this.props;

        const nextTimeSlots = [];
        for (let i = 0; i < dateCount; i++) {
            const day = timeSlotList[dateSlotStartIndex + i];
            if (day) {
                const nextTimeSlot = day.time[timeSlotStartIndex - 1];

                if (nextTimeSlot !== undefined) {
                    nextTimeSlots.push(nextTimeSlot);
                }
            }
        }

        if (nextTimeSlots.length === 0) {
            return false;
        }
        return true;
    };

    checkIfHasNextTimeSlots = () => {
        const {
            timeCount,
            timeSlotStartIndex,
            dateCount,
            dateSlotStartIndex,
        } = this.state;
        const { timeSlotList } = this.props;

        const nextTimeSlots = [];
        for (let i = 0; i < dateCount; i++) {
            const day = timeSlotList[dateSlotStartIndex + i];
            if (day) {
                const nextTimeSlot = day.time[timeSlotStartIndex + timeCount];

                if (nextTimeSlot !== undefined) {
                    nextTimeSlots.push(nextTimeSlot);
                }
            }
        }
        if (nextTimeSlots.length === 0) {
            return false;
        }
        return true;
    };

    render() {
        const { timeSlotList, isFetchingNewData } = this.props;
        if (!timeSlotList || timeSlotList.length === 0) return null;

        const { selectedTimeSlot, activeTimeSlotList } = this.state;

        const hasShowNextDays = this.checkIfHasNextDays();
        const hasShowPrevDays = this.checkIfHasPrevDays();
        const hasShowPrevTimeSlots = this.checkIfHasPrevTimeSlots();
        const hasShowNextTimeSlots = this.checkIfHasNextTimeSlots();

        return (
            <AvailableTimesView
                hasShowNextDays={hasShowNextDays}
                hasShowPrevDays={hasShowPrevDays}
                hasShowNextTimeSlots={hasShowNextTimeSlots}
                hasShowPrevTimeSlots={hasShowPrevTimeSlots}
                onSelectTimeSlot={this.handleSelectTimeSlot}
                onShowPrevTimeSlots={this.handleShowPrevTimeSlots}
                onShowNextTimeSlots={this.handleShowNextTimeSlots}
                onShowPrevDays={this.handleShowPrevDays}
                onShowNextDays={this.handleShowNextDays}
                selectedTimeSlot={selectedTimeSlot}
                activeTimeSlotList={activeTimeSlotList}
                isFetchingNewData={isFetchingNewData}
            />
        );
    }
}

AvailableTimes.propTypes = {};

AvailableTimes.defaultProps = {
    timeSlotList: [],
};

export default withRouter(AvailableTimes);
