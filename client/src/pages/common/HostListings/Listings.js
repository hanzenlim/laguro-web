import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Collapse } from 'antd';

import { Box, Text, Flex, Button, Responsive } from '../../../components';
import { withScreenSizes } from '../../../components/Responsive';
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
            localStartTime,
            localEndTime,
        } = listing;

        const { startDay, endDay, days } = availability;
        const frequency = days.map(d => d.charAt(0) + d.slice(1).toLowerCase());

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
                            onClick={toggleCancelModalState(id)}
                            height="auto"
                        >
                            <Text
                                fontSize={1}
                                color={'text.blue'}
                            >
                                delete
                            </Text>
                        </Button>
                    </Flex>
                    <Text
                        fontWeight="medium"
                        fontSize={[1, '', 2]}
                        color="text.blue"
                        mb={9}
                    >
                        Listing details
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
                    </Flex>
                }
                key={id}
            >
                 <Flex justifyContent="flex-end">
                    <Button
                        type="ghost"
                        onClick={toggleCancelModalState(id)}
                        height="auto"
                    >
                        <Text
                            fontSize={1}
                            color={'text.blue'}
                        >
                            delete
                        </Text>
                    </Button>
                    </Flex>
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
