import React from 'react';

import { Box, Rating, Text, Image, Flex, Truncate } from '../../../components';
import defaultDentistProfileImg from '../../../components/Image/default_dentist_profile_img_square.svg';

const DentistCard = props => {
    const { rating, image, name, specialty, numReviews } = props;

    return (
        <Box minWidth="186px" width="100%">
            <Box
                height="300px"
                width="300px"
                position="relative"
                borderRadius="4px"
            >
                <Image
                    borderRadius="4px"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    src={image}
                    alt={name}
                />
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
                    {numReviews && (
                        <Text
                            ml={10}
                            lineHeight="16px"
                            color="text.black"
                            fontSize={1}
                        >
                            {numReviews}
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
    numReviews: '20 reviews',
    rating: 2.5,
    image: defaultDentistProfileImg,
};

export default DentistCard;
