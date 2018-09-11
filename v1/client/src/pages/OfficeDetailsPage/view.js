import React, { Fragment } from 'react';

import {
    Container,
    Flex,
    Box,
    Text,
    Rating,
    Sticky,
    Truncate,
    Carousel,
    Image,
} from '../../components';

import Map from '../common/Map';
import LinkCard from '../common/LinkCard';

const OfficeDetailsPageView = props => {
    const { data } = props;

    return (
        <Fragment>
            <Carousel>
                {data.imageUrls.map(imageUrl => (
                    <Box height="370px">
                        <Image src={imageUrl} width="100%" height="100%" />
                    </Box>
                ))}
            </Carousel>
            <Container>
                <Flex>
                    <Box width="732px" mt={20} mr={34}>
                        <Flex
                            alignItems="center"
                            mb={40}
                            flexDirection="column"
                        >
                            <Text
                                color="text.black"
                                fontSize={5}
                                lineHeight="34px"
                                letterSpacing="-0.8px"
                            >
                                {data.name}
                            </Text>
                            <Text
                                fontSize={4}
                                lineHeight="34px"
                                letterSpacing="-0.8px"
                            >
                                {data.address}
                            </Text>
                            <Flex mt={10} alignItems="center">
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
                        </Flex>
                        {data.description && (
                            // Added fixed width to fix bug in rendering truncated text
                            <Box pb={42} width="732px">
                                <Text fontSize={4} lineHeight="1.3">
                                    description room
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
                                                show more
                                            </Text>
                                        }
                                    >
                                        {data.description}
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
                                    data={[
                                        {
                                            latitude: data.latitude,
                                            longitude: data.longitude,
                                        },
                                    ]}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Sticky offset="20px">
                        <Box
                            width="100%"
                            height="200px"
                            border="1px solid"
                            borderColor="divider.gray"
                        />
                    </Sticky>
                </Flex>
                <Box mt={40}>
                    <Text fontSize={5}>find our highlights</Text>

                    <Flex justifyContent="space-between" mt={30}>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                        <Box width="186px">
                            <LinkCard
                                title="Manhathan Dental"
                                subtitle="dental emergency"
                                address="1308 Terrace Dr Newton, KS 67114"
                                rating={4}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Fragment>
    );
};

export default OfficeDetailsPageView;
