import * as React from 'react';
import { Box, Flex, Image, Text, Truncate } from '~/components';
import moment from 'moment';
import BigCalendar from 'react-big-calendar-test';
import withDragAndDrop from 'react-big-calendar-test/lib/addons/dragAndDrop';
import 'react-big-calendar-test/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const StyledComponent = styled.div`
    && .rbc-header > a > span {
        background: red;
        font-size: 20px;
    }

    && .rbc-time-content > * + * > * {
        border-left: 1px solid #e8e8e8;
    }

    && .rbc-timeslot-group {
        border-bottom: 1px solid #f5f5f5;
    }

    && .rbc-day-slot .rbc-time-slot {
        border: none;
    }

    && .rbc-allday-cell {
        display: none;
    }

    && .rbc-label {
        font-size: 10px;
        color: #9b9b9b;
    }

    && .rbc-day-slot .rbc-event {
        background: none;
        border: none;
        border-radius: 0;
    }

    && .rbc-today {
        background: #f9f9f9;
    }

    && .rbc-today > span > div > * {
        color: ${props => props.theme.colors.text.blue};
    }

    && .rbc-event-label {
        display: none;
    }

    && .rbc-timeslot-group {
        min-height: 46px;
    }

    && .rbc-current-time-indicator {
        background: ${props => props.theme.colors.divider.blue};
    }

    && .rbc-day-slot .rbc-event-content {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
    }

    && .rbc-calendar {
        height: 100vh;
    }
`;

const StyledArrowButton = styled.button`
    border: none;
    background: transparent;
    font-size: ${props => props.theme.fontSizes[3]};
