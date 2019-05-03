import moment from 'moment-timezone';
import React, { PureComponent } from 'react';
import AvailableTimesView from './view';
import _isEqual from 'lodash/isEqual';

class AvailableTimes extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selectedTimeSlot: null,
            activeTimeSlotList: [],
            timeSlotList: props.timeSlotList,
            timeSlotStartIndex: 0,
            dateSlotStartIndex: 0,
            dateCount: 3,
            timeCount: 4,
        };
    }

    componentDidMount() {
        const { timeSlotList } = this.props;

        if (timeSlotList && timeSlotList.length !== 0) {
            this.updateActiveTimeSlots();
        }
    }

    componentDidUpdate(prevProps) {
        if (!_isEqual(prevProps.timeSlotList, this.props.timeSlotList)) {
            this.updateActiveTimeSlots();
        }
    }

    handleSelectTimeSlot = time => {
        this.setState({ selectedTimeSlot: time });

        const utcFormattedTime = moment(time)
            .utcOffset(0, true)
            .format();
        if (this.props.onSelectTimeSlot) {
            this.props.onSelectTimeSlot(utcFormattedTime);
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
            if (activeTimeSlotList[i] === undefined) {
                // Generate the next empty day
                const emptyNextDay = moment(nextActiveTimeSlotList[i - 1].day)
                    .add(1, 'days')
                    .toDate();

                nextActiveTimeSlotList[i] = {
                    day: emptyNextDay,
                    time: new Array(timeCount).fill(null),
                };
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
        const { dateSlotStartIndex, timeSlotList, dateCount } = this.state;

        if (timeSlotList[dateSlotStartIndex + dateCount] === undefined) {
            return false;
        }
        return true;
    };

    checkIfHasPrevDays = () => {
        const { dateSlotStartIndex, timeSlotList, dateCount } = this.state;

        if (timeSlotList[dateSlotStartIndex - dateCount] === undefined) {
            return false;
        }
        return true;
    };

    checkIfHasPrevTimeSlots = () => {
        const {
            timeSlotStartIndex,
            timeSlotList,
            dateCount,
            dateSlotStartIndex,
        } = this.state;

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
            timeSlotList,
            dateCount,
            dateSlotStartIndex,
        } = this.state;

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

export default AvailableTimes;
