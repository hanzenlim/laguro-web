import React from 'react';
import moment from 'moment';
import {
    Box,
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
        frequency,
        index,
    } = props;

    return (
        <Card p={[20, '', 28]}>
            <Flex textAlign="left" flexDirection="column">
                <Desktop>
                    <Text
                        fontWeight="medium"
                        fontSize={[1, '', 2]}
                        color="text.blue"
                        mb={9}
                    >{`LISTING ${index + 1}`}</Text>
                    <Text
                        fontSize={[1, '', 3]}
                        letterSpacing="-0.6px"
                        color="text.black"
                    >
                        {`${(startDate &&
                            moment(startDate).format('dddd, MMM DD, YYYY')) ||
                            'Start date'}
                                —
                                ${(endDate &&
                                    moment(endDate).format(
                                        'dddd, MMM DD, YYYY'
                                    )) ||
                                    'End date'}`}
                    </Text>
                    <Text
                        fontSize={[0, '', 1]}
                        color="#9b9b9b"
                        letterSpacing="-0.5px"
                        whiteSpace="normal"
                    >
                        <Text is="span" color="inherit">
                            Repeat{' '}
                        </Text>
                        <Text is="span" fontWeight="medium" color="inherit">
                            {`${
                                frequency[0] !== 'everyday' ? 'every ' : ''
                            }${frequency.join(', ')}`}{' '}
                        </Text>
                        <Text is="span" color="inherit">
                            from{' '}
                        </Text>
                        <Text
                            is="span"
                            color="inherit"
                            fontWeight="medium"
                            whiteSpace="inherit"
                        >
                            {(startTime && moment(startTime).format('LT')) ||
                                'start time'}{' '}
                        </Text>
                        <Text is="span" color="inherit" whiteSpace="inherit">
                            to{' '}
                        </Text>
                        <Text
                            is="span"
                            color="inherit"
                            fontWeight="medium"
                            whiteSpace="inherit"
                        >
                            {(endTime && moment(endTime).format('LT')) ||
                                'end time'}
                        </Text>
                    </Text>

                    <Box
                        borderBottom="solid 1px rgba(0, 0, 0, 0.08)"
                        height={16}
                        mb={8}
                    />
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
                <Grid gridTemplateColumns="1fr 1fr 1fr">
                    <Flex
                        borderRight="solid 1px rgba(0, 0, 0, 0.08)"
                        flexDirection="column"
                        justifyContent="center"
                        textAlign="center"
                        pt={10}
                        pb={3}
                    >
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

                    <Flex
                        textAlign="center"
                        borderRight="solid 1px rgba(0, 0, 0, 0.08)"
                        flexDirection="column"
                        justifyContent="center"
                    >
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
                    <Flex
                        textAlign="center"
                        flexDirection="column"
                        justifyContent="center"
                    >
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
                </Grid>
            </Flex>
        </Card>
    );
};

export default ListingCard;
