/**
 * @class MiniCalendar
 */
import * as React from 'react';
import _get from 'lodash/get';
import _flatten from 'lodash/flatten';
import { Theme } from '@laguro/basic-components';
import MiniCalendarView from './view';
import { getLocalDate, getOfficeToColorMap, getOfficeIdsFromRes } from '../util';
import * as styledComponents from 'styled-components';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

export interface Props {
    onChange(date: Date): void;
    reservations: Reservation[];
    date: Date;
}

interface Office {
    id: string;
    name: string;
}

interface LocalAvailableTime {
    startTime: string;
    endTime: string;
}

interface Reservation {
    id: string;
    office: Office;
    localAvailableTimes: LocalAvailableTime[];
}

interface State {
    date: Date;
}

const getDateToOfficeIdSetMap = (reservations: Reservation[]) => {
    const map = new Map();

    for (let i = 0; i < reservations.length; i += 1) {
        const res = reservations[i];
        const localAvailableTimes = _get(res, 'localAvailableTimes');
        const days = _flatten(
            localAvailableTimes.map(
                (lat: LocalAvailableTime): string[] => [getLocalDate(lat.startTime), getLocalDate(lat.endTime)]
            )
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

class MiniCalendar extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { date: props.date };
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({ date: this.props.date });
        }
    }

    onChange = (date: Date) => {
        this.props.onChange(date);
        this.setState({ date });
    };

    render() {
        return (
            <ThemeProvider theme={Theme}>
                <MiniCalendarView
                    onChange={this.onChange}
                    date={this.state.date}
                    dateToOfficeIdSetMap={getDateToOfficeIdSetMap(this.props.reservations)}
                    colorMap={getOfficeToColorMap(getOfficeIdsFromRes(this.props.reservations))}
                />
            </ThemeProvider>
        );
    }

    static defaultProps = {
        onChange: () => {}
    };
}

export default MiniCalendar;
