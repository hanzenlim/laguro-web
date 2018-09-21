import React from 'react';

import { Box, Rating, Text, Image, Flex, Truncate } from '../../../components';

const DentistCard = props => {
    const { rating, image, name, specialty, reviewsCount } = props;

    return (
        <Box minWidth="186px" width="100%">
            <Box size="186px" position="relative" borderRadius="4px">
                <Image borderRadius="4px" width="100%" src={image} alt={name} />
            </Box>

            <Box mt={10}>
                <Text
                    color="text.black"
                    lineHeight="1.22"
                    fontSize={4}
                    letterSpacing="-0.8px"
                >
                    <Truncate lines={1}>{name}</Truncate>
                </Text>

                <Text
                    fontStyle="italic"
                    lineHeight="1.1"
                    fontSize={3}
                    color="text.black"
                    fontWeight="bold"
                    truncate
                >
                    <Truncate lines={1}>{specialty}</Truncate>
                </Text>

                <Flex mt={10} alignItems="center">
                    <Rating size="18px" value={rating} disabled />
                    {reviewsCount && (
                        <Text
                            ml={10}
                            lineHeight="16px"
                            color="text.black"
                            fontSize={1}
                        >
                            {reviewsCount}
                        </Text>
                    )}
                </Flex>
            </Box>
        </Box>
    );
};

DentistCard.defaultProps = {
    name: 'DR. Michelle Choi',
    specialty: 'implant specialista',
    reviewsCount: '20 reviews',
    rating: 2.5,
    image: 'http://via.placeholder.com/186x186',
};

export default DentistCard;
