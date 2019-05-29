/**
 * @class BigCalendar
 */

import { Theme } from '@laguro/basic-components';
import moment from 'moment';
import * as React from 'react';
import * as styledComponents from 'styled-components';
import BigCalendarView from './view';

const { ThemeProvider } = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

interface IThemeInterface {}

interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    image: string;
    isCancelled: boolean;
}

interface BackgroundEvent {
    id: number;
    start: Date;
    end: Date;
    color: string;
}

export interface Props {
    events: Event[];
    backgroundEvents: BackgroundEvent[];
    renderHeader: any;
    date: any;
    onNext: any;
    onPrev: any;
    onMoveEvent: any;
    onSelectSlot: any;
    selectable: any;
    onBackgroundEventClick(e: React.MouseEvent<HTMLElement>, event: Event): void;
    onEventClick(e: React.MouseEvent<HTMLElement>, event: Event): void;
}

export interface State {
    events: Event[];
    date: any;
}

export default class BigCalendar extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        const events = this.getModifiedEvents(props.events);

        this.state = { events, date: props.date };
    }

    public componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({ date: this.props.date });
        }

        if (prevProps.events !== this.props.events) {
            const events = this.getModifiedEvents(this.props.events);
            this.setState({ events });
        }
    }

    public getModifiedEvents = events => {
        return events.map(event => {
            const endTime = moment(event.end);

            if (endTime.hours() === 0 && endTime.minutes() === 0 && endTime.seconds() === 0) {
                endTime.subtract(1, 'days');
                endTime.set({ hour: 23, minute: 59 });

                return {
                    ...event,
                    end: endTime.toDate()
                };
            } else {
                return event;
            }
        });
    };

    public moveEvent = ({ event, start, end }) => {
        if (this.props.onMoveEvent) {
            this.props.onMoveEvent(event, start, end);
        }
    };

    public onSelectSlot = slotInfo => {
        if (this.props.onSelectSlot) {
            this.props.onSelectSlot(slotInfo);
        }
    };

    public render() {
        const {
            backgroundEvents,
            renderHeader,
            onBackgroundEventClick,
            onEventClick,
            onNext,
            onPrev,
            selectable
        } = this.props;
        const { events, date } = this.state;

        return (
            <ThemeProvider theme={Theme}>
                <BigCalendarView
                    events={events}
                    date={date}
                    backgroundEvents={backgroundEvents}
                    moveEvent={this.moveEvent}
                    onEventClick={onEventClick}
                    onBackgroundEventClick={onBackgroundEventClick}
                    renderHeader={renderHeader}
                    onNext={onNext}
                    onPrev={onPrev}
                    onSelectSlot={this.onSelectSlot}
                    selectable={selectable}
                />
            </ThemeProvider>
        );
    }
}
