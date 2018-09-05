import React from 'react';

import {
    Container,
    Flex,
    Image,
    Box,
    Text,
    Rating,
    Sticky,
    Truncate,
} from '../../components';

import Map from '../common/Map';
import Payment from '../common/Payment';
import DentistCard from './DentistCard';

const DentistDetailsPageView = props => {
    const { data } = props;

    return (
        <Container>
            <Flex>
                <Box width="732px" mt={20} mr={34}>
                    <Flex alignItems="center" mb={40}>
                        <Image
                            width="130px"
                            height="130px"
                            src={data.image}
                            alt={data.name}
                            borderRadius="50%"
                            mr={20}
                        />
                        <Box>
                            <Text
                                color="text.black"
                                fontSize={5}
                                lineHeight="1.13"
                            >
                                {data.name}
                            </Text>
                            <Text
                                fontStyle="italic"
                                fontSize={4}
                                lineHeight="1.13"
                                fontWeight="bold"
                                letterSpacing="-0.8px"
                            >
                                {data.specialization}
                            </Text>
                            <Text
                                mt={10}
                                color="text.black"
                                lineHeight="40px"
                                fontSize={1}
                                lineHeight="22px"
                                letterSpacing="-0.4"
                            >
                                {data.procedures}
                            </Text>
                            <Flex mt={8} alignItems="center">
                                <Rating size="18px" value="3" disabled />
                                <Text
                                    ml={10}
                                    lineHeight="16px"
                                    color="text.black"
                                    fontSize={1}
                                >
                                    {data.reviewsCount} reviews
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                    {data.bio && (
                        // Added fixed width to fix bug in rendering truncated text
                        <Box pb={42} width="732px">
                            <Text fontSize={4} lineHeight="1.3">
                                professional experience
                            </Text>
                            <Text fontSize={1} lineHeight="1.86">
                                <Truncate
                                    lines={3}
                                    toggle={
                                        <Text
                                            is="span"
                                            color="text.green"
                                            fontWeight="bold"
                                        >
                                            … show more.
                                        </Text>
                                    }
                                >
                                    {data.bio}
                                </Truncate>
                            </Text>
                        </Box>
                    )}

                    <Box
                        pt={40}
                        borderTop="1px solid"
                        borderColor="divider.gray"
                    >
                        <Text
                            color="text.black"
                            fontSize={4}
                            lineHeight="1.5"
                            letterSpacing="1.5"
                        >
                            address information{' '}
                            <Text is="span" fontWeight="bold">
                                - {data.address}
                            </Text>
                        </Text>

                        <Box width="100%" height="440px" mt={20}>
                            <Map
                                height={440}
                                width={732}
                                zoom={13}
                                data={[{ address: data.address }]}
                            />
                        </Box>
                    </Box>
                </Box>
                <Sticky offset="20px">
                    <Box
                        width="100%"
                        border="1px solid"
                        borderColor="divider.gray"
                    >
                        <Payment />
                    </Box>
                </Sticky>
            </Flex>
            <Box mt={40}>
                <Text fontSize={5}>similar dentists</Text>

                <Flex justifyContent="space-between" mt={30}>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                    <Box width="295px">
                        <DentistCard />
                    </Box>
                </Flex>
            </Box>
        </Container>
    );
};

export default DentistDetailsPageView;
