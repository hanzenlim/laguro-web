import { Spin } from 'antd';
import moment from 'moment';
import React from 'react';
import { transparentize } from 'polished';
import { Box, Button, Flex, Grid, Icon, Text } from '../../../../components';

const AvailableTimesView = props => {
    const {
        hasShowNextDays,
        hasShowPrevDays,
        hasShowNextTimeSlots,
        hasShowPrevTimeSlots,
        selectedTimeSlot,
        activeTimeSlotList,
        onSelectTimeSlot,
        onShowPrevTimeSlots,
        onShowNextTimeSlots,
        onShowNextDays,
        onShowPrevDays,
        isFetchingNewData,
    } = props;

    return (
        <Box opacity={isFetchingNewData ? '0.65' : '1'} position="relative">
            {isFetchingNewData && (
                <Flex
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    position="absolute"
                    alignItems="center"
                    justifyContent="center"
                    zIndex="100"
                >
                    <Spin />
                </Flex>
            )}

            <Text fontSize={1} fontWeight="500" mb="12px">
                Available times
            </Text>

            <Grid gridTemplateColumns={'auto auto auto'} position="relative">
                {hasShowPrevDays && (
                    <Box position="absolute" left="0" top="18px">
                        <Button
                            onClick={onShowPrevDays}
                            type="ghost"
                            height="auto"
                        >
                            <Icon type="blueLeftArrow" />
                        </Button>
                    </Box>
                )}
                {hasShowNextDays && (
                    <Box position="absolute" right="0" top="18px">
                        <Button
                            onClick={onShowNextDays}
                            type="ghost"
                            height="auto"
                        >
                            <Icon type="blueRightArrow" />
                        </Button>
                    </Box>
                )}

                {activeTimeSlotList.map(activeTimeSlot => {
                    const activeTimeSlotDay = moment(activeTimeSlot.day);
                    const isTimeslotInDay =
                        !!selectedTimeSlot &&
                        activeTimeSlot.time.includes(selectedTimeSlot);

                    return (
                        <Flex
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            bg={
                                isTimeslotInDay
                                    ? transparentize(0.9, '#3481f8')
                                    : ''
                            }
                            boxShadow={
                                isTimeslotInDay
                                    ? `0 -3px 0 3px ${transparentize(
                                          0.9,
                                          '#3481f8'
                                      )}`
                                    : 'none'
                            }
                            py={8}
                            style={{
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            <Text
                                fontSize={0}
                                fontWeight="medium"
                                color={
                                    isTimeslotInDay ? 'text.blue' : 'text.black'
                                }
                            >
                                {activeTimeSlotDay.format('ddd')}
                            </Text>
                            <Text
                                fontSize={0}
                                fontWeight="medium"
                                color={
                                    isTimeslotInDay ? 'text.blue' : 'text.black'
                                }
                            >
                                {activeTimeSlotDay.format('M/D')}
                            </Text>
                        </Flex>
                    );
                })}
            </Grid>

            <Box bg="background.white" position="relative">
                <Button
                    onClick={onShowPrevTimeSlots}
                    type="ghost"
                    height="auto"
                    width="100%"
                    disabled={!hasShowPrevTimeSlots}
                    style={
                        !hasShowPrevTimeSlots
                            ? {
                                  filter: 'saturate(0)',
                                  opacity: 0.4,
                              }
                            : null
                    }
                >
                    <Flex
                        height="30px"
                        width="100%"
                        alignItems="center"
                        justifyContent="center"
                        borderColor="#3481f8"
                        border="1px solid"
                        borderRadius="2px"
                    >
                        <Box transform="rotate(90deg)">
                            <Icon type="blueLeftArrow" />
                        </Box>
                    </Flex>
                </Button>
            </Box>

            <Grid
                gridTemplateRows={'auto'}
                gridTemplateColumns={'1fr 1fr 1fr'}
                gridRowGap="7px"
                gridColumnGap="7px"
                alignItems="start"
            >
                {activeTimeSlotList.map(activeTimeSlot => {
                    const isTimeslotInDay =
                        !!selectedTimeSlot &&
                        activeTimeSlot.time.includes(selectedTimeSlot);

                    return (
                        <Flex
                            pt={8}
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            bg={
                                isTimeslotInDay
                                    ? transparentize(0.9, '#3481f8')
                                    : ''
                            }
                            boxShadow={
                                isTimeslotInDay
                                    ? `0 0 0 3px ${transparentize(
                                          0.9,
                                          '#3481f8'
                                      )}`
                                    : 'none'
                            }
                        >
                            {activeTimeSlot.time.map(time => (
                                <Button
                                    onClick={() => onSelectTimeSlot(time)}
                                    type="ghost"
                                    width="100%"
                                    mb="7px"
                                >
                                    <Flex
                                        height="50px"
                                        borderColor="#3481f8"
                                        border="1px solid"
                                        borderRadius="2px"
                                        alignItems="center"
                                        justifyContent="center"
                                        bg={
                                            time !== null &&
                                            time === selectedTimeSlot
                                                ? 'background.blue'
                                                : 'background.white'
                                        }
                                    >
                                        <Text
                                            fontSize={1}
                                            color={
                                                time !== null &&
                                                time === selectedTimeSlot
                                                    ? 'text.white'
                                                    : 'text.blue'
                                            }
                                        >
                                            {time !== null
                                                ? moment(time).format('h:mmA')
                                                : '—'}
                                        </Text>
                                    </Flex>
                                </Button>
                            ))}
                        </Flex>
                    );
                })}
            </Grid>
            <Box bg="background.white" position="relative">
                <Button
                    onClick={onShowNextTimeSlots}
                    type="ghost"
                    height="auto"
                    width="100%"
                    disabled={!hasShowNextTimeSlots}
                    style={
                        !hasShowNextTimeSlots
                            ? {
                                  filter: 'saturate(0)',
                                  opacity: 0.4,
                              }
                            : null
                    }
                >
                    <Flex
                        height="30px"
                        width="100%"
                        alignItems="center"
                        justifyContent="center"
                        borderColor="#3481f8"
                        border="1px solid"
                        borderRadius="2px"
                    >
                        <Box transform="rotate(-90deg)">
                            <Icon type="blueLeftArrow" />
                        </Box>
                    </Flex>
                </Button>
            </Box>
        </Box>
    );
};

AvailableTimesView.propTypes = {};

export default AvailableTimesView;
