import * as React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import MiniCalendarView from './view';
import {
    getLocalDate,
    getOfficeToColorMap,
    getOfficeIdsFromRes,
} from '../util';

const getDateToOfficeIdSetMap = reservations => {
    const map = new Map();

    for (let i = 0; i < reservations.length; i += 1) {
        const res = reservations[i];
        const localAvailableTimes = _get(res, 'localAvailableTimes');
        const days = _flatten(
            localAvailableTimes.map(lat => [
                getLocalDate(lat.startTime),
                getLocalDate(lat.endTime),
            ])
        );
        const officeId = _get(res, 'office.id');

        for (let j = 0; j < days.length; j += 1) {
            const day = days[j];
            if (map.has(day)) {
                map.get(day).add(officeId);
            } else {
                const set = new Set();
                set.add(officeId);
                map.set(day, set);
            }
        }
    }

    return map;
};

class MiniCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: props.date };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({ date: this.props.date });
        }
    }

    onChange = date => {
        this.props.onChange(date);
        this.setState({ date });
    };

    render() {
        return (
            <MiniCalendarView
                onChange={this.onChange}
                date={this.state.date}
                dateToOfficeIdSetMap={getDateToOfficeIdSetMap(
                    this.props.reservations
                )}
                colorMap={getOfficeToColorMap(
                    getOfficeIdsFromRes(this.props.reservations)
                )}
            />
        );
    }
}

export { MiniCalendar };
