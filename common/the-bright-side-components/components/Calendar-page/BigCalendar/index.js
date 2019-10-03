import moment from 'moment';
import * as React from 'react';
import BigCalendarView from './view';

class BigCalendar extends React.Component {
    constructor(props) {
        super(props);

        const events = this.getModifiedEvents(props.events);

        this.state = { events, date: props.date };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.date !== this.props.date) {
            this.setState({ date: this.props.date });
        }

        if (prevProps.events !== this.props.events) {
            const events = this.getModifiedEvents(this.props.events);
            this.setState({ events });
        }
    }

    getModifiedEvents = events => {
        return events.map(event => {
            const endTime = moment(event.end);

            if (
                endTime.hours() === 0 &&
                endTime.minutes() === 0 &&
                endTime.seconds() === 0
            ) {
                endTime.subtract(1, 'days');
                endTime.set({ hour: 23, minute: 59 });

                return {
                    ...event,
                    end: endTime.toDate(),
                };
            } else {
                return event;
            }
        });
    };

    moveEvent = ({ event, start, end }) => {
        if (this.props.onMoveEvent) {
            this.props.onMoveEvent(event, start, end);
        }
    };

    onSelectSlot = slotInfo => {
        if (this.props.onSelectSlot) {
            this.props.onSelectSlot(slotInfo);
        }
    };

    render() {
        const {
            backgroundEvents,
            renderHeader,
            onBackgroundEventClick,
            onEventClick,
            onNext,
            onPrev,
            selectable,
        } = this.props;
        const { events, date } = this.state;

        return (
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
        );
    }
}

export { BigCalendar };
