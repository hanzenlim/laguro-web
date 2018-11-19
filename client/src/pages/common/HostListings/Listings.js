import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';

import { Box, Text, Flex, Button, Responsive } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import Reservations from './Reservations';
import { ListingTime } from '../../../util/timeUtil';

const { TabletMobile, Desktop } = Responsive;
const { Panel } = Collapse;

const StyledCollapse = styled(Collapse)`
    &&.ant-collapse {
        background-color: ${props => props.theme.colors.background.white};

        .ant-collapse-item .ant-collapse-header {
            padding: 22px 25px;
            .arrow {
                transform: translateY(-50%);
                top: 50%;
                left: unset;
                right: 12px;
                line-height: 12px;
                width: 12px;
            }
        }

        .ant-collapse-content-active {
            background-color: #fbfbfb;
        }

        .ant-collapse-content-box {
            padding: 22px 25px;
        }
    }
`;

const Listings = ({ listings, toggleCancelModalState, desktopOnly }) => {
    const content = listings.map(listing => {
        const {
            id,
            availability,
            reservations,
            localStartTime,
            localEndTime,
        } = listing;

        const { startDay, endDay, days } = availability;
        const frequency = days.map(d => d.charAt(0) + d.slice(1).toLowerCase());

        const isResevationsEmpty = reservations.length === 0;

        return desktopOnly ? (
            <Box key={id} mb={28}>
                <Box
                    px={28}
                    py={16}
                    mt={5}
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                >
                    <Flex justifyContent="flex-end">
                        <Button
                            type="ghost"
                            onClick={
                                isResevationsEmpty
                                    ? toggleCancelModalState(id)
                                    : null
                            }
                            height="auto"
                        >
                            <Text
                                fontSize={1}
                                color={
                                    isResevationsEmpty
                                        ? 'text.blue'
                                        : 'text.gray'
                                }
                            >
                                Delete Listing
                            </Text>
                        </Button>
                    </Flex>
                    <Text
                        fontWeight="medium"
                        fontSize={[1, '', 2]}
                        color="text.blue"
                        mb={9}
                    >
                        LISTING DETAILS
                    </Text>

                    <Box mb={21}>
                        <ListingTime
                            startDate={startDay}
                            endDate={endDay}
                            startTime={localStartTime}
                            endTime={localEndTime}
                            frequency={frequency}
                        />
                    </Box>

                    <Text
                        fontWeight="medium"
                        fontSize={[1, '', 2]}
                        color="text.blue"
                        mb={9}
                    >
                        BOOKINGS
                    </Text>
                    <Box mt={18}>
                        {reservations.length ? (
                            <Reservations reservations={reservations} />
                        ) : (
                            <Text
                                textAlign="center"
                                color="text.darkGray"
                                my={50}
                            >
                                NO BOOKINGS
                            </Text>
                        )}
                    </Box>
                </Box>
            </Box>
        ) : (
            <Panel
                header={
                    <Flex fontSize={2}>
                        <ListingTime
                            startDate={startDay}
                            endDate={endDay}
                            startTime={localStartTime}
                            endTime={localEndTime}
                            frequency={frequency}
                        />
                        <Text
                            fontWeight="medium"
                            display="inline"
                            color="text.blue"
                            ml={6}
                        >
                            {reservations.length > 0 &&
                                `(${reservations.length})`}
                        </Text>
                    </Flex>
                }
                key={id}
            >
                <Flex justifyContent="space-between" mb={20}>
                    <Text fontWeight="medium">Reservations</Text>
                    <Button
                        type="ghost"
                        onClick={
                            isResevationsEmpty
                                ? toggleCancelModalState(id)
                                : null
                        }
                        height="auto"
                    >
                        <Text
                            fontSize={1}
                            color={
                                isResevationsEmpty ? 'text.blue' : 'text.gray'
                            }
                        >
                            Delete Listing
                        </Text>
                    </Button>
                </Flex>

                {reservations.length ? (
                    <Reservations reservations={reservations} />
                ) : (
                    <Text textAlign="center" color="text.darkGray" my={20}>
                        NO BOOKINGS
                    </Text>
                )}
            </Panel>
        );
    });

    return (
        <Fragment>
            <TabletMobile>
                <StyledCollapse>{content}</StyledCollapse>
            </TabletMobile>
            <Desktop>{content}</Desktop>
        </Fragment>
    );
};
export default withScreenSizes(Listings);
