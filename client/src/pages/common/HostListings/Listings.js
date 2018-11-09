import React, { Fragment } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Collapse } from 'antd';

import { Box, Text, Flex, Button, Responsive } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
import Reservations from './Reservations';

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
        const { id, availability, reservations } = listing;

        const startDate = `${availability.startDay}T${availability.startTime}`;
        const endDate = `${availability.endDay}T${availability.endTime}`;
        const isResevationsEmpty = reservations.length === 0;

        return desktopOnly ? (
            <Box key={id} mt={28}>
                <Flex justifyContent="flex-end">
                    <Button
                        type="ghost"
                        onClick={
                            isResevationsEmpty
                                ? toggleCancelModalState(id)
                                : null
                        }
                        height="40px"
                        mb={10}
                    >
                        <Text
                            fontSize={1}
                            color={
                                isResevationsEmpty ? 'text.blue' : 'text.gray'
                            }
                        >
                            delete listing
                        </Text>
                    </Button>
                </Flex>
                <Box
                    px={28}
                    py={16}
                    mt={5}
                    bg="background.white"
                    border="1px solid"
                    borderColor="divider.gray"
                    borderRadius={2}
                >
                    <Box fontSize={5} mb={30}>
                        <Text fontWeight="medium" display="inline">
                            {moment(startDate).format('ddd, M/D')} -{' '}
                            {moment(endDate).format('ddd, M/D')}
                        </Text>{' '}
                        <Text display="inline">
                            {moment(startDate).format('h:mm a')} -{' '}
                            {moment(endDate).format('h:mm a')}
                        </Text>
                    </Box>
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
                    <Box fontSize={2}>
                        <Text fontWeight="medium" display="inline">
                            {moment(startDate).format('MMM D')} -{' '}
                            {moment(endDate).format('MMM D')}
                        </Text>{' '}
                        <Text display="inline">
                            {moment(startDate).format('h:mm A')} -{' '}
                            {moment(endDate).format('h:mm A')}
                        </Text>{' '}
                        <Text
                            fontWeight="medium"
                            display="inline"
                            color="text.blue"
                        >
                            {reservations.length > 0 &&
                                `(${reservations.length})`}
                        </Text>
                    </Box>
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
                            delete listing
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
