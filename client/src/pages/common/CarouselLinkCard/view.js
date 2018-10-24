import React from 'react';

import {
    Box,
    Flex,
    Image,
    Rating,
    Text,
    Truncate,
    Link,
} from '../../../components';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

const CarouselLinkCard = props => {
    const {
        averageRating,
        specialty,
        imageUrl,
        name,
        type,
        numReviews,
        url,
    } = props;

    return (
        <Link type="ghost" to={url}>
            <Box minWidth="186px" width="100%" height="100%">
                <Box borderRadius="4px" height="100%" position="relative">
                    <Flex
                        height="100%"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            position="relative"
                            width="100%"
                            pb={type === 'rectangle' ? '75%' : '100%'}
                        >
                            <Image
                                position="absolute"
                                borderRadius="4px"
                                src={imageUrl || defaultDentistProfileImg}
                                width="100%"
                                height={props.height}
                                alt={name}
                            />
                        </Box>
                    </Flex>
                    {specialty &&
                        name && (
                            <Box
                                pl={18}
                                pt={10}
                                width="100%"
                                minHeight="70px"
                                borderRadius="4px"
                                position="absolute"
                                bottom="0"
                                bg="rgba(0, 0, 0, 0.7)"
                            >
                                <Text
                                    fontSize={0}
                                    fontWeight="bold"
                                    color="text.gray"
                                    lineHeight="1"
                                    letterSpacing="-0.5px"
                                    mb={4}
                                >
                                    <Truncate lines={1}>{specialty}</Truncate>
                                </Text>
                                <Text
                                    fontSize={3}
                                    color="text.white"
                                    lineHeight="1"
                                    letterSpacing="-0.5px"
                                    mb={4}
                                >
                                    <Truncate lines={1}>{name}</Truncate>
                                </Text>
                                <Flex>
                                    <Rating
                                        fontSize="8px"
                                        disabled
                                        value={averageRating}
                                    />
                                    <Text
                                        ml={6}
                                        fontSize={0}
                                        fontWeight="medium"
                                        color="text.white"
                                        lineHeight="1"
                                        letterSpacing="-0.6px"
                                    >
                                        ({numReviews})
                                    </Text>
                                </Flex>
                            </Box>
                        )}
                </Box>
            </Box>
        </Link>
    );
};

export default CarouselLinkCard;
