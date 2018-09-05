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
    Button,
} from '../../components';

import Map from '../common/Map';
import DentistCard from './DentistCard';

const DentistDetailsPageView = props => {
    const { data } = props;

    return (
        <Container>
            <Flex>
                <Box width="732px" mt={30} mr={34}>
                    <Flex mb={56}>
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
                                textTransform="uppercase"
                                fontSize={3}
                                color="#adadad"
                                lineHeight="1"
                                fontWeight="bold"
                                letterSpacing="-0.8px"
                            >
                                {data.specialization}
                            </Text>
                            <Text
                                color="text.black"
                                fontSize={5}
                                lineHeight="40px"
                            >
                                {data.name}
                            </Text>

                            <Flex mt={5} alignItems="center">
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
                    <Text fontSize={4} fontWeight="bold" mb="26px">
                        available procedures
                    </Text>
                    <Flex flexWrap="wrap" mb="34px">
                        {data.procedures.map(procedure => (
                            <Button type="ghost">
                                <Box
                                    px={24}
                                    py={10}
                                    bg="background.green"
                                    borderRadius="25px"
                                    mr="6px"
                                    mb="6px"
                                >
                                    <Text
                                        textTransform="lowercase"
                                        color="text.white"
                                        lineHeight="22px"
                                        fontSize={1}
                                        lineHeight="22px"
                                        letterSpacing="-0.4px"
                                    >
                                        {procedure}
                                    </Text>
                                </Box>
                            </Button>
                        ))}
                    </Flex>
                    {data.bio && (
                        // Added fixed width to fix bug in rendering truncated text
                        <Box pb={42} width="732px">
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
                <Sticky>
                    <Box
                        boxShadow="1px 1px 7px 0 rgba(0, 0, 0, 0.15)"
                        mt="44px"
                        width="100%"
                        height="200px"
                        border="1px solid"
                        borderColor="divider.gray"
                    />
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
