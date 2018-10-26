import React from 'react';
import _get from 'lodash/get';
import {
    Flex,
    Image,
    Box,
    Text,
    Rating,
    Truncate,
    Button,
} from '../../../components';
import defaultUserImage from '../../../components/Image/defaultUserImage.svg';
import Map from '../Map';
import { numMaxContainerWidth } from '../../../components/theme';

const TAG_COLORS = [
    'background.blue',
    'background.yellow',
    'background.orange',
    'background.darkBlue',
];

const contentWidth =
    Math.min(window.innerWidth * 0.8, numMaxContainerWidth) - 490;

const DentistDetailsView = props => {
    const { data } = props;

    return (
        <Box>
            <Flex mb={56}>
                <Image
                    width="130px"
                    height="130px"
                    src={data.image || defaultUserImage}
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
                    <Text color="text.black" fontSize={5} lineHeight="40px">
                        {data.name}
                    </Text>

                    <Flex mt={5} alignItems="center">
                        <Rating size="18px" value={data.rating} disabled />
                        <Text
                            ml={10}
                            lineHeight="16px"
                            color="text.black"
                            fontSize={1}
                        >
                            {data.numReviews} reviews
                        </Text>
                    </Flex>
                </Box>
            </Flex>

            <Text fontSize={4} fontWeight="bold" mb="26px">
                available procedures
            </Text>

            <Flex flexWrap="wrap" mb="34px">
                {data.procedures.map((procedure, index) => (
                    <Button type="ghost">
                        <Box
                            px={24}
                            py={10}
                            bg={TAG_COLORS[index % 4]}
                            borderRadius="25px"
                            mr="6px"
                            mb="6px"
                        >
                            <Text
                                textTransform="lowercase"
                                color="text.white"
                                lineHeight="22px"
                                fontSize={1}
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
                <Box pb={42} width={contentWidth}>
                    <Text fontSize={1} lineHeight="1.86">
                        <Truncate
                            lines={3}
                            toggle={
                                <Text
                                    is="span"
                                    color="text.blue"
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

            {data.locations &&
                data.locations.length > 0 && (
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
                            address information
                            {data.locations.map(location => (
                                <Box>
                                    <Text is="span" fontWeight="bold">
                                        - {location.name}
                                    </Text>
                                </Box>
                            ))}
                        </Text>

                        <Box width="100%" height="440px" mt={20}>
                            <Map
                                height={440}
                                width={contentWidth}
                                zoom={data.locations.length === 1 ? 13 : 3}
                                data={data.locations.map(location => ({
                                    address: location.name,
                                    latitude: _get(location, 'geoPoint.lat'),
                                    longitude: _get(location, 'geoPoint.lon'),
                                }))}
                            />
                        </Box>
                    </Box>
                )}
        </Box>
    );
};

export default DentistDetailsView;