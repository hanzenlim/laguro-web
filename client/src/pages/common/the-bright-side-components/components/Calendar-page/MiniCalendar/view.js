import * as React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { Card, Box, Flex, Text } from '@laguro/basic-components';
import moment from 'moment';
import { getLocalDate } from '../util';

const StyledCalendar = styled(Calendar)`
    && {
        border: none;
        margin: 0;
        .react-calendar__navigation {
            margin-bottom: 0;
            height: 34px;
            button[disabled],
            button:enabled:hover,
            button:enabled:focus {
                background-color: #ffffff;
            }
        }

        .react-calendar__navigation__label {
            font-family: ${props => props.theme.fontFamily};
            font-weight: ${props => props.theme.fontWeights.regular};
            font-size: ${props => props.theme.fontSizes[1]};
            color: ${props => props.theme.colors.text.black};
        }

        &&&& .react-calendar__tile--now {
            time {
                color: ${props => props.theme.colors.text.white};
            }

            .background-date-circle {
                background-color: ${props =>
                    props.theme.colors.background.blue};
                opacity: 1;
            }
        }

        .react-calendar__month-view__days__day--neighboringMonth time {
            opacity: 0.5;
        }

        .react-calendar__month-view:before {
            content: '';
            border-bottom: solid 1px #ececec;
            padding: 0 13px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 10px;
            width: calc(100% - 26px);
        }

        .react-calendar__month-view__weekdays__weekday {
            font-family: ${props => props.theme.fontFamily};
            font-weight: ${props => props.theme.fontWeights.medium};
            font-size: ${props => props.theme.fontSizes[1]};
        }

        && .react-calendar__tile {
            position: relative;
            overflow: visible !important;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            time {
                font-family: ${props => props.theme.fontFamily};
                font-weight: ${props => props.theme.fontWeights.regular};
                color: ${props => props.theme.colors.text.black};
                font-size: ${props => props.theme.fontSizes[1]};
                z-index: 2;
            }

            margin: 1px 0;

            :hover .background-date-circle {
                background-color: #3481f8;
                opacity: 0.08;
            }

            .background-week-oval {
                pointer-events: none;
            }
        }
    }
`;

const getFirstDayOfWeek = date => moment(date).startOf('week');

class MiniCalendarView extends React.PureComponent {
    renderReservationDots = tileLocalDate => {
        const { dateToOfficeIdSetMap, colorMap } = this.props;
        const officeIdSet = dateToOfficeIdSetMap.get(tileLocalDate);

        if (!officeIdSet) return <Text height={15} ml={1} />;

        const extraOfficeNum = officeIdSet.size - 3;

        return Array.from(officeIdSet)
            .slice(0, 3)
            .sort()
            .map(officeId => (
                <Flex height={15} alignItems="center">
                    <Box
                        width={6}
                        height={6}
                        borderRadius={3}
                        ml={1}
                        bg={colorMap[officeId]}
                    />
                </Flex>
            ))
            .concat(
                extraOfficeNum > 0 ? (
                    <Text
                        ml={1}
                        fontSize="6px"
                        color="#9b9b9b"
                        letterSpacing="-0.4px"
                    >
                        {`+${extraOfficeNum}`}
                    </Text>
                ) : (
                    <div />
                )
            );
    };

    render() {
        const { onChange, date } = this.props;
        const firstDayOfSelectedWeek = getLocalDate(
            getFirstDayOfWeek(date).format()
        );
        return (
            <Card width={295} p={2}>
                <StyledCalendar
                    onChange={onChange}
                    value={date}
                    formatShortWeekday={value => value.toString().slice(0, 1)}
                    maxDetail="month"
                    minDetail="month"
                    locale="en-US"
                    next2Label={null}
                    prev2Label={null}
                    tileContent={({ date: tileDate }) => {
                        const tileLocalDate = getLocalDate(
                            moment(tileDate).format()
                        );

                        return (
                            <Flex
                                width={20}
                                flexDirection="column"
                                alignItems="center"
                            >
                                <Box
                                    borderRadius={10}
                                    className="background-date-circle"
                                    position="absolute"
                                    width={20}
                                    height={20}
                                    top={8}
                                    left={11}
                                    zIndex={1}
                                />
                                {tileLocalDate === firstDayOfSelectedWeek && (
                                    <Box
                                        className="background-week-oval"
                                        width={280}
                                        height={20}
                                        borderRadius={22.5}
                                        bg="#3481f8"
                                        position="absolute"
                                        top={8}
                                        left={7}
                                        opacity={0.08}
                                        zIndex={1}
                                    />
                                )}

                                <Flex
                                    justifyContent="center"
                                    width="100%"
                                    mr={1}
                                >
                                    {this.renderReservationDots(tileLocalDate)}
                                </Flex>
                            </Flex>
                        );
                    }}
                />
            </Card>
        );
    }
}

export default MiniCalendarView;