`;

const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const getFormatFromTme = time => {
    const momentTime = moment(time);
    if (momentTime.get('minutes') === 0) {
        return 'hA';
    }

    return 'h:mm A';
};

export default class BigCalendarView extends React.Component {
    render() {
        const {
            events,
            backgroundEvents,
            moveEvent,
            onBackgroundEventClick,
            onEventClick,
            renderHeader,
            date,
            onNext,
            onPrev,
            onSelectSlot,
            selectable = false,
        } = this.props;

        const formats = {
            dayRangeHeaderFormat: props => {
                return `${localizer.format(
                    props.start,
                    'MMMM D, YYYY'
                )} — ${localizer.format(props.end, 'MMMM D, YYYY')}`;
            },
            timeGutterFormat: props => {
                return localizer.format(props, 'h A');
            },
        };
        const calendarSettings = {
            backgroundEvents,
            date,
            defaultView: 'week',
            drilldownView: null,
            events,
            formats,
            localizer,
            onEventDrop: moveEvent,
            onNext,
            onPrev,
            onSelectSlot,
            scrollToTime: moment('6:00am', 'h:mma').toDate(),
            selectable,
            showMultiDayTimes: true,
            step: 30,
            views: allViews,
        };

        return (
            <StyledComponent>
                <DragAndDropCalendar
                    {...calendarSettings}
                    components={{
                        backgroundEventWrapper: props => {
                            const today = moment();
                            const style = { ...props.style };
                            const isBeforeToday = moment(
                                props.event.end
                            ).isBefore(today);

                            if (props.style) {
                                style.top = props.style.top + '%';
                                style.height = props.style.height + '%';
                                style.width = 'calc(100% + 10px)';
                            }

                            return (
                                <Flex
                                    position="absolute"
                                    style={style}
                                    onClick={e =>
                                        onBackgroundEventClick(e, props.event)
                                    }
                                >
                                    {isBeforeToday && (
                                        <Box
                                            position="absolute"
                                            left="0"
                                            right="0"
                                            bottom="0"
                                            top="0"
                                            background="black"
                                            opacity="0.1"
                                        />
                                    )}
                                    <Box
                                        pl="9px"
                                        pr="9px"
                                        pt="8px"
                                        bg={props.event.color}
                                        width="100%"
                                    />
                                </Flex>
                            );
                        },
                        event: props => {
                            const diffInMinutes = moment(props.event.end).diff(
                                moment(props.event.start),
                                'minutes'
                            );

                            return (
                                <Flex
                                    onClick={e => onEventClick(e, props.event)}
                                    position="absolute"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    top="0"
                                    opacity={props.event.isPending ? 0.5 : 1}
                                    mb="3px"
                                >
                                    <Box
                                        pl="6px"
                                        pr="9px"
                                        pt="4px"
                                        bg="white"
                                        flex="1"
                                        borderLeft="4px solid"
                                        borderColor={props.event.color}
                                    >
                                        {diffInMinutes === 59 ||
                                        diffInMinutes === 30 ? (
                                            <Flex>
                                                <Text
                                                    width={['50%', '', '65%']}
                                                    height="12px"
                                                    fontSize="10px"
                                                    lineHeight="12px"
                                                    fontWeight="500"
                                                    color="#303449"
                                                    mr="5px"
                                                >
                                                    <Truncate lines={1}>
                                                        {props.title}
                                                    </Truncate>
                                                </Text>
                                                <Text
                                                    width={['50%', '', '35%']}
                                                    fontSize="10px"
                                                    lineHeight="13px"
                                                    color="#9b9b9b"
                                                    mb="3px"
                                                    textAlign="right"
                                                >
                                                    <Truncate lines={1}>
                                                        {localizer.format(
                                                            props.event.start,
                                                            getFormatFromTme(
                                                                props.event
                                                                    .start
                                                            )
                                                        )}
                                                    </Truncate>
                                                </Text>
                                            </Flex>
                                        ) : (
                                            <Flex justifyContent="space-between">
                                                <Flex
                                                    flexDirection="column"
                                                    flex="1"
                                                    mr="2px"
                                                >
                                                    <Text
                                                        width={[
                                                            '80px',
                                                            '',
                                                            '100%',
                                                        ]}
                                                        fontSize="10px"
                                                        lineHeight="12px"
                                                        fontWeight="500"
                                                        color="#303449"
                                                    >
                                                        <Truncate lines={1}>
                                                            {props.title}
                                                        </Truncate>
                                                    </Text>
                                                    <Text
                                                        width={[
                                                            '80px',
                                                            '',
                                                            '100%',
                                                        ]}
                                                        fontSize="10px"
                                                        lineHeight="13px"
                                                        color="#9b9b9b"
                                                        mb="3px"
                                                    >
                                                        <Truncate lines={1}>
                                                            {localizer.format(
                                                                props.event
                                                                    .start,
                                                                getFormatFromTme(
                                                                    props.event
                                                                        .start
                                                                )
                                                            )}{' '}
                                                            —{' '}
                                                            {localizer.format(
                                                                props.event.end,
                                                                getFormatFromTme(
                                                                    props.event
                                                                        .end
                                                                )
                                                            )}
                                                        </Truncate>
                                                    </Text>
                                                </Flex>
                                                {props.event.image && (
                                                    <Box
                                                        width="28px"
                                                        height="28px"
                                                        bg="#ebebeb"
                                                        borderRadius="50%"
                                                    >
                                                        <Image
                                                            src={
                                                                props.event
                                                                    .image
                                                            }
                                                            alt={
                                                                props.event
                                                                    .title
                                                            }
                                                            width="100%"
                                                            height="100%"
                                                            borderRadius="50%"
                                                        />
                                                    </Box>
                                                )}
                                            </Flex>
                                        )}
                                    </Box>
                                </Flex>
                            );
                        },
                        toolbar: props => {
                            const onNavigateToPrev = () =>
                                onPrev ? onPrev() : props.onNavigate('PREV');
                            const onNavigateToNext = () =>
                                onNext ? onNext() : props.onNavigate('NEXT');

                            return (
                                <Flex justifyContent="space-between" mb="14px">
                                    <Flex
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <StyledArrowButton
                                            onClick={onNavigateToPrev}
                                        >
                                            &#8249;
                                        </StyledArrowButton>
                                        <StyledArrowButton
                                            onClick={onNavigateToNext}
                                        >
                                            &#8250;
                                        </StyledArrowButton>
                                        <Text color="#303449" fontSize="18px">
                                            {props.label}
                                        </Text>
                                    </Flex>

                                    {renderHeader && renderHeader()}
                                </Flex>
                            );
                        },
                        week: {
                            header: props => {
                                const [a, b] = props.label.split(' ');
                                return (
                                    <Flex
                                        justifyContent="center"
                                        flexDirection="column"
                                        height="111px"
                                    >
                                        <Text
                                            fontSize="26px"
                                            mb="6px"
                                            lineHeight="32px"
                                            color="#303449"
                                        >
                                            {a}
                                        </Text>
                                        <Text
                                            fontSize="20px"
                                            color="#303449"
                                            lineHeight="24px"
                                            fontWeight="normal"
                                        >
                                            {b}
                                        </Text>
                                    </Flex>
                                );
                            },
                        },
                    }}
                />
            </StyledComponent>
        );
    }
}
