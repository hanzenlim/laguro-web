import React from 'react';
import moment from 'moment';
import {
    Card,
    Grid,
    Flex,
    Icon,
    Text,
    Responsive,
    Container,
} from '../../../components';

const { Desktop, TabletMobile } = Responsive;

const ListingCard = props => {
    const {
        startDate,
        endDate,
        startTime,
        endTime,
        availableChairs,
        pricePerChair,
        cleaningFee,
    } = props;

    return (
        <Card p={[20, '', 28]}>
            <Flex flexDirection="column">
                <Desktop>
                    <Grid
                        gridTemplateColumns={['50% 50%']}
                        gridTemplateRows="auto"
                        mb={40}
                    >
                        <Flex>
                            <Icon
                                type="calendar"
                                color="text.gray"
                                fontSize="16px"
                                mr={10}
                            />
                            <Text
                                fontSize={[1, '', 3]}
                                lineHeight={1}
                                letterSpacing="-0.6px"
                                color="text.black"
                            >
                                {`${(startDate &&
                                    moment(startDate).format('ddd M/DD')) ||
                                    'Start date'}
                                —
                                ${(endDate &&
                                    moment(endDate).format('ddd M/DD')) ||
                                    'End date'}`}
                            </Text>
                        </Flex>
                        <Flex>
                            <Icon
                                type="clock-circle"
                                color="text.gray"
                                fontSize="16px"
                                mr={10}
                            />
                            <Text
                                fontSize={[1, '', 3]}
                                lineHeight={1}
                                letterSpacing="-0.6px"
                                color="text.black"
                            >
                                {`${(startTime &&
                                    moment(startTime).format('LT')) ||
                                    'Start time'}
                                —
                                ${(endTime && moment(endTime).format('LT')) ||
                                    'End time'}`}
                            </Text>
                        </Flex>
                    </Grid>
                </Desktop>
                <TabletMobile>
                    <Container maxWidth="300px">
                        <Grid gridTemplateColumns={'40% 20% 40%'} mb={13}>
                            <Flex>
                                <Icon
                                    type="calendar"
                                    color="text.gray"
                                    fontSize="14px"
                                    mr={10}
                                />
                                <Text
                                    fontSize={[1, '', 3]}
                                    lineHeight={1}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(startDate &&
                                        moment(startDate).format('ddd M/DD')) ||
                                        'Start date'}
                                </Text>
                            </Flex>
                            <Icon type="rightForwardArrow" fontSize={1} />
                            <Flex>
                                <Icon
                                    type="calendar"
                                    color="text.gray"
                                    fontSize="14px"
                                    mr={10}
                                />
                                <Text
                                    fontSize={[1, '', 3]}
                                    lineHeight={1}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(endDate &&
                                        moment(endDate).format('ddd M/DD')) ||
                                        'End date'}
                                </Text>
                            </Flex>
                        </Grid>
                        <Grid gridTemplateColumns={'40% 20% 40%'} mb={13}>
                            <Flex>
                                <Icon
                                    type="clock-circle"
                                    color="text.gray"
                                    fontSize="14px"
                                    mr={10}
                                />
                                <Text
                                    fontSize={[1, '', 3]}
                                    lineHeight={1}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(startTime &&
                                        moment(startTime).format('LT')) ||
                                        'Start time'}
                                </Text>
                            </Flex>
                            <Icon type="rightForwardArrow" fontSize={1} />
                            <Flex>
                                <Icon
                                    type="clock-circle"
                                    color="text.gray"
                                    fontSize="14px"
                                    mr={10}
                                />
                                <Text
                                    fontSize={[1, '', 3]}
                                    lineHeight={1}
                                    letterSpacing="-0.6px"
                                    color="text.black"
                                >
                                    {(endTime &&
                                        moment(endTime).format('LT')) ||
                                        'End time'}
                                </Text>
                            </Flex>
                        </Grid>
                    </Container>
                </TabletMobile>
                <Flex justifyContent="space-between">
                    <Flex flexDirection="column" justifyContent="center">
                        <Text
                            fontWeight="light"
                            fontSize={[0, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.black"
                            mb={2}
                        >
                            Available chairs
                        </Text>
                        <Text
                            fontWeight="medium"
                            fontSize={[1, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.blue"
                        >
                            {availableChairs || '0'}
                        </Text>
                    </Flex>

                    <Flex flexDirection="column" justifyContent="center">
                        <Text
                            fontWeight="light"
                            fontSize={[0, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.black"
                            mb={2}
                        >
                            Price per chair
                        </Text>
                        <Text
                            fontWeight="medium"
                            fontSize={[1, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.blue"
                        >
                            {pricePerChair || '$0'}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center">
                        <Text
                            fontWeight="light"
                            fontSize={[0, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.black"
                            mb={2}
                        >
                            Cleaning fee
                        </Text>
                        <Text
                            fontWeight="medium"
                            fontSize={[1, '', 2]}
                            lineHeight="18px"
                            letterSpacing="-0.4px"
                            color="text.blue"
                        >
                            {cleaningFee || '$0'}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};

export default ListingCard;
