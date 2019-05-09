import React, { Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { Dropdown } from 'antd';

import { Box, Button, Text, Grid, Flex, Icon } from '../../../components';

const AppointmentTimeslots = ({
    dentist,
    indexToMap,
    earliestAvailableDate,
    handleSelectAppointment,
    menu,
    screenWidth,
    tabletOnly,
    tabletMobileOnly,
    mobileOnly,
}) => {
    const hasTimeslots =
        dentist.appointmentTimeslotsByOffice &&
        dentist.appointmentTimeslotsByOffice.length !== 0 &&
        !_isEmpty(dentist.appointmentTimeslotsByOffice[0].appointmentTimeslots);

    return hasTimeslots ? (
        <Fragment>
            <Text
                mb={[
                    5,
                    '',
                    dentist.appointmentTimeslotsByOffice.length > 1 ? 8 : 16,
                ]}
                fontWeight={['', '', 'medium']}
                fontSize={[0, '', 1]}
                lineHeight={['14px', '', '17px']}
                textAlign="left"
                mt={[5, '', 0]}
            >
                {`Available times `}
                {moment(
                    dentist.appointmentTimeslotsByOffice[indexToMap]
                        .appointmentTimeslots[indexToMap].localStartTime
                ).diff(moment(), 'days') === 0 && 'today'}
                {moment(
                    dentist.appointmentTimeslotsByOffice[indexToMap]
                        .appointmentTimeslots[indexToMap].localStartTime
                ).diff(moment(), 'days') === 1 && 'tomorrow'}
                {moment(
                    dentist.appointmentTimeslotsByOffice[indexToMap]
                        .appointmentTimeslots[indexToMap].localStartTime
                ).diff(moment(), 'days') > 1 &&
                    `on ${moment(earliestAvailableDate).format('LL')}`}
                {` at `}
                {dentist.appointmentTimeslotsByOffice.length > 1 ? (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            type="ghost"
                            p={0}
                            width={['calc(100vw - 50px - 32px)', '', 380]}
                            height="auto"
                            ml={[0, '', 10]}
                            mt={[5, '', 0]}
                            mb={[15, '', 0]}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <Flex
                                height={40}
                                flexDirection="row"
                                alignItems="center"
                                justifyContent="space-between"
                                boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.18)"
                                px={15}
                            >
                                <Text
                                    fontWeight="normal"
                                    fontSize={[0, '', 1]}
                                    mr={5}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {
                                        dentist.appointmentTimeslotsByOffice[
                                            indexToMap
                                        ].office.location.name
                                    }
                                </Text>
                                <Icon
                                    type="down"
                                    color="text.blue"
                                    fontSize={10}
                                />
                            </Flex>
                        </Button>
                    </Dropdown>
                ) : (
                    <Text
                        is="span"
                        fontSize={[0, '', 1]}
                        lineHeight={['14px', '', '17px']}
                        fontWeight="regular"
                    >
                        {dentist.appointmentTimeslotsByOffice[0].office.location.name
                            .split(',', 3)
                            .toString()}
                    </Text>
                )}
            </Text>
            <Box height={84} maxHeight={84} overflow="hidden" width="100%">
                <Grid
                    gridTemplateColumns={[
                        'repeat(auto-fit, 79px)',
                        '',
                        'repeat(auto-fit, 147px)',
                    ]}
                    gridGap={3}
                >
                    {dentist.appointmentTimeslotsByOffice[
                        indexToMap
                    ].appointmentTimeslots.map((availableTime, index) => {
                        if (index > 9 && !tabletOnly && !tabletMobileOnly)
                            return null;

                        if (index === 9 && !tabletOnly && !tabletMobileOnly) {
                            return (
                                <Button
                                    type="primary"
                                    height={40}
                                    width="100%"
                                    ghost={true}
                                    pb={10}
                                    fontSize={4}
                                    fontWeight="700"
                                    data-dentistid={dentist.dentistId}
                                    onClick={handleSelectAppointment}
                                >
                                    ...
                                </Button>
                            );
                        }

                        if (
                            (index > 7 && mobileOnly) ||
                            (index > 3 && tabletMobileOnly && !tabletOnly) ||
                            (index > 5 && tabletOnly) ||
                            (screenWidth === 768 && index > 3)
                        ) {
                            return null;
                        }

                        if (
                            (index === 7 && mobileOnly) ||
                            (index === 3 && tabletMobileOnly && !tabletOnly) ||
                            (index === 5 && tabletOnly) ||
                            (screenWidth === 768 && index === 3)
                        ) {
                            return (
                                <Button
                                    type="primary"
                                    height={40}
                                    width="100%"
                                    ghost={true}
                                    pb={10}
                                    fontSize={[0, '', 3]}
                                    fontWeight="700"
                                    data-dentistid={dentist.dentistId}
                                    onClick={handleSelectAppointment}
                                >
                                    ...
                                </Button>
                            );
                        }

                        return (
                            <Button
                                data-start={availableTime.localStartTime}
                                data-dentistid={dentist.dentistId}
                                type="primary"
                                height={40}
                                width="100%"
                                ghost={true}
                                onClick={handleSelectAppointment}
                                fontSize={[0, '', 3]}
                            >
                                {moment(availableTime.localStartTime).format(
                                    'h:mm A'
                                )}
                            </Button>
                        );
                    })}
                </Grid>
            </Box>
        </Fragment>
    ) : (
        <Text
            style={{ 'white-space': 'pre-line' }}
            fontSize={[0, '', 3]}
            fontWeight="500"
            textAlign="left"
        >
            There are no available times
        </Text>
    );
};

export default AppointmentTimeslots;
